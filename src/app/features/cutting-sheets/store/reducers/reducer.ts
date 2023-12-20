import { EntityLoadStatus, LoadStatus } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';

import { CuttingSheetsGuardActions, CuttingSheetsApiActions } from '..';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CuttingSheet } from '../../models';
import { SearchCriteria } from '../../models/search-criteria';
import { SearchCriteriaActions } from '../actions/cutting-sheets.actions';

export const featureName = 'cuttingSheets';

export interface CuttingSheetsState extends LoadStatus {
  searchCriteria?: SearchCriteria;
  summary: EntityState<CuttingSheet>;
}

const SummaryAdapterOptions = {
  selectId: (summary: CuttingSheet) => summary.id,
};

export const cuttingSheetsAdapter = createEntityAdapter<CuttingSheet>(SummaryAdapterOptions);

const initialState: CuttingSheetsState = {
  summary: cuttingSheetsAdapter.getInitialState(),
  searchCriteria: {
    customerId: undefined,
    readyByOption: 0
  },
  loadStatus: EntityLoadStatus.INITIAL
};

export const internalReducer = createReducer(
  initialState,
  on(
    CuttingSheetsGuardActions.loadAll,
    (state): CuttingSheetsState => ({
      ...state,
      loadStatus: EntityLoadStatus.LOADING,
    }),
  ),
  on(
    CuttingSheetsApiActions.loadAllSuccess,
    (state, { cuttingSheets }): CuttingSheetsState => ({
      ...state,
      loadStatus: EntityLoadStatus.SUCCESS,
      summary: cuttingSheetsAdapter.setAll(cuttingSheets, state.summary),
    })
  ),
  on(
    CuttingSheetsApiActions.loadAllFailure,
    (state): CuttingSheetsState => ({
      ...state,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  ),
  on(
    SearchCriteriaActions.set,
    (state, { searchCriteria }): CuttingSheetsState => ({
      ...state,
      searchCriteria,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  ),

);

export function reducer(state: CuttingSheetsState | undefined, action: Action) {
  // required that we export this in a higher order named function to support aot ... done separately to reduce nesting
  return internalReducer(state, action);
}
