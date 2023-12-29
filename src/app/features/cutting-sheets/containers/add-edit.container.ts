import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromBase from '@app/base/store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-cutting-sheets-add-edit-container',
  template: `
    <app-cutting-sheets-add-edit
      [selectedSheet]="selectedSheet$ | async"
      [customers]="customers$ | async"
      [jobTypes]="jobTypes$ | async"
      [isEditing]="isEditing$ | async"
      (save)="onSave($event)"
    />
  `,
  styles:[``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditContainer {
  public selectedSheet$ = this.store.select(fromStore.selectSelectedSheet);
  public customers$ = this.store.select(fromBase.selectCustomers);
  public jobTypes$ = this.store.select(fromBase.selectAllJobTypes);
  public isLoading$ = this.store.select(fromStore.selectIsLoading);
  public isEditing$ = this.route.params.pipe(map(x => x['id'] != null))

  constructor(private store: Store,
              private route: ActivatedRoute,) {}

  public onSave(event: any) {
    console.log(event);
  }

}
