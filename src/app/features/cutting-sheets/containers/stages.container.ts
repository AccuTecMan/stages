import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { CuttingSheet } from '../models';
import { CuttingSheetsService } from '../services';

@Component({
  selector: 'app-cutting-sheets-stages-container',
  template: `
    <app-cutting-sheets-stages-component [selectedSheet]="selectedCuttingSheet$ | async" (changeStage)="onChangeStage($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StagesContainer {
  public selectedCuttingSheet$ = this.store.select(fromStore.selectSelectedSheet);

  constructor(
    private service: CuttingSheetsService,
    private store: Store
  ) {}

  public onChangeStage(cuttingSheet: CuttingSheet | null) {
    this.service.upsert(cuttingSheet!, cuttingSheet?.id);
    this.store.dispatch(fromStore.CuttingSheetsApiActions.changeStage({ cuttingSheet: cuttingSheet! }));
  }
}
