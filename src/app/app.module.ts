import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppCommonModule } from './common/app-common.module';
import { AuthService } from '@core/services';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Firebase
    provideFirebaseApp(() => initializeApp({"projectId":"stages-dev-c0a0e","appId":"1:559899214828:web:0d187dbb9b3f334a8ab6c9","storageBucket":"stages-dev-c0a0e.appspot.com","apiKey":"AIzaSyCSNkj4ScNvxrxq8pmRdcsYptzbWHU8a3g","authDomain":"stages-dev-c0a0e.firebaseapp.com","messagingSenderId":"559899214828"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Store
    StoreModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    connectInZone: true}),

    // Custom
    AppRoutingModule,
    AppCommonModule,
    CoreModule
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'session' }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
