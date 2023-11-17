import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-customer-container',
  template: ` <app-customer-component></app-customer-component> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerContainer {}
