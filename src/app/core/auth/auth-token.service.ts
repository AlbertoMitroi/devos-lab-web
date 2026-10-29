import { Injectable } from '@angular/core';

/**
 * Holds the access token of the signed-in user. The lab keeps it in session storage;
 * the system it mirrors gets it from the identity provider library.
 */
@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private static readonly storageKey = 'lab.accessToken';

  token(): string | null {
    return sessionStorage.getItem(AuthTokenService.storageKey);
  }

  setToken(token: string): void {
    sessionStorage.setItem(AuthTokenService.storageKey, token);
  }
}
