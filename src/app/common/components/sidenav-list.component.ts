import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services';
import * as fromCore from '@core/store';
import { AsyncPipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatNavList, MatListItem } from '@angular/material/list';

@Component({
    selector: 'app-sidenav-list',
    template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/cuttingSheets" (click)="onClose()">
        <mat-icon>flip</mat-icon>
        <span class="list-title">Accutec Manufacturing</span>
      </a>
      <mat-divider></mat-divider>
      <a mat-list-item routerLink="/cuttingSheets" (click)="onClose()">
        <mat-icon>view_list</mat-icon>
        <span class="nav-caption">Cutting Sheets</span>
      </a>
      @if (isAuth$ | async) {
        <a mat-list-item routerLink="/customers" (click)="onClose()">
          <mat-icon>web</mat-icon>
          <span class="nav-caption">Customers</span>
        </a>
      }
      <mat-divider></mat-divider>
      <a mat-list-item routerLink="/login" (click)="onLogout()">
        <mat-icon>logout</mat-icon>
        <span class="nav-caption">Logout</span>
      </a>
    </mat-nav-list>
  `,
    styles: [
        `
      .list-title {
        font-size: 1.1rem;
        font-weight: bold !important;
        margin-left: 0.5rem;
      }

      .nav-caption {
        padding-left: 0.5rem;
      }

      mat-divider {
        border-top-width: 2px;
        border-top-style: dashed;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatNavList,
        MatListItem,
        RouterLink,
        MatIcon,
        MatDivider,
        AsyncPipe,
    ],
})
export class SidenavListComponent {
  @Output() closeSidenav = new EventEmitter<void>();
  public isAuth$: Observable<boolean> = this.store.select(fromCore.selectIsAuth);
  public isAdmin$: Observable<boolean> = this.store.select(fromCore.selectIsAdmin);

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    void this.authService.logout();
  }
}
