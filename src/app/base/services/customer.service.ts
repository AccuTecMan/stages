import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly injector = inject(EnvironmentInjector);
  private customerCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.customerCollection = collection(this.firestore, 'customers');
  }

  public getAll(): Observable<Customer[]> {
    return runInInjectionContext(this.injector, () => {
      return collectionData(this.customerCollection, {
        idField: 'id',
      }) as Observable<Customer[]>;
    });
  }

  get(id: string): Observable<Customer> {
    return runInInjectionContext(this.injector, () => {
      const customerReference = doc(this.firestore, `customers/${id}`);
      return docData(customerReference, { idField: 'id' }) as Observable<Customer>;
    });
  }

  create(customer: Customer) {
    return addDoc(this.customerCollection, customer);
  }

  update(customer: Customer, id: string) {
    const customerReference = doc(this.firestore, `customers/${id}`);
    return updateDoc(customerReference, { ...customer });
  }
}
