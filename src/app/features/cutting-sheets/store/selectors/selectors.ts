import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureName, CuttingSheetsState, cuttingSheetsAdapter } from '../reducers';
import { EntityLoadStatus } from '@core/models';

export const selectCuttingSheetsState = createFeatureSelector<CuttingSheetsState>(featureName);

export const selectCuttingSheetsLoadStatus = createSelector(selectCuttingSheetsState, (state) => state.loadStatus);

export const selectIsLoading = createSelector(selectCuttingSheetsState, (state) => state.loadStatus === EntityLoadStatus.LOADING);

export const selectSummaryState = createSelector(selectCuttingSheetsState, (state) => state.summary);
export const cuttingSheetsSelectors = cuttingSheetsAdapter.getSelectors(selectSummaryState);
export const selectAllCuttingSheets = createSelector(cuttingSheetsSelectors.selectAll, (cus) => cus);

export const selectSearchCriteria = createSelector(selectCuttingSheetsState, (state) => state.searchCriteria);

export const selectSelectedSheet = createSelector(selectCuttingSheetsState, (state) => state.selectedSheet);
