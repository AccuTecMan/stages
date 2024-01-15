import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, QueryConstraint, addDoc, collection, collectionData, doc, docData, query, updateDoc, where, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CuttingSheet, SearchCriteria, Stage } from '../models';
import { Store } from '@ngrx/store';
import { StageTemplatesService } from '@app/base/services';

@Injectable({
  providedIn: 'root',
})
export class CuttingSheetsService {
  private cuttingSheetsRef: CollectionReference<DocumentData>;
  private stagesCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore,
              private templateService: StageTemplatesService,
              private store: Store) {
    this.cuttingSheetsRef = collection(this.firestore, 'cuttingSheets');
  }

  public getWithCriteria(criteria: SearchCriteria | undefined) {
    const wheres: QueryConstraint[] = [];

    if (!!criteria?.customerId && criteria?.customerId.length > 1) {
      wheres.push(where('customer.id', '==', criteria.customerId));
    }

    if (!!criteria?.stageMapId && criteria?.stageMapId.length > 1) {
      wheres.push(where('currentStage.id', '==', criteria.stageMapId));
    }

    let start;
    let end;

    if (!!criteria && criteria?.readyByOption == 0) {
      start = new Date(new Date().setHours(0,0,0,0));
      end = new Date(new Date().setHours(23,59,59,999));
    }

    if (!!criteria && criteria?.readyByOption == 1) {
      start = new Date(this.getPreviousDay().setHours(0,0,0,0));
      end = new Date(this.getPreviousDay().setHours(23,59,59,999));
    }

    if (!!criteria && criteria?.readyByOption == 2) {
      start = new Date(this.getPreviousMonday().setHours(0,0,0,0));
      end = new Date(this.getTomorrow().setHours(0,0,0,0));
    }

    if (!!criteria && criteria?.readyByOption == 3) {
      start = new Date(this.getDaysBefore(7).setHours(0,0,0,0));
      end = new Date(this.getTomorrow().setHours(0,0,0,0));
    }

    if (!!criteria && criteria?.readyByOption == 4) {
      start = new Date(this.getDaysBefore(15).setHours(0,0,0,0));
      end = new Date(this.getTomorrow().setHours(0,0,0,0));
    }

    if (!!criteria && criteria?.readyByOption < 6) {
      wheres.push(where('createdAt', '>=', start));
      wheres.push(where('createdAt', '<=', end));
    }

    console.log('wheres', wheres);
    const sheetsQuery = query(this.cuttingSheetsRef, ...wheres);

    return collectionData(sheetsQuery, {
      idField: 'id',
    }) as Observable<CuttingSheet[]>;
  }

  private getReadyByConstraint(option: number): QueryConstraint[] {
    const constraint: QueryConstraint[] = [];

    if (option === 0) { // Today
      const start = new Date(new Date().setHours(0,0,0,0));
      const end = new Date(new Date().setHours(23,59,59,999));
      constraint.push(where('readyBy', '>=', start));
      constraint.push(where('readyBy', '<=', end));
    }

    if (option === 1) { // Yesterday
      const start = new Date(this.getPreviousDay().setHours(0,0,0,0));
      const end = new Date(this.getPreviousDay().setHours(23,59,59,999));
      constraint.push(where('readyBy', '>=', start));
      constraint.push(where('readyBy', '<=', end));
    }

    if (option === 2) {
      const start = new Date(this.getPreviousMonday().setHours(0,0,0,0));
      const end = new Date(this.getTomorrow().setHours(0,0,0,0));
      constraint.push(where('readyBy', '>=', start));
      constraint.push(where('readyBy', '<=', end));
    }

    if (option === 3) {
      const start = new Date(this.getDaysBefore(7).setHours(0,0,0,0));
      const end = new Date(this.getTomorrow().setHours(0,0,0,0));
      constraint.push(where('readyBy', '>=', start));
      constraint.push(where('readyBy', '<=', end));
    }

    if (option === 4) {
      const start = new Date(this.getDaysBefore(15).setHours(0,0,0,0));
      const end = new Date(this.getTomorrow().setHours(0,0,0,0));
      constraint.push(where('readyBy', '>=', start));
      constraint.push(where('readyBy', '<=', end));
    }

    if (option === 5) {
      const start = new Date(this.getDaysBefore(30).setHours(0,0,0,0));
      const end = new Date(this.getTomorrow().setHours(0,0,0,0));
      constraint.push(where('readyBy', '>=', start));
      constraint.push(where('readyBy', '<=', end));
    }

    return constraint;
  }

  private getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }

  private getPreviousMonday() {
    const previousMonday = new Date();
    previousMonday.setDate(previousMonday.getDate() - (previousMonday.getDay() + 6) % 7);
    return new Date(previousMonday);
  }

  private getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(tomorrow);
  }

  private getDaysBefore(days: number) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - days);
    return new Date(tomorrow);
  }

  public getAll() {
    return collectionData(this.cuttingSheetsRef, {
      idField: 'id',
    }) as Observable<CuttingSheet[]>;
  }

  get(id: string): Observable<CuttingSheet> {
    const cuttingSheetsReference = doc(this.firestore, `cuttingSheets/${id}`);
    return docData(cuttingSheetsReference, { idField: 'id' }) as Observable<CuttingSheet>;
  }

  getStages(id: string): Observable<Stage[]> {
    this.stagesCollection = collection(this.firestore, `cuttingSheets/${id}/stages`);
    return collectionData(this.stagesCollection,
      { idField: 'id' }
    ) as Observable<Stage[]>;
  }

  upsert(cuttingSheet: CuttingSheet, id?: string) {
    if (id) {
      const cuttingSheetsReference = doc(
        this.firestore,
        `cuttingSheets/${id}`
      );
      return updateDoc(cuttingSheetsReference, { ...cuttingSheet });
    } else {
      const cs = {...cuttingSheet, createdAt: serverTimestamp() }
      return addDoc(this.cuttingSheetsRef, cs)
    }
  }

}
