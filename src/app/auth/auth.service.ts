import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersistentSvc } from '../services/persistentSvc.service';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from './Interfaces/LoginResponse';
import { LoginRequest } from './Interfaces/LoginRequest';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _auth: WritableSignal<LoginResponse | null>;
  loginUrl: string = `${environment.apiUrl}api/Auth/login`;
  registerUrl: string = `${environment.apiUrl}register`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private persistentSvc: PersistentSvc,
    private jwtHelper: JwtHelperService
  ) {
    this._auth = this.persistentSvc.PSignal<LoginResponse | null>('auth', null);
  }

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
