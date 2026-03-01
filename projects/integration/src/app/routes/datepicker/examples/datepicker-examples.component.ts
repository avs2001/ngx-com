import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ComDatepicker,
  ComDateRangePicker,
  provideNativeDateAdapter,
  type DateRangeValue,
} from 'ngx-com/components/calendar';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-datepicker-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComDatepicker, ComDateRangePicker, CodeBlock, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  template: `
    <!-- Basic Datepicker -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Datepicker</h2>
      <p class="mb-4 text-surface-600">
        A simple date picker with clear button and today button.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <com-datepicker
          [formControl]="basicForm"
          placeholder="Select date..."
          [showClearButton]="true"
          [showTodayButton]="true"
        />
        @if (basicForm.value) {
          <p class="text-sm text-surface-600">
            Selected: {{ formatDate(basicForm.value) }}
          </p>
        }
      </div>
      <int-code-block language="typescript" [code]="basicCode" />
    </section>

    <!-- Date Range Picker -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date Range Picker</h2>
      <p class="mb-4 text-surface-600">
        Select a start and end date for booking, reporting, or filtering.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <com-date-range-picker
          [formControl]="rangeForm"
          startPlaceholder="Start date"
          endPlaceholder="End date"
          [showClearButton]="true"
          [showTodayButton]="true"
        />
        @if (rangeForm.value?.start; as start) {
          <p class="text-sm text-surface-600">
            Range: {{ formatDate(start) }}
            @if (rangeForm.value?.end; as end) {
              <span> – {{ formatDate(end) }}</span>
            }
          </p>
        }
      </div>
      <int-code-block language="typescript" [code]="rangeCode" />
    </section>

    <!-- Date Constraints -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date Constraints</h2>
      <p class="mb-4 text-surface-600">
        Restrict selectable dates using min/max constraints.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <com-datepicker
          [formControl]="constrainedForm"
          placeholder="Select date..."
          [min]="minDate"
          [max]="maxDate"
          [showClearButton]="true"
        />
        <p class="text-sm text-surface-500">
          Only dates between {{ formatShortDate(minDate) }} and {{ formatShortDate(maxDate) }} can be selected.
        </p>
      </div>
      <int-code-block language="typescript" [code]="constraintsCode" />
    </section>

    <!-- Size Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Size Variants</h2>
      <p class="mb-4 text-surface-600">
        Available in small, default, and large sizes.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Small:</span>
          <com-datepicker
            [value]="null"
            size="sm"
            placeholder="Small size"
          />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Default:</span>
          <com-datepicker
            [value]="null"
            size="default"
            placeholder="Default size"
          />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Large:</span>
          <com-datepicker
            [value]="null"
            size="lg"
            placeholder="Large size"
          />
        </div>
      </div>
      <int-code-block language="html" [code]="sizesCode" />
    </section>

    <!-- Validation States -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Validation States</h2>
      <p class="mb-4 text-surface-600">
        Visual feedback for form validation.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Default:</span>
          <com-datepicker
            [value]="null"
            state="default"
            placeholder="Default state"
          />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Error:</span>
          <com-datepicker
            [value]="null"
            state="error"
            placeholder="Error state"
          />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Success:</span>
          <com-datepicker
            [value]="null"
            state="success"
            placeholder="Success state"
          />
        </div>
      </div>
      <int-code-block language="html" [code]="statesCode" />
    </section>

    <!-- Disabled State -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
      <p class="mb-4 text-surface-600">
        Disable the datepicker when input is not allowed.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <com-datepicker
          [value]="null"
          [disabled]="true"
          placeholder="Disabled datepicker"
        />
      </div>
      <int-code-block language="html" [code]="disabledCode" />
    </section>
  `,
})
export class DatepickerExamples {
  // Basic datepicker
  protected readonly basicForm = new FormControl<Date | null>(null);

  // Range picker
  protected readonly rangeForm = new FormControl<DateRangeValue<Date> | null>(null);

  // Constrained dates
  protected readonly constrainedForm = new FormControl<Date | null>(null);
  protected readonly minDate = new Date();
  protected readonly maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  protected readonly basicCode = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComDatepicker, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-datepicker
      [formControl]="dateControl"
      placeholder="Select date..."
      [showClearButton]="true"
      [showTodayButton]="true"
    />
  \`,
})
export class BasicDatepicker {
  dateControl = new FormControl<Date | null>(null);
}`;

  protected readonly rangeCode = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ComDateRangePicker,
  provideNativeDateAdapter,
  DateRangeValue,
} from 'ngx-com/components/calendar';

@Component({
  imports: [ComDateRangePicker, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-date-range-picker
      [formControl]="rangeControl"
      startPlaceholder="Start date"
      endPlaceholder="End date"
      [showClearButton]="true"
      [showTodayButton]="true"
    />
  \`,
})
export class DateRangePicker {
  rangeControl = new FormControl<DateRangeValue<Date> | null>(null);
}`;

  protected readonly constraintsCode = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComDatepicker, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-datepicker
      [formControl]="dateControl"
      [min]="minDate"
      [max]="maxDate"
      placeholder="Select date..."
    />
  \`,
})
export class DateConstraints {
  dateControl = new FormControl<Date | null>(null);
  minDate = new Date();
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}`;

  protected readonly sizesCode = `<com-datepicker size="sm" placeholder="Small size" />
<com-datepicker size="default" placeholder="Default size" />
<com-datepicker size="lg" placeholder="Large size" />`;

  protected readonly statesCode = `<com-datepicker state="default" placeholder="Default state" />
<com-datepicker state="error" placeholder="Error state" />
<com-datepicker state="success" placeholder="Success state" />`;

  protected readonly disabledCode = `<com-datepicker [disabled]="true" placeholder="Disabled datepicker" />`;

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  protected formatShortDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
}
