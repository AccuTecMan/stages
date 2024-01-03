import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CuttingSheet, SearchCriteria } from '../../models';
import { Customer } from '@app/base/models';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cutting-sheets-list-component',
  template: `
    <header class="content-header">
      <div fxLayout="row" fxLayoutAlign="space-between center">
        <h1>Cutting Sheets</h1>
        <button mat-fab extended routerLink="/cuttingSheets/add">
          <mat-icon>add</mat-icon>
          Add New
        </button>
      </div>
      <mat-divider></mat-divider>
      <div fxLayoutAlign="start center" fxLayoutGap="12px">
        <mat-form-field fxFlex="20">
          <input matInput placeholder="PO# or Job Name" [(ngModel)]="term">
        </mat-form-field>
        <mat-form-field fxFlex="30">
          <mat-label>Ready by</mat-label>
          <mat-select [(value)]="readyBySelected" (selectionChange)="changeCriteria()">
            @for (readyBy of readyByOptions; track readyBy) {
              <mat-option [value]="readyBy.value">{{readyBy.view}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field fxFlex="50">
          <mat-label>Customer</mat-label>
          <input type="text" matInput [matAutocomplete]="auto" [formControl]="myControl">
          <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn"
            (optionSelected)='changeCustomer($event.option.value)'>
            @for (customer of filteredCustomers$ | async; track customer) {
              <mat-option [value]="customer">{{customer.name}}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      </div>
    </header>
    @if (isLoading) {
      <mat-spinner fxLayoutAlign="center start" diameter="80" strokeWidth="5"></mat-spinner>
    } @else {
      <section class="content-records" fxLayout="row wrap" fxLayoutGap="8px grid">
        @for (sheet of cuttingSheets; track trackByCuttingSheetGuid($index, sheet)) {
          <div fxFlex="50%" fxFlex.lt-sm="100%">
            <mat-card  class="mat-elevation-z26" [routerLink]="['/cuttingSheets/stages', sheet.id]">
              <mat-card-header fxLayout="row" fxLayoutAlign="space-between start">
                  <mat-card-title>{{ sheet.jobName }}</mat-card-title>
                  <mat-card-subtitle>PO#: {{ sheet.poNumber }}</mat-card-subtitle>
                  <button mat-button class="button-update" [routerLink]="['/cuttingSheets/edit', sheet.id]">UPDATE</button>
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
                <dl>
                  <dt>Current Stage</dt>
                  <dd>{{ sheet.currentStage.stage }}</dd>
                </dl>
              </mat-card-content>
              <!-- <mat-card-actions fxLayoutAlign="space-between end">
                <button mat-button class="button-update" [routerLink]="['/cuttingSheets/edit', sheet.id]">UPDATE</button>
              </mat-card-actions> -->
            </mat-card>
          </div>
        } @empty {
          <p class='no-records'>No records found</p>
        }
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

    .content-records {
      margin: 0rem 0rem 2rem 1rem !Important;
      max-width: 850px;
    }

    mat-card-actions {
      margin-top: auto;
    }

    mat-card {
      min-width: 350px;
      min-height: 160px;
      cursor: pointer;
    }

    .mat-mdc-fab.mat-primary {
      margin-right: 0px;
    }

    .mdc-fab--extended {
      height: 40px;
    }

    mat-card-title {
      color: #607ec9;
      margin: -.5rem 0rem 0 0rem;
      padding: 0px;
      line-height: 90%;
    }

    mat-card-subtitle {
      color: #5f8bc3;
    }

    dl {
      margin: .3rem 0rem 0rem .4rem;
    }

    dt {
      color: gray;
    }

    dd {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0rem 0rem .1rem 0rem;
    }

    mat-divider {
      margin: .5rem 0rem 1rem 0rem;
    }

    .mat-mdc-form-field {
      width: 150px;
    }

    .mat-mdc-button {
      color: #607ec9;
    }

    .button-update {
      background-color: #607ec9;
      color: white;
      margin-top: -.5rem;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 1.5rem;
        padding: 0px;
        margin: 0;
      }

      mat-card {
        width: 100%;
      }

      .mdc-fab--extended {
        height: 30px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() cuttingSheets!: CuttingSheet[] | null | undefined;
  @Input() isLoading: boolean | null;
  @Input() customers: Customer[] | null | undefined;
  @Input() searchCriteria: SearchCriteria | null | undefined;
  @Output() public changeSearchTerm = new EventEmitter<string>();
  @Output() public changeSearchCriteria = new EventEmitter<SearchCriteria>();

  myControl = new FormControl();
  public filteredCustomers$: Observable<Customer[]> = this.myControl.valueChanges.pipe(
    startWith(''), map(value => this._filter(value || '')),
  );

  constructor() {}

  ngOnInit() {
    if (!!this.customers && this.customers[0].id != '0') {
      this.customers?.unshift({ id: '0', name: 'All', active: true })
    }

    this.selectedCustomer = this.searchCriteria?.customerId || '';
    this.readyBySelected = this.searchCriteria?.readyByOption || 0;
    this.changeCriteria();

    if (this.selectedCustomer.length > 0) {
      const previousSelectedCustomer = this.customers?.find(x => x.id === this.selectedCustomer);
      this.myControl.setValue(previousSelectedCustomer);
    }
  }

  private _filter(value: string): Customer[] {
    const filterValue = value.toString().toLowerCase();
    return this.customers?.filter(option => option.name.toLowerCase().includes(filterValue) ||
                                            option.id.toLowerCase().includes(filterValue))!;
  }

  displayFn(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  public readyByOptions = [
    {value: 0, view: 'Today'},
    {value: 1, view: 'Yesterday'},
    {value: 2, view: 'This week (Mon-Today)'},
    {value: 3, view: 'Last 7 days'},
    {value: 4, view: 'Last 15 days'},
    {value: 5, view: 'Last 30 days'},
    {value: 6, view: 'All'},
  ]
  public readyBySelected = 0;
  public selectedCustomer = "0";
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

  public changeCriteria() {
    const criteria: SearchCriteria = {
      customerId: this.selectedCustomer,
      readyByOption: this.readyBySelected
    }
    this.changeSearchCriteria.emit(criteria);
  }

  changeCustomer(customer: Customer) {
    this.selectedCustomer = customer.id;
    this.changeCriteria();
  }

}
