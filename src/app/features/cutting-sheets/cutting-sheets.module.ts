import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';

import { CuttingSheetsContainer } from './containers/cutting-sheets.container';
import { CuttingSheetsComponent } from './containers/components/cutting-sheets.component';

const routes: Routes = [{ path: '', component: CuttingSheetsContainer }];

@NgModule({
  declarations: [
    CuttingSheetsContainer,
    CuttingSheetsComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, AppCommonModule, BaseModule]
})
export class CuttingSheetsModule {}
