import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { CoreModule } from '@core/core.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          BrowserModule,
          AppRoutingModule,
          // Firebase
          provideFirebaseApp(() =>initializeApp(environment.firebase)),
          provideAuth(() => getAuth()),
          provideFirestore(() => getFirestore()),
          // Store
          StoreModule.forRoot(),
          EffectsModule.forRoot([]),
          StoreRouterConnectingModule.forRoot(),
          StoreDevtoolsModule.instrument({
              maxAge: 30,
              logOnly: environment.production,
          }),
          // Custom
          AppRoutingModule,
          CoreModule
        ),
        provideRouter(routes),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
