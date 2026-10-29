import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { App } from './app';
import { HUB_CONNECTION_FACTORY } from './core/realtime/leasing-hub.service';

describe('App', () => {
  beforeEach(async () => {
    const connection = { on: vi.fn(), start: vi.fn().mockResolvedValue(undefined), stop: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: HUB_CONNECTION_FACTORY, useValue: () => connection as unknown as HubConnection }],
    }).compileComponents();
  });

  it('renders the navigation and starts the hub connection', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Equipment leasing');
    expect(Array.from(compiled.querySelectorAll('nav a')).map((a) => a.getAttribute('href'))).toEqual([
      '/applications',
      '/assessments',
      '/quotes',
      '/leases',
      '/admin/portfolio',
    ]);
  });
});
