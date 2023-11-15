import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, FlexLayoutModule],
})
export class BaseModule {}
