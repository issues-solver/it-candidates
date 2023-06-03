import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Candidate, Contact, User } from '../../core/models';
import { ContactType, EXPERIENCE_YEARS, GRADES } from '../../core/constants';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { CandidatesService } from '../../core/services';
import { AuthService } from '../auth/services/auth-service';

type UiUserContacts = { type: ContactType, values: string[] }[];

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCandidateComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public form!: FormGroup;
  public contactsFormGroup!: FormGroup;
  public skillsFormArray!: FormArray;
  public fullNameMinLength = 3;
  public contactMinLength = 4;
  public userContacts: User['contacts'] = [
    { type: ContactType.Linkedin, value: 'linkedin 2' },
    { type: ContactType.Linkedin, value: 'linkedin 2' },
    { type: ContactType.Telegram, value: 'telegram 1' },
    { type: ContactType.Telegram, value: 'telegram 2' },
    { type: ContactType.Discord, value: 'discord 1' },
    { type: ContactType.Slack, value: 'slack 1' },
  ];
  public uiOwnContacts: UiUserContacts = this.processUserContacts(this.userContacts);
  public recruiterContacts$!: Observable<UiUserContacts>;
  public apiSkills$!: Observable<string[]>;
  public grades = GRADES;
  public experienceYears = EXPERIENCE_YEARS;

  @Input() editMode = false;

  constructor(
    private fb: FormBuilder,
    private candidatesService: CandidatesService,
    private authService: AuthService,
    ) {
    this.initForm();
  }

  ngOnInit() {
    this.apiSkills$ = this.getApiSkills();
    this.recruiterContacts$ = this.authService.getUser()
      .pipe(map((user: User) => this.processUserContacts(user.contacts)));
  }

  private atLeastOneContactRequiredValidator(group: AbstractControl): ValidationErrors | null {
    const controls = (group as FormGroup).controls;
    const atLeastOne = Object.values(controls).some((formControl: AbstractControl) => !!formControl.value);
    return atLeastOne ? null : { atLeastOne: true };
  }

  private initForm(): void {
    this.contactsFormGroup = this.fb.group({
      linkedin: [null, [Validators.minLength(this.contactMinLength)]],
      telegram: [null, [Validators.minLength(this.contactMinLength)]],
      email: [null, [Validators.minLength(this.contactMinLength)]],
      discord: [null, [Validators.minLength(this.contactMinLength)]],
      slack: [null, [Validators.minLength(this.contactMinLength)]],
      phone: [null, []], // TODO: Add phone validator
    },
      { validators: this.atLeastOneContactRequiredValidator }
    );
    this.skillsFormArray = this.fb.array([], [Validators.required]);
    this.form = this.fb.group({
      fullName: [null, [
        Validators.required,
        Validators.minLength(this.fullNameMinLength)
      ]],
      contacts: this.contactsFormGroup,
      recruiterContact: [null, [Validators.required]],
      skills: [[], [Validators.required]],
      lastContactDate: [],
      grade: [null],
      experience: [null],
    });
  }

  private processUserContacts(contacts: User['contacts']): UiUserContacts {
    const map = contacts.reduce<Record<ContactType, string[]>>((acc, contact) => {
      if (!acc[contact.type]) {
        acc[contact.type] = [contact.value];
      } else {
        acc[contact.type].push(contact.value);
      }
      return acc;
    }, {} as Record<ContactType, string[]>);
    return Object.keys(map).map((type) => ({ type: type as ContactType, values: map[type as ContactType]  }));
  }

  private getApiSkills(): Observable<string[]> {
    return this.candidatesService.getPopularSkills();
  }

  public onFormSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.createCandidate();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCandidate() {
    this.candidatesService.createCandidate(this.getPayload())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form.reset();
      });
  }

  private getPayload(): Candidate {
    const { contacts, lastContactDate, ...rest  } = this.form.value;
    return {
      ...rest,
      contacts: this.getContacts(),
      lastContactDateMs: this.getLastContactDateMs(),
    };
  }

  private getContacts(): Contact[] {
    const { contacts } = this.form.value;
    return Object.keys(contacts).reduce<Contact[]>((acc, type) => {
      if (contacts[type]) {
        acc.push({ type: type as ContactType, value: contacts[type] })
      }
      return acc;
    }, []);
  }

  private getLastContactDateMs(): number {
    const { lastContactDate } = this.form.value;
    return lastContactDate ? lastContactDate.getTime() : null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
