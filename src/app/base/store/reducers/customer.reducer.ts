import { EntityLoadStatus, LoadStatus } from '@core/models';
import { Customer } from '../../models';
import { createReducer, on } from '@ngrx/store';

import { CustomersGuardActions, CustomersApiActions} from '../actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer>, LoadStatus {}

export const customerAdapter = createEntityAdapter<Customer>({
  selectId: c => c.id
});

export const customersInitialState: CustomerState = {
  ...customerAdapter.getInitialState(),
  status: EntityLoadStatus.INITIAL
};

export const customersReducer = createReducer(
  customersInitialState,
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
