import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CuttingSheet, SearchCriteria, Stage } from '../../models';

export const CuttingSheetsGuardActions = createActionGroup({
  source: 'Cutting Sheets Guard',
  events: {
    'Load All': emptyProps(),
    'Load Stages': props<{ cuttingSheetId: string }>(),
  },
});

export const CuttingSheetsApiActions = createActionGroup({
  source: 'Cutting Sheets API',
  events: {
    'Load All Success': props<{ cuttingSheets: CuttingSheet[] }>(),
    'Load All Failure': emptyProps(),
    'Load Stages Success': props<{ cuttingSheet: CuttingSheet }>(),
    'Load Stages Failure': emptyProps(),
    'Change Stage': emptyProps(),
    'Change Stage Success': props<{ cuttingSheet: CuttingSheet }>(),
    'Change Stage Failure': emptyProps(),
  },
});

export const SearchCriteriaActions = createActionGroup({
  source: 'Search Criteria',
  events: {
    'Set': props<{ searchCriteria: SearchCriteria }>(),
  },
});
