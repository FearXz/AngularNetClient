import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  const auth = authSvc.userData();

  let authReq = req;
  if (auth) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${auth.accessToken}` },
    });
  }
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && auth?.refreshToken) {
        return authSvc
          .refreshToken({
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
          })
          .pipe(
            switchMap((refResp) => {
              if (refResp) {
                let claims = authSvc.getClaims(refResp);
                authSvc.setUserData(refResp);
                const clonedReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${refResp.accessToken}`,
                  },
                });
                return next(clonedReq);
              }
              return throwError(() => new Error(error.message));
            }),
            catchError((innerError) => {
              authSvc.logout();
              router.navigate(['/login']);
              return throwError(() => new Error(innerError.message));
            })
          );
      }
      return throwError(() => new Error(error.message));
    })
  );
};
