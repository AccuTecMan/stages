import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BaseModule } from '@base/base.module';


import { ListContainer } from './containers/list.container';
import { ListComponent } from './containers/components/list.component';
import { CuttingSheetsEffects, featureName, reducer } from './store';
import { CuttingSheetsGuard } from './guards/cutting-sheets.guard';
import { CustomersGuard, JobTypesGuard, StageTemplatesGuard } from '@app/base/guards';
import { AddEditContainer, AddEditComponent, StagesContainer, CuttingSheetsStagesComponent } from './containers';
import { SelectSheetGuard } from './guards/select-sheet.guard';
import { StageMapGuard } from '@app/base/guards/stage-map.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [StageTemplatesGuard, JobTypesGuard, CustomersGuard, CuttingSheetsGuard, StageMapGuard],
    children: [
      {
        path: '',
        component: ListContainer,
      },
      {
        path: 'add',
        component: AddEditContainer,
      },
      {
        path: 'edit/:id',
        component: AddEditContainer,
        canActivate: [SelectSheetGuard],
      },
      {
        path: 'stages/:id',
        component: StagesContainer,
        canActivate: [SelectSheetGuard],
      },
    ],
  },
];

@NgModule({
    imports: [
    StoreModule.forFeature(featureName, reducer),
    EffectsModule.forFeature([CuttingSheetsEffects]),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    BaseModule,
    FormsModule,
    ListContainer, AddEditContainer, AddEditComponent, ListComponent, CuttingSheetsStagesComponent, StagesContainer,
],
})
export class CuttingSheetsModule {}
