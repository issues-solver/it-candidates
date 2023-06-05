import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnType, TableColumn, TableLoadData } from '../../shared/models';
import { Candidate, CandidatesData } from '../../core/models';
import { CandidatesService } from '../../core/services';
import { BehaviorSubject, EMPTY, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { EXPERIENCE_YEARS_MAP, ExperienceYears } from '../../core/constants';
import { DialogService } from '../../core/services/dialog.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public columns: TableColumn[] = [];

  public candidatesData$!: Observable<CandidatesData>;

  public pageSizeOptions = [10, 20, 50];

  public pageSize = 10;

  public candidates$$ = new BehaviorSubject<TableLoadData>({ page: 1, limit: this.pageSize });

  @ViewChild('contactsInfo', { static: true }) contactsInfoRef!: TemplateRef<any>;

  @ViewChild('list', { static: true }) listRef!: TemplateRef<any>;

  @ViewChild('dateMs', { static: true }) dateMsRef!: TemplateRef<any>;

  @ViewChild('experience', { static: true }) experienceRef!: TemplateRef<any>;

  @ViewChild('actions', { static: true }) actionsRef!: TemplateRef<any>;

  constructor(
    private candidatesService: CandidatesService,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.initColumns();

    this.candidatesData$ = this.candidates$$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((data) => {
          this.pageSize = data.limit;
          return this.getCandidatesData(data)
        })
      );
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
      {
        value: 'actions',
        header: 'Actions',
        typeData: {
          type: ColumnType.Custom,
          customTemplate: this.actionsRef,
        },
        flexWidth: '2',
      }
    ];
  }

  public getCandidatesData(data: TableLoadData) {
    return this.candidatesService.getCandidates(data);
  }

  public getCandidateContacts(contacts: Candidate['contacts']): { type: string, value: string }[] {
    return contacts;
  }

  public getExperienceValue(value: ExperienceYears): string {
    return EXPERIENCE_YEARS_MAP[value];
  }

  public onCandidateRemove(candidate: Candidate) {
    this.dialogService.openDialog({
      message: `Are you sure you want to delete ${candidate.fullName}? This action cannot be undone.`
    }).pipe(
      switchMap((res) => {
        if (!res) {
          return EMPTY;
        }
        return this.candidatesService.deleteCandidate(candidate._id);
      }),
      switchMap(() => {
        this.candidates$$.next({ page: 1, limit: this.pageSize });
        return this.dialogService.openDialog({
          message: 'Candidate deleted successfully!',
          showCancelButton: false,
        });
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
