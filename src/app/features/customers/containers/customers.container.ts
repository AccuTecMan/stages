import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromBase from '@app/base/store';
import { Observable, map } from 'rxjs';
import { Customer } from '@app/base/models';

@Component({
  selector: 'app-customer-container',
  template: `
    @if (isLoading$ | async) {
      <mat-spinner fxLayoutAlign="center top" diameter="80" strokeWidth="5"></mat-spinner>
    } @else {
      <app-customer-component
        [customers]="filteredCustomers$ | async"
        (changeSearchTerm)="onChangeSearchTerm($event)"
        (showInactive)="onShowInactive($event)"
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
  public customers$ = this.store.select(fromBase.selectAllCustomers);
  public isLoading$ = this.store.select(fromBase.selectCustomersIsLoading);
  public filteredCustomers$: Observable<Customer[]>;
  private isInactiveDisplayed: boolean = false;
  private searchTerm: string = "";

  constructor(private store: Store) {
    this.filteredCustomers$ = this.customers$;
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
    if (a.length === 0) {
      this.filteredCustomers$ = this.customers$.pipe(
        map((c: any) => c.filter((x: any) => x.active == (this.isInactiveDisplayed ? x.active : true)))
      )
    } else {
      this.filteredCustomers$ = this.customers$.pipe(
        map((c: any) => c.filter((x:any) => x.name.toLocaleLowerCase().indexOf(a) > -1
                    && x.active == (this.isInactiveDisplayed ? x.active : true)))
      );
    }
  }


}
