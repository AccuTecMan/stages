import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Type } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
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