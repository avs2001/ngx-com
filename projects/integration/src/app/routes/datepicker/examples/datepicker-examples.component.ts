import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ComDatepicker,
  ComDateRangePicker,
  ComTimePicker,
  provideNativeDateAdapter,
  type ComTimeValue,
  type DateRangeValue,
} from 'ngx-com/components/calendar';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-datepicker-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComDatepicker, ComDateRangePicker, ComTimePicker, CodeBlock, ReactiveFormsModule],
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

    <!-- Standalone Time Picker -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Standalone Time Picker</h2>
      <p class="mb-4 text-surface-600">
        A standalone time picker with segmented numeric inputs. Works with reactive forms and supports
        12-hour/24-hour format, seconds display, and step intervals.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Basic:</span>
          <com-time-picker [formControl]="timeForm" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">12-hour:</span>
          <com-time-picker [formControl]="time12hForm" [use12HourFormat]="true" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Seconds:</span>
          <com-time-picker [formControl]="timeSecondsForm" [showSeconds]="true" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">15-min step:</span>
          <com-time-picker [formControl]="timeStepForm" [minuteStep]="15" />
        </div>
        @if (timeForm.value; as t) {
          <p class="text-sm text-surface-600">
            Selected: {{ formatTime(t) }}
          </p>
        }
      </div>
      <int-code-block language="typescript" [code]="standaloneTimeCode" />
    </section>

    <!-- Time Picker Sizes & States -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Time Picker Sizes & States</h2>
      <p class="mb-4 text-surface-600">
        Size variants and validation states match the datepicker system.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Small:</span>
          <com-time-picker [value]="null" size="sm" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Default:</span>
          <com-time-picker [value]="null" size="default" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Large:</span>
          <com-time-picker [value]="null" size="lg" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Error:</span>
          <com-time-picker [value]="null" state="error" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm text-surface-600">Disabled:</span>
          <com-time-picker [value]="{ hours: 14, minutes: 30, seconds: 0 }" [disabled]="true" />
        </div>
      </div>
      <int-code-block language="html" [code]="timeSizesCode" />
    </section>

    <!-- Date + Time Picker -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date + Time Picker</h2>
      <p class="mb-4 text-surface-600">
        Enable the time picker inside the datepicker panel with <code class="text-sm bg-surface-100 px-1 rounded">showTimePicker</code>.
        The panel stays open after date selection so users can set the time, then click Done.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <com-datepicker
          [formControl]="dateTimeForm"
          placeholder="Select date and time..."
          [showTimePicker]="true"
          [showClearButton]="true"
          [showTodayButton]="true"
        />
        @if (dateTimeForm.value; as dt) {
          <p class="text-sm text-surface-600">
            Selected: {{ formatDateTime(dt) }}
          </p>
        }
      </div>
      <int-code-block language="typescript" [code]="dateTimeCode" />
    </section>

    <!-- Date + Time with 12h and steps -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date + Time Options</h2>
      <p class="mb-4 text-surface-600">
        Configure the embedded time picker with 12-hour format, seconds, and step intervals.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <div class="flex flex-col gap-2">
          <span class="text-sm text-surface-600">12-hour, 15-minute steps:</span>
          <com-datepicker
            [formControl]="dateTime12hForm"
            placeholder="Select appointment..."
            [showTimePicker]="true"
            [use12HourFormat]="true"
            [minuteStep]="15"
            [showClearButton]="true"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm text-surface-600">With seconds:</span>
          <com-datepicker
            [formControl]="dateTimeSecondsForm"
            placeholder="Select timestamp..."
            [showTimePicker]="true"
            [showSeconds]="true"
            [showClearButton]="true"
          />
        </div>
      </div>
      <int-code-block language="html" [code]="dateTimeOptionsCode" />
    </section>

    <!-- Date Range + Time -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date Range + Time</h2>
      <p class="mb-4 text-surface-600">
        The date range picker supports time selection with dual start/end time pickers.
      </p>
      <div class="mb-4 flex flex-col items-start gap-4">
        <com-date-range-picker
          [formControl]="rangeTimeForm"
          startPlaceholder="Check-in"
          endPlaceholder="Check-out"
          [showTimePicker]="true"
          [minuteStep]="30"
          [showClearButton]="true"
          [showTodayButton]="true"
        />
        @if (rangeTimeForm.value?.start; as start) {
          <p class="text-sm text-surface-600">
            From: {{ formatDateTime(start) }}
            @if (rangeTimeForm.value?.end; as end) {
              <span> to {{ formatDateTime(end) }}</span>
            }
          </p>
        }
      </div>
      <int-code-block language="typescript" [code]="rangeTimeCode" />
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

  // Standalone time picker
  protected readonly timeForm = new FormControl<ComTimeValue | null>(null);
  protected readonly time12hForm = new FormControl<ComTimeValue | null>(null);
  protected readonly timeSecondsForm = new FormControl<ComTimeValue | null>(null);
  protected readonly timeStepForm = new FormControl<ComTimeValue | null>(null);

  // Date + Time
  protected readonly dateTimeForm = new FormControl<Date | null>(null);
  protected readonly dateTime12hForm = new FormControl<Date | null>(null);
  protected readonly dateTimeSecondsForm = new FormControl<Date | null>(null);

  // Range + Time
  protected readonly rangeTimeForm = new FormControl<DateRangeValue<Date> | null>(null);

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

  protected readonly standaloneTimeCode = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComTimePicker, type ComTimeValue } from 'ngx-com/components/calendar';

