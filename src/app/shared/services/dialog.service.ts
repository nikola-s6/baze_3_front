import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);
  private next$ = new Subject<{ closed: boolean; data: any }>();
  private subscription: Subscription;

  openDialog(dialog: any, data?: any): Subject<{ closed: boolean; data: any }> {
    this.subscription?.unsubscribe();
    const dialogRef = this.dialog.open(dialog, { data });
    this.next$ = new Subject<{ closed: boolean; data: any }>();
    this.subscription = dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.next$.next(result);
        this.next$.complete();
        this.subscription.unsubscribe();
      },
      error: (err) => {
        this.next$.error(err);
        this.next$.complete();
        this.subscription.unsubscribe();
      },
    });
    return this.next$;
  }
}
