import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '@app/base/models';
import { MatChip } from '@angular/material/chips';
import { MatCard, MatCardHeader, MatCardTitle, MatCardActions } from '@angular/material/card';
import { ExtendedModule } from '@ngbracket/ngx-layout/extended';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatFabButton, MatButton } from '@angular/material/button';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-customer-component',
    template: `
    @if (IsLoading) {
      <mat-spinner fxLayoutAlign="center top" diameter="80" strokeWidth="5"></mat-spinner>
    } @else {
      <header class="content-header">
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <h1>Customers</h1>
          <button mat-fab extended routerLink="/customers/add">
            <mat-icon>add</mat-icon>
            Add New
          </button>
        </div>
        <mat-divider></mat-divider>
        <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="14px">
          <mat-form-field>
            <mat-label>Customer name</mat-label>
            <input matInput [(ngModel)]="term" />
          </mat-form-field>
          <button mat-fab extended color="normal" [ngClass]="{ 'inactive-background': isInactiveDisplayed }" (click)="displayInactive()">
            @if (isInactiveDisplayed) {
              <mat-icon>close</mat-icon>
            } @else {
              <mat-icon>filter_list</mat-icon>
            }
            @if (isInactiveDisplayed) {
              <span>Hide Inactive</span>
            } @else {
              <span>Show Inactive</span>
            }
          </button>
        </div>
      </header>
      <section class="content-records" fxLayout="row wrap" fxLayoutGap="8px grid">
        @for (customer of customers; track customer.id) {
          <div fxFlex="50%" fxFlex.lt-sm="100%">
            <mat-card class="mat-elevation-z16">
              <mat-card-header>
                <mat-card-title>{{ customer.name }}</mat-card-title>
              </mat-card-header>
              <mat-card-actions fxLayoutAlign="space-between center">
                <button mat-button [routerLink]="['/customers/edit', customer.id]">UPDATE</button>
                <mat-chip>
                  {{ customer.active ? 'Active' : 'Inactive' }}
                </mat-chip>
              </mat-card-actions>
            </mat-card>
          </div>
        } @empty {
          <p class="no-records">No records found</p>
        }
      </section>
    }
  `,
    styles: [
        `
      h1 {
        font-size: 2rem;
        padding: 0px;
        margin: 0;
      }

      .content-header {
        margin: 1.3rem 1rem 0rem 1rem !important;
        max-width: 850px;
      }

      .my-form-field .mat-form-field-wrapper {
        margin-bottom: -1.25em;
      }

      mat-divider {
        margin: 0.5rem 0rem 1rem 0rem;
      }

      .mat-mdc-fab.mat-primary {
        margin-right: 0px;
      }

      .mdc-fab--extended {
        margin-top: 0.4rem;
        height: 40px;
      }

      .content-records {
        margin: 0.5rem 1rem 4rem 1rem !important;
        max-width: 850px;
      }

      .mat-mdc-form-field {
        width: 150px;
      }

      mat-card {
        width: 400px;
      }

      mat-card-title {
        color: #607ec9;
        margin: 0rem 0rem -0.6rem 0rem;
        padding: 0px;
      }

      .mat-mdc-card-header {
        padding: 0.3rem 1rem;
      }

      .mat-mdc-button {
        background-color: #607ec9;
        color: white;
      }

      .inactive-background {
        background-color: #607ec9;
        color: white;
      }

      mat-spinner {
        margin: 1rem;
      }

      @media (max-width: 600px) {
        h1 {
          font-size: 1.5rem;
          padding: 0;
          margin: 0;
        }

        mat-card {
          width: 100%;
        }

        .add-button {
          margin: 1rem;
        }
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatProgressSpinner,
        FlexModule,
        MatFabButton,
        RouterLink,
        MatIcon,
        MatDivider,
        MatFormField,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        FormsModule,
        NgClass,
        ExtendedModule,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardActions,
        MatButton,
        MatChip,
    ],
})
export class ListComponent {
  @Input() IsLoading!: boolean | null;
  @Input() customers!: Customer[] | null;
  @Output() public changeSearchTerm = new EventEmitter<string>();
  @Output() public showInactive = new EventEmitter<boolean>();

  private _term: string;
  public isInactiveDisplayed: boolean = true;

  public onSearchTermChange(term: string) {
    this.changeSearchTerm.emit(term);
  }

  get term(): string {
    return this._term;
  }

  set term(value: string) {
    this._term = value;
    this.onSearchTermChange(this._term);
  }

  public displayInactive(): void {
    this.isInactiveDisplayed = !this.isInactiveDisplayed;
    this.showInactive.emit(this.isInactiveDisplayed);
  }
}
