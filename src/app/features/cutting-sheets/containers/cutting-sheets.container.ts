import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cutting-sheets-container',
  template: ` <app-cutting-sheets-component></app-cutting-sheets-component> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuttingSheetsContainer {}
