import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CuttingSheet } from '../../models';

@Component({
  selector: 'app-cutting-sheets-component',
  template: `
    <header class="content-header">
      <h1>Cutting Sheets</h1>
      <mat-divider></mat-divider>
      <div fxLayout="row" fxLayoutAlign="space-between start">
        <mat-form-field>
          <input matInput placeholder="Job Name" [(ngModel)]="term">
        </mat-form-field>
        <button mat-fab extended color="primary" class="add-button" routerLink="/customers/add">
          <mat-icon>add</mat-icon>
          Add New
        </button>
      </div>
    </header>

    <section class="content-records" fxLayout="row wrap" fxLayoutGap="8px grid">
      <div fxFlex="50%" fxFlex.lt-sm="100%" *ngFor="let sheet of cuttingSheets; trackBy: trackByCustomerGuid">
        <mat-card  class="mat-elevation-z16">
          <mat-card-header>
            <mat-card-subtitle>PO#: {{ sheet.poNumber }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content fxLayout="row wrap" fxLayoutGap="15px">
            <dl>
              <dt>Job Type</dt>
              <dd>{{sheet.jobType.name}}</dd>
            </dl>
            <dl>
              <dt>Color</dt>
              <dd>{{sheet.color}}</dd>
            </dl>
            <dl>
              <dt>Customer</dt>
              <dd>{{sheet.customer.name}}</dd>
            </dl>
          </mat-card-content>
          <mat-card-actions fxLayoutAlign="space-between center">
            <button mat-button color="primary" [routerLink]="['/customers/edit', sheet.id]">UPDATE</button>
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

    mat-card-title {
      color: #4171ae;
      margin: 0rem 0rem -.6rem 0rem;
      padding: 0px;
    }

    mat-card-subtitle {
      color: #4171ae;
    }

    dl {
      margin: .1rem 0rem 0rem 1rem;
    }

    dt {
      color: gray;
    }

    dd {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0rem 0rem 1rem 0rem;
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
export class CuttingSheetsComponent {
  @Input() cuttingSheets!: CuttingSheet[] | null;
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

  public trackByCustomerGuid(index: number, cuttingSheet: CuttingSheet) {
    return cuttingSheet.id;
  }

}
