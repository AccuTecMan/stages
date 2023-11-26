import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Component({
  selector: 'app-customer-container',
  template: `
    @if (isLoading$ | async) {
      <mat-spinner fxLayoutAlign="center top" fxFill diameter="80" strokeWidth="5"></mat-spinner>
    } @else {
      <app-customer-component
        [customers]="customers$ | async"
      />
    }
  `,
  styles:[`
    mat-spinner {
      margin: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerContainer {
  public customers$ = this.store.select(fromStore.selectCus);
  public isLoading$ = this.store.select(fromStore.selectIsLoading);

  constructor(private store: Store){}

}
