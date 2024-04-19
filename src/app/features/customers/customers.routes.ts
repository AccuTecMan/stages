import { Routes } from '@angular/router';
import { CustomersGuard } from '@app/base/guards';
import { CustomerContainer } from './containers/customers.container';
import { AddEditComponent } from '../cutting-sheets/containers';

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
