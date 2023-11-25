import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';
import { CustomerContainer } from './containers/customers.container';
import { CustomerComponent } from './containers/components/customer.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as customersStore from './store';
import { CustomersGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [CustomersGuard],
    component: CustomerContainer
  }];

@NgModule({
  declarations: [
    CustomerContainer,
    CustomerComponent
  ],
  imports: [
    StoreModule.forFeature('customers', customersStore.reducer),
    EffectsModule.forFeature([customersStore.CustomersEffects]),
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    AppCommonModule,
    BaseModule
  ],
})
export class CustomersModule {}
