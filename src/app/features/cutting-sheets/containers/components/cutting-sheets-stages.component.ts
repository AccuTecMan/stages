import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CuttingSheet, Stage, TimeStamp } from '../../models';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StageMap } from '@app/base/models';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { CloseDialogComponent } from './close-dialog.component';
import { Router } from '@angular/router';
import { CuttingSheetsService } from '../../services';

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
    <mat-stepper orientation="vertical" linear="false" #stepper (selectionChange)="onStepChange($event)" [selectedIndex]="stepperIndex">
      @for (stage of stages; track selectedSheet?.stages) {
        <mat-step [label]="stage.stageMap.id + '|' + stage.stageMap.name" fxLayoutAlign="start space-between" [editable]="selectedSheet?.isActive">
          <ng-template matStepLabel>
            <div style="font-size: 1.2rem;">{{ stage.stageMap.name }}</div>
            @if (isValidDate(stage.date)) {
              <span style="font-size: 0.9rem;">{{ convertTimestamp(stage.date) | date: 'MMM d, y, h:mm a' }}</span>
            }
          </ng-template>
          <ng-template matContent>
            <div>Contenido del Stage</div>
          </ng-template>
          <form>
            <mat-form-field>
              <input matInput placeholder="Notes" required />
            </mat-form-field>
          </form>
          @if (selectedSheet?.isActive) {
            <div class="buttons-section">
              @if (!isFirstStep) {
                <button mat-raised-button matStepperPrevious>Previous</button>
              }

              @if (isLastStep) {
                <button mat-raised-button matStepperNext color="primary" (click)="openDialog()">Done</button>
              } @else {
                <button mat-raised-button matStepperNext color="primary">Next</button>
              }
            </div>
          }
        </mat-step>
      }
    </mat-stepper>
    <ng-template #sayHelloTemplate>
      <p> Say Hello</p>
    </ng-template>
  `,
  styles: [
    `
      .breadcrumb {
        width: 100%;
        background-color: #a9a9a9;
      }

      .breadcrumb > button {
        width: 150px;
        margin-left: 0.1rem;
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
        margin: 0.5rem 0;
      }

      .content-header {
        margin: 1.3rem 1rem 0rem 1rem !important;
        max-width: 850px;
      }

      mat-form-field {
        width: 100%;
      }

      button {
        width: 100px;
        margin-right: 1rem;
      }

      .buttons-section {
        margin-top: 1rem;
      }

      .mat-icon {
        margin: 0;
      }

      mat-stepper {
        max-width: 850px;
        margin: 0 1rem;
      }

      .mat-step-header {
        font-size: 1.5rem;
      }

      @media (max-width: 600px) {
        h1 {
          font-size: 1.5rem;
          padding: 0;
          margin: 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuttingSheetsStagesComponent implements OnInit {
  @Input() selectedSheet: CuttingSheet | null | undefined;
  @Output() public changeStage = new EventEmitter<CuttingSheet | null>();
  @Output() public changePreviousStage = new EventEmitter<string>();
  @ViewChild('stepper') private myStepper: MatStepper;
  // @ViewChild('sayHelloTemplate', { read: TemplateRef }) sayHelloTemplate:TemplateRef<any>;

  public stages: Stage[];
  public stepperIndex: number;
  public isEditable: boolean = true;

  constructor(private router: Router,
              public dialog: MatDialog,
              private service: CuttingSheetsService) {}

  ngOnInit() {
    this.stages = this.selectedSheet?.stages.slice().sort((a, b) => (a.order < b.order ? -1 : 1)) || [];
    this.stepperIndex = this.selectedSheet?.currentStage.index || 0;
  }

  onStepChange(event: StepperSelectionEvent): void {
    // event.previouslySelectedStep.stepLabel.template = this.sayHelloTemplate
    // event.previouslySelectedStep.content = this.sayHelloTemplate
    console.log('event', event.previouslySelectedStep);
    const id = event.selectedStep.label.substring(0, event.selectedStep.label.indexOf('|'));
    const name = event.selectedStep.label.substring(event.selectedStep.label.indexOf('|') + 1);
    const newCurrentStage = <StageMap>{ id: id, name: name, index: event.selectedIndex };
    this.selectedSheet = <CuttingSheet>{ ...this.selectedSheet, currentStage: newCurrentStage };
    this.changeStage.emit(this.selectedSheet);
    this.changePreviousStage.emit(this.selectedSheet.id + '|' + event.previouslySelectedStep.label.substring(0, event.previouslySelectedStep.label.indexOf('|')))
  }

  public convertTimestamp(timestamp: TimeStamp): Date {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return new Date(milliseconds);
  }

  public get isFirstStep(): boolean {
    return this.myStepper?.selectedIndex === 0;
  }

  public get isLastStep(): boolean {
    return this.myStepper?.selectedIndex+1 === this.selectedSheet?.stages.length;
  }

  public isValidDate(timestamp: TimeStamp): boolean {
    const date = this.convertTimestamp(timestamp);
    return date > new Date(2000, 1, 1);
  }

  public onStepDone() {
    // console.log(this.myStepper.steps.forEach(x => console.log(x.label)));
    // this._matStepperIntl.optionalLabel = 'Otro dato del Step';
    // // Required for the optional label text to be updated
    // // Notifies the MatStepperIntl service that a change has been made
    // this._matStepperIntl.changes.next();
  }

  openDialog(): void {
    // console.log('this.selectedSheet', this.selectedSheet)
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      data: { id: this.selectedSheet?.id, jobName: this.selectedSheet?.jobName },
    });

    dialogRef.afterClosed().subscribe(id => {
      console.log('The dialog was closed', id);
      this.service.closeSheet(id);
      this.router.navigate(['/cuttingSheets']);
      // this.animal = result;
    });
  }
}
