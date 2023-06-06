import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      // Clone the request and add the access token to the headers
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
