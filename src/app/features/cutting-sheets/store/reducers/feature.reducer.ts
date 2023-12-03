import { ActionReducerMap } from '@ngrx/store';
import { TypeState, typesInitialState, typesReducer } from './job-types.reducer';
import { TypeStagesState, typeStagesInitialState, typeStagesReducer } from './type-stages.reducer';

export const featureName = 'cutting-sheets';

export interface CuttingSheetsState {
  jobTypes: TypeState;
  typeStages: TypeStagesState
}

export const initialState: CuttingSheetsState = {
  jobTypes: typesInitialState,
  typeStages: typeStagesInitialState,
};

export const reducer: ActionReducerMap<CuttingSheetsState> = {
  jobTypes: typesReducer,
  typeStages: typeStagesReducer
};

