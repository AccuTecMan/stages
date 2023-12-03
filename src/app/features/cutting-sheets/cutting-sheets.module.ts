import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';

import { CuttingSheetsContainer } from './containers/cutting-sheets.container';
import { CuttingSheetsComponent } from './containers/components/cutting-sheets.component';
import { reducer, featureName, CuttingSheetsEffects } from './store';
import { JobTypesGuard, TypeStagesGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [JobTypesGuard, TypeStagesGuard],
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

    CommonModule, ReactiveFormsModule,
    AppCommonModule, BaseModule]
})
export class CuttingSheetsModule {}
