import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { SignUpCredentials } from '../../models';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CONTACT_TYPES } from '../../../../core/constants';
import { Subject, takeUntil } from 'rxjs';
import { AuthMode } from '../../constants';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private minPasswordLength = 6;

  public authForm!: FormGroup;

  public contactTypes = CONTACT_TYPES;

  @Input() mode = AuthMode.SignIn;

  @Input() isSignUp = false;

  @Output() submitForm = new EventEmitter<SignUpCredentials>();

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.authForm = this.getAuthForm();
    if (this.isSignUp) {
      this.listenForContactsValidity();
    }
  }

  private getAuthForm(): FormGroup {
    return this.isSignUp ?
      this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
        confirmPassword: ['', (this.isSignUp ? [Validators.required] : [])],
        firstName: ['', (this.isSignUp ? [Validators.required] : [])],
        lastName: ['', (this.isSignUp ? [Validators.required] : [])],
        contacts: this.fb.array([this.getContactField(true)]),
      }) :
      this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
      });
  }

  get contactForms(): FormArray {
    return this.authForm.get('contacts') as FormArray;
  }

  private getContactField(firstContact = false): FormGroup {
    const validators = firstContact ? [Validators.required] : [];
    return this.fb.group({
      type: ['', validators],
      contact: ['', validators],
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // skip first formGroup, it's already had required validator
        const formGroups = this.contactForms.controls.slice(1);
        // Check each form group
        for (const formGroup of formGroups) {
          const typeControl = formGroup.get('type') as FormControl;
          const contactControl = formGroup.get('contact') as FormControl;

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
