import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesService } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    CandidatesService,
  ]
})
export class CoreModule {}
