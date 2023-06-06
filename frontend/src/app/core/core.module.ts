import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesService } from './services';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    CandidatesService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {}
