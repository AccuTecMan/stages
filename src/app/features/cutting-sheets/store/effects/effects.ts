import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TypesService } from '../../services';
import { TypesGuardActions, TypesApiActions } from '../actions';

@Injectable()
export class CuttingSheetsEffects {
  constructor(private actions$: Actions,
              private service: TypesService) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypesGuardActions.loadAll),
      switchMap((action) =>
        this.service.getAll().pipe(
          map((types) => TypesApiActions.loadAllSuccess({ types: types })),
          catchError(() => of(TypesApiActions.loadAllFailure()))
        )
      )
    );
  });
}
