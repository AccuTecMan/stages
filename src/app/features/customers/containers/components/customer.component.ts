import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { addDoc, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { Customer } from '../../models';


@Component({
  selector: 'app-customer-component',
  template: `
    <header class="content-header">
      <h1>Customers</h1>
      <div fxLayout="row" fxLayoutAlign="space-between start">
        <mat-form-field>
          <input matInput placeholder="Search" [(ngModel)]="term">
        </mat-form-field>
        <button mat-fab extended color="primary" class="add-button">
          <mat-icon>add</mat-icon>
          Add New
        </button>
      </div>
    </header>

    <section class="content-records" fxLayout="row wrap" fxLayoutGap="8px grid">
      <div fxFlex="50%" fxFlex.lt-sm="100%" *ngFor="let customer of customers">
        <mat-card  class="mat-elevation-z16">
          <mat-card-header>
            <mat-card-title>{{ customer.name }}</mat-card-title>
          </mat-card-header>
          <mat-card-actions fxLayoutAlign="space-between center">
            <mat-chip-listbox aria-label="Fish selection">
              <mat-chip-option color="accent">{{ customer.active ? "Active" : "Inactive" }}</mat-chip-option>
            </mat-chip-listbox>
            <button mat-button color="primary">UPDATE</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`

    h1 {
      font-size: 2rem;
      padding: 0px;
    }

    .content-header {
      margin: 1.3rem 1rem 0rem 1rem !Important;
      max-width: 850px;
    }

    .add-button {
      margin-right: .5rem;
    }

    .content-records {
      margin: .5rem 1rem 4rem 1rem !Important;
      max-width: 850px;
    }

    .mat-mdc-form-field {
      width: 150px;
    }

    .content > mat-card {
      width: 350px;
    }

    .mat-mdc-button {
      background-color: #e3e2f4;
    }

    .mat-mdc-standard-chip {
      background-color: #fee4ee;
      color: #fff;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent {
  @Input() customers!: Customer[] | null;
  @Output() public changeSearchTerm = new EventEmitter<string>();

  private _term: string;

  public onSearchTermChange(term: string) {
    this.changeSearchTerm.emit(term);
  }

  get term(): string {
    return this._term;
  }

  set term(value: string) {
    this._term = value;
    this.onSearchTermChange(this._term);
  }

}
