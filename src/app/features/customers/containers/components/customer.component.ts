import { Component, ChangeDetectionStrategy } from '@angular/core';
import { addDoc, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-customer-component',
  template: `
    <header>
      <h1>Customers</h1>
    </header>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent {}
