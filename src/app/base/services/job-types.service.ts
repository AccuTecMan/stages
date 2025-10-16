import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { JobType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class JobTypesService {
  private readonly injector = inject(EnvironmentInjector);

  constructor() {}

  public getAll(): Observable<JobType[]> {
    return runInInjectionContext(this.injector, () => {
      const firestore = inject(Firestore);
      const typesCollection = collection(firestore, 'jobTypes') as CollectionReference<DocumentData>;
      return collectionData(typesCollection, { idField: 'id' }) as Observable<JobType[]>;
    });
  }

  public get(id: string): Observable<JobType> {
    return runInInjectionContext(this.injector, () => {
      const firestore = inject(Firestore);
      const docRef = doc(firestore, `jobTypes/${id}`);
      return docData(docRef, { idField: 'id' }) as Observable<JobType>;
    });
  }
}
