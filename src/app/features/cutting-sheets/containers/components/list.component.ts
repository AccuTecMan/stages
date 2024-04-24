import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CuttingSheet, SearchCriteria, TimeStamp } from '../../models';
import { Customer, StageMap } from '@app/base/models';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatFabButton, MatButton } from '@angular/material/button';
import { FlexModule } from '@ngbracket/ngx-layout/flex';

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
      <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="start center">
        <mat-form-field fxFlex="30" fxFlex.lt-sm="50%">
          <mat-label>PO# or Job Name</mat-label>
          <input matInput [(ngModel)]="term" />
        </mat-form-field>
        <button mat-raised-button extended color="normal" [ngClass]="{ 'inactive-background': isDoneDisplayed }" (click)="displayInactive()">
              @if (isDoneDisplayed) {
                <mat-icon>close</mat-icon>
              } @else {
                <mat-icon>filter_list</mat-icon>
              }
              @if (isDoneDisplayed) {
                <span>Hide Done</span>
              } @else {
                <span>Show Done</span>
              }
          </button>
      </div>
      <div fxLayout="row wrap" fxLayoutGap="8px grid" fxLayoutAlign="start start">
        <mat-form-field fxFlex="30" fxFlex.lt-sm="55%">
          <mat-label>Created At</mat-label>
          <mat-select [(value)]="readyBySelected" (selectionChange)="changeCriteria()">
            @for (readyBy of readyByOptions; track readyBy.value) {
              <mat-option [value]="readyBy.value">{{ readyBy.view }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field fxFlex="30" fxFlex.lt-sm="45%">
          <mat-label>Stage</mat-label>
          <mat-select [(value)]="stagesMapSelected" (selectionChange)="changeCriteria()">
            @for (stageMap of stagesMap; track stageMap.id) {
              <mat-option [value]="stageMap.id">{{ stageMap.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field fxFlex="40" fxFlex.lt-sm="55%">
          <mat-label>Customer</mat-label>
          <input type="text" matInput [matAutocomplete]="auto" [formControl]="myControl" (change)="changeCustomer($event)" />
          <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn" (optionSelected)="changeCustomerAuto($event.option.value)">
            @for (customer of filteredCustomers$ | async; track customer.id) {
              <mat-option [value]="customer">{{ customer.name }}</mat-option>
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
            <mat-card class="mat-elevation-z26" [routerLink]="['/cuttingSheets/stages', sheet.id]"
                  [ngClass]="{ 'mat-card-done-background': sheet.isDone, 'mat-card-done-background:hover': sheet.isDone }">
              <mat-card-header fxLayout="row" fxLayoutAlign="space-between start">
                <mat-card-title>{{ sheet.jobName }}</mat-card-title>
                <mat-card-subtitle>PO#: {{ sheet.poNumber }}</mat-card-subtitle>
                <!-- @if (!sheet.isDone) { -->
                  <button mat-button class="button-update" [routerLink]="['/cuttingSheets/edit', sheet.id]">UPDATE</button>
                <!-- } -->
              </mat-card-header>
              <mat-card-content fxLayout="row wrap" fxLayoutGap="15px">
                <dl>
                  <dt>JOB TYPE</dt>
                  <dd>{{ sheet.jobType.name }}</dd>
                </dl>
                <dl>
                  <dt>COLOR</dt>
                  <dd>{{ sheet.color }}</dd>
                </dl>
                <dl>
                  <dt>CUSTOMER</dt>
                  <dd>{{ sheet.customer.name }}</dd>
                </dl>
                <dl>
                  <dt>CREATED AT</dt>
                  <dd>{{ convertTimestamp(sheet.createdAt) | date: 'MMM d, y, h:mm a' }}</dd>
                </dl>
                <dl>
                  <dt>STAGE</dt>
                  <dd>{{ sheet.currentStage.name }}</dd>
                </dl>
                <dl>
                  <dt>NOTES</dt>
                  <dd>{{ sheet.notes }}</dd>
                </dl>
              </mat-card-content>
            </mat-card>
          </div>
        } @empty {
          <p class="no-records">No records found</p>
        }
      </section>
    }
  `,
    styles: [
        `
      h1 {
        font-size: 2rem;
        padding: 0px;
        margin: 0;
      }

      .content-header {
        margin: 1.3rem 1rem 0rem 1rem !important;
        max-width: 850px;
      }

      .content-records {
        margin: 0.5rem 0rem 3rem 1rem !important;
        max-width: 850px;
      }

      mat-card-actions {
        margin-top: auto;
      }

      .mat-mdc-card-content:last-child {
        padding-bottom: 0.5rem;
      }

      mat-card {
        min-width: 340px;
        cursor: pointer;
        background-color: hsl(231, 88%, 96%);
      }

      mat-card:hover {
        background-color: hsl(231, 60%, 85%);
      }

      .mat-card-done-background {
        background-color: hsl(351, 90%, 95%);
      }

      .mat-card-done-background:hover {
        background-color: hsl(351, 60%, 85%);
      }

      .mat-mdc-fab.mat-primary {
        margin-right: 0px;
      }

      .mdc-fab--extended {
        height: 40px;
      }

      mat-card-title {
        font-size: 1.1rem;
        color: hsl(231, 30%, 55%);
        margin: -0.5rem 0rem 0 0rem;
        padding: 0px;
        line-height: 90%;
      }

      mat-card-subtitle {
        color: hsl(231, 30%, 55%);
      }

      dl {
        margin: 0.3rem 0rem 0rem 0.4rem;
      }

      dt {
        font-size: 0.7rem;
        color: gray;
      }

      dd {
        font-weight: 550;
        margin: -0.3rem 0rem 0.1rem 0rem;
      }

      mat-divider {
        margin: 0.5rem 0rem .5rem 0rem;
      }

      .mat-mdc-form-field {
        width: 150px;
        margin-bottom: -1.25em;
      }

      .mat-mdc-button {
        color: hsl(231, 48%, 48%);
      }

      .button-update {
        background-color: hsl(231, 48%, 48%);
        color: white;
        margin-top: -0.5rem;
      }

      .inactive-background {
        background-color: hsl(231, 48%, 48%);
        color: white;
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
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FlexModule,
        MatFabButton,
        RouterLink,
        MatIcon,
        MatDivider,
        MatFormField,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        FormsModule,
        MatButton,
        NgClass,
        ExtendedModule,
        MatSelect,
        MatOption,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatProgressSpinner,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        AsyncPipe,
        DatePipe,
    ],
})
export class ListComponent implements OnInit {
  @Input() cuttingSheets!: CuttingSheet[] | null | undefined;
  @Input() isLoading: boolean | null;
  @Input() customers: Customer[] | null | undefined;
  @Input() stagesMap: StageMap[] | null | undefined;
  @Input() searchCriteria: SearchCriteria | null | undefined;
  @Output() public changeSearchTerm = new EventEmitter<string>();
  @Output() public changeSearchCriteria = new EventEmitter<SearchCriteria>();

  myControl = new FormControl();
  public isDoneDisplayed: boolean = false;
  public filteredCustomers$: Observable<Customer[]> = this.myControl.valueChanges.pipe(
    startWith(''),
    map((value) => this._filter(value || ''))
  );

  constructor() {}

  ngOnInit() {
    if (!!this.customers && this.customers[0].id != '') {
      this.customers?.unshift({ id: '', name: 'All', active: true });
    }

    this.selectedCustomer = this.searchCriteria?.customerId || '';
    this.stagesMapSelected = this.searchCriteria?.stageMapId || '';
    this.readyBySelected = this.searchCriteria?.readyByOption || 0;
    this.isDoneDisplayed = this.searchCriteria?.showDone || false;
    this.changeCriteria();

    if (this.selectedCustomer.length > 0) {
      const previousSelectedCustomer = this.customers?.find((x) => x.id === this.selectedCustomer);
      this.myControl.setValue(previousSelectedCustomer);
    }
  }

  private _filter(value: string): Customer[] {
    const filterValue = value.toString().toLowerCase();
    return (
      this.customers?.filter(
        (option) => option.name.toLowerCase().includes(filterValue) || option.id.toLowerCase().includes(filterValue)
      ) || []
    );
  }

  displayFn(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  public readyByOptions = [
    { value: 0, view: 'All' },
    { value: 1, view: 'Today' },
    { value: 2, view: 'Yesterday' },
    { value: 3, view: 'This week (Mon-Today)' },
    { value: 4, view: 'Last 7 days' },
    { value: 5, view: 'Last 15 days' },
    { value: 6, view: 'Last 30 days' },
  ];
  public readyBySelected = 0;
  public selectedCustomer = '';
  public stagesMapSelected = '';
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
      stageMapId: this.stagesMapSelected,
      readyByOption: this.readyBySelected,
      showDone: this.isDoneDisplayed
    };
    this.changeSearchCriteria.emit(criteria);
  }

  changeCustomer(event: Event) {
    const newCustomerValue = (event.target as HTMLInputElement).value;
    if (newCustomerValue === '') {
      this.selectedCustomer = '';
      this.changeCriteria();
    }
  }

  changeCustomerAuto(customer: Customer) {
    this.selectedCustomer = customer.id;
    this.changeCriteria();
  }

  public convertTimestamp(timestamp: TimeStamp): Date {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return new Date(milliseconds);
  }

  public displayInactive(): void {
    this.isDoneDisplayed = !this.isDoneDisplayed;
    this.changeCriteria();
  }
}
