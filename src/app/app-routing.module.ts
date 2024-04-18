import { NgModule } from '@angular/core';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/authentication/components';
import { ErrorContainer } from './error.container';

const redirectLoggedInMainPage = () => redirectLoggedInTo(['customers']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const adminOnly = () => hasCustomClaim('admin');

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/cutting-sheets/cutting-sheets.module').then((m) => m.CuttingSheetsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customer.module').then((m) => m.CustomersModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'cuttingSheets',
    loadChildren: () => import('./features/cutting-sheets/cutting-sheets.module').then((m) => m.CuttingSheetsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInMainPage),
  },
  {
    path: 'error',
    component: ErrorContainer,
    data: { allowAnonymous: true },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
