import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cutting-sheets-stages-container',
  template: `
    <app-cutting-sheets-stages-component></app-cutting-sheets-stages-component>
  `,
  styles:[``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StagesContainer {
  constructor(private store: Store) { }
}
