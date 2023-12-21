import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '@app/base/models';

@Component({
  selector: 'app-customer-component',
  template: `
    <header class="content-header">
      <div fxLayout="row" fxLayoutAlign="space-between center">
        <h1>Customers</h1>
        <button mat-fab extended routerLink="/customers/add">
          <mat-icon>add</mat-icon>
          Add New
        </button>
      </div>
      <mat-divider></mat-divider>
      <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="14px">
        <mat-form-field>
          <mat-label>Customer name</mat-label>
          <input matInput [(ngModel)]="term">
        </mat-form-field>
        <button mat-fab extended color="normal"
              [ngClass]="{ 'inactive-background': isInactiveDisplayed}"
              (click)="displayInactive()">
          @if (isInactiveDisplayed) {
            <mat-icon>close</mat-icon>
          } @else {
            <mat-icon>filter_list</mat-icon>
          }
          @if (isInactiveDisplayed) {
            <span>Hide Inactive</span>
          } @else {
            <span>Show Inactive</span>
          }
        </button>
      </div>
    </header>

    <section class="content-records" fxLayout="row wrap" fxLayoutGap="8px grid">
      <div fxFlex="50%" fxFlex.lt-sm="100%" *ngFor="let customer of customers; trackBy: trackByCustomerGuid">
        <mat-card  class="mat-elevation-z16">
          <mat-card-header>
            <mat-card-title>{{ customer.name }}</mat-card-title>
          </mat-card-header>
          <mat-card-actions fxLayoutAlign="space-between center">
            <button mat-button [routerLink]="['/customers/edit', customer.id]">UPDATE</button>
            <mat-chip>
              {{ customer.active ? "Active" : "Inactive" }}
            </mat-chip>
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

    .my-form-field .mat-form-field-wrapper {
      margin-bottom: -1.25em;
    }

    mat-divider {
      margin: .5rem 0rem 1rem 0rem;
    }

    .mat-mdc-fab.mat-primary {
      margin-right: 0px;
    }

    .mdc-fab--extended {
      margin-top: .4rem;
      height: 40px;
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

    mat-card-title {
      color: #607ec9;
      margin: 0rem 0rem -.6rem 0rem;
      padding: 0px;
    }

    .mat-mdc-card-header {
      padding: .3rem 1rem;
    }

    .mat-mdc-button {
      background-color: #607ec9;
      color: white;
    }

    .inactive-background {
      background-color: #607ec9;
    }

    @media (max-width: 600px) {
      mat-card {
        width: 100%;
      }

      .add-button {
        margin: 1rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent {
  @Input() customers!: Customer[] | null;
  @Output() public changeSearchTerm = new EventEmitter<string>();
  @Output() public showInactive = new EventEmitter<boolean>();

  private _term: string;
  public isInactiveDisplayed: boolean = false;

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

  public displayInactive(): void {
    this.isInactiveDisplayed = !this.isInactiveDisplayed;
    this.showInactive.emit(this.isInactiveDisplayed);
  }

}
