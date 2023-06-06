import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignUpCredentials } from '../../models';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-in',
  template: `<app-auth-form (submitForm)="signIn($event)"></app-auth-form>`,
  styles: [':host {flex: 1 1 auto;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  public signIn(data: SignUpCredentials) {
    this.authService.signin(data).subscribe();
  }
}
