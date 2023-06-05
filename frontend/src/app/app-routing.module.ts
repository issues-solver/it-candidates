import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';
import { LoggedInAuthGuard } from './modules/auth/guards/logged-in-auth.guard';
import { WelcomeComponent } from './modules/auth/components/welcome/welcome.component';
import { LoggedOutAuthGuard } from './modules/auth/guards/logged-out-auth.guard';
import { ProfileComponent } from './modules/auth/components/profile/profile.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [LoggedOutAuthGuard],
    data: {
      title: 'Welcome',
    },
  },
  {
    path: 'signin',
    component: SignInComponent,
    canActivate: [LoggedOutAuthGuard],
    data: {
      title: 'Sign In',
    },
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [LoggedOutAuthGuard],
    data: {
      title: 'Sign Up',
    },
  },
  {
    path: 'candidates',
    loadChildren: () => import('./modules/candidates/candidates.module')
      .then(((m) => m.CandidatesModule)),
    canLoad: [LoggedInAuthGuard],
  },
  {
    path: 'candidate',
    loadChildren: () => import('./modules/add-candidate/add-candidate.module')
      .then((m) => m.AddCandidateModule),
    canLoad: [LoggedInAuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedInAuthGuard],
    data: {
      title: 'User Profile',
    },
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
