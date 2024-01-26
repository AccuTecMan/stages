import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromBase from '@app/base/store';
import { Observable, map } from 'rxjs';
import { Customer } from '@app/base/models';

@Component({
  selector: 'app-customer-container',
  template: `
    <app-customer-component
      [IsLoading]="isLoading$ | async"
      [customers]="filteredCustomers$ | async"
      (changeSearchTerm)="onChangeSearchTerm($event)"
      (showInactive)="onShowInactive($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerContainer {
  public customers$ = this.store.select(fromBase.selectAllCustomers);
  public isLoading$ = this.store.select(fromBase.selectCustomersIsLoading);
  public filteredCustomers$: Observable<Customer[]>;

  private isInactiveDisplayed: boolean = true;
  private searchTerm: string = '';

  constructor(private store: Store) {
    this.filteredCustomers$ = this.getFilteredCustomers();
  }

  public onChangeSearchTerm(term: string) {
    this.searchTerm = term;
    this.searchCustomers();
  }

  public onShowInactive(showInactive: boolean) {
    this.isInactiveDisplayed = showInactive;
    this.searchCustomers();
  }

  searchCustomers(): void {
    const a = this.searchTerm.toLocaleLowerCase();
    if (a.length >= 0) {
      this.filteredCustomers$ = this.getFilteredCustomers().pipe(
        map((c: Customer[]) => c.filter((x: Customer) => x.name.toLocaleLowerCase().indexOf(a) > -1))
      );
    }
  }

  private getFilteredCustomers(): Observable<Customer[]> {
    return this.customers$.pipe(
      map((c: Customer[]) => {
        if (!this.isInactiveDisplayed) {
          return c.filter((x: Customer) => x.active === true);
        }
        return c;
      })
    );
  }
}
