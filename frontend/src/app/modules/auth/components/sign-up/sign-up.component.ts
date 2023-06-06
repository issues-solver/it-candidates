import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { SignInCredentials } from '../../models';

@Component({
  selector: 'app-sign-up',
  template: `<app-auth-form [fullMode]="true" saveBtnText="Sign Up" (submitForm)="signUp($event)"></app-auth-form>`,
  styles: [':host {flex: 1 1 auto;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  constructor(
    private authService: AuthService,
  ) {}

  public signUp(creds: SignInCredentials) {
    this.authService.signup(creds).subscribe();
  }
}
