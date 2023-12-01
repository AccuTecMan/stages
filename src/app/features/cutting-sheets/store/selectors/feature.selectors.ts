import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CuttingSheetsState, featureName } from '../reducers';

export const selectCuttingSheetsState = createFeatureSelector<CuttingSheetsState>(featureName);
