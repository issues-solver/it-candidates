import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '../../../../core/models';
import { AuthService } from '../../services/auth-service';
import { switchMap } from 'rxjs';
import { DialogService } from '../../../../core/services/dialog.service';

@Component({
  selector: 'app-profile',
  template: `<app-auth-form [fullMode]="true" [isProfilePage]="true" saveBtnText="Save" (submitForm)="updateCredentials($event)">
    </app-auth-form>`,
  styles: [':host {flex: 1 1 auto;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) {}

  public updateCredentials(user: User) {
    this.authService.updateUser(this.generatePayload(user))
      .pipe(
        switchMap(() => this.dialogService.openDialog({
          message: 'User updated successfully!',
          showCancelButton: false,
        }))
      ).subscribe();
  }

  private generatePayload(user: User) {
    const { password, contacts, ...rest } = user;
    const payload: Partial<User> = {
      ...rest,
      contacts: contacts.filter((c) => c.type && c.value),
    };
    if (password) {
      payload.password = password;
    }
    return payload;
  }
}
