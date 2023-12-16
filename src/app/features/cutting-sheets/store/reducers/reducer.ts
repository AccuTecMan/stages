import { EntityLoadStatus, LoadStatus } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';

import { CuttingSheetsGuardActions, CuttingSheetsApiActions } from '..';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CuttingSheet } from '../../models';

export const featureName = 'cuttingSheets';

export interface CuttingSheersState extends EntityState<CuttingSheet>, LoadStatus {}

export const cuttingSheetsAdapter = createEntityAdapter<CuttingSheet>({
  selectId: c => c.id
});

const initialState: CuttingSheersState = {
  ...cuttingSheetsAdapter.getInitialState(),
  status: EntityLoadStatus.INITIAL
};

export const internalReducer = createReducer(
  initialState,
  on(
    CuttingSheetsGuardActions.loadAll,
    (state): CuttingSheersState => ({
      ...state,
      status: EntityLoadStatus.LOADING,
    }),
  ),
  on(
    CuttingSheetsApiActions.loadAllSuccess,
    (state, { cuttingSheets }): CuttingSheersState =>
    cuttingSheetsAdapter.setAll(cuttingSheets, { ...state, status: EntityLoadStatus.SUCCESS })
  ),
  on(
    CuttingSheetsApiActions.loadAllFailure,
    (state): CuttingSheersState => ({
      ...state,
      status: EntityLoadStatus.FAILURE,
    })
  ),

);

export function reducer(state: CuttingSheersState | undefined, action: Action) {
  // required that we export this in a higher order named function to support aot ... done separately to reduce nesting
  return internalReducer(state, action);
}
