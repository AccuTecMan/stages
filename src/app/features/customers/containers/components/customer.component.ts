import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { addDoc, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { Customer } from '../../models';

@Component({
  selector: 'app-customer-component',
  template: `
    <header>
      <h1>Customers</h1>
    </header>

    <section class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
      <div fxFlex="50%" fxFlex.lt-sm="100%" *ngFor="let customer of customers">
        <mat-card  class="mat-elevation-z8">
          <mat-card-header>
            <mat-card-title>{{ customer.name }}</mat-card-title>
          </mat-card-header>
          <mat-card-actions fxLayoutAlign="space-between center">
            <mat-chip-option color="accent" disabled>Active</mat-chip-option>
            <button mat-button>U P D A T E</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    section {
      margin: 2rem;
    }

    .content {
      padding: 16px;
    }

    .content > mat-card {
      width: 350px;
    }

    .mat-card-header{
      background-color:gold ;
      padding:5px ;
    }

    .mat-mdc-standard-chip {
      background-color: #fee4ee;
      color: #fff;
    }

    .mat-accordion
    .mat-expansion-panel
    .example-headers-align
    .mat-expansion-panel-header-description {
      margin-bottom: 0.5rem;
      justify-content: space-between;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent {
  @Input() customers!: Customer[] | null;

}
