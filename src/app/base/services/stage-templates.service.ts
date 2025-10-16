import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StageTemplate } from '../models/stage-template';
import { StageMap } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StageTemplatesService {
  private typesCollection: CollectionReference<DocumentData>;
  private stagesCollection: CollectionReference<DocumentData>;
  private readonly injector = inject(EnvironmentInjector);

  constructor(private readonly firestore: Firestore) {
    this.typesCollection = collection(this.firestore, 'stageTemplates');
    this.stagesCollection = collection(this.firestore, 'stages');
  }

  public getAll(): Observable<StageTemplate[]> {
    return runInInjectionContext(this.injector, () => {
      return collectionData(this.typesCollection, {
        idField: 'id',
      }) as Observable<StageTemplate[]>;
    });
  }

  public get(id: string): Observable<StageTemplate[]> {
    const q = query(this.typesCollection, where('jobType', '==', id));
    return collectionData(q, {
      idField: 'id',
    }) as Observable<StageTemplate[]>;
  }

  public getAllStages(): Observable<StageMap[]> {
    return runInInjectionContext(this.injector, () => {
      return collectionData(this.stagesCollection, {
        idField: 'id',
      }) as Observable<StageMap[]>;
    });
  }
}
