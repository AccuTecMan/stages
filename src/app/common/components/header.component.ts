import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services';
import * as fromCore from '@core/store';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <button *ngIf="isAuth$ | async" mat-icon-button class="example-icon" type="button" (click)="onToggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>AccuTec</span>

      <span class="user" fxFlex fxLayout fxLayoutAlign="flex-end" fxLayoutGap=".8rem" [matMenuTriggerFor]="menu">
        <img alt="" [src]="photoURL$ | async" />
        <span fxShow fxHide.lt-sm class="displayName">{{ displayName$ | async }}</span>
      </span>

      <mat-menu #menu="matMenu" fxLayoutAlign="flex-end">
        <button type="button" mat-menu-item (click)="onLogout()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    `
      .mat-toolbar {
        padding: 0px;
      }

      .mat-mdc-icon-button {
        margin-top: 0.35rem;
        padding: 0px;
      }

      .logout {
        padding: 1rem;
      }

      .user {
        cursor: pointer;
      }

      .displayName {
        margin: 7px 1rem 0px 0px;
      }

      img {
        border-radius: 50%;
        width: 40px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  public isAuth$: Observable<boolean> = this.store.select(fromCore.selectIsAuth);
  public displayName$: Observable<string | null> = this.store.select(fromCore.selectDisplayName);
  public photoURL$: Observable<string | null> = this.store.select(fromCore.selectPhotoURL);

  constructor(private store: Store, private authService: AuthService) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    void this.authService.logout();
  }
}
