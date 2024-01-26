import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadEntity } from '../../core';
import * as fromFeature from '../store';

@Injectable({ providedIn: 'root' })
export class StageMapGuard {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select(fromFeature.selectStageTemplatesLoadedStatus)
      .pipe(loadEntity(() => this.store.dispatch(fromFeature.StageGuardActions.loadAll()), undefined, true));
  }
}
