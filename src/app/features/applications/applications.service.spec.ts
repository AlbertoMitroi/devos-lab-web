import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let controller: HttpTestingController;
  const base = `${environment.apiUrl}/v1/applications`;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ApplicationsService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('searches with status and text', () => {
    service.search('InProgress', 'north').subscribe();
    const req = controller.expectOne((r) => r.url === base);
    expect(req.request.params.get('status')).toBe('InProgress');
    expect(req.request.params.get('q')).toBe('north');
    req.flush([]);
  });

  it('posts a review and a withdraw action', () => {
    service.review('f-1', true, 'fine').subscribe();
    const review = controller.expectOne(`${base}/f-1/review`);
    expect(review.request.method).toBe('POST');
    expect(review.request.body).toEqual({ approve: true, comment: 'fine' });
    review.flush({});

    service.withdraw('f-1').subscribe();
    expect(controller.expectOne(`${base}/f-1/actions/withdraw`).request.method).toBe('POST');
  });
});
