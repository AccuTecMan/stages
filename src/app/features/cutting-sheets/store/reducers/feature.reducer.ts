import { ActionReducerMap } from '@ngrx/store';
import { TypeState, typesInitialState, typesReducer } from './types.reducer';

export const featureName = 'cutting-sheets';

export interface CuttingSheetsState {
  types: TypeState;
}

export const initialState: CuttingSheetsState = {
  types: typesInitialState
};

export const reducer: ActionReducerMap<CuttingSheetsState> = {
  types: typesReducer
};

