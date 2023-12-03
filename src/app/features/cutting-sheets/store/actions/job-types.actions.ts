import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Type } from '../../models';

export const TypesGuardActions = createActionGroup({
  source: 'Types Guard',
  events: {
    'Load All': emptyProps(),
  },
});

export const TypesApiActions = createActionGroup({
  source: 'Types API',
  events: {
    'Load All Success': props<{ types: Type[] }>(),
    'Load All Failure': emptyProps(),
  },
});
