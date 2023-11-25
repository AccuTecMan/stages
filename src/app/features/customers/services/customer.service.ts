import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.customerCollection = collection(this.firestore, 'customers');
  }

  public getAll() {
    return collectionData(this.customerCollection, {
      idField: 'id',
    }) as Observable<Customer[]>;
  }

  get(id: string) {
    const customerReference = doc(this.firestore, `customers/${id}`);
    return docData(customerReference, { idField: 'id' });
  }

  create(customer: Customer) {
    return addDoc(this.customerCollection, customer);
  }

  update(customer: Customer) {
    const customerReference = doc(
      this.firestore,
      `customers/${customer.id}`
    );
    return updateDoc(customerReference, { ...customer });
  }

  // delete(id: string) {
  //   const customerReference = doc(this.firestore, `customers/${id}`);
  //   return deleteDoc(customerReference);
  // }

}
