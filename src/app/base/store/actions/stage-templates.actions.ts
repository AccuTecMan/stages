import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StageTemplate } from '../../models/stage-template';

export const StageTemplatesGuardActions = createActionGroup({
  source: 'Stage Templates Guard',
  events: {
    'Load All': emptyProps(),
  },
});

export const StageTemplatesApiActions = createActionGroup({
  source: 'Stage Templates API',
  events: {
    'Load All Success': props<{ stageTemplates: StageTemplate[] }>(),
    'Load All Failure': emptyProps(),
  },
});
