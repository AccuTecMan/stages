import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer, featureName, CuttingSheetsEffects } from './store';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(featureName, reducer),
    EffectsModule.forFeature([CuttingSheetsEffects]),
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
})
export class BaseModule {}
