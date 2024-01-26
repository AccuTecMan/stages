import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadEntity } from '../../core';
import * as fromBase from '../store';

@Injectable({ providedIn: 'root' })
export class CustomersGuard {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select(fromBase.selectCustomersLoadedStatus)
      .pipe(loadEntity(() => this.store.dispatch(fromBase.CustomersGuardActions.loadAll()), undefined, true));
  }
}
