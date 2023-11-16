import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { HeaderComponent } from './components/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
  exports: [HeaderComponent, FlexLayoutModule, MaterialModule],
})
export class AppCommonModule {}
