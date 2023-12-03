import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadEntity } from '../../../core';

import * as fromFeature from '../store';

@Injectable({ providedIn: 'root' })
export class TypeStagesGuard {
  constructor(
    private store: Store
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select(fromFeature.selectTypeStagesLoadedStatus)
      .pipe(loadEntity(() => this.store.dispatch(fromFeature.TypeStagesGuardActions.loadAll()), undefined, false));
  }
}
