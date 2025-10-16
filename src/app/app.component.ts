import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { HeaderComponent } from './common/components/header.component';
import { SidenavListComponent } from './common/components/sidenav-list.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
    <app-header (sidenavToggle)="sidenav.toggle()"></app-header>
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
    imports: [
        RouterModule,
        HeaderComponent,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        SidenavListComponent
    ]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
