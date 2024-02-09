import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';
import { CuttingSheet } from '../models';
import { CuttingSheetsService } from '../services';

@Component({
  selector: 'app-cutting-sheets-stages-container',
  template: `
    <app-cutting-sheets-stages-component [selectedSheet]="selectedCuttingSheet$ | async"
      (changeStage)="onChangeStage($event)"
      (changePreviousStage)="onChangePreviousStage($event)"
    />
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

  public onChangePreviousStage(ids: string) {
    const cuttingSheetId = ids.substring(0, ids.indexOf('|'));
    const stageId = ids.substring(ids.indexOf('|')+1);
    this.service.updateStageDate(cuttingSheetId, stageId);
  }
}
