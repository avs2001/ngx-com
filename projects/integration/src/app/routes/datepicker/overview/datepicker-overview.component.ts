import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-datepicker-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComDatepicker, CodeBlock, FormsModule],
  providers: [provideNativeDateAdapter()],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="flex flex-col items-start gap-4">
        <com-datepicker
          [(ngModel)]="selectedDate"
          placeholder="Select a date..."
          [showClearButton]="true"
        />
        @if (selectedDate()) {
          <p class="text-surface-600">
            Selected: <span class="font-medium text-surface-900">{{ formatDate(selectedDate()!) }}</span>
          </p>
        }
      </div>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Form Integration</h3>
          <p class="text-sm text-surface-600">
            Full ControlValueAccessor support for Reactive Forms and Template-driven Forms with validation.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Manual Input</h3>
          <p class="text-sm text-surface-600">
            Type dates directly or use the calendar popup. Supports multiple date format presets.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Date Constraints</h3>
          <p class="text-sm text-surface-600">
            Min/max dates, custom filter functions, and built-in validation for invalid dates.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessibility</h3>
          <p class="text-sm text-surface-600">
            WCAG AA compliant with keyboard navigation, focus trapping, and live announcements.
          </p>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accessibility</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <h3 class="mb-3 font-semibold text-surface-900">Keyboard Navigation</h3>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 text-left">
              <th class="pb-2 font-medium text-surface-700">Key</th>
              <th class="pb-2 font-medium text-surface-700">Action</th>
            </tr>
          </thead>
          <tbody class="text-surface-600">
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Open calendar popup</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Escape</kbd></td>
              <td class="py-2">Close calendar popup</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Enter</kbd></td>
              <td class="py-2">Open popup or commit typed date</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">←</kbd> <kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">→</kbd></td>
              <td class="py-2">Navigate by day in calendar</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">↑</kbd> <kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Navigate by week in calendar</td>
            </tr>
            <tr>
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="py-2">Select focused date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class DatepickerOverview {
  protected readonly selectedDate = signal<Date | null>(null);

  protected readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  selector: 'app-example',
  imports: [ComDatepicker, FormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-datepicker
      [(ngModel)]="selectedDate"
      placeholder="Select a date..."
      [showClearButton]="true"
    />
  \`,
})
export class Example {
  selectedDate = signal<Date | null>(null);
}`;

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
