import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { CustomerService } from '../../services';
import { CustomersGuardActions, CustomersApiActions } from '../actions';

@Injectable()
export class CustomersEffects {
  constructor(private actions$: Actions,
              private service: CustomerService) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersGuardActions.loadAll),
      switchMap((action) =>
        this.service.getAll().pipe(
          map((customers) => CustomersApiActions.loadAllSuccess({ customers: customers })),
          catchError(() => of(CustomersApiActions.loadAllFailure()))
        )
      )
    );
  });
}
