import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureName, CuttingSheersState } from '../reducers';
import { EntityLoadStatus } from '@core/models';

export const selectCuttingSheetsState = createFeatureSelector<CuttingSheersState>(featureName);

export const selectCuttingSheetsLoadStatus = createSelector(selectCuttingSheetsState, (state) => state.status);

export const selectIsLoading = createSelector(selectCuttingSheetsState, (state) => state.status === EntityLoadStatus.LOADING);
