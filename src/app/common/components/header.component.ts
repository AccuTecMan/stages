import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services';
import * as fromCore from '@core/store';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" fxLayout="row" fxLayoutAlign="space-between center">
      @if (isAuth$ | async) {
        <span>
          <button *ngIf="isAuth$ | async" mat-button
                type="button" (click)="onToggleSidenav()">
            <mat-icon>menu</mat-icon>
            <span class="brand-title">AccuTec</span>
          </button>
        </span>
        <button class='logout' mat-button *ngIf="isAuth$ | async" (click)="onLogout()" >
          <mat-icon>exit_to_app</mat-icon>
          Logout
        </button>
      } @else {
        <span class="brand-title-no-auth">AccuTec</span>
      }
    </mat-toolbar>
  `,
  styles: [
    `
      .brand-title {
        font-size: 1.5rem;
      }

      .brand-title-no-auth {
        font-size: 1.5rem;
        margin-left: 1rem;
      }

      mat-toolbar {
        padding: 0px;
      }

      .logout {
        padding: 1rem;
        margin-right: .5rem;
      }

    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  public isAuth$: Observable<boolean> = this.store.select(fromCore.selectIsAuth);
  public displayName$: Observable<string | null> = this.store.select(fromCore.selectDisplayName);

  constructor(private store: Store, private authService: AuthService) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    void this.authService.logout();
  }
}
