import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { JobType } from '../models';

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
    }) as Observable<JobType[]>;
  }

  public get(id: string): Observable<JobType> {
    const typesReference = doc(this.firestore, `jobTypes/${id}`);
    return docData(typesReference, { idField: 'id' }) as Observable<JobType>;
  }
}
