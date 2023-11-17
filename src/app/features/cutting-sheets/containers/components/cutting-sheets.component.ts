import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cutting-sheets-component',
  template: `
    <header>
      <h1>Cutting Sheets</h1>
    </header>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuttingSheetsComponent {}
