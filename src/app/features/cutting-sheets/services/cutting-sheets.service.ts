import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CuttingSheet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CuttingSheetsService {
  private cuttingSheetsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.cuttingSheetsCollection = collection(this.firestore, 'cuttingSheets');
  }

  public getAll() {
    return collectionData(this.cuttingSheetsCollection, {
      idField: 'id',
    }) as Observable<CuttingSheet[]>;
  }

  get(id: string): Observable<CuttingSheet> {
    const cuttingSheetsReference = doc(this.firestore, `cuttingSheets/${id}`);
    return docData(cuttingSheetsReference, { idField: 'id' }) as Observable<CuttingSheet>;
  }

  create(cuttingSheet: CuttingSheet) {
    return addDoc(this.cuttingSheetsCollection, cuttingSheet);
  }

  update(cuttingSheet: CuttingSheet, id: string) {
    const cuttingSheetsReference = doc(
      this.firestore,
      `cuttingSheets/${id}`
    );
    return updateDoc(cuttingSheetsReference, { ...cuttingSheet });
  }
}
