import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { SharedModule } from '../../shared/shared.module';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { FiltersComponent } from './components/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    ClipboardModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
  ],
  declarations: [CandidatesComponent, FiltersComponent],
})
export class CandidatesModule {}
