import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TypesGuardActions, TypesApiActions, StageTemplatesGuardActions, StageTemplatesApiActions, CustomersGuardActions, CustomersApiActions, StageGuardActions, StageApiActions } from '../../store/actions';
import { StageTemplatesService, JobTypesService } from '../../services';
import { CustomerService } from '@app/base/services/customer.service';

@Injectable()
export class CuttingSheetsEffects {
  constructor(private actions$: Actions,
              private jobTypeService: JobTypesService,
              private customersServices: CustomerService,
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

  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersGuardActions.loadAll),
      switchMap(() =>
        this.customersServices.getAll().pipe(
          map((customers) => CustomersApiActions.loadAllSuccess({ customers: customers })),
          catchError(() => of(CustomersApiActions.loadAllFailure()))
        )
      )
    );
  });

  loadStageMap$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StageGuardActions.loadAll),
      switchMap(() =>
        this.stageTemplatesService.getAllStages().pipe(
          map((stages) => StageApiActions.loadAllSuccess({ stagesMap: stages })),
          catchError(() => of(StageApiActions.loadAllFailure()))
        )
      )
    );
  });
}
