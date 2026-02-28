import { ChangeDetectionStrategy, Component, signal, output, input } from '@angular/core';
import {
  ComCalendar,
  provideNativeDateAdapter,
  provideRangeSelectionStrategy,
  type DateRange,
} from 'ngx-com/components/calendar';
import { CodeBlock } from '../../../shared/code-block';

/**
 * Wrapper component for range selection calendar.
 * Provides the range selection strategy scoped to this component.
 */
@Component({
  selector: 'int-range-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCalendar],
  providers: [provideNativeDateAdapter(), provideRangeSelectionStrategy()],
  template: `
    <com-calendar
      [selected]="selected()"
      (selectedChange)="selectedChange.emit($event)"
    />
  `,
})
export class RangeCalendarWrapper {
  readonly selected = input<DateRange<Date> | null>(null);
  readonly selectedChange = output<DateRange<Date>>();
}

@Component({
  selector: 'int-calendar-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCalendar, CodeBlock, RangeCalendarWrapper],
  providers: [provideNativeDateAdapter()],
  template: `
    <!-- Single Selection -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Single Selection</h2>
      <p class="mb-4 text-surface-600">
        The default selection mode. Click a date to select it.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-calendar
            [selected]="singleDate()"
            (selectedChange)="singleDate.set($event)"
          />
          @if (singleDate()) {
            <p class="text-sm text-surface-600">
              Selected: {{ formatDate(singleDate()!) }}
            </p>
          }
        </div>
      </div>
      <int-code-block language="typescript" [code]="singleCode" />
    </section>

    <!-- Date Range -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date Range Selection</h2>
      <p class="mb-4 text-surface-600">
        Select a start and end date to create a range. Provide the range selection strategy.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <int-range-calendar
            [selected]="rangeValue()"
            (selectedChange)="onRangeChange($event)"
          />
          @if (rangeValue()?.start) {
            <p class="text-sm text-surface-600">
              Range: {{ formatDate(rangeValue()!.start!) }}
              @if (rangeValue()?.end) {
                <span> – {{ formatDate(rangeValue()!.end!) }}</span>
              }
            </p>
          }
        </div>
      </div>
      <int-code-block language="typescript" [code]="rangeCode" />
    </section>

    <!-- Date Constraints -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date Constraints</h2>
      <p class="mb-4 text-surface-600">
        Use minDate and maxDate to restrict the selectable date range.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-calendar
            [selected]="constrainedDate()"
            [minDate]="minDate"
            [maxDate]="maxDate"
            (selectedChange)="constrainedDate.set($event)"
          />
          <p class="text-sm text-surface-500">
            Only dates between {{ formatDate(minDate) }} and {{ formatDate(maxDate) }} can be selected.
          </p>
        </div>
      </div>
      <int-code-block language="typescript" [code]="constraintsCode" />
    </section>

    <!-- Custom Filter -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Date Filter</h2>
      <p class="mb-4 text-surface-600">
        Use dateFilter to disable specific dates based on custom logic (e.g., no weekends).
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-calendar
            [selected]="filteredDate()"
            [dateFilter]="weekdaysOnly"
            (selectedChange)="filteredDate.set($event)"
          />
          <p class="text-sm text-surface-500">
            Weekends are disabled.
          </p>
        </div>
      </div>
      <int-code-block language="typescript" [code]="filterCode" />
    </section>

    <!-- Start View -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Start View</h2>
      <p class="mb-4 text-surface-600">
        Open the calendar in year or multi-year view for quick navigation.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-calendar
            [selected]="yearViewDate()"
            startView="year"
            (selectedChange)="yearViewDate.set($event)"
          />
        </div>
      </div>
      <int-code-block language="html" [code]="startViewCode" />
    </section>
  `,
})
export class CalendarExamples {
  // Single selection
  protected readonly singleDate = signal<Date | null>(null);

  // Range selection
  protected readonly rangeValue = signal<DateRange<Date> | null>(null);

  // Constrained dates
  protected readonly constrainedDate = signal<Date | null>(null);
  protected readonly minDate = new Date();
  protected readonly maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  // Filtered dates
  protected readonly filteredDate = signal<Date | null>(null);
  protected readonly weekdaysOnly = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Disable weekends
  };

  // Start view
  protected readonly yearViewDate = signal<Date | null>(null);

  protected readonly singleCode = `import { Component, signal } from '@angular/core';
import { ComCalendar, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComCalendar],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-calendar
      [selected]="selectedDate()"
      (selectedChange)="selectedDate.set($event)"
    />
  \`,
})
export class SingleSelection {
  selectedDate = signal<Date | null>(null);
}`;

  protected readonly rangeCode = `import { Component, signal } from '@angular/core';
import {
  ComCalendar,
  provideNativeDateAdapter,
  provideRangeSelectionStrategy,
  DateRange,
} from 'ngx-com/components/calendar';

@Component({
  imports: [ComCalendar],
  providers: [
    provideNativeDateAdapter(),
    provideRangeSelectionStrategy(),
  ],
  template: \`
    <com-calendar
      [selected]="range()"
      (selectedChange)="range.set($event)"
    />
  \`,
})
export class RangeSelection {
  range = signal<DateRange<Date> | null>(null);
}`;

  protected readonly constraintsCode = `import { Component, signal } from '@angular/core';
import { ComCalendar, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComCalendar],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-calendar
      [selected]="selectedDate()"
      [minDate]="minDate"
      [maxDate]="maxDate"
      (selectedChange)="selectedDate.set($event)"
    />
  \`,
})
export class DateConstraints {
  selectedDate = signal<Date | null>(null);
  minDate = new Date();
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}`;

  protected readonly filterCode = `import { Component, signal } from '@angular/core';
import { ComCalendar, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComCalendar],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-calendar
      [selected]="selectedDate()"
      [dateFilter]="weekdaysOnly"
      (selectedChange)="selectedDate.set($event)"
    />
  \`,
})
export class CustomFilter {
  selectedDate = signal<Date | null>(null);

  weekdaysOnly = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
}`;

  protected readonly startViewCode = `<com-calendar
  [selected]="selectedDate()"
  startView="year"
  (selectedChange)="selectedDate.set($event)"
/>`;

  protected onRangeChange(value: unknown): void {
    this.rangeValue.set(value as DateRange<Date>);
  }

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