@Component({
  imports: [ComTimePicker, ReactiveFormsModule],
  template: \`
    <!-- Basic 24-hour -->
    <com-time-picker [formControl]="timeControl" />

    <!-- 12-hour format -->
    <com-time-picker [formControl]="timeControl" [use12HourFormat]="true" />

    <!-- With seconds -->
    <com-time-picker [formControl]="timeControl" [showSeconds]="true" />

    <!-- 15-minute step intervals -->
    <com-time-picker [formControl]="timeControl" [minuteStep]="15" />
  \`,
})
export class StandaloneTimePicker {
  timeControl = new FormControl<ComTimeValue | null>(null);
}`;

  protected readonly timeSizesCode = `<!-- Sizes -->
<com-time-picker size="sm" />
<com-time-picker size="default" />
<com-time-picker size="lg" />

<!-- Validation states -->
<com-time-picker state="error" />

<!-- Disabled -->
<com-time-picker [value]="{ hours: 14, minutes: 30, seconds: 0 }" [disabled]="true" />`;

  protected readonly dateTimeCode = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComDatepicker, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-datepicker
      [formControl]="dateTimeControl"
      placeholder="Select date and time..."
      [showTimePicker]="true"
      [showClearButton]="true"
      [showTodayButton]="true"
    />
  \`,
})
export class DateTimePicker {
  dateTimeControl = new FormControl<Date | null>(null);
}`;

  protected readonly dateTimeOptionsCode = `<!-- 12-hour format with 15-minute steps -->
<com-datepicker
  [formControl]="control"
  [showTimePicker]="true"
  [use12HourFormat]="true"
  [minuteStep]="15"
/>

<!-- With seconds -->
<com-datepicker
  [formControl]="control"
  [showTimePicker]="true"
  [showSeconds]="true"
/>`;

  protected readonly rangeTimeCode = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ComDateRangePicker,
  provideNativeDateAdapter,
  type DateRangeValue,
} from 'ngx-com/components/calendar';

@Component({
  imports: [ComDateRangePicker, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-date-range-picker
      [formControl]="rangeControl"
      startPlaceholder="Check-in"
      endPlaceholder="Check-out"
      [showTimePicker]="true"
      [minuteStep]="30"
      [showClearButton]="true"
    />
  \`,
})
export class DateRangeTimePicker {
  rangeControl = new FormControl<DateRangeValue<Date> | null>(null);
}`;

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

  protected formatTime(time: ComTimeValue): string {
    const h = time.hours.toString().padStart(2, '0');
    const m = time.minutes.toString().padStart(2, '0');
    const s = time.seconds.toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  protected formatDateTime(date: Date): string {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}
