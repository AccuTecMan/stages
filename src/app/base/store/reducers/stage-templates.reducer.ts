import { createReducer, on } from '@ngrx/store';

import { StageTemplatesGuardActions, StageTemplatesApiActions } from '../actions';
import { EntityLoadStatus, LoadStatus } from '@core/models';
import { StageTemplate } from '../../models/stage-template';

export interface StageTemplatesState extends LoadStatus {
  stageTemplates: StageTemplate[] | undefined;
}

export const stageTemplatesInitialState: StageTemplatesState = {
  loadStatus: EntityLoadStatus.INITIAL,
  stageTemplates: undefined,
};

export const stageTemplatesReducer = createReducer(
  stageTemplatesInitialState,
  on(
    StageTemplatesGuardActions.loadAll,
    (state): StageTemplatesState => ({
      ...state,
      loadStatus: EntityLoadStatus.LOADING,
    }),
  ),
  on(
    StageTemplatesApiActions.loadAllSuccess,
    (state, { stageTemplates }): StageTemplatesState => ({
      ...state,
      loadStatus: EntityLoadStatus.SUCCESS,
      stageTemplates,
    })
  ),
  on(
    StageTemplatesApiActions.loadAllFailure,
    (state): StageTemplatesState => ({
      ...state,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  )
);
