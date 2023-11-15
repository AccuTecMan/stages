import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoreState } from './reducer';

export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectIsAuth = createSelector(selectCoreState, (state: CoreState) => state.isAuthenticated);

export const selectIsAdmin = createSelector(selectCoreState, (state: CoreState) => state.isAdmin);

export const selectDisplayName = createSelector(selectCoreState, (state: CoreState) => state.displayName);

export const selectPhotoURL = createSelector(selectCoreState, (state: CoreState) => state.photoURL);
