import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BaseModule } from '@base/base.module';
import { AppCommonModule } from '@common/app-common.module';

import { ListContainer } from './containers/list.container';
import { ListComponent } from './containers/components/list.component';
import { CuttingSheetsEffects, featureName, reducer } from './store';
import { CuttingSheetsGuard } from './guards/cutting-sheets.guard';
import { CustomersGuard, JobTypesGuard, StageTemplatesGuard } from '@app/base/guards';
import { AddEditComponent } from './containers/components/add-edit.component';
import { AddEditContainer } from './containers/add-edit.container';

const routes: Routes = [
  {
    path: '',
    canActivate: [
      StageTemplatesGuard,
      JobTypesGuard,
      CustomersGuard,
      CuttingSheetsGuard
    ],
    children: [
      {
        path: '',
        component: ListContainer
      },
      {
        path: 'add',
        component: AddEditContainer
      },
      {
        path: 'edit/:id',
        component: AddEditContainer
      }
    ]
  }
];

@NgModule({
  declarations: [
    ListContainer,
    AddEditContainer,
    AddEditComponent,
    ListComponent
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
