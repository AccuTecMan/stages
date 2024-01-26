import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services';
import * as fromCore from '@core/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar [ngClass]="{ 'dev-background': isDev }" color="primary" fxLayout="row" fxLayoutAlign="space-between center">
      @if (isAuth$ | async) {
        <span>
          @if (isAuth$ | async) {
            <button mat-button type="button" (click)="onToggleSidenav()">
              <mat-icon>menu</mat-icon>
              <span class="brand-title">AccuTec</span>
            </button>
          }
        </span>
        @if (isAuth$ | async) {
          <button class="logout" mat-button (click)="onLogout()">
            <mat-icon>exit_to_app</mat-icon>
            Logout
          </button>
        }
      } @else {
        <span class="brand-title-no-auth">AccuTec</span>
      }
    </mat-toolbar>
  `,
  styles: [
    `
      .dev-background {
        background-color: #d2691e;
      }

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
        margin-right: 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
  public isAuth$: Observable<boolean> = this.store.select(fromCore.selectIsAuth);
  public displayName$: Observable<string | null> = this.store.select(fromCore.selectDisplayName);

  public isDev = !environment.production;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    void this.authService.logout();
  }
}
