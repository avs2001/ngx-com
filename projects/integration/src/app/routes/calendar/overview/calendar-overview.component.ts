import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComCalendar, provideNativeDateAdapter } from 'ngx-com/components/calendar';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-calendar-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCalendar, CodeBlock],
  providers: [provideNativeDateAdapter()],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-6">
          <com-calendar
            [selected]="selectedDate()"
            (selectedChange)="onDateSelected($event)"
          />
          @if (selectedDate()) {
            <p class="text-surface-600">
              Selected: <span class="font-medium text-surface-900">{{ formatDate(selectedDate()!) }}</span>
            </p>
          }
        </div>
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
          <h3 class="mb-2 font-semibold text-surface-900">Multiple Views</h3>
          <p class="text-sm text-surface-600">
            Month, year, and multi-year views with smooth transitions and keyboard navigation.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Selection Strategies</h3>
          <p class="text-sm text-surface-600">
            Built-in single, range, multi-select, and week selection modes via dependency injection.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Date Constraints</h3>
          <p class="text-sm text-surface-600">
            Min/max dates, custom filter functions, and disabled date styling.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessibility</h3>
          <p class="text-sm text-surface-600">
            WCAG AA compliant with keyboard navigation, ARIA labels, and live announcements.
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
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">←</kbd> <kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">→</kbd></td>
              <td class="py-2">Move by day</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">↑</kbd> <kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Move by week</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Home</kbd></td>
              <td class="py-2">First day of month</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">End</kbd></td>
              <td class="py-2">Last day of month</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Page Up</kbd></td>
              <td class="py-2">Previous month</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Page Down</kbd></td>
              <td class="py-2">Next month</td>
            </tr>
            <tr>
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Enter</kbd> <kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="py-2">Select focused date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class CalendarOverview {
  protected readonly selectedDate = signal<Date | null>(null);

  protected readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { ComCalendar, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  selector: 'app-example',
  imports: [ComCalendar],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-calendar
      [selected]="selectedDate()"
      (selectedChange)="selectedDate.set($event)"
    />
  \`,
})
export class Example {
  selectedDate = signal<Date | null>(null);
}`;

  protected onDateSelected(date: Date): void {
    this.selectedDate.set(date);
  }

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
