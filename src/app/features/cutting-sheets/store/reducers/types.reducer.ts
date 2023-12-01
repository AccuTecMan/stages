import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Type } from '../../models';
import { TypesGuardActions, TypesApiActions } from '../actions';
import { EntityLoadStatus, LoadStatus } from '@core/models';

export interface TypeState extends LoadStatus {
  types: Type[] | undefined;
}

export const typesInitialState: TypeState = {
  status: EntityLoadStatus.INITIAL,
  types: undefined,

};

export const typesReducer = createReducer(
  typesInitialState,
  on(
    TypesGuardActions.loadAll,
    (state): TypeState => ({
      ...state,
      status: EntityLoadStatus.LOADING,
    }),
  ),
  on(
    TypesApiActions.loadAllSuccess,
    (state, { types }): TypeState => ({
      ...state,
      status: EntityLoadStatus.SUCCESS,
      types,
    })
  ),
  on(
    TypesApiActions.loadAllFailure,
    (state): TypeState => ({
      ...state,
      status: EntityLoadStatus.FAILURE,
    })
  )
);
