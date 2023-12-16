import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { Observable, map } from 'rxjs';
import { Customer } from '../models';

@Component({
  selector: 'app-customer-container',
  template: `
    @if (isLoading$ | async) {
      <mat-spinner fxLayoutAlign="center top" fxFill diameter="80" strokeWidth="5"></mat-spinner>
    } @else {
      <app-customer-component
        [customers]="filteredCustomers$ | async"
        (changeSearchTerm)="onChangeSearchTerm($event)"
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
  public customers$ = this.store.select(fromStore.selectCustomers);
  public isLoading$ = this.store.select(fromStore.selectIsLoading);

  public filteredCustomers$: Observable<Customer[]>;

  constructor(private store: Store) {
    this.filteredCustomers$ = this.customers$;
  }

  public onChangeSearchTerm(term: string) {
    const a = term.toLocaleLowerCase();
    if (a.length === 0) {
      this.filteredCustomers$ = this.customers$;
    } else {
      this.filteredCustomers$= this.customers$.pipe(
        map(c => c.filter(x => x.name.toLocaleLowerCase().indexOf(a) > -1))
      );
    }
  }

}
