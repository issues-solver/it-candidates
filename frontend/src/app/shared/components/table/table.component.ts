import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ColumnType, TableColumn, TableData, PageParams } from '../../models';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public cellTemplates!: Record<Exclude<ColumnType, ColumnType.Custom>, TemplateRef<any>>;
  public columnType = ColumnType;
  public displayedColumns: any[] = [];
  public data: any[] = [];
  public totalItems!: number;

  @Input() columns: TableColumn[] = [];

  @Input() set dataSource(value: TableData<unknown> | null) {
    if (value) {
      const { data, totalItems } = value;
      this.data = data;
      this.totalItems = totalItems;
    }
  };

  @Input() totalElements = 0;

  @Input() pageSizeOptions: number[] = [];

  @Input() pageSize = 0;

  @Output() loadData = new EventEmitter<PageParams>();

  @ViewChild('text', { static: true }) text!: TemplateRef<unknown>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.initData();
    this.displayedColumns = this.columns.map(c => c.value);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.pageSize = this.paginator.pageSize;
        this.loadData.emit({ page: this.paginator.pageIndex + 1, limit: this.pageSize });
      });
  }

  private initData(): void {
    this.cellTemplates = {
      [ColumnType.Text]: this.text,
    };
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
