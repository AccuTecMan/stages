import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Type } from '../../features/cutting-sheets/models';

@Injectable({
  providedIn: 'root',
})
export class JobTypesService {
  private typesCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.typesCollection = collection(this.firestore, 'jobTypes');
  }

  public getAll() {
    return collectionData(this.typesCollection, {
      idField: 'id',
    }) as Observable<Type[]>;
  }

  public get(id: string): Observable<Type> {
    const typesReference = doc(this.firestore, `jobTypes/${id}`);
    return docData(typesReference, { idField: 'id' }) as Observable<Type>;
  }
}
