import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromBase from '@app/base/store';
import { CuttingSheet, SearchCriteria } from '../models';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-cutting-sheets-add-edit-container',
  template: `
    <app-cutting-sheets-add-edit
      [customers]="customers$ | async"
      (save)="onSave($event)"
    />
  `,
  styles:[``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditContainer {
  public cuttingSheets$ = this.store.select(fromStore.selectAllCuttingSheets);
  public customers$ = this.store.select(fromBase.selectCustomers);
  public jobTypes$ = this.store.select(fromBase.selectAllJobTypes);
  public isLoading$ = this.store.select(fromStore.selectIsLoading);
  public searchCriteria$ = this.store.select(fromStore.selectSearchCriteria);

  public filteredCuttingSheets$: Observable<CuttingSheet[]>;

  constructor(private store: Store) {
    this.filteredCuttingSheets$ = this.cuttingSheets$;
  }

  public onChangeSearchTerm(term: string) {
    const a = term.toLocaleLowerCase();
    if (a.length === 0) {
      this.filteredCuttingSheets$ = this.cuttingSheets$;
    } else {
      this.filteredCuttingSheets$= this.cuttingSheets$.pipe(
        map(c => c.filter(x => (x.jobName + x.poNumber).toLocaleLowerCase().indexOf(a) > -1))
      );
    }
  }

  public onChangeSearchCriteria(criteria: SearchCriteria) {
    this.store.dispatch(fromStore.SearchCriteriaActions.set({ searchCriteria: criteria }))
    this.store.dispatch(fromStore.CuttingSheetsGuardActions.loadAll());
  }

  public onSave(event: any) {
    console.log(event);
  }
}
