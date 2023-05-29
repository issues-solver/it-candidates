import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnType, TableColumn } from '../../shared/models';
import { Candidate, CandidatesData } from '../../core/models';
import { CandidatesService } from '../../core/services';
import { Observable, tap } from 'rxjs';
import { EXPERIENCE_YEARS_MAP, ExperienceYears } from '../../core/constants';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent implements OnInit {
  public columns: TableColumn[] = [];

  public candidatesData$!: Observable<CandidatesData>;

  @ViewChild('contactsInfo', { static: true }) contactsInfoRef!: TemplateRef<any>;

  @ViewChild('list', { static: true }) listRef!: TemplateRef<any>;

  @ViewChild('dateMs', { static: true }) dateMsRef!: TemplateRef<any>;

  @ViewChild('experience', { static: true }) experienceRef!: TemplateRef<any>;

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit() {
    this.initColumns();
    this.candidatesData$ = this.getCandidatesData();
  }

  private initColumns(): void {
    this.columns = [
      {
        value: 'fullName',
        header: 'Full Name',
        typeData: {
          type: ColumnType.Text,
        },
        flexWidth: '2',
      },
      {
        value: 'contacts',
        header: 'Contacts',
        typeData: {
          type: ColumnType.Custom,
          customTemplate: this.contactsInfoRef,
        },
        flexWidth: '4',
      },
      {
        value: 'recruiterContact',
        header: 'Recruiter Contact',
        typeData: {
          type: ColumnType.Text,
        },
        flexWidth: '2',
      },
      {
        value: 'skills',
        header: 'Skills',
        typeData: {
          type: ColumnType.Custom,
          customTemplate: this.listRef,
        },
        flexWidth: '4',
      },
      {
        value: 'lastContactDateMs',
        header: 'Last Contact Date',
        typeData: {
          type: ColumnType.Custom,
          customTemplate: this.dateMsRef,
        },
        flexWidth: '2',
      },
      {
        value: 'grade',
        header: 'Grade',
        typeData: {
          type: ColumnType.Text,
        },
        flexWidth: '2',
      },
      {
        value: 'experience',
        header: 'Experience',
        typeData: {
          type: ColumnType.Custom,
          customTemplate: this.experienceRef,
        },
        flexWidth: '2',
      },
    ];
  }

  private getCandidatesData() {
    // arguments will be provided in future
    return this.candidatesService.getCandidates()
      .pipe(tap((res) => console.log(res)));
  }

  public getCandidateContacts(contacts: Candidate['contacts']): { type: string, value: string }[] {
    return contacts;
  }

  public getExperienceValue(value: ExperienceYears): string {
    return EXPERIENCE_YEARS_MAP[value];
  }
}
