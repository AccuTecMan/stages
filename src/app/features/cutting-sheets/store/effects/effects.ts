import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { CuttingSheetsService } from '../../services';
import { CuttingSheetsGuardActions, CuttingSheetsApiActions } from '../';
import { Store } from '@ngrx/store';
import * as fromStore from '../index';

@Injectable()
export class CuttingSheetsEffects {
  constructor(private actions$: Actions,
              private store: Store,
              private service: CuttingSheetsService) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CuttingSheetsGuardActions.loadAll),
      withLatestFrom(this.store.select(fromStore.selectSearchCriteria)),
      switchMap(([action, criteria]) =>
        this.service.getWithCriteria(criteria).pipe(
          map((cuttingSheets) => CuttingSheetsApiActions.loadAllSuccess({ cuttingSheets: cuttingSheets })),
          catchError(() => of(CuttingSheetsApiActions.loadAllFailure()))
        )
      )
    );
  });

  loadStages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CuttingSheetsGuardActions.loadStages),
      switchMap((action) => this.service.get(action.cuttingSheetId)),
      switchMap((cuttingSheet) =>
        this.service.getStages(cuttingSheet.id).pipe(
          map((stages) => {
            const newSheet = { ...cuttingSheet, stages: stages};
            return CuttingSheetsApiActions.loadStagesSuccess({ cuttingSheet: newSheet })
          }),
          catchError(() => of(CuttingSheetsApiActions.loadStagesFailure()))
        )
      )
    );
  });
}
