import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>Main page</p>
    <p>{{ title }}</p>
  `,
  styles: [`
  `]
})
export class AppComponent {
  title = 'stages';
}
