import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuttingSheetsService } from '../../services';
import { CuttingSheet } from '../../models';
import { Customer } from '@app/base/models';


@Component({
  selector: 'app-cutting-sheets-add-edit',
  template: `
    <section class="breadcrumb">
      <button mat-button routerLink="/cuttingSheets">
        < All Cutting Sheets
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
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name">
        @if (form.get('name')!.hasError('required')) {
          <mat-error>
            Name is required
          </mat-error>
        }
      </mat-form-field>
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
  @Input() customers: Customer[] | null | undefined;

  form: UntypedFormGroup;
  public cuttingSheetId: string;
  public isEditing: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CuttingSheetsService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.route.params.subscribe(params => {
        this.cuttingSheetId = params['id'] || null;
        this.isEditing = this.cuttingSheetId?.length > 0

        if (this.isEditing) {
          this.service.get(this.cuttingSheetId).subscribe((x: any) => {
            this.form.controls['name'].setValue(x.jobName);
          });
        }
    });
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
}
