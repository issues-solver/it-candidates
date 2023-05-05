import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnType, TableColumn } from '../../shared/models';
import { Candidate, CandidatesData } from '../../core/models';
import { ContactType } from '../../core/constants';
import { CandidatesService } from '../../core/services';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent implements OnInit {
  public columns: TableColumn[] = [];

  public candidatesData$!: Observable<CandidatesData>;

  public candidates: Candidate[] = [
    {
      id: '0',
      name: 'Hydrogen',
      contacts: {
        linkedin: 'test',
        email: 'tut@asd.by',
        other: 'telephone number: 572 072 053'
      }
    },
    {
      id: '1',
      name: 'Helium',
      contacts: {
        linkedin: 'test',
        telegram: '@mick_betch'
      }
    },
    {
      id: '2',
      name: 'Lithium',
      contacts: {
        linkedin: 'test'
      }
    },
    {
      id: '3',
      name: 'Beryllium',
      contacts: {
        linkedin: 'test'
      }
    },
    {
      id: '4',
      name: 'Boron',
      contacts: {
        linkedin: 'test'
      }
    },
    {
      id: '5',
      name: 'Carbon',
      contacts: {
        linkedin: 'test'
      }
    },
    {
      id: '6',
      name: 'Nitrogen',
      contacts: {
        linkedin: 'test'
      }
    },
    {
      id: '7',
      name: 'Oxygen',
      contacts: {
        linkedin: 'test'
      }
    },
    {
      id: '8',
      name: 'Fluorine',
      contacts: {
        linkedin: 'test'
      }
    },
    {
      id: '9',
      name: 'Neon',
      contacts: {
        linkedin: 'test'
      }
    },
  ];

  @ViewChild('contactsInfo', { static: true }) contactsInfoTemplate!: TemplateRef<any>;

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit() {
    this.initColumns();
    this.candidatesData$ = this.getCandidatesData();
  }

  private initColumns(): void {
    this.columns = [
      {
        value: 'id',
        header: 'ID',
        typeData: {
          type: ColumnType.Text,
        },
        flexWidth: '2',
      },
      {
        value: 'name',
        header: 'Name',
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
          customTemplate: this.contactsInfoTemplate,
        },
        flexWidth: '4',
      },
    ];
  }

  private getCandidatesData() {
    // arguments will be provided in future
    return this.candidatesService.getCandidates()
      .pipe(tap((res) => console.log(res)));
  }

  public getCandidateContacts(data: Candidate['contacts']): { type: string, value: string }[] {
    return Object.keys(data).reduce<{ type: string, value: string }[]>((acc, type ) => {
      acc.push({ type, value: data[type as ContactType] as string });
      return acc;
    }, []);
  }
}
