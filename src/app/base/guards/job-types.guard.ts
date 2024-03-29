import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadEntity } from '../../core';
import * as fromFeature from '../store';

@Injectable({ providedIn: 'root' })
export class JobTypesGuard {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select(fromFeature.selectTypesLoadedStatus)
      .pipe(loadEntity(() => this.store.dispatch(fromFeature.TypesGuardActions.loadAll()), undefined, false));
  }
}
