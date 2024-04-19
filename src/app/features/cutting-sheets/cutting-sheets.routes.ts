import { Routes } from '@angular/router';
import { CustomersGuard, JobTypesGuard, StageTemplatesGuard, StageMapGuard } from '@app/base/guards';
import { AddEditContainer, ListContainer, StagesContainer } from './containers';
import { SelectSheetGuard } from './guards/select-sheet.guard';
import { CuttingSheetsGuard } from './guards/cutting-sheets.guard';
import { provideState } from '@ngrx/store';
import { cuttingSheetsFeatureName, cuttingSheetsReducer } from './store/reducers/reducer';
import { provideEffects } from '@ngrx/effects';
import { CuttingSheetsEffects } from './store/effects/effects';

const cuttingSheetsRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(cuttingSheetsFeatureName, cuttingSheetsReducer),
      provideEffects([CuttingSheetsEffects])
    ],
    canActivate: [
      StageTemplatesGuard,
      JobTypesGuard,
      CustomersGuard,
      CuttingSheetsGuard,
      StageMapGuard
    ],
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

export default cuttingSheetsRoutes;
