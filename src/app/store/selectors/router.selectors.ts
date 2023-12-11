import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const { selectQueryParams, selectRouteParams, selectRouteData, selectUrl } = getRouterSelectors(selectRouter);

type Param = {
  [key: string]: string;
};

export const selectRouteNestedParams = createSelector(selectRouter, (router) => {
  let currentRoute = router?.state?.root;
  // We only support string params for now
  let params: Param = {};
  while (currentRoute?.firstChild) {
    currentRoute = currentRoute.firstChild;
    params = {
      ...params,
      ...currentRoute.params,
    };
  }

  return params;
});

export const selectRouteNestedParam = (param: string) => createSelector(selectRouteNestedParams, (params) => params && params[param]);
