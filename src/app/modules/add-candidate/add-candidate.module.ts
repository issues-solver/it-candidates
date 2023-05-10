import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCandidateRoutingModule } from './add-candidate-routing.module';
import { AddCandidateComponent } from './add-candidate.component';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SkillsSelectComponent } from './components/skills-select/skills-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    AddCandidateRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
  ],
  declarations: [AddCandidateComponent, EditCandidateComponent, SkillsSelectComponent],
})
export class AddCandidateModule {}
