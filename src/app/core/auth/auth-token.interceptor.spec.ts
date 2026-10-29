import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { authTokenInterceptor } from './auth-token.interceptor';
import { AuthTokenService } from './auth-token.service';

describe('authTokenInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([authTokenInterceptor])), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    TestBed.inject(AuthTokenService).setToken('token-1');
  });

  afterEach(() => sessionStorage.clear());

  it('adds the bearer token to API requests', () => {
    http.get(`${environment.apiUrl}/v1/leases`).subscribe();
    expect(controller.expectOne(`${environment.apiUrl}/v1/leases`).request.headers.get('Authorization')).toBe('Bearer token-1');
  });

  it('does not send the token to other hosts', () => {
    http.get('https://example.org/data').subscribe();
    expect(controller.expectOne('https://example.org/data').request.headers.has('Authorization')).toBe(false);
  });
});
