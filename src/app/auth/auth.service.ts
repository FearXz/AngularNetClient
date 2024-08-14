import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from './AuthInterfaces/LoginResponse';
import { LoginRequest } from './AuthInterfaces/LoginRequest';
import { firstValueFrom } from 'rxjs';
import { PAUTH } from '../utils/const';
import { PersistService } from '../services/persistService.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = this.persistSvc.PSignal<LoginResponse | null>(PAUTH, null);

  loginUrl: string = `${environment.apiUrl}api/Auth/login`;
  registerUrl: string = `${environment.apiUrl}api/Auth/register`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private persistSvc: PersistService,
    private jwtHelper: JwtHelperService
  ) {}

  // Effettua il login
  login(email: string, password: string): void {
    const loginRequest: LoginRequest = { email, password };

    firstValueFrom(this.http.post<LoginResponse>(this.loginUrl, loginRequest))
      .then((response) => {
        this._auth.set(response);
      })
      .catch((error) => {
        console.error('Error logging in', error);
      })
      .finally(() => {});
  }

  // Effettuare il logout
  logout(): void {
    this._auth.set(null);
    this.router.navigate(['/login']);
  }

  // metodo per verificare se l'utente è loggato

  // metodo per ottenere l'utente loggato

  // metodo per ottenere l'accessToken
}
