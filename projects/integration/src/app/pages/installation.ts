import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../shared/code-block';

@Component({
  selector: 'int-installation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Installation</h1>
      <p class="mb-8 text-lg text-surface-600">
        Get started with ngx-com in your Angular project.
      </p>

      <!-- Requirements -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Requirements</h2>
        <ul class="list-inside list-disc space-y-2 text-surface-700">
          <li>Angular 21 or higher</li>
          <li>TypeScript 5.9 or higher</li>
          <li>Node.js 22 or higher</li>
        </ul>
      </section>

      <!-- Install -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Install the package</h2>
        <int-code-block
          language="bash"
          [code]="installCode"
        />
      </section>

      <!-- Import -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import components</h2>
        <p class="mb-4 text-surface-600">
          Import components directly in your standalone components:
        </p>
        <int-code-block
          language="typescript"
          [code]="importCode"
        />
      </section>

      <!-- Provide adapters -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Configure providers</h2>
        <p class="mb-4 text-surface-600">
          The calendar component requires a date adapter. Add the native date adapter provider to your app config:
        </p>
        <int-code-block
          language="typescript"
          [code]="providerCode"
        />
      </section>
    </div>
  `,
})
export class Installation {
  protected readonly installCode = `npm install ngx-com`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { ComCalendar } from 'ngx-com/components/calendar';

@Component({
  selector: 'app-example',
  imports: [ComCalendar],
  template: \`
    <com-calendar
      [selected]="selectedDate()"
      (selectedChange)="onDateSelected($event)"
    />
  \`,
})
export class Example {
  selectedDate = signal<Date | null>(null);

  onDateSelected(date: Date) {
    this.selectedDate.set(date);
  }
}`;

  protected readonly providerCode = `import { ApplicationConfig } from '@angular/core';
import { provideNativeDateAdapter } from 'ngx-com/components/calendar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNativeDateAdapter(),
    // ... other providers
  ],
};`;
}
