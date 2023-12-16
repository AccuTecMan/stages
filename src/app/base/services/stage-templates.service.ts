import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { DocumentReference, Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
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

  public get(id: string): Observable<StageTemplate> {
    const typesReference = doc(this.firestore, `stageTemplates/${id}`);
    return docData(typesReference, { idField: 'id' }) as Observable<StageTemplate>;
  }
}