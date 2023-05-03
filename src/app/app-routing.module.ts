import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './modules/candidates/candidates.component';

const routes: Routes = [
  { path: 'candidates', component: CandidatesComponent },
  {
    path: 'add-candidate',
    loadChildren: () => import('./modules/add-candidate/add-candidate.module').then((m) => m.AddCandidateModule)
  },
  { path: '', redirectTo: 'candidates', pathMatch: 'full' },
  { path: '**', component: CandidatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
