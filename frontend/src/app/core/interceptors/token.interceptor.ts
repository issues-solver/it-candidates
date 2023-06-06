import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth-service';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        // Check if the error is due to token expiration
        if (error.status === 401 && this.authService.isTokenExpired()) {
          this.authService.logout()
            .pipe(
              switchMap(() => this.dialogService.openDialog({
                message: 'Your login session has expired. Please log in again to continue.',
                showCancelButton: false,
              }))
            ).subscribe();
        }
        return throwError(error);
      })
    );
  }
}
