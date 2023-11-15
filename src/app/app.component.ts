import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
  `]
})
export class AppComponent {
  constructor(private authService: AuthService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('recycle', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/recycling-icon.svg'));
  }

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
