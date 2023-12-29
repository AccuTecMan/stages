import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromBase from '@app/base/store';
import { CuttingSheet, SearchCriteria } from '../models';
import { Observable, filter, find, map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cutting-sheets-add-edit-container',
  template: `
    <app-cutting-sheets-add-edit
      [customers]="customers$ | async"
      [cuttingSheets]="cuttingSheets$ | async"
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
  public cuttingSheetId: string;
  public isEditing: boolean;
  public cuttingSheet$: Observable<CuttingSheet | undefined>;

  constructor(private store: Store) {
    this.filteredCuttingSheets$ = this.cuttingSheets$;
  }

  // ngOnInit() {
  //   // this.route.params.subscribe(params => {
  //   //     this.cuttingSheetId = params['id']!;
  //   //     this.isEditing = this.cuttingSheetId?.length > 0;

  //   //     console.log('this.isEditing', this.isEditing)

  //   //     if (this.isEditing) {
  //   //       this.cuttingSheet$ = this.cuttingSheets$.pipe(
  //   //         find((x: any) => x.id === this.cuttingSheetId)
  //   //       );

  //   //       this.cuttingSheet$.subscribe(x => console.log('pues', x));
  //   //     }

  //   //     // if (this.isEditing) {
  //   //     //   this.service.get(this.cuttingSheetId).subscribe((x: any) => {
  //   //     //     this.form.controls['name'].setValue(x.jobName);
  //   //     //   });
  //   //     // }
  //   // });
  // }

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
