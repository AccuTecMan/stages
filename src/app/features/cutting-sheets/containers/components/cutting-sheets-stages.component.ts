import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuttingSheetsService } from '../../services';
import { CuttingSheet } from '../../models';
import { Customer } from '@app/base/models';

@Component({
  selector: 'app-cutting-sheets-stages-component',
  template: `
    <section class="breadcrumb">
      <button mat-button routerLink="/cuttingSheets">
        < All Cutting Sheets
      </button>
    </section>
    <header class="content-header">
      <h1>Stages</h1>
    </header>
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

    mat-divider {
      margin-bottom: 1rem;
    }

    .content-header {
      margin: 1.3rem 1rem 0rem 1rem !Important;
      max-width: 850px;
    }

    mat-form-field, mat-checkbox, button {
      width: 300px;
      margin-left: 3rem;
    }

    button {
      width: 100px;
    }

    .buttons-section {
      margin-top: 1.5rem;
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
  constructor() {}
}
