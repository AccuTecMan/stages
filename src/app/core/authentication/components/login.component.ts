import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-component',
  template: `
    <main>
      <mat-card>
        <form [formGroup]="form">
          <h2>Enter with your account</h2>
          <mat-form-field>
            <mat-label>Email</mat-label>
            <input type="email" matInput placeholder="Ex: pat@example.com" formControlName="email" />
            @if (form.get('email')!.hasError('required')) {
              <mat-error> Email is required </mat-error>
            }
            @if (form.get('email')!.hasError('email')) {
              <mat-error> Email is invalid </mat-error>
            }
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input type="password" matInput placeholder="Password" formControlName="password" />
            @if (form.get('password')!.hasError('required')) {
              <mat-error> Password is required </mat-error>
            }
          </mat-form-field>
          <div fxLayoutAlign="center center">
            <button mat-raised-button color="primary" [disabled]="!form.valid" (click)="login()" test-id="login-button">LOGIN</button>
          </div>
        </form>
      </mat-card>
    </main>
  `,
  styles: [
    `
      mat-card {
        max-width: 400px;
        margin: 2em auto;
        padding: 1rem;
        text-align: center;
      }

      mat-form-field {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  public isLoggingIn = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.isLoggingIn = true;
    this.authService
      .signIn({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe({
        next: () => this.router.navigate(['cuttingSheets']),
        error: (error) => {
          this.isLoggingIn = false;
          this.snackBar.open(error.message, 'OK', {
            duration: 5000,
          });
        },
      });
  }
}
