import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private dialogService: DialogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 401) {
          this.dialogService.openDialog({
            message: err?.error?.message || 'Unknown Error',
            title: 'Error',
            showCancelButton: false
          }).subscribe();
        }
        return throwError(err);
      })
    )
  }
}
