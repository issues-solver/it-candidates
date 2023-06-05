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
import { filter, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { CandidatesService } from '../../core/services';
import { AuthService } from '../auth/services/auth-service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';

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
  public candidateId!: string;

  @Input() editMode = false;

  constructor(
    private fb: FormBuilder,
    private candidatesService: CandidatesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    ) {
    this.initForm();
  }

  ngOnInit() {
    this.apiSkills$ = this.getApiSkills();
    this.recruiterContacts$ = this.authService.getUser()
      .pipe(map((user: User) => this.processUserContacts(user.contacts)));
    if (this.editMode) {
      this.listenForCandidate();
    }
  }

  private listenForCandidate() {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((paramMap: ParamMap) => paramMap.get('candidateId')),
        filter(Boolean),
        switchMap((id: string) => {
          this.candidateId = id;
          return this.candidatesService.getCandidate(id)
        })
      )
      .subscribe((candidate: Candidate) => {
        this.handleCandidate(candidate);
      });
  }

  private handleCandidate(candidate: Candidate) {
    const { fullName, recruiterContact, contacts, grade, lastContactDateMs, skills, experience } = candidate;
    this.form.patchValue({
      fullName,
      recruiterContact,
      grade,
      skills,
      experience,
      lastContactDate: new Date(lastContactDateMs),
    });
    const contactsValue = contacts.reduce<Record<string, string>>((acc, curr) => {
      acc[curr.type] = curr.value;
      return acc;
    }, {});
    this.contactsFormGroup.patchValue(contactsValue);
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
    if (this.form.valid) {
      if (this.editMode) {
        this.editCandidate();
      } else {
        this.createCandidate();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCandidate() {
    this.candidatesService.createCandidate(this.getPayload())
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.dialogService.openDialog({
            message: 'Candidate created successfully!',
            showCancelButton: false,
          });
        })
      )
      .subscribe(() => {
        this.form.reset();
        this.clearFormControlsValidation();
      });
  }

  private editCandidate() {
    this.candidatesService.editCandidate(this.candidateId, this.getPayload())
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.dialogService.openDialog({
          message: 'Candidate updated successfully!',
          showCancelButton: false,
        }))
      )
      .subscribe();
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

  private clearFormControlsValidation(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
