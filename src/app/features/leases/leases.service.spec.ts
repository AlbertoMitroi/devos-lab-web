import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { LeasesService } from './leases.service';

describe('LeasesService', () => {
  let service: LeasesService;
  let controller: HttpTestingController;
  const base = `${environment.apiUrl}/v1/leases`;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(LeasesService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('lists, reads the document and signs', () => {
    service.search('LC-1').subscribe();
    expect(controller.expectOne((r) => r.url === base && r.params.get('q') === 'LC-1').request.method).toBe('GET');

    service.document('l-1').subscribe();
    expect(controller.expectOne(`${base}/l-1/document`).request.method).toBe('GET');

    service.sign('l-1', 'Ana Pop').subscribe();
    expect(controller.expectOne(`${base}/l-1/sign`).request.body).toEqual({ signedBy: 'Ana Pop' });
  });
});
