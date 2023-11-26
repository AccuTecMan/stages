import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureName, CustomerState, customerAdapter } from '../reducers';
import { EntityLoadStatus } from '@core/models';
import { Dictionary } from '@ngrx/entity';
import { Customer } from '../../models';

export const selectCustomersState = createFeatureSelector<CustomerState>(featureName);

export const selectCustomersLoadStatus = createSelector(selectCustomersState, (state) => state.status);
export const selectIsLoading = createSelector(selectCustomersState, (state) => state.status === EntityLoadStatus.LOADING);

export const customersSelectors = customerAdapter.getSelectors(selectCustomersState);

export const selectCus = createSelector(customersSelectors.selectAll, (cus) => cus);

export const selectCustomersAllUnsorted = createSelector(
  selectCustomersState,
  customersSelectors.selectAll
);


// export const selectFirstCustomer = createSelector(
//   selectCustomersAllUnsorted,
//   (customers) => customers.(x => x.id === '6QSry35xelpuBzuHnZUb')
// );

export const selectCustomersAll = createSelector(
  selectCustomersAllUnsorted,
  (entities): Customer[] => entities
);
