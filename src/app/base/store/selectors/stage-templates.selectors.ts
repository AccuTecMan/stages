import { createSelector } from "@ngrx/store";
import { selectCuttingSheetsState } from './feature.selectors';
import { CuttingSheetsState } from "../reducers";
import { StageMap } from "@app/base/models";

export const selectStageTemplatesLoadedStatus = createSelector(
  selectCuttingSheetsState,
  (state: CuttingSheetsState) => state.stageTemplates.loadStatus);

  export const selectAllTemplates = createSelector(
    selectCuttingSheetsState, (state: CuttingSheetsState) => state.stageTemplates.stageTemplates);

  export const selectAllStageMap = createSelector(
    selectCuttingSheetsState, (state: CuttingSheetsState) =>{
      let ordered = state.stagesMap.stagesMap?.slice().sort((a, b) =>  (a.name < b.name ? -1 : 1));
      ordered?.unshift(<StageMap>{ id: '0', name: 'All' });
      return ordered;
  })
