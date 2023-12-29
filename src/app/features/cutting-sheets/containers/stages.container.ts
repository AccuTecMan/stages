import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Component({
  selector: 'app-cutting-sheets-stages-container',
  template: `
    <app-cutting-sheets-stages-component
      [selectedSheet]="selectedCuttingSheet$ | async"
    />
  `,
  styles:[``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StagesContainer {
  public selectedCuttingSheet$ = this.store.select(fromStore.selectSelectedSheet);

  constructor(private store: Store) { }
}
