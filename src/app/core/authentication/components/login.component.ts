import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AsyncValidatorFn, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

import { AuthData } from '@core/models';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-login-component',
  template: `
    <section fxLayout="row wrap" fxLayoutAlign="center center">
      <mat-card appearance="outlined" fxFlex="500px" fxFlex.xs="100%" class="mat-elevation-z8">
        <mat-card-title fxLayoutAlign="center center -fxLayoutAlign"> Enter your credentials </mat-card-title>
        <form [formGroup]="loginForm">
          <mat-card-content fxLayout="column wrap" fxLayoutAlign="center center" fxLayoutGap="10px">
            <mat-form-field>
              <input type="email" matInput placeholder="Your email" required formControlName="email" />
              <mat-hint align="end">Please enter a valid email.</mat-hint>
              <!-- <mat-error *ngIf="email?.invalid">Invalid or missing email.</mat-error> -->
            </mat-form-field>
            <mat-form-field>
              <input type="password" matInput placeholder="Your password" formControlName="password" />
              <mat-hint align="end">Please enter your password.</mat-hint>
            </mat-form-field>
            <ng-container *ngIf="loginForm.statusChanges | async as status">
              <mat-error *ngIf="!loginForm.pristine && (loginForm.invalid || email.invalid || password.invalid)" align="start"
                >Invalid email or password
              </mat-error>
            </ng-container>
          </mat-card-content>
          <mat-card-actions fxLayoutAlign="center center -fxLayoutAlign">
            <button mat-raised-button type="submit" color="primary">Submit</button>
          </mat-card-actions>
        </form>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .mat-mdc-form-field {
        width: 300px;
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
  loginForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
          },
        ],
        password: [
          '',
          {
            validators: [Validators.required, Validators.minLength(7)],
          },
        ],
      },
      {
        asyncValidators: [this.validateCredentials()],
        updateOn: 'submit',
      }
    );
  }

  validateCredentials(): AsyncValidatorFn {
    return (form): Observable<ValidationErrors | null> => {
      const authData: AuthData = {
        email: form.value.email,
        password: form.value.password,
      };

      return this.authService.login(authData).pipe(
        map(() => null),
        catchError(() => of({ wrongPassword: true }))
      );
    };
  }
}
