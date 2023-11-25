import { UrlTree } from '@angular/router';
import { Observable, of, isObservable } from 'rxjs';
import { catchError, delay, filter, switchMap, take, tap } from 'rxjs/operators';

import { EntityLoadStatus } from '../models';

/**
 * Custom rxjs operator to resolve guards and init data given an EntityLoadStatus Observable
 *
 * @param loadDataFunc Callback to be executed when data needs to be loaded.
 *                     This will happen whether the status is INITIAL, FAILURE or loadFreshData = true
 * @param [failureUrlTree] UrlTree to redirect to in case of failure. If not provided and there is an error it will return `false`.
 * @param loadFreshData If data needs to be loaded every time the guard is executed. Default value: `true`.
 *
 * @example
 * export class LanguagesGuard implements CanActivate {
 *   constructor(private store: Store<fromFeature.State>, private router: Router) {}
 *
 *   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
 *     return this.store.pipe(
 *       select(fromFeature.getLanguagesLoadStatus),
 *       loadEntity(() => this.store.dispatch(new fromFeature.LoadLanguagesAction()), this.router.parseUrl('data-error'), false)
 *     );
 *   }
 * }
 */
export const loadEntity =
  (loadDataFunc: () => void, failureUrlTree?: UrlTree | Observable<UrlTree>, loadFreshData = true) =>
  (source: Observable<EntityLoadStatus>): Observable<boolean | UrlTree> => {
    const load$: Observable<EntityLoadStatus> = source.pipe(
      take(1),
      tap((status) => confirmEntityLoaded(status, loadDataFunc, loadFreshData)),
      // loadDataFunc might have been called, and it might have dispatched an action.
      // That might not execute in the same frame, so adding a delay(0) will wait until the related reducer has been called
      delay(0)
    );

    let redirect$: Observable<UrlTree | boolean>;

    if (failureUrlTree instanceof UrlTree) {
      redirect$ = of(failureUrlTree);
    } else if (isObservable(failureUrlTree)) {
      redirect$ = failureUrlTree.pipe(take(1));
    } else {
      // If failureUrlTree is not provided and there is an error the operator will return false, hence cancelling the navigation.
      redirect$ = of(false);
    }

    const waitCompleted$: Observable<boolean | UrlTree> = source.pipe(
      filter((loadStatus): boolean => loadStatus === EntityLoadStatus.SUCCESS || loadStatus === EntityLoadStatus.FAILURE),
      take(1),
      switchMap((loadStatus): Observable<boolean | UrlTree> => (loadStatus === EntityLoadStatus.FAILURE ? redirect$ : of(true)))
    );

    return load$.pipe(
      switchMap(() => waitCompleted$),
      catchError(() => redirect$)
    );
  };

function confirmEntityLoaded(loadStatus: EntityLoadStatus, loadDataFunc: () => void, loadFreshData: boolean) {
  if (loadStatus === EntityLoadStatus.INITIAL || loadStatus === EntityLoadStatus.FAILURE || loadFreshData) {
    loadDataFunc();
  }
}
