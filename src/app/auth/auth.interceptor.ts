import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.authSvc.auth();

    let authReq = req;
    if (auth) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${auth.accessToken}` },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && auth?.refreshToken) {
          return this.authSvc
            .refreshToken({
              accessToken: auth.accessToken,
              refreshToken: auth.refreshToken,
            })
            .pipe(
              switchMap((refResp) => {
                if (refResp) {
                  this.authSvc.setAuth(refResp);
                  const clonedReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${refResp.accessToken}`,
                    },
                  });
                  return next.handle(clonedReq);
                }
                return throwError(() => new Error(error.message));
              }),
              catchError((error) => {
                this.authSvc.logout();
                this.router.navigate(['/login']);
                return throwError(() => new Error(error.message));
              })
            );
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
