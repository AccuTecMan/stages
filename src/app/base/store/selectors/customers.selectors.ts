import { createSelector } from "@ngrx/store";
import { selectCuttingSheetsState } from './feature.selectors';
import { CuttingSheetsState, customerAdapter } from "../reducers";

export const selectCustomersLoadedStatus = createSelector(
  selectCuttingSheetsState,
  (state: CuttingSheetsState) => state.customers.status);

export const customerState = createSelector(
  selectCuttingSheetsState,
  (state) => state.customers);

export const customersSelectors = customerAdapter.getSelectors(customerState);

export const selectAllCustomers = createSelector(
  customersSelectors.selectAll, (c) => c);

export const selectCustomersAll = createSelector(
    selectCuttingSheetsState,
    (state: CuttingSheetsState) => state.customers.entities);
