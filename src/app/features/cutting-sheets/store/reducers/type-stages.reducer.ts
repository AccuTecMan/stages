import { createReducer, on } from '@ngrx/store';

import { TypeStagesGuardActions, TypeStagesApiActions } from '../actions';
import { EntityLoadStatus, LoadStatus } from '@core/models';
import { TypeStage } from '../../models/type-stage';

export interface TypeStagesState extends LoadStatus {
  typeStages: TypeStage[] | undefined;
}

export const typeStagesInitialState: TypeStagesState = {
  status: EntityLoadStatus.INITIAL,
  typeStages: undefined,
};

export const typeStagesReducer = createReducer(
  typeStagesInitialState,
  on(
    TypeStagesGuardActions.loadAll,
    (state): TypeStagesState => ({
      ...state,
      status: EntityLoadStatus.LOADING,
    }),
  ),
  on(
    TypeStagesApiActions.loadAllSuccess,
    (state, { typeStages }): TypeStagesState => ({
      ...state,
      status: EntityLoadStatus.SUCCESS,
      typeStages,
    })
  ),
  on(
    TypeStagesApiActions.loadAllFailure,
    (state): TypeStagesState => ({
      ...state,
      status: EntityLoadStatus.FAILURE,
    })
  )
);
