import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromBase from '@app/base/store';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CuttingSheetsService } from '../services';
import { CuttingSheet } from '../models';

@Component({
  selector: 'app-cutting-sheets-add-edit-container',
  template: `
    <app-cutting-sheets-add-edit
      [selectedSheet]="selectedSheet$ | async"
      [customers]="customers$ | async"
      [jobTypes]="jobTypes$ | async"
      [templates]="jobTypesTemplate$ | async"
      [isEditing]="isEditing$ | async"
      (onSave)="onSave($event)"
    />
  `,
  styles:[``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditContainer {
  public selectedSheet$ = this.store.select(fromStore.selectSelectedSheet);
  public customers$ = this.store.select(fromBase.selectCustomers);
  public jobTypes$ = this.store.select(fromBase.selectAllJobTypes);
  public jobTypesTemplate$ = this.store.select(fromBase.selectAllTemplates);
  public isLoading$ = this.store.select(fromStore.selectIsLoading);
  public isEditing$ = this.route.params.pipe(map(x => x['id'] != null))

  constructor(private store: Store,
              private service: CuttingSheetsService,
              private router: Router,
              private route: ActivatedRoute,) {}

  public onSave(cuttingSheet: CuttingSheet) {
    this.route.params.subscribe(params => {
      this.service.upsert(cuttingSheet, params['id'])
      this.router.navigate(['/cuttingSheets']);
    })
  }

}
