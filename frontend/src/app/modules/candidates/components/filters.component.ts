import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CandidateFilterParams, Contact } from '../../../core/models';
import { EXPERIENCE_YEARS, GRADES } from '../../../core/constants';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  public panelOpenState = false;
  public form!: FormGroup;
  public grades = GRADES;
  public experienceYears = EXPERIENCE_YEARS;

  @Input() recruiterContacts!: Contact[] | null;
  @Input() skills: string[] | null = [];

  @Output() submitForm = new EventEmitter<CandidateFilterParams>();
  @Output() clearForm = new EventEmitter<void>();

  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: [''],
      recruiterContact: [''],
      grade: [''],
      experience: [''],
      skills: [[]],
    });
  }

  private closeExpansionPanel() {
    this.expansionPanel.close();
  }

  public onSubmit(): void {
    this.submitForm.emit(this.form.value);
    this.closeExpansionPanel();
  }

  public onCancel(): void {
    this.form.reset();
    this.clearForm.emit();
  }
}
