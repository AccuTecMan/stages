import { createReducer, on } from '@ngrx/store';

import { JobType } from '../../models';
import { TypesGuardActions, TypesApiActions } from '../actions';
import { EntityLoadStatus, LoadStatus } from '@core/models';

export interface TypeState extends LoadStatus {
  types: JobType[] | undefined;
}

export const typesInitialState: TypeState = {
  loadStatus: EntityLoadStatus.INITIAL,
  types: undefined,
};

export const typesReducer = createReducer(
  typesInitialState,
  on(
    TypesGuardActions.loadAll,
    (state): TypeState => ({
      ...state,
      loadStatus: EntityLoadStatus.LOADING,
    })
  ),
  on(
    TypesApiActions.loadAllSuccess,
    (state, { types }): TypeState => ({
      ...state,
      loadStatus: EntityLoadStatus.SUCCESS,
      types,
    })
  ),
  on(
    TypesApiActions.loadAllFailure,
    (state): TypeState => ({
      ...state,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  )
);
