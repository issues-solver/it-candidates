import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../shared/models';
import { Observable } from 'rxjs';
import { DialogComponent } from '../../shared/components';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private DEFAULT_DATA: DialogData = {
    message: '',
    title: '',
    showOkButton: true,
    showCancelButton: true,
  };

  constructor(private dialog: MatDialog) {}

  public openDialog(customData: DialogData): Observable<boolean> {
    const data = {
      ...this.DEFAULT_DATA,
      ...customData,
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data,
    });

    return dialogRef.afterClosed();
  }
}
