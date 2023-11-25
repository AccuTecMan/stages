import { EntityLoadStatus, LoadStatus } from '@core/models';
import { Customer } from '../../models';
import { Action, createReducer, on } from '@ngrx/store';

import { CustomersGuardActions, CustomersApiActions} from '../actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export const featureName = 'customers';

export interface CustomerState extends EntityState<Customer>, LoadStatus {}

export const customerAdapter = createEntityAdapter<Customer>({
  selectId: c => c.id
});

const initialState: CustomerState = {
  ...customerAdapter.getInitialState(),
  status: EntityLoadStatus.INITIAL
};

export const internalReducer = createReducer(
  initialState,
  on(
    CustomersGuardActions.loadAll,
    (state): CustomerState => ({
      ...state,
      status: EntityLoadStatus.LOADING,
    }),
  ),
  on(
    CustomersApiActions.loadAllSuccess,
    (state, { customers }): CustomerState =>
      customerAdapter.setAll(customers, { ...state, status: EntityLoadStatus.SUCCESS })
  ),
  on(
    CustomersApiActions.loadAllFailure,
    (state): CustomerState => ({
      ...state,
      status: EntityLoadStatus.FAILURE,
    })
  ),

);

export function reducer(state: CustomerState | undefined, action: Action) {
  // required that we export this in a higher order named function to support aot ... done separately to reduce nesting
  return internalReducer(state, action);
}
