import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuttingSheetsService } from '../../services';
import { CuttingSheet } from '../../models';
import { Customer, JobType } from '@app/base/models';


@Component({
  selector: 'app-cutting-sheets-add-edit',
  template: `
    <section class="breadcrumb">
      <button mat-button routerLink="/cuttingSheets">
        <mat-icon>arrow_back_ios</mat-icon>
        All Cutting Sheets
      </button>
    </section>
    <header class="content-header">
      @if (isEditing) {
        <h1>Update Cutting Sheet</h1>
      } @else {
        <h1>Add a new Cutting Sheet</h1>
      }
      <mat-divider></mat-divider>
    </header>
    <form [formGroup]="form" fxLayout="column" fxLayoutGap="8px">
      <div fxFlex="50%" fxFlex.lt-sm="100%">
        <mat-form-field>
          <mat-label>Job Type</mat-label>
          <mat-select formControlName="jobType" [(value)]="jobTypeSelected">
            @for (job of jobTypes; track trackByjobTypeGuid($index, job)) {
              <mat-option [value]="job.id">{{ job.name }}</mat-option>
            }
            @if (form.get('name')!.hasError('required')) {
              <mat-error>
                Job Type is required
              </mat-error>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Customer</mat-label>
          <mat-select formControlName="customer" [(value)]="customerSelected">
            @for (customer of customers; track trackByCustomerGuid($index, customer)) {
              <mat-option [value]="customer.id">{{ customer.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name">
          @if (form.get('name')!.hasError('required')) {
            <mat-error>
              Name is required
            </mat-error>
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label>PO#</mat-label>
          <input matInput formControlName="poNumber">
          @if (form.get('poNumber')!.hasError('required')) {
            <mat-error>
              PO# is required
            </mat-error>
          }
        </mat-form-field>
      </div>
      <div fxLayout="row" fxLayoutAlign="start start" class="buttons-section">
        <button mat-raised-button routerLink="/cuttingSheets">
          Cancel
        </button>
        <button mat-raised-button color="primary" (click)="save()" [disabled]="!form.valid">
          Save
        </button>
      </div>
    </form>
    `,
  styles: [`
    .breadcrumb {
      width: 100%;
      background-color: #A9A9A9;
    }

    .breadcrumb > button {
      width: 150px;
      margin-left: .1rem;
      padding: 0px;
    }

    h1 {
      font-size: 2rem;
      margin: 0;
    }

    mat-divider {
      margin-bottom: 1rem;
    }

    .content-header {
      margin: 1.3rem 1rem 0rem 1rem !Important;
      max-width: 850px;
    }

    mat-form-field, mat-checkbox, button {
      width: 300px;
      margin-left: 3rem;
    }

    button {
      width: 100px;
    }

    .buttons-section {
      margin-top: 1.5rem;
    }

    .mat-icon {
      margin: 0;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 1.5rem;
        padding: 0;
        margin: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComponent {
  @Input() selectedSheet: CuttingSheet | null | undefined;
  @Input() customers: Customer[] | null | undefined;
  @Input() jobTypes: JobType[] | null | undefined;
  @Input() isEditing: boolean | null;

  form: UntypedFormGroup;
  public cuttingSheetId: string;
  public jobTypeSelected: string;
  public customerSelected: string;

  constructor(private router: Router,
              private service: CuttingSheetsService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customers = this.customers?.filter(x => x.id != '0');
    this.form = this.formBuilder.group({
      jobType: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      name: ['', [Validators.required]],
      poNumber: ['', [Validators.required]],
    });

    if (this.isEditing) {
      this.form.controls['jobType'].setValue(this.selectedSheet?.jobType.id);
      this.form.controls['customer'].setValue(this.selectedSheet?.customer.id);
      this.form.controls['name'].setValue(this.selectedSheet?.jobName);
      this.form.controls['poNumber'].setValue(this.selectedSheet?.poNumber);
    }
  }

  get name() {
    return this.form.controls['name'];
  }

  public save() {
    const cuttingSheet = <CuttingSheet>{
      jobName: this.form.value.name,
    }

    // jobName: string;
    // poNumber: string;
    // customer: Customer;
    // jobType: JobType;
    // color: string;
    // readyBy: any;

    if (this.isEditing) {
      this.service.update(cuttingSheet, this.cuttingSheetId);
    } else {
      this.service.create(cuttingSheet);
    }
    this.router.navigate(['/', 'cuttingSheets']);
  }

  public trackByCustomerGuid(index: number, customer: Customer) {
    return customer.id;
  }

  public trackByjobTypeGuid(index: number, jobType: JobType) {
    return jobType.id;
  }
}
