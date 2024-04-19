import { EntityLoadStatus, LoadStatus } from '@core/models';
import { createReducer, on } from '@ngrx/store';

import { CuttingSheetsGuardActions, CuttingSheetsApiActions } from '..';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CuttingSheet, Stage } from '../../models';
import { SearchCriteria } from '../../models/search-criteria';
import { SearchCriteriaActions } from '../actions/cutting-sheets.actions';

export const cuttingSheetsFeatureName = 'cuttingSheets';

export interface SummaryState extends EntityState<CuttingSheet> {}
export const cuttingSheetsAdapter = createEntityAdapter<CuttingSheet>({
  selectId: (sheet: CuttingSheet) => sheet.id,
});

export interface CuttingSheetsState extends LoadStatus {
  searchCriteria?: SearchCriteria;
  summary: SummaryState;
  stages?: Stage[];
  selectedSheet: CuttingSheet | undefined;
}

const initialState: CuttingSheetsState = {
  summary: { ...cuttingSheetsAdapter.getInitialState() },
  searchCriteria: {
    customerId: undefined,
    readyByOption: 0,
    showInactive: false
  },
  stages: undefined,
  selectedSheet: undefined,
  loadStatus: EntityLoadStatus.INITIAL,
};

export const cuttingSheetsReducer = createReducer(
  initialState,
  on(
    CuttingSheetsGuardActions.loadAll,
    (state): CuttingSheetsState => ({
      ...state,
      loadStatus: EntityLoadStatus.LOADING,
    })
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
  on(
    CuttingSheetsGuardActions.loadStages,
    (state): CuttingSheetsState => ({
      ...state,
      selectedSheet: undefined,
      loadStatus: EntityLoadStatus.LOADING,
    })
  ),
  on(
    CuttingSheetsApiActions.loadStagesSuccess,
    (state, { cuttingSheet }): CuttingSheetsState => ({
      ...state,
      selectedSheet: cuttingSheet,
      loadStatus: EntityLoadStatus.SUCCESS,
    })
  ),
  on(
    CuttingSheetsApiActions.loadStagesFailure,
    (state): CuttingSheetsState => ({
      ...state,
      selectedSheet: undefined,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  ),
  on(
    CuttingSheetsApiActions.changeCuttingSheetSuccess,
    (state, { cuttingSheet }): CuttingSheetsState => ({
      ...state,
      selectedSheet: cuttingSheet,
      summary: cuttingSheetsAdapter.updateOne({ id: cuttingSheet.id, changes: cuttingSheet }, state.summary),
      loadStatus: EntityLoadStatus.SUCCESS,
    })
  ),
  on(
    CuttingSheetsApiActions.changeCuttingSheetFailure,
    (state): CuttingSheetsState => ({
      ...state,
      selectedSheet: undefined,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  )
);
