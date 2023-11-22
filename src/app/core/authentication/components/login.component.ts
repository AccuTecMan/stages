import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-component',
  template: `
    <main class="content">
    <mat-card fxFlex>
      <mat-card-header>
        <mat-card-title>Enter with your account</mat-card-title>
      </mat-card-header>
      <form [formGroup]="form" fxLayout="column" fxLayoutAlign="center center">

          <mat-form-field>
              <mat-label>Email</mat-label>
              <input type="email" matInput placeholder="Ex: pat@example.com" formControlName="email">
              <mat-error *ngIf="form.get('email')!.hasError('required')">
                  Email is required
              </mat-error>
              <mat-error *ngIf="form.get('email')!.hasError('email')">
                  Email is invalid
              </mat-error>
          </mat-form-field>
          <mat-form-field>
              <mat-label>Password</mat-label>
              <input type="password" matInput placeholder="Password" formControlName="password">
              <mat-error *ngIf="form.get('password')!.hasError('required')">
                  Password is required
              </mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" [disabled]="!form.valid" (click)="login()"
              test-id="login-button">
              LOGIN
          </button>
      </form>
      </mat-card>
    </main>
  `,
  styles: [
    `
      .content {
        margin : 20px;
      }

      .mat-mdc-form-field {
        width: 300px;
      }

      .mat-mdc-form-field-error {
        color: red;
      }

      .mat-mdc-card {
        margin: 1rem;
        background-color: #ffe9d6;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  public isLoggingIn = false;

  constructor(private fb: UntypedFormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,) {}

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.isLoggingIn = true;
    this.authService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['cuttingSheets']),
      error: error => {
        this.isLoggingIn = false;
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        })
      }
    });
  }
}
