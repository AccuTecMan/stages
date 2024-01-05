import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CuttingSheet, Stage } from '../../models';

@Component({
  selector: 'app-cutting-sheets-stages-component',
  template: `
    <section class="breadcrumb">
      <button mat-button routerLink="/cuttingSheets">
        <mat-icon>arrow_back_ios</mat-icon>
        All Cutting Sheets
      </button>
    </section>
    <header class="content-header">
      <h1>Stages</h1>
      <mat-divider></mat-divider>
      <h2>{{ selectedSheet?.jobName }}</h2>
      <h3>PO#:{{ selectedSheet?.poNumber }}</h3>
    </header>
    <mat-stepper orientation="vertical" linear="true">
      @for (stage of stages; track selectedSheet?.stages ) {
        <mat-step [label]="stage.stage" fxLayoutAlign="start space-between">
          {{ stage.notes}}
          <!-- <div  class="buttons-section"> -->
            <button mat-raised-button matStepperPrevious [disabled]="!stage.canGoBack">
              Back
            </button>
            <button mat-raised-button matStepperNext color="primary" [disabled]="!stage.canGoForward">
              Next
            </button>
          <!-- </div> -->
        </mat-step>
      }
    </mat-stepper>
    `,
  styles: [`
    .breadcrumb {
      width: 100%;
      background-color: #A9A9A9;
    }

    .breadcrumb > button {
      width: 150px;
      margin-left: .1rem;
      padding: 0px;
    }

    h1 {
      font-size: 2rem;
      margin: 0;
    }

    h2 {
      margin: 0;
    }

    mat-divider {
      margin: .5rem 0;
    }

    .content-header {
      margin: 1.3rem 1rem 0rem 1rem !Important;
      max-width: 850px;
    }

    mat-form-field, mat-checkbox {
      width: 300px;
      margin-left: 3rem;
    }

    button {
      width: 100px;
      margin-right: 1rem;
    }

    .buttons-section {
      margin-top: 0;
    }

    .mat-icon {
      margin: 0;
    }

    mat-stepper {
      max-width: 850px;
      margin: 0 1rem;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 1.5rem;
        padding: 0;
        margin: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuttingSheetsStagesComponent {
  @Input() selectedSheet: CuttingSheet | null | undefined;

  public stages: Stage[];

  constructor() {}

  ngOnInit() {
    this.stages = this.selectedSheet?.stages.slice().sort((a, b) =>  (a.order < b.order ? -1 : 1))!;
  }
}
