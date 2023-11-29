import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';
import { CustomerContainer } from './containers/customers.container';
import { CustomerComponent } from './containers/components/customer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as customersStore from './store';
import { CustomersGuard } from './guards';
import { AddEditComponent } from './containers/components/add-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [CustomersGuard],
    children: [
      {
        path: '',
        component: CustomerContainer
      },
      {
        path: 'add',
        component: AddEditComponent
      },
      {
        path: 'edit/:id',
        component: AddEditComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    CustomerContainer,
    CustomerComponent,
    AddEditComponent
  ],
  imports: [
    StoreModule.forFeature('customers', customersStore.reducer),
    EffectsModule.forFeature([customersStore.CustomersEffects]),
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    AppCommonModule,
    BaseModule,
    FormsModule
  ],
})
export class CustomersModule {}
