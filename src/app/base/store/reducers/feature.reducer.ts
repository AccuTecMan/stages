import { ActionReducerMap } from '@ngrx/store';
import { TypeState, typesInitialState, typesReducer } from './job-types.reducer';
import { StageTemplatesState, stageTemplatesInitialState, stageTemplatesReducer } from './stage-templates.reducer';
import { CustomerState, customersInitialState, customersReducer } from './customer.reducer';
import { StageMapState, stageMapInitialState, stageMapReducer } from './stage-map.reducer';

export const baseFeatureName = 'base';

export interface CuttingSheetsState {
  jobTypes: TypeState;
  stageTemplates: StageTemplatesState;
  customers: CustomerState;
  stagesMap: StageMapState;
}

export const initialState: CuttingSheetsState = {
  jobTypes: typesInitialState,
  stageTemplates: stageTemplatesInitialState,
  customers: customersInitialState,
  stagesMap: stageMapInitialState,
};

export const baseReducer: ActionReducerMap<CuttingSheetsState> = {
  jobTypes: typesReducer,
  stageTemplates: stageTemplatesReducer,
  customers: customersReducer,
  stagesMap: stageMapReducer,
};
