import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SignUpCredentials } from '../../models';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONTACT_TYPES } from '../../../../core/constants';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { Contact, User } from '../../../../core/models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private contactsDestroy$ = new Subject<void>();

  public minPasswordLength = 6;

  public authForm!: FormGroup;

  public contactTypes = CONTACT_TYPES;

  @Input() isProfilePage = false;

  @Input() fullMode = false;

  @Input() saveBtnText = 'Sign In';

  @Output() submitForm = new EventEmitter<SignUpCredentials>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authForm = this.getAuthForm();
    if (this.fullMode) {
      this.listenForContactsValidity();
    }
    if (this.isProfilePage) {
      this.getUser();
    }
  }

  private getAuthForm(): FormGroup {
    let passwordValidators = [Validators.minLength(this.minPasswordLength), Validators.required];
    let confirmPasswordValidators = [Validators.required];
    if (this.isProfilePage) {
      passwordValidators = [Validators.minLength(this.minPasswordLength)];
      confirmPasswordValidators = [];
    }
    return this.fullMode ?
      this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', passwordValidators],
        confirmPassword: ['', confirmPasswordValidators],
        contacts: this.fb.array([this.getContactField({ firstContact: true })]),
      }, { validators: this.customMatchingPasswords('password', 'confirmPassword') }) :
      this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', passwordValidators],
      });
  }

  get contactForms(): FormArray {
    return this.authForm.get('contacts') as FormArray;
  }

  private getUser() {
    this.authService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => this.handleUser(user));
  }

  private handleUser(user: User) {
    this.contactsDestroy$.next(); // Stop listening the previous subscription
    const { firstName, lastName, email, contacts } = user;
    this.authForm.patchValue({ firstName, lastName, email, });
    this.contactForms.clear();
    contacts.forEach(({ type, value }: Contact, index: number) => {
      const firstContact = index === 0;
      this.contactForms.push(this.getContactField({ firstContact, type, value }));
    })
    this.listenForContactsValidity();
  }

  private getContactField(data?: { firstContact?: boolean; type?: string; value?: string; }): FormGroup {
    const { firstContact = false, type = '', value = '' } = data || {};
    const validators = firstContact ? [Validators.required] : [];
    return this.fb.group({
      type: [type, validators],
      value: [value, validators],
    });
  }

  public addContactField(): void {
    this.contactForms.push(this.getContactField());
  }

  public removeContactField(index: number): void {
    this.contactForms.removeAt(index);
  }

  public onFormSubmit(): void {
    if (this.authForm.valid) {
      const { confirmPassword, ...value } = this.authForm.value;
      this.submitForm.emit(value as SignUpCredentials);
    } else {
      this.authForm.markAsTouched();
    }
  }

  private listenForContactsValidity() {
    this.contactForms.valueChanges
      .pipe(takeUntil(this.contactsDestroy$))
      .subscribe(() => {
        // skip first formGroup, it's already had required validator
        const formGroups = this.contactForms.controls.slice(1);
        // Check each form group
        for (const formGroup of formGroups) {
          const typeControl = formGroup.get('type') as FormControl;
          const contactControl = formGroup.get('value') as FormControl;

          // Apply conditional validators based on the control values
          if (typeControl.value || contactControl.value) {
            typeControl.setValidators(Validators.required);
            contactControl.setValidators(Validators.required);
          } else {
            typeControl.clearValidators();
            contactControl.clearValidators();
          }

          // Update the control validation state
          typeControl.updateValueAndValidity({ onlySelf: true });
          contactControl.updateValueAndValidity({ onlySelf: true });
        }
      });
  }

  private customMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];

      if (passwordConfirmation.errors && !passwordConfirmation.errors['mismatchedPasswords']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      const error = password.value !== passwordConfirmation.value ? { mismatchedPasswords: true } : null;
      passwordConfirmation.setErrors(error);
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.contactsDestroy$.next();
    this.contactsDestroy$.complete();
  }
}
