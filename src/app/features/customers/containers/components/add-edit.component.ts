import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '@app/base/services';
import { Customer } from '@app/base/models';


@Component({
  selector: 'app-customer-add-edit',
  template: `
    <section class="breadcrumb">
      <button mat-button routerLink="/customers">
        <mat-icon>arrow_back_ios</mat-icon>
        All Customers
      </button>
    </section>
    <header class="content-header">
      @if (isEditing) {
        <h1>Update Customer</h1>
      } @else {
        <h1>Add Customer</h1>
      }
      <mat-divider></mat-divider>
    </header>
    <form [formGroup]="form" fxLayout="column" fxLayoutGap="8px">
      <mat-checkbox formControlName="isActive">Is active?</mat-checkbox>
      <mat-form-field>
        <mat-label>Customer</mat-label>
        <input matInput formControlName="name">
        @if (form.get('name')!.hasError('required')) {
          <mat-error>
            Name is required
          </mat-error>
        }
      </mat-form-field>
      <div fxLayout="row" fxLayoutAlign="start start" class="buttons-section">
        <button mat-raised-button routerLink="/customers">
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
  form: UntypedFormGroup;
  public customerId: string;
  public isEditing: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CustomerService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      isActive: ['true']
    });

    this.route.params.subscribe(params => {
        this.customerId = params['id'] || null;
        this.isEditing = !!this.customerId && this.customerId.length > 0

        if (this.isEditing) {
          this.service.get(this.customerId).subscribe((x: any) => {
            this.form.controls['name'].setValue(x.name);
            this.form.controls['isActive'].setValue(x.active);
          });
        }
    });
  }

  get name() {
    return this.form.controls['name'];
  }

  public save() {
    const customer = <Customer>{
      name: this.form.value.name,
      active: this.form.value.isActive
    }

    if (this.isEditing) {
      this.service.update(customer, this.customerId);
    } else {
      this.service.create(customer);
    }
    this.router.navigate(['/', 'customers']);
  }
}
