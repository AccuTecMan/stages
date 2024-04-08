import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CuttingSheet } from "../../models";

@Component({
  selector: 'app-close-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.jobName }}</h2>
    <mat-dialog-content>
      <p>Do you really want to close this Cutting Sheet?</p>
    </mat-dialog-content>
    <mat-dialog-actions fxLayout="row wrap" fxFlexFill fxLayoutAlign="end end" fxLayoutGap="20px grid">
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button mat-raised-button color="primary" [mat-dialog-close]="data.id" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styles: [`
    h2 {
      background-color: #D3D3D3;
    }
  `]
})
export class CloseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CloseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CuttingSheet) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
