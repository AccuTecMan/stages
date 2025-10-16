import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CuttingSheet } from '../../models';
import { Customer, JobType, StageMap, StageTemplate } from '@app/base/models';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

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
    <form [formGroup]="form" fxLayout="row wrap" fxLayoutGap="8px" #f="ngForm" (ngSubmit)="f.form.valid && save()">
      <div fxFlex="50%" fxFlex.lt-sm="100%">
        <mat-form-field>
          <mat-label>Job Type</mat-label>
          <mat-select formControlName="jobType" [(value)]="jobTypeSelected.id" (valueChange)="onSelectJobType($event)">
            @for (job of jobTypes; track job.id) {
              <mat-option [value]="job.id">{{ job.name }}</mat-option>
            }
            @if (form.get('name')!.hasError('required')) {
              <mat-error> Job Type is required </mat-error>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Customer</mat-label>
          <mat-select formControlName="customer" [(value)]="customerSelected.id" (valueChange)="onSelectCustomer($event)">
            @for (customer of customers; track customer.id) {
              <mat-option [value]="customer.id">{{ customer.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
          @if (form.get('name')!.hasError('required')) {
            <mat-error> Name is required </mat-error>
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label>PO#</mat-label>
          <input matInput formControlName="poNumber" />
          @if (form.get('poNumber')!.hasError('required')) {
            <mat-error> PO# is required </mat-error>
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label>Color</mat-label>
          <input matInput formControlName="color" />
          @if (form.get('color')!.hasError('required')) {
            <mat-error> Color is required </mat-error>
          }
        </mat-form-field>
        <mat-form-field>
          <mat-label>Notes</mat-label>
          <input matInput formControlName="notes" />
        </mat-form-field>
        <div fxLayout="row" fxLayoutAlign="start start" class="buttons-section">
          <button mat-raised-button routerLink="/cuttingSheets" type="button">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">Save</button>
        </div>
      </div>
    </form>
  `,
    styles: [
        `
      .breadcrumb {
        width: 100%;
        background-color: #a9a9a9;
      }

      .breadcrumb > button {
        width: 150px;
        margin-left: 0.1rem;
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
        margin: 1.3rem 1rem 0rem 1rem !important;
        max-width: 850px;
      }

      mat-form-field,
      mat-checkbox,
      button {
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
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButton,
        RouterLink,
        MatIcon,
        MatDivider,
        ReactiveFormsModule,
        FlexModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatError,
        MatInput,
    ]
})
export class AddEditComponent implements OnInit {
  @Input() selectedSheet: CuttingSheet | null | undefined;
  @Input() customers: Customer[] | null | undefined;
  @Input() jobTypes: JobType[] | null | undefined;
  @Input() templates: StageTemplate[] | null | undefined;
  @Input() isEditing: boolean | null;
  @Output() Save = new EventEmitter<CuttingSheet>();

  form: UntypedFormGroup;
  public jobTypeSelected: JobType;
  public customerSelected: Customer;
  public selectedStage: StageMap;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customers = this.customers?.filter((x) => x.id != '');
    this.form = this.formBuilder.group({
      jobType: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      name: ['', [Validators.required]],
      poNumber: ['', [Validators.required]],
      color: ['', [Validators.required]],
      notes: [''],
    });

    if (this.isEditing) {
      this.customerSelected = <Customer>{
        id: this.selectedSheet?.customer.id,
        name: this.selectedSheet?.customer.name,
      };
      this.jobTypeSelected = <JobType>{
        id: this.selectedSheet?.jobType.id,
        name: this.selectedSheet?.jobType.name,
      };
      this.selectedStage = <StageMap>{
        id: this.selectedSheet?.currentStage.id,
        name: this.selectedSheet?.currentStage.name,
        index: this.selectedSheet?.currentStage.index,
      };
      this.form.controls['jobType'].setValue(this.selectedSheet?.jobType.id);
      this.form.controls['customer'].setValue(this.selectedSheet?.customer.id);
      this.form.controls['name'].setValue(this.selectedSheet?.jobName);
      this.form.controls['poNumber'].setValue(this.selectedSheet?.poNumber);
      this.form.controls['color'].setValue(this.selectedSheet?.color);
      this.form.controls['jobType'].disable();
      this.form.controls['notes'].setValue(this.selectedSheet?.notes);
    } else {
      this.customerSelected = <Customer>{ id: '', name: '' };
      this.jobTypeSelected = <Customer>{ id: '', name: '' };
    }
  }

  get name() {
    return this.form.controls['name'];
  }

  public save() {
    const cuttingSheet = <CuttingSheet>{
      jobName: this.form.value.name,
      poNumber: this.form.value.poNumber,
      customer: this.customerSelected,
      color: this.form.value.color,
      currentStage: this.selectedStage,
      isDone: false,
      notes: this.form.value.notes

    };

    if (!this.isEditing) {
      cuttingSheet.jobType = this.jobTypeSelected;
      cuttingSheet.stages = this.templates?.filter((x) => x.jobType === this.jobTypeSelected.id) || [];
      const firstStage = cuttingSheet.stages.filter(x => x.order === 0).map(c => c.stageMap);
      this.selectedStage = { id: firstStage[0].id, name: firstStage[0].name, index: 0 };
      cuttingSheet.currentStage = this.selectedStage;
    }
    this.Save.emit(cuttingSheet);
  }

  public onSelectCustomer(id: string) {
    this.customerSelected = <Customer>{
      id: id,
      name: this.customers?.find((x) => x.id === id)?.name,
    };
  }

  public onSelectJobType(id: string) {
    this.jobTypeSelected = <JobType>{
      id: id,
      name: this.jobTypes?.find((x) => x.id === id)?.name,
    };
  }
}
