import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { HeaderComponent } from './components/header.component';
import { SidenavListComponent } from './components/sidenav-list.component';

@NgModule({
    imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule, HeaderComponent, SidenavListComponent],
    exports: [HeaderComponent, FlexLayoutModule, MaterialModule, SidenavListComponent],
})
export class AppCommonModule {}
