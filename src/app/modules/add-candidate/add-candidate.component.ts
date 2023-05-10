import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { User, UserContacts } from '../../core/models';
import { ContactType } from '../../core/constants';
import { Observable } from 'rxjs';
import { CandidatesService } from '../../core/services';

type UiUserContacts = { type: ContactType, values: string[] }[];

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCandidateComponent implements OnInit {
  public form!: FormGroup;
  public contactsFormGroup!: FormGroup;
  public skillsFormArray!: FormArray;
  public fullNameMinLength = 3;
  public contactMinLength = 4;
  public ownContacts: UserContacts = {
    [ContactType.Linkedin]: ['linkedin 1', 'linkedin 2'],
    [ContactType.Telegram]: ['telegram 1', 'telegram 2'],
    [ContactType.Email]: ['email 1'],
    [ContactType.Discord]: ['discord 1'],
    [ContactType.Slack]: ['slack 1', 'slack 2'],
  }
  public uiOwnContacts: UiUserContacts = this.processUserContacts(this.ownContacts);
  public apiSkills$!: Observable<string[]>;

  @Input() editMode = false;

  constructor(
    private fb: FormBuilder,
    private candidatesService: CandidatesService,
    ) {
    this.initForm();
  }

  ngOnInit() {
    this.apiSkills$ = this.getApiSkills();
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
      ownContact: [null, [Validators.required]],
      skills: [[], [Validators.required]],
    });
    this.form.get('skills')?.statusChanges
      .subscribe(res => console.log(res));
  }

  private processUserContacts(contacts: User['contacts']): UiUserContacts {
    return Object.keys(contacts).reduce<UiUserContacts>((acc, contactType) => {
      acc.push({ type: contactType as ContactType, values: contacts[contactType as ContactType] as string[] });
      return acc;
    }, []);
  }

  private getApiSkills(): Observable<string[]> {
    return this.candidatesService.getPopularSkills();
  }
}
