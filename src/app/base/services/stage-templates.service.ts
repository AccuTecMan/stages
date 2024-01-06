import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StageTemplate } from '../models/stage-template';

@Injectable({
  providedIn: 'root',
})
export class StageTemplatesService {
  private typesCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.typesCollection = collection(this.firestore, 'stageTemplates');
  }

  public getAll(): Observable<StageTemplate[]> {
    return collectionData(this.typesCollection, {
      idField: 'id',
    }) as Observable<StageTemplate[]>;
  }

  public get(id: string): Observable<StageTemplate[]> {
    const q = query(this.typesCollection, where("jobType", "==", id));
    return collectionData(q, {
      idField: 'id'
    }) as Observable<StageTemplate[]>;
  }
}
