import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignUpCredentials } from '../../models';
import { AuthMode } from '../../constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public mode = AuthMode.Profile;

  public updateCredentials(credentials: SignUpCredentials) {
    console.log('credentials', credentials);
  }
}
