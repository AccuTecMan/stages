import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../models';

@Component({
  selector: 'app-customer-component',
  template: `
    <header class="content-header">
      <h1>Customers</h1>
      <mat-divider></mat-divider>
      <div fxLayout="row" fxLayoutAlign="space-between start">
        <mat-form-field>
          <input matInput placeholder="Search" [(ngModel)]="term">
        </mat-form-field>
        <button mat-fab extended color="primary" class="add-button" routerLink="/customers/add">
          <mat-icon>add</mat-icon>
          Add New
        </button>
      </div>
    </header>

    <section class="content-records" fxLayout="row wrap" fxLayoutGap="8px grid">
      <div fxFlex="50%" fxFlex.lt-sm="100%" *ngFor="let customer of customers; trackBy: trackByCustomerGuid">
        <mat-card  class="mat-elevation-z16">
          <mat-card-header fxLayout="row wrap" fxLayoutAlign="space-between center">
            <mat-card-title>{{ customer.name }}</mat-card-title>
            <mat-chip>
              {{ customer.active ? "Active" : "Inactive" }}
            </mat-chip>
          </mat-card-header>
          <mat-card-actions fxLayoutAlign="space-between center">
            <button mat-button color="primary" [routerLink]="['/customers/edit', customer.id]">UPDATE</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    h1 {
      font-size: 2rem;
      padding: 0px;
      margin: 0;
    }

    .content-header {
      margin: 1.3rem 1rem 0rem 1rem !Important;
      max-width: 850px;
    }

    mat-divider {
      margin-bottom: 1rem;
    }

    .add-button {
      margin-right: 1.5rem;
    }

    .content-records {
      margin: .5rem 1rem 4rem 1rem !Important;
      max-width: 850px;
    }

    .mat-mdc-form-field {
      width: 150px;
    }

    mat-card {
      width: 400px;
    }

    .mat-mdc-card-header {
      padding: .3rem 1rem;
    }

    .mat-mdc-button {
      background-color: #e3e2f4;
    }

    @media (max-width: 600px) {
      mat-card {
        width: 100%;
      }

      .add-button {
        margin-right: 1rem;
      }
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

  public trackByCustomerGuid(index: number, customer: Customer) {
    return customer.id;
  }


}
