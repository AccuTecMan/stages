import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';

import { OverviewComponent } from './containers/components/overview.component';
import { OverviewContainer } from './containers/overview.container';

const routes: Routes = [{ path: '', component: OverviewContainer }];

@NgModule({
  declarations: [OverviewContainer, OverviewComponent],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, AppCommonModule, BaseModule],
})
export class OverviewModule {}
