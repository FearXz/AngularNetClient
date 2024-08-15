import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from './Interfaces/LoginResponse';
import { LoginRequest } from './Interfaces/LoginRequest';
import { firstValueFrom, Observable } from 'rxjs';
import { AUTH } from '../utils/const';
import { PersistService } from '../services/persistService.service';
import { RefreshRequest } from './Interfaces/Refreshequest';
import { RefreshResponse } from './Interfaces/RefreshResponse';
import { UserClaims } from './Interfaces/UserClaims';
import { LoggedUser } from './Interfaces/LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = this.persistSvc.PSignal<LoggedUser | null>(AUTH, null);

  loginUrl: string = `${environment.apiUrl}/api/Auth/login`;
  registerUrl: string = `${environment.apiUrl}/api/Auth/register`;
  refreshUrl: string = `${environment.apiUrl}/api/Auth/refreshToken`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private persistSvc: PersistService,
    private jwtHelper: JwtHelperService
  ) {}

  login(login: LoginRequest): void {
    firstValueFrom(this.http.post<LoginResponse>(this.loginUrl, login))
      .then((resp) => {
        if (!resp) throw new Error('No Claims');
        this.setUserData(resp);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error logging in', error);
      })
      .finally(() => {});
  }

  logout(): void {
    this._userData.set(null);
  }

  refreshToken(
    refreshToken: RefreshRequest
  ): Observable<RefreshResponse | undefined> {
    return this.http.post<RefreshResponse>(
      `${this.refreshUrl}api/Auth/refreshToken`,
      {
        refreshToken,
      }
    );
  }

  get userData(): Signal<LoggedUser | null> {
    return this._userData.asReadonly();
  }

  setUserData(login: LoginResponse): void {
    let claims: UserClaims = this.getClaims(login.accessToken);

    if (!claims) throw new Error('No Claims');

    const user: LoggedUser = {
      accessToken: login.accessToken,
      refreshToken: login.refreshToken,
      userId: claims.userId,
      displayName: claims.displayName,
    };

    this._userData.set(user);
  }

  get userRole(): string {
    if (!this._userData()) return '';

    let accessToken = this._userData()?.accessToken;
    let claims: UserClaims = this.getClaims(accessToken || '');
    return claims.role;
  }

  getClaims(accessToken: string): UserClaims {
    let claims = this.jwtHelper.decodeToken(accessToken);
    if (!claims) throw new Error('No Claims');

    const decodedToken: UserClaims = {
      userId: claims.nameid,
      displayName: claims.unique_name,
      role: claims.role,
      jti: claims.jti,
    };

    return decodedToken;
  }
}
