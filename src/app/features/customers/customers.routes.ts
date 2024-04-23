import { Routes } from '@angular/router';
import { CustomersGuard } from '@app/base/guards';
import { CustomerContainer, AddEditComponent } from './containers';
// import { AddEditComponent } from './containers';
// import { AddEditComponent } from '../cutting-sheets/containers';

const customerRoutes: Routes = [
  {
    path: '',
    canActivate: [CustomersGuard],
    children: [
      {
        path: '',
        component: CustomerContainer,
      },
      {
        path: 'add',
        component: AddEditComponent,
      },
      {
        path: 'edit/:id',
        component: AddEditComponent,
      },
    ],
  },
];

export default customerRoutes;
