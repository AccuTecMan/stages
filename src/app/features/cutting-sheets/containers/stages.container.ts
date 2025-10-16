import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { CuttingSheet } from '../models';
import { CuttingSheetsService } from '../services';
import { AsyncPipe } from '@angular/common';
import { CuttingSheetsStagesComponent } from './components/cutting-sheets-stages.component';

@Component({
    selector: 'app-cutting-sheets-stages-container',
    template: `
    <app-cutting-sheets-stages-component
      [selectedSheet]="selectedCuttingSheet$ | async"
      [selectedSheetStages]="selectedCuttingSheetStages$ | async"
      (changeStage)="onChangeStage($event)"
    />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CuttingSheetsStagesComponent, AsyncPipe]
})
export class StagesContainer {
  public selectedCuttingSheet$ = this.store.select(fromStore.selectSelectedSheet);
  public selectedCuttingSheetStages$ = this.store.select(fromStore.selectSelectedSheetStages);

  constructor(
    private service: CuttingSheetsService,
    private store: Store
  ) {}

  public onChangeStage(cuttingSheet: CuttingSheet | null) {
    this.store.dispatch(fromStore.CuttingSheetsApiActions.changeCuttingSheet({ cuttingSheet: cuttingSheet! }));
  }
}
