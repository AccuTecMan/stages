import { createSelector } from "@ngrx/store";
import { selectCuttingSheetsState } from './feature.selectors';
import { CuttingSheetsState } from "../reducers";

export const selectTypesLoadedStatus = createSelector(
  selectCuttingSheetsState, (state: CuttingSheetsState) => state.types.status);