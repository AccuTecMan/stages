import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureName, CustomerState, customerAdapter } from '../reducers';
import { Customer } from '../../models';

export const selectCustomersState = createFeatureSelector<CustomerState>(featureName);

export const selectCustomersLoadStatus = createSelector(selectCustomersState, (state) => state.status);

const customersSelectors = customerAdapter.getSelectors();

// export const selectCustomersAll = createSelector(
//   selectCustomersState,
//   (state) => state.entities
// );
