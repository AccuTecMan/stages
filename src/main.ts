import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { reducers } from '@app/store';
import { ErrorContainer } from '@app/error.container';
import { LoginComponent, coreFeatureName, coreReducer } from '@app/core';
import { baseFeatureName, baseReducer } from '@app/base/store/reducers/feature.reducer';
import { BaseEffects } from '@app/base/store/effects/effects';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

const redirectLoggedInMainPage = () => redirectLoggedInTo(['customers']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const adminOnly = () => hasCustomClaim('admin');

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/features/cutting-sheets/cutting-sheets.routes'),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'customers',
    loadChildren: () => import('./app/features/customers/customers.routes'),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'cuttingSheets',
    loadChildren: () => import('./app/features/cutting-sheets/cutting-sheets.routes'),
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

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          // Firebase
          provideFirebaseApp(() =>initializeApp(environment.firebase)),
          provideAuth(() => getAuth()),
          provideFirestore(() => getFirestore()),

          FlexLayoutModule
        ),
        provideStore(reducers),
        provideState(baseFeatureName, baseReducer),
        provideState(coreFeatureName, coreReducer),
        provideEffects(BaseEffects),
        provideRouterStore({
          stateKey: 'router',
        }),
        provideStoreDevtools({
          maxAge: 30,
          logOnly: environment.production,
        }),
        provideRouter(routes),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
