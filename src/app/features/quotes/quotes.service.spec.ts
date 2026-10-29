import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { QuotesService } from './quotes.service';

describe('QuotesService', () => {
  let service: QuotesService;
  let controller: HttpTestingController;
  const base = `${environment.apiUrl}/v1/quotes`;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(QuotesService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('accepts and recalculates a quote', () => {
    service.accept('q-1', true).subscribe();
    expect(controller.expectOne(`${base}/q-1/accept`).request.body).toEqual({ accept: true });

    service.recalculate('q-1', 48).subscribe();
    expect(controller.expectOne(`${base}/q-1/recalculate`).request.body).toEqual({ termMonths: 48 });
  });

  it('reads one quote', () => {
    service.get('q-1').subscribe();
    expect(controller.expectOne(`${base}/q-1`).request.method).toBe('GET');
  });
});
