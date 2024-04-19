import { createReducer, on } from '@ngrx/store';

import { AuthenticationActions } from './';
import { EntityLoadStatus } from '../models';

export const coreFeatureName = 'core';

export interface CoreState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  displayName: string | null;
  status: EntityLoadStatus;
}

const initialState: CoreState = {
  isAuthenticated: false,
  isAdmin: false,
  displayName: null,
  status: EntityLoadStatus.INITIAL,
};

export const coreReducer = createReducer(
  initialState,
  on(
    AuthenticationActions.setAuthenticated,
    (state, { isAdmin, displayName }): CoreState => ({
      ...state,
      isAuthenticated: true,
      isAdmin: isAdmin,
      displayName: displayName,
      status: EntityLoadStatus.SUCCESS,
    })
  ),

  on(
    AuthenticationActions.setUnauthenticated,
    (state): CoreState => ({
      ...state,
      isAuthenticated: false,
      isAdmin: false,
      displayName: '',
      status: EntityLoadStatus.SUCCESS,
    })
  )
);
