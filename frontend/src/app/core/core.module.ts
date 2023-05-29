import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesService } from './services';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    CandidatesService,
    CookieService,
  ]
})
export class CoreModule {}
