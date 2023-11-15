import { NgModule } from '@angular/core';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/authentication/components';
import { ErrorContainer } from './error.container';

const redirectLoggedInToOverview = () => redirectLoggedInTo(['overview']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const adminOnly = () => hasCustomClaim('admin');

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/overview/overview.module').then((m) => m.OverviewModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'overview',
    loadChildren: () => import('./features/overview/overview.module').then((m) => m.OverviewModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToOverview),
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
