import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureName, CustomerState, customerAdapter } from '../reducers';
import { EntityLoadStatus } from '@core/models';
import { Customer } from '../../models';

export const selectCustomersState = createFeatureSelector<CustomerState>(featureName);

export const selectCustomersLoadStatus = createSelector(selectCustomersState, (state) => state.status);
export const selectIsLoading = createSelector(selectCustomersState, (state) => state.status === EntityLoadStatus.LOADING);

export const customersSelectors = customerAdapter.getSelectors(selectCustomersState);

export const selectCustomers = (isInactiveDisplayed: boolean) =>createSelector(
  customersSelectors.selectAll,
  (customers: Customer[]) => {
    if (isInactiveDisplayed) {
      return customers;
    } else {
      return customers.filter(c => c.active)
    }
  }
);

export const selectCustomersAllUnsorted = createSelector(
  selectCustomersState,
  customersSelectors.selectAll
);

export const selectCustomersAll = createSelector(
  selectCustomersAllUnsorted,
  (entities): Customer[] => entities
);
