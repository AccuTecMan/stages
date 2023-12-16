import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { CuttingSheet } from '../models';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-cutting-sheets-container',
  template: `
    @if (isLoading$ | async) {
      <mat-spinner fxLayoutAlign="center top" fxFill diameter="80" strokeWidth="5"></mat-spinner>
    } @else {
      <app-cutting-sheets-component
        [cuttingSheets]="filteredCuttingSheets$ | async"
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
export class CuttingSheetsContainer {
  public cuttingSheets$ = this.store.select(fromStore.selectAllCuttingSheets);
  public isLoading$ = this.store.select(fromStore.selectIsLoading);

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
        map(c => c.filter(x => x.jobName.toLocaleLowerCase().indexOf(a) > -1))
      );
    }
  }
}
