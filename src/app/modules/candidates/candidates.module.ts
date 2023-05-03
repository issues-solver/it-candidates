import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { CandidatesTableComponent } from './table/candidates-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
  ],
  declarations: [CandidatesComponent, CandidatesTableComponent],
  exports: [CandidatesComponent],
})
export class CandidatesModule {}
