import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { SharedModule } from '../../shared/shared.module';
import { CandidatesRoutingModule } from './candidates-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule,
  ],
  declarations: [CandidatesComponent],
})
export class CandidatesModule {}
