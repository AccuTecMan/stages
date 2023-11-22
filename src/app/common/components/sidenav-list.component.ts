import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services';
import * as fromCore from '@core/store';

@Component({
  selector: 'app-sidenav-list',
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/cuttingSheets" (click)="onClose()">
        <mat-icon>account_balance</mat-icon>
        <span class="list-title">Accutec Manufacturing</span>
      </a>

      <mat-divider></mat-divider>

      <a mat-list-item routerLink="/cuttingSheets" (click)="onClose()">
        <mat-icon>view_list</mat-icon>
        <span class="nav-caption">Cutting Sheets</span>
      </a>

      <a *ngIf="isAuth$ | async" mat-list-item routerLink="/customers" (click)="onClose()">
        <mat-icon>web</mat-icon>
        <span class="nav-caption">Customers</span>
      </a>

      <mat-divider></mat-divider>

      <a mat-list-item tabindex="0" routerLink="/login" (click)="onLogout()">
        <mat-icon>logout</mat-icon>
        <span class="nav-caption">Logout</span>
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
      .list-title {
        font-size: 1rem !important;
        font-weight: bold !important;
        margin-left: 0.5rem;
        margin-top: -1rem;
      }

      .mdc-list {
        margin-left: 0.6rem;
      }

      .mat-icon {
        /* padding-top: 0.5rem; */
      }

      .nav-caption {
        display: inline-block;
        padding-left: 10px;
      }

      .mat-divider {
        border-top-width: 2px;
        border-top-style: dashed;
      }

      .mat-mdc-list-item {
        font-size: 14px;
        padding: 0px;
      }

      .brand-icon {
        display: inline-block;
        fill: currentColor;
        height: 42px;
        width: 42px;
      }

      .displayed-name {
        padding-left: 58px;
        margin-top: -10px;
        margin-bottom: 10px;
        font-size: 0.8em;
        opacity: 0.5;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavListComponent {
  @Output() closeSidenav = new EventEmitter<void>();
  public isAuth$: Observable<boolean> = this.store.select(fromCore.selectIsAuth);
  public isAdmin$: Observable<boolean> = this.store.select(fromCore.selectIsAdmin);

  constructor(private authService: AuthService, private store: Store, private router: Router) {}

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    void this.authService.logout();
  }
}
