import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, Query, QueryConstraint, addDoc, collection, collectionData, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, map, switchMap } from 'rxjs';
import { CuttingSheet, SearchCriteria } from '../models';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Injectable({
  providedIn: 'root',
})
export class CuttingSheetsService {
  public searchCriteria$ = this.store.select(fromStore.selectSearchCriteria);
  private cuttingSheetsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore,
              private store: Store) {
    this.cuttingSheetsCollection = collection(this.firestore, 'cuttingSheets');
  }

  public getWithCriteria(criteria: SearchCriteria | undefined) {
    const wheres: QueryConstraint[] = [];

    if (!!criteria?.customerId) {
      wheres.push(where('customer.id', '==', criteria.customerId));
    }

    if (criteria?.readyByOption == 0) {
      const startOfToday = new Date(new Date().setHours(0,0,0,0));
      wheres.push(where('readyBy', '>=', startOfToday));
    }

    let sheetsQuery = query(this.cuttingSheetsCollection, ...wheres);

    return collectionData(sheetsQuery, {
      idField: 'id',
    }) as Observable<CuttingSheet[]>;
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
