import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { JobTypesService } from '../../services';
import { TypesGuardActions, TypesApiActions, TypeStagesGuardActions, TypeStagesApiActions } from '../actions';
import { TypeStagesService } from '../../services/type-stages.service';

@Injectable()
export class CuttingSheetsEffects {
  constructor(private actions$: Actions,
              private jobTypeService: JobTypesService,
              private typeStagesService: TypeStagesService) {}

  loadJobTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypesGuardActions.loadAll),
      switchMap((action) =>
        this.jobTypeService.getAll().pipe(
          map((types) => TypesApiActions.loadAllSuccess({ types: types })),
          catchError(() => of(TypesApiActions.loadAllFailure()))
        )
      )
    );
  });

  loadTypeStages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypeStagesGuardActions.loadAll),
      switchMap((action) =>
        this.typeStagesService.getAll().pipe(
          map((typeStages) => TypeStagesApiActions.loadAllSuccess({ typeStages: typeStages })),
          catchError(() => of(TypeStagesApiActions.loadAllFailure()))
        )
      )
    );
  });
}
