import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { addDoc, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { Customer } from '../../models';


@Component({
  selector: 'app-customer-component',
  template: `
    <header class="content">
      <h1>Customers</h1>
      <mat-form-field class="example-full-width">
        <span matPrefix> </span>
        <input type="tel" matInput placeholder="Search" [(ngModel)]="term">
      </mat-form-field>
    </header>

    <section class="content" fxLayout="row wrap" fxLayoutGap="16px grid">
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

    .content {
      margin: 1.3rem 1rem 0rem 2rem !Important;
      max-width: 850px;
    }

    .mat-form-field {
      width: auto;
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
    console.log(value);
    this._term = value;
    this.onSearchTermChange(this._term);
  }

}
