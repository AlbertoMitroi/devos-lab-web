import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from './auth-token.service';

/** Adds the bearer token to requests sent to the leasing API, and only to those. */
export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthTokenService).token();
  if (!token || !req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
