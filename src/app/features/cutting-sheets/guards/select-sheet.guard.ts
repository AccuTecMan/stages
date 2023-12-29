import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadEntity } from '../../../core';

import * as fromFeature from '../store';

@Injectable({ providedIn: 'root' })
export class SelectSheetGuard {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const cuttingSheetId = route.params.id as string;
    if (!cuttingSheetId || cuttingSheetId.length === 0) {
      void this.router.navigate(['cuttingSheets']);
    }

    return this.store
      .select(fromFeature.selectCuttingSheetsLoadStatus)
      .pipe(loadEntity(() => this.store.dispatch(fromFeature.CuttingSheetsGuardActions.loadStages({ cuttingSheetId: cuttingSheetId })), undefined, true));
  }
}
