import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCandidateComponent } from './add-candidate.component';
import { AddCandidateRoutingModule } from './add-candidate-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AddCandidateRoutingModule,
  ],
  declarations: [AddCandidateComponent],
})
export class AddCandidateModule {}
