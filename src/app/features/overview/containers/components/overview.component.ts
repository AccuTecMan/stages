import { Component, ChangeDetectionStrategy } from '@angular/core';
import { addDoc, collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-overview-component',
  template: `
    <header>
      <h1>Overview</h1>
    </header>

    <section class="content" fxLayout="row wrap" fxLayoutAlign="space-evenly center">
      <mat-card class="mat-elevation-z8">
        <mat-card-header fxLayoutAlign="center">
          <mat-card-title>Enter Daily Logs</mat-card-title>
        </mat-card-header>
        <img alt="daily" mat-card-image src="./../assets/images/daily-logs.jpg" />
        <mat-card-actions fxLayoutAlign="center">
          <button type="button" mat-button routerLink="/daily-logs">OPEN</button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="mat-elevation-z8">
        <mat-card-header fxLayoutAlign="center">
          <mat-card-title>Reports</mat-card-title>
        </mat-card-header>
        <img alt="daily" mat-card-image src="./../assets/images/reports.jpg" />
        <mat-card-actions fxLayoutAlign="center">
          <button type="button" mat-button routerLink="/reports">OPEN</button>
        </mat-card-actions>
      </mat-card>
    </section>
    <!-- <button type="button" (click)="create()">Add Log</button> -->
  `,
  styles: [
    `
      mat-card {
        text-align: center;
      }

      .mat-mdc-card-header {
        padding: 0.5rem;
      }

      img {
        min-height: 8vh;
        aspect-ratio: 1.62/1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private logsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.logsCollection = collection(this.firestore, 'dailyLogs');
  }

  create() {
    for (let i = 1; i < this.generateRandomPages(); i++) {
      const today = new Date();
      const nextDay = new Date();
      const dailyLogs = {
        page: i,
        spot: this.getRandomSpot(),
        date: new Date(nextDay.setDate(today.getDate() - 0)),
        aluminumTotalWeight: this.generateRandomDecimalInRangeFormatted(17.2, 60.2, 2),
        aluminumTotalPaid: this.generateRandomDecimalInRangeFormatted(33.2, 151.8, 2),
        aluminumCrvRefund: this.generateRandomDecimalInRangeFormatted(35.2, 115.9, 2),
        aluminumCrvWeight: this.generateRandomDecimalInRangeFormatted(41.3, 102.9, 2),
        glassTotalWeight: this.generateRandomDecimalInRangeFormatted(17.2, 202.2, 2),
        glassTotalPaid: this.generateRandomDecimalInRangeFormatted(31.2, 180.8, 2),
        glassCrvRefund: this.generateRandomDecimalInRangeFormatted(73.2, 105.9, 2),
        glassCrvWeight: this.generateRandomDecimalInRangeFormatted(43.3, 98.9, 2),
        pet1TotalWeight: this.generateRandomDecimalInRangeFormatted(54.2, 103.2, 2),
        pet1TotalPaid: this.generateRandomDecimalInRangeFormatted(51.2, 152.8, 2),
        pet1CrvRefund: this.generateRandomDecimalInRangeFormatted(57.2, 120.9, 2),
        pet1CrvWeight: this.generateRandomDecimalInRangeFormatted(45.3, 201.9, 2),
        hdpe2TotalWeight: this.generateRandomDecimalInRangeFormatted(1.2, 3.2, 2),
        hdpe2TotalPaid: this.generateRandomDecimalInRangeFormatted(1.2, 2.8, 2),
        hdpe2CrvRefund: this.generateRandomDecimalInRangeFormatted(7.2, 3.9, 2),
        hdpe2CrvWeight: this.generateRandomDecimalInRangeFormatted(4.3, 2.9, 2),
        ldpe4TotalWeight: this.generateRandomDecimalInRangeFormatted(1.2, 3.2, 2),
        ldpe4TotalPaid: this.generateRandomDecimalInRangeFormatted(1.2, 2.8, 2),
        ldpe4CrvRefund: this.generateRandomDecimalInRangeFormatted(7.2, 3.9, 2),
        ldpe4CrvWeight: this.generateRandomDecimalInRangeFormatted(4.3, 2.9, 2),
        ps6TotalWeight: this.generateRandomDecimalInRangeFormatted(1.2, 3.2, 2),
        ps6TotalPaid: this.generateRandomDecimalInRangeFormatted(1.2, 2.8, 2),
        ps6CrvRefund: this.generateRandomDecimalInRangeFormatted(7.2, 3.9, 2),
        ps6CrvWeight: this.generateRandomDecimalInRangeFormatted(4.3, 2.9, 2),
        totalPaid: this.generateRandomDecimalInRangeFormatted(4.3, 2.9, 2),
      };
      addDoc(this.logsCollection, dailyLogs);
    }
    return 0;
  }

  private generateRandomDecimalInRangeFormatted(min: number, max: number, places: number): number {
    const value = Math.random() * (max - min + 1) + min;
    return +Number.parseFloat(value.toString()).toFixed(places);
  }

  private generateRandomPages(): number {
    return Math.floor(Math.random() * (30 - 8 + 1)) + 8;
  }

  private getRandomSpot(): string {
    const spots = ['spots/25zQ2PVRrKlyzmMLs14O', 'spots/Fb6eiEYFjTkYY3Nf8pBW', 'spots/ne5b74V3PBIFjskEFsbZ'];
    return spots[Math.floor(Math.random() * spots.length)];
  }
}
