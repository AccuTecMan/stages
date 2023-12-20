import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Customer } from '../../models';

export const CustomersGuardActions = createActionGroup({
  source: 'Customers Guard',
  events: {
    'Load All': emptyProps(),
  },
});

export const CustomersApiActions = createActionGroup({
  source: 'Customers API',
  events: {
    'Load All Success': props<{ customers: Customer[] }>(),
    'Load All Failure': emptyProps(),
  },
});
