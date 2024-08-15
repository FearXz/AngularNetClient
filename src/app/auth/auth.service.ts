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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = this.persistSvc.PSignal<LoginResponse | null>(AUTH, null);

  loginUrl: string = `${environment.apiUrl}api/Auth/login`;
  registerUrl: string = `${environment.apiUrl}api/Auth/register`;
  refreshUrl: string = `${environment.apiUrl}api/Auth/refreshToken`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private persistSvc: PersistService,
    private jwtHelper: JwtHelperService
  ) {}

  get auth(): Signal<LoginResponse | null> {
    return this._auth.asReadonly();
  }

  setAuth(auth: LoginResponse) {
    this._auth.set(auth);
  }

  login(login: LoginRequest): void {
    firstValueFrom(this.http.post<LoginResponse>(this.loginUrl, login))
      .then((response) => {
        this._auth.set(response);
      })
      .catch((error) => {
        console.error('Error logging in', error);
      })
      .finally(() => {});
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

  logout(): void {
    this._auth.set(null);
  }

  // metodo per verificare se l'utente è loggato

  // metodo per ottenere l'utente loggato

  // metodo per ottenere l'accessToken
}
