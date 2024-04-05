import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { CuttingSheetsService } from '../../services';
import { CuttingSheetsGuardActions, CuttingSheetsApiActions } from '../';
import { Store } from '@ngrx/store';
import * as fromStore from '../index';

@Injectable()
export class CuttingSheetsEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private service: CuttingSheetsService
  ) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CuttingSheetsGuardActions.loadAll),
      withLatestFrom(this.store.select(fromStore.selectSearchCriteria)),
      switchMap(([, criteria]) =>
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
      switchMap((cs) =>
        this.service.get(cs.cuttingSheetId).pipe(
          map((cuttingSheet) => {
            return CuttingSheetsApiActions.loadStagesSuccess({ cuttingSheet: cuttingSheet });
          }),
          catchError(() => of(CuttingSheetsApiActions.loadStagesFailure()))
        )
      )
    );
  });

  changeCuttingSheet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CuttingSheetsApiActions.changeCuttingSheet),
      switchMap((cs) =>
        this.service.upsert(cs.cuttingSheet, cs.cuttingSheet.id).pipe(
          map((cuttingSheet) => {
            return CuttingSheetsApiActions.changeCuttingSheetSuccess({ cuttingSheet: cuttingSheet });
          }),
          catchError(() => of(CuttingSheetsApiActions.changeCuttingSheetFailure()))
        )
      )
    );
  });
}
