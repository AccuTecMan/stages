import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './authentication/components';
import * as coreStore from './store';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [CommonModule, StoreModule.forFeature('core', coreStore.reducer), ReactiveFormsModule, MaterialModule, LoginComponent],
})
export class CoreModule {}
