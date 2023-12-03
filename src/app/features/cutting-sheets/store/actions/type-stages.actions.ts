import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { TypeStage } from '../../models/type-stage';

export const TypeStagesGuardActions = createActionGroup({
  source: 'Type Stages Guard',
  events: {
    'Load All': emptyProps(),
  },
});

export const TypeStagesApiActions = createActionGroup({
  source: 'Type Stages API',
  events: {
    'Load All Success': props<{ typeStages: TypeStage[] }>(),
    'Load All Failure': emptyProps(),
  },
});
