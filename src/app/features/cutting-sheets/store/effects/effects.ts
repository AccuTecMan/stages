import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { CuttingSheetsService } from '../../services';
import { CuttingSheetsGuardActions, CuttingSheetsApiActions } from '../';

@Injectable()
export class CuttingSheetsEffects {
  constructor(private actions$: Actions,
              private service: CuttingSheetsService) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CuttingSheetsGuardActions.loadAll),
      switchMap(_ =>
        this.service.getAll().pipe(
          map((cuttingSheets) => CuttingSheetsApiActions.loadAllSuccess({ cuttingSheets: cuttingSheets })),
          catchError(() => of(CuttingSheetsApiActions.loadAllFailure()))
        )
      )
    );
  });
}
