import { createSelector } from "@ngrx/store";
import { selectCuttingSheetsState } from './feature.selectors';
import { CuttingSheetsState } from "../reducers";

export const selectTypeStagesLoadedStatus = createSelector(
  selectCuttingSheetsState, (state: CuttingSheetsState) => state.typeStages.status);
