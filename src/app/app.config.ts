import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: JWT_OPTIONS, useValue: {} },
    /*     JwtHelperService,
    provideRouter(routes),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ), */
  ],
};
