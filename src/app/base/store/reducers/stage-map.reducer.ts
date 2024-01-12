import { createReducer, on } from '@ngrx/store';

import { StageGuardActions, StageApiActions } from '../actions';
import { EntityLoadStatus, LoadStatus } from '@core/models';
import { StageMap } from '../../models';

export interface StageMapState extends LoadStatus {
  stagesMap: StageMap[] | undefined;
}

export const stageMapInitialState: StageMapState = {
  loadStatus: EntityLoadStatus.INITIAL,
  stagesMap: undefined,
};

export const stageMapReducer = createReducer(
  stageMapInitialState,
  on(
    StageGuardActions.loadAll,
    (state): StageMapState => ({
      ...state,
      loadStatus: EntityLoadStatus.LOADING,
    }),
  ),
  on(
    StageApiActions.loadAllSuccess,
    (state, { stagesMap }): StageMapState => ({
      ...state,
      loadStatus: EntityLoadStatus.SUCCESS,
      stagesMap,
    })
  ),
  on(
    StageApiActions.loadAllFailure,
    (state): StageMapState => ({
      ...state,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  )
);
