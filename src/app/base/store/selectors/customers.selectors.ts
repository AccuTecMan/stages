import { createSelector } from "@ngrx/store";
import { selectCuttingSheetsState } from './feature.selectors';
import { CuttingSheetsState, customerAdapter } from "../reducers";
import { EntityLoadStatus } from "@app/core";

export const selectCustomersLoadedStatus = createSelector(
  selectCuttingSheetsState,
  (state: CuttingSheetsState) => state.customers.loadStatus);

export const customerState = createSelector(
  selectCuttingSheetsState,
  (state) => state.customers.customers);

export const customersSelectors = customerAdapter.getSelectors(customerState);

export const selectAllCustomers = createSelector(
  customersSelectors.selectAll, (c) => c);

export const selectCustomersAll = createSelector(
    selectCuttingSheetsState,
    (state: CuttingSheetsState) => state.customers.customers);

  export const selectCustomersIsLoading = createSelector(
    selectCuttingSheetsState,
    (state) => state.customers.loadStatus === EntityLoadStatus.LOADING);
