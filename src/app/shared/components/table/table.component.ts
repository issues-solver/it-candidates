import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnType, TableColumn } from '../../models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public cellTemplates!: Record<Exclude<ColumnType, ColumnType.Custom>, TemplateRef<any>>;
  public columnType = ColumnType;
  public displayedColumns: any[] = [];

  @Input() columns: TableColumn[] = [];

  @Input() dataSource: any[] = [];

  @ViewChild('text', { static: true }) text!: TemplateRef<unknown>;

  ngOnInit() {
    this.initData();
    this.displayedColumns = this.columns.map(c => c.value);

  }

  private initData(): void {
    this.cellTemplates = {
      [ColumnType.Text]: this.text,
    };
  }
}
