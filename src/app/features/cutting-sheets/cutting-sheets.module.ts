import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';

import { CuttingSheetsContainer } from './containers/cutting-sheets.container';
import { CuttingSheetsComponent } from './containers/components/cutting-sheets.component';
import { CuttingSheetsEffects, featureName, reducer } from './store';
import { CuttingSheetsGuard } from './guards/cutting-sheets.guard';
import { CustomersGuard } from '@app/base/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [CustomersGuard, CuttingSheetsGuard],
    children: [
      {
        path: '',
        component: CuttingSheetsContainer
      },
    ]
  }
];

@NgModule({
  declarations: [
    CuttingSheetsContainer,
    CuttingSheetsComponent
  ],
  imports: [
    StoreModule.forFeature(featureName, reducer),
    EffectsModule.forFeature([CuttingSheetsEffects]),
    RouterModule.forChild(routes),

    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppCommonModule,
    BaseModule,
    FormsModule
  ]
})
export class CuttingSheetsModule {}
