import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCandidateComponent } from './add-candidate.component';
import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';

const routes: Routes = [
  {
    path: '',
    component: AddCandidateComponent,
    data: {
      title: 'Add Candidate',
    },
  },
  {
    path: ':candidateId',
    component: EditCandidateComponent,
    data: {
      title: 'Edit Candidate',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AddCandidateRoutingModule {}
