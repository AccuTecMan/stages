import { ActionReducerMap } from '@ngrx/store';
import { TypeState, typesInitialState, typesReducer } from './job-types.reducer';
import { StageTemplatesState, stageTemplatesInitialState, stageTemplatesReducer } from './stage-templates.reducer';
import { CustomerState, customersInitialState, customersReducer } from './customer.reducer';

export const featureName = 'base';

export interface CuttingSheetsState {
  jobTypes: TypeState;
  stageTemplates: StageTemplatesState;
  customers: CustomerState;
}

export const initialState: CuttingSheetsState = {
  jobTypes: typesInitialState,
  stageTemplates: stageTemplatesInitialState,
  customers: customersInitialState
};

export const reducer: ActionReducerMap<CuttingSheetsState> = {
  jobTypes: typesReducer,
  stageTemplates: stageTemplatesReducer,
  customers: customersReducer
};

