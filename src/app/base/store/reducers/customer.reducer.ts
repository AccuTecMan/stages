import { EntityLoadStatus, LoadStatus } from '@core/models';
import { Customer } from '../../models';
import { createReducer, on } from '@ngrx/store';

import { CustomersGuardActions, CustomersApiActions } from '../actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface CustomerState extends LoadStatus {
  customers: EntityState<Customer>;
}

export const customerAdapter = createEntityAdapter<Customer>({
  selectId: (customers) => customers.id,
});

export const customersInitialState: CustomerState = {
  customers: customerAdapter.getInitialState(),
  loadStatus: EntityLoadStatus.INITIAL,
};

export const customersReducer = createReducer(
  customersInitialState,
  on(
    CustomersGuardActions.loadAll,
    (state): CustomerState => ({
      ...state,
      loadStatus: EntityLoadStatus.LOADING,
    })
  ),
  on(
    CustomersApiActions.loadAllSuccess,
    (state, { customers }): CustomerState => ({
      ...state,
      loadStatus: EntityLoadStatus.SUCCESS,
      customers: customerAdapter.setAll(customers, state.customers),
    })
  ),
  on(
    CustomersApiActions.loadAllFailure,
    (state): CustomerState => ({
      ...state,
      loadStatus: EntityLoadStatus.FAILURE,
    })
  )
);
