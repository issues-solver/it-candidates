import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { SharedModule } from '../../shared/shared.module';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { FiltersComponent } from './components/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [CandidatesComponent, FiltersComponent],
})
export class CandidatesModule {}
