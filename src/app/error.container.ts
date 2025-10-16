import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-error-container',
    template: `
    <section>
      <header>
        <h1>Page not found</h1>
      </header>
      <p>Something Went Wrong</p>
    </section>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ErrorContainer {}
