import { createFeatureSelector, createSelector } from '@ngrx/store';

import { cuttingSheetsFeatureName, CuttingSheetsState, cuttingSheetsAdapter } from '../reducers';
import { EntityLoadStatus } from '@core/models';

export const selectCuttingSheetsState = createFeatureSelector<CuttingSheetsState>(cuttingSheetsFeatureName);

export const selectCuttingSheetsLoadStatus = createSelector(selectCuttingSheetsState, (state) => state.loadStatus);

export const selectIsLoading = createSelector(selectCuttingSheetsState, (state) => state.loadStatus === EntityLoadStatus.LOADING);

export const selectSummaryState = createSelector(selectCuttingSheetsState, (state) => state.summary);
export const cuttingSheetsSelectors = cuttingSheetsAdapter.getSelectors(selectSummaryState);
export const selectAllCuttingSheets = createSelector(cuttingSheetsSelectors.selectAll, (cus) => cus);

export const selectSearchCriteria = createSelector(selectCuttingSheetsState, (state) => state.searchCriteria);

export const selectSelectedSheet = createSelector(selectCuttingSheetsState, (state) => state.selectedSheet);
export const selectSelectedSheetStages = createSelector(selectCuttingSheetsState, (state) => {
  return state.selectedSheet?.stages.slice().sort((a, b) => (a.order < b.order ? -1 : 1)) || [];
});
