import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CuttingSheet, SearchCriteria } from '../../models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cutting-sheets-component',
  template: `
    <header class="content-header">
      <div fxLayout="row" fxLayoutAlign="space-between center">
        <h1>Cutting Sheets</h1>
        <button mat-fab extended routerLink="/customers/add">
          <mat-icon>add</mat-icon>
          Add New
        </button>
      </div>
      <mat-divider></mat-divider>
      <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="12px">
        <mat-form-field>
          <input matInput placeholder="Job Name" [(ngModel)]="term">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Ready by</mat-label>
          <mat-select [(value)]="readyBySelected" (selectionChange)="selectBy(readyBySelected)">
            @for (readyBy of readyByOptions; track readyBy) {
              <mat-option [value]="readyBy.value">{{readyBy.view}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>
    </header>

    @if (isLoading) {
      <mat-spinner fxLayout="row" fxLayoutAlign="start start" diameter="60" strokeWidth="5">
      </mat-spinner>
    } @else {
    <section class="content-records" fxLayout="row wrap" fxLayoutGap="8px grid">
      <div fxFlex="50%" fxFlex.lt-sm="100%"
            *ngFor="let sheet of cuttingSheets; trackBy: trackByCuttingSheetGuid">
        <mat-card  class="mat-elevation-z16">
          <mat-card-header>
            <mat-card-title>{{ sheet.jobName }}</mat-card-title>
            <mat-card-subtitle>PO#: {{ sheet.poNumber }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content fxLayout="row wrap" fxLayoutGap="15px">
            <dl>
              <dt>Job Type</dt>
              <dd>{{ sheet.jobType.name }}</dd>
            </dl>
            <dl>
              <dt>Color</dt>
              <dd>{{ sheet.color }}</dd>
            </dl>
            <dl>
              <dt>Customer</dt>
              <dd>{{ sheet.customer.name }}</dd>
            </dl>
            <dl>
              <dt>Ready By</dt>
              <dd>{{ sheet.readyBy.toDate() | date:'MMM-dd-yyyy' }}</dd>
            </dl>
          </mat-card-content>
          <mat-card-actions fxLayoutAlign="space-between center">
            <button mat-button [routerLink]="['/customers/edit', sheet.id]">UPDATE</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>
    }
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

    .mat-mdc-fab.mat-primary {
      margin-right: 0px;
    }

    .mdc-fab--extended {
      height: 40px;
    }

    mat-card-title {
      color: #607ec9;
      margin: 0rem 0rem -.6rem 0rem;
      padding: 0px;
    }

    mat-card-subtitle {
      color: #5f8bc3;
    }

    dl {
      margin: .5rem 0rem 0rem 1rem;
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
      margin: .5rem 0rem 1rem 0rem;
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
      background-color: #607ec9;
      color: white;
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
  @Input() cuttingSheets!: CuttingSheet[] | null | undefined;
  @Input() isLoading: boolean | null;
  @Output() public changeSearchTerm = new EventEmitter<string>();
  @Output() public changeSearchCriteria = new EventEmitter<SearchCriteria>();

  public readyByOptions = [
    {value: 0, view: 'Today'},
    {value: 1, view: 'Yesterday'},
    {value: 2, view: 'This week'},
    {value: 3, view: 'Last 7 days'},
    {value: 4, view: 'Last 15 days'},
    {value: 5, view: 'Last 30 days'},
    {value: 6, view: 'All'},
  ]
  public readyBySelected = 0;
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

  public trackByCuttingSheetGuid(index: number, cuttingSheet: CuttingSheet) {
    return cuttingSheet.id;
  }

  public selectBy(option: any) {
    const criteria: SearchCriteria = {
      customerId: undefined,
      readyByOption: option
    }
    this.changeSearchCriteria.emit(criteria);
  }

}
