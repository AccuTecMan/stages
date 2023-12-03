import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@core/services';

import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <app-header [ngClass]="{ 'grit': isDev}" (sidenavToggle)="sidenav.toggle()"></app-header>
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation" [class.mat-elevation-z4]="true">
        <app-sidenav-list (closeSidenav)="sidenav.close()"></app-sidenav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .grit {
        -webkit-mask-image: url("../assets/grit.png");
        mask-image: url("../assets/grit.png");
      }

      mat-sidenav-container,
      mat-sidenav-content,
      mat-sidenav {
        height: 100%;
        background-color: #e8e8f7;
      }

      mat-sidenav {
        width: 250px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isDev = !environment.production;

  // [ngClass]="{ 'grit': isDev}"

  constructor(private authService: AuthService) {
    console.log('Dev?', this.isDev);
  }

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
