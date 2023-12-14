import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TypesGuardActions, TypesApiActions, StageTemplatesGuardActions, StageTemplatesApiActions } from '../../store/actions';
import { StageTemplatesService, JobTypesService } from '../../services';

@Injectable()
export class CuttingSheetsEffects {
  constructor(private actions$: Actions,
              private jobTypeService: JobTypesService,
              private stageTemplatesService: StageTemplatesService) {}

  loadJobTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypesGuardActions.loadAll),
      switchMap(() =>
        this.jobTypeService.getAll().pipe(
          map((types) => TypesApiActions.loadAllSuccess({ types: types })),
          catchError(() => of(TypesApiActions.loadAllFailure()))
        )
      )
    );
  });

  loadTypeStages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StageTemplatesGuardActions.loadAll),
      switchMap(() =>
        this.stageTemplatesService.getAll().pipe(
          map((stageTemplates) => StageTemplatesApiActions.loadAllSuccess({ stageTemplates: stageTemplates })),
          catchError(() => of(StageTemplatesApiActions.loadAllFailure()))
        )
      )
    );
  });
}
