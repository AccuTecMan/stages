import { createSelector } from "@ngrx/store";
import { selectCuttingSheetsState } from './feature.selectors';
import { CuttingSheetsState } from "../reducers";

export const selectStageTemplatesLoadedStatus = createSelector(
  selectCuttingSheetsState,
  (state: CuttingSheetsState) => state.stageTemplates.loadStatus);

  export const selectAllTemplates = createSelector(
    selectCuttingSheetsState, (state: CuttingSheetsState) => state.stageTemplates.stageTemplates);
