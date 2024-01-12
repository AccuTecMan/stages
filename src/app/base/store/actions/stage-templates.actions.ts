import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StageTemplate } from '../../models/stage-template';
import { StageMap } from '@app/base/models';

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

export const StageGuardActions = createActionGroup({
  source: 'Stage Guard',
  events: {
    'Load All': emptyProps(),
  },
});

export const StageApiActions = createActionGroup({
  source: 'Stage API',
  events: {
    'Load All Success': props<{ stagesMap: StageMap[] }>(),
    'Load All Failure': emptyProps(),
  },
});
