import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';
import { CustomerContainer } from './containers/customers.container';
import { CustomerComponent } from './containers/components/customer.component';

const routes: Routes = [{ path: '', component: CustomerContainer }];

@NgModule({
  declarations: [
    CustomerContainer,
    CustomerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, ReactiveFormsModule,
    AppCommonModule, BaseModule],
})
export class CustomersModule {}
