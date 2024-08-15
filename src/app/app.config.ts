import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { authInterceptor } from './auth/auth.interceptor';
import { TranslateModules } from '../assets/i18n/library/TranslateModule';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: JWT_OPTIONS, useValue: {} },
    JwtHelperService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(TranslateModules),
  ],
};
