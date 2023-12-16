import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CuttingSheet } from '../../models';

export const CuttingSheetsGuardActions = createActionGroup({
  source: 'Cutting Sheets Guard',
  events: {
    'Load All': emptyProps(),
  },
});

export const CuttingSheetsApiActions = createActionGroup({
  source: 'Cutting Sheets API',
  events: {
    'Load All Success': props<{ cuttingSheets: CuttingSheet[] }>(),
    'Load All Failure': emptyProps(),
  },
});
