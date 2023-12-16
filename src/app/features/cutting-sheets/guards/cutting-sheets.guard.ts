import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadEntity } from '../../../core';

import * as fromFeature from '../store';

@Injectable({ providedIn: 'root' })
export class CuttingSheetsGuard {
  constructor(
    private store: Store
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select(fromFeature.selectCuttingSheetsLoadStatus)
      .pipe(loadEntity(() => this.store.dispatch(fromFeature.CuttingSheetsGuardActions.loadAll()), undefined, false));
  }
}
