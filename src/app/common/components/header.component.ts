import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services';
import * as fromCore from '@core/store';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" fxLayout="row" fxLayoutAlign="space-between center">
      <span>
        <button *ngIf="isAuth$ | async" mat-button class="example-icon"
              type="button" (click)="onToggleSidenav()">
          <mat-icon>menu</mat-icon>
          AccuTec
        </button>

      </span>

      <div fxLayout="row" fxShow="true">
        <button mat-button *ngIf="isAuth$ | async" (click)="onLogout()">
          <mat-icon>exit_to_app</mat-icon>
          Logout
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .example-icon {
        font-size: 1.5rem;
      }

      mat-toolbar {
        padding: 0px;
      }

      .logout {
        padding: 1rem;
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
