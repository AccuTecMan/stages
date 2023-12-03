import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TypeStage } from '../models/type-stage';

@Injectable({
  providedIn: 'root',
})
export class TypeStagesService {
  private typesCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.typesCollection = collection(this.firestore, 'typeStages');
  }

  public getAll() {
    return collectionData(this.typesCollection, {
      idField: 'id',
    }) as Observable<TypeStage[]>;
  }

  public get(id: string): Observable<TypeStage> {
    const typesReference = doc(this.firestore, `typeStages/${id}`);
    return docData(typesReference, { idField: 'id' }) as Observable<TypeStage>;
  }
}
