import { TemplateRef } from '@angular/core';

export interface TableColumn {
  value: string;
  header: string;
  flexWidth: string;
  typeData: ColumnTypeData
  sticky?: boolean;
}

type ColumnTypeData =
  { type: ColumnType.Custom; customTemplate: TemplateRef<any>; }
  | { type: Exclude<ColumnType, ColumnType.Custom>; };

export enum ColumnType {
  Text = 'text',
  Custom = 'custom',
}
