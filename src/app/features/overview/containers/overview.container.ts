import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-overview-container',
  template: ` <app-overview-component></app-overview-component> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewContainer {}
