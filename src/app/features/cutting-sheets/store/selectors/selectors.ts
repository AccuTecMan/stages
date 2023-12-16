import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureName, CuttingSheersState, cuttingSheetsAdapter } from '../reducers';
import { EntityLoadStatus } from '@core/models';

export const selectCuttingSheetsState = createFeatureSelector<CuttingSheersState>(featureName);

export const selectCuttingSheetsLoadStatus = createSelector(selectCuttingSheetsState, (state) => state.status);

export const selectIsLoading = createSelector(selectCuttingSheetsState, (state) => state.status === EntityLoadStatus.LOADING);

export const cuttingSheetsSelectors = cuttingSheetsAdapter.getSelectors(selectCuttingSheetsState);

export const selectAllCuttingSheets = createSelector(cuttingSheetsSelectors.selectAll, (cus) => cus);
