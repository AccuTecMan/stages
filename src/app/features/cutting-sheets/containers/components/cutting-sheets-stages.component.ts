import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CuttingSheet, Stage, TimeStamp } from '../../models';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { StageMap } from '@app/base/models';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { CloseDialogComponent } from './close-dialog.component';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';

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
      @for (stage of selectedSheetStages; track stage.id) {
        <mat-step [label]="stage.stageMap.id + '|' + stage.stageMap.name + '|' + stage.id" fxLayoutAlign="start space-between" [editable]="selectedSheet?.isActive">

          <ng-template matStepLabel>
            <div style="font-size: 1.2rem;">{{ stage.stageMap.name }}</div>
            @if (isValidDate(stage.date)) {
              <span class="step-date">{{ convertToTimestamp(stage.date) | date: 'MMM d, y, h:mm a' }}</span>
            }
            @if (!selectedSheet?.isActive || !isCurrentStage(stage.stageMap.id)) {
              <p class="step-notes">{{ stage.notes }}</p>
            }
          </ng-template>

          <ng-template matStepContent>
            @if (selectedSheet?.isActive) {
              <mat-form-field>
                <input matInput placeholder="Notes" [value]="stage.notes || ''" (change)="onChangeNotes($event)"/>
              </mat-form-field>
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
          </ng-template>
        </mat-step>
      }
    </mat-stepper>
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
        margin-top: .7rem;
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

      .mat-form-field-wrapper {
        margin-bottom: -1.25em;
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
  @Input() selectedSheetStages: Stage[] | null | undefined;
  @Output() public changeStage = new EventEmitter<CuttingSheet | null>();
  @ViewChild('stepper') private myStepper: MatStepper;

  public stepperIndex: number;
  private stageNotes: string;

  constructor(private router: Router,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.stepperIndex = this.selectedSheet?.currentStage.index || 0;
    this.stageNotes = this.getStageNotes(this.selectedSheet?.currentStage.id);
  }

  onStepChange(event: StepperSelectionEvent): void {
    const stageData = event.selectedStep.label.split('|');
    const newCurrentStage = <StageMap>{ id: stageData[0], name: stageData[1], index: event.selectedIndex };
    const previousStageData = event.previouslySelectedStep.label.split('|');

    this.saveNotes(previousStageData[2], true, newCurrentStage)
    this.stageNotes = this.getStageNotes(stageData[0]);
  }

  public convertToTimestamp(timestamp: TimeStamp): Date {
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
    const date = this.convertToTimestamp(timestamp);
    return date > new Date(2000, 1, 1);
  }

  getNewStages(id: string): Stage[] | undefined{
    const current_timestamp = Timestamp.now();
    return this.selectedSheetStages?.map((x: Stage) => {
      return x.id === id ?<Stage>{ ...x, date: current_timestamp, notes: this.stageNotes } : x;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      data: { id: this.selectedSheet?.id, jobName: this.selectedSheet?.jobName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result)
      if (!result) return;
      const lastStageIndex = (this.selectedSheetStages?.length || 0) - 1;
      const lastStage = this.selectedSheetStages ? this.selectedSheetStages[lastStageIndex] : null;
      const newCurrentStage = <StageMap>{ id: lastStage?.stageMap.id, name: lastStage?.stageMap.name, index: lastStageIndex };
      const stageId = this.selectedSheetStages?.filter((s, i, a) => i === a.length -1).map(x => x.id)[0] || '';
      this.saveNotes(stageId, true, newCurrentStage);
      this.router.navigate(['cuttingSheets']);
    });
  }

  private saveNotes(id: string, isActive: boolean, newCurrentStage: StageMap): void {
    const newStages = this.getNewStages(id);
    this.selectedSheet = <CuttingSheet>{
      ...this.selectedSheet,
      isActive: isActive,
      stages: newStages,
      currentStage: newCurrentStage
    };
    this.changeStage.emit(this.selectedSheet);
  }

  public isCurrentStage(stepStage: string): boolean {
    return this.selectedSheet?.currentStage.id === stepStage;
  }

  public onChangeNotes(event) {
    this.stageNotes = event.target.value;
  }

  private getStageNotes(id): string {
    return this.selectedSheetStages?.filter(x => x.stageMap.id === id).map(x => x.notes)[0] || '';
  }
}
