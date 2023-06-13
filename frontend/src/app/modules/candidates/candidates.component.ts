import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnType, TableColumn, PageParams } from '../../shared/models';
import {
  Candidate,
  CandidateFilterParams,
  CandidateParams,
  CandidatesData,
  Contact,
  User
} from '../../core/models';
import { CandidatesService } from '../../core/services';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil, tap
} from 'rxjs';
import { EXPERIENCE_YEARS_MAP, ExperienceYears } from '../../core/constants';
import { DialogService } from '../../core/services/dialog.service';
import { AuthService } from '../auth/services/auth-service';
import { SkillsService } from '../../core/services/skills.service';

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

  public initialFilterData: CandidateFilterParams = {
    fullName: null,
    recruiterContact: null,
    skills: [],
    grade: null,
    experience: null,
  };

  public pagination$$ = new BehaviorSubject<PageParams>({ page: 1, limit: this.pageSize });

  public filterData$$ = new BehaviorSubject<CandidateFilterParams>(this.initialFilterData);

  public recruiterContacts$!: Observable<Contact[]>;

  public skills$!: Observable<string[]>;

  public loading = true;

  @ViewChild('contactsInfo', { static: true }) contactsInfoRef!: TemplateRef<any>;

  @ViewChild('list', { static: true }) listRef!: TemplateRef<any>;

  @ViewChild('dateMs', { static: true }) dateMsRef!: TemplateRef<any>;

  @ViewChild('experience', { static: true }) experienceRef!: TemplateRef<any>;

  @ViewChild('actions', { static: true }) actionsRef!: TemplateRef<any>;

  constructor(
    private candidatesService: CandidatesService,
    private dialogService: DialogService,
    private authService: AuthService,
    private skillsService: SkillsService,
  ) {}

  ngOnInit() {
    this.initColumns();
    this.skills$ = this.skillsService.getSkills();
    this.candidatesData$ = combineLatest([
      this.pagination$$
        .pipe(tap((pageData) => this.pageSize = pageData.limit)),
      this.filterData$$
    ])
      .pipe(
        tap(() => this.loading = true),
        takeUntil(this.destroy$),
        switchMap(([pageData, filterData]) => {
          const data = {
            ...pageData,
            ...filterData
          };
          return this.getCandidatesData(data)
        }),
        tap(() => this.loading = false)
      );

    this.recruiterContacts$ = this.authService.getUser().pipe(
      map((user: User) => user.contacts)
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
        flexWidth: '2',
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
        flexWidth: '3',
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

  public getCandidatesData(data: CandidateParams) {
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
        this.pagination$$.next({ page: 1, limit: this.pageSize });
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
