import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-candidate',
  template: '<app-add-candidate [editMode]="true"></app-add-candidate>'
})
export class EditCandidateComponent {}

