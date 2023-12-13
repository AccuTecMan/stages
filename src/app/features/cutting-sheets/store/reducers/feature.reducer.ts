import { ActionReducerMap } from '@ngrx/store';
import { TypeState, typesInitialState, typesReducer } from './job-types.reducer';
import { StageTemplatesState, stageTemplatesInitialState, sTemplatesReducer } from './stage-templates.reducer';

export const featureName = 'cuttingSheets';

export interface CuttingSheetsState {
  jobTypes: TypeState;
  stageTemplates: StageTemplatesState
}

export const initialState: CuttingSheetsState = {
  jobTypes: typesInitialState,
  stageTemplates: stageTemplatesInitialState,
};

export const reducer: ActionReducerMap<CuttingSheetsState> = {
  jobTypes: typesReducer,
  stageTemplates: sTemplatesReducer
};

