import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthenticationActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Set Authenticated': props<{
      isAdmin: boolean;
      displayName: string | null;
      photoURL: string | null;
    }>(),
    'Set Unauthenticated': emptyProps(),
  },
});
