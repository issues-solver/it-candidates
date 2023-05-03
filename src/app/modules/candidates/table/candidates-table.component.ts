import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface Candidate {
  name: string;
}

@Component({
  selector: 'app-candidates-table',
  templateUrl: './candidates-table.component.html',
  styleUrls: ['./candidates-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesTableComponent {

public candidates: Candidate[] = [
    { name: 'Hydrogen' },
    { name: 'Helium' },
    { name: 'Lithium' },
    { name: 'Beryllium' },
    { name: 'Boron' },
    { name: 'Carbon' },
    { name: 'Nitrogen' },
    { name: 'Oxygen' },
    { name: 'Fluorine' },
    { name: 'Neon' },
  ];

  columns = [
    {
      columnDef: 'name',
      header: 'Name',
    },
  ];
  dataSource = this.candidates;
  displayedColumns = this.columns.map(c => c.columnDef);
}
