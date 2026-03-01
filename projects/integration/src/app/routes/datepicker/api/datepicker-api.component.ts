import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block';

interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'int-datepicker-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block
        language="typescript"
        [code]="importCode"
      />
    </section>

    <!-- Selectors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Selectors</h2>
      <div class="space-y-2 rounded-lg border border-surface-200 bg-white p-4">
        <div class="flex items-center gap-2">
          <code class="font-mono text-primary-600">com-datepicker</code>
          <span class="text-sm text-surface-500">— Single date selection</span>
        </div>
        <div class="flex items-center gap-2">
          <code class="font-mono text-primary-600">com-date-range-picker</code>
          <span class="text-sm text-surface-500">— Date range selection</span>
        </div>
      </div>
    </section>

    <!-- Datepicker Inputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Datepicker Inputs</h2>
      <div class="overflow-x-auto rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead class="bg-surface-50">
            <tr class="border-b border-surface-200 text-left">
              <th class="px-4 py-3 font-semibold text-surface-700">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Default</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Description</th>
            </tr>
          </thead>
          <tbody>
            @for (prop of datepickerInputs; track prop.name) {
              <tr class="border-b border-surface-100 last:border-0">
                <td class="px-4 py-3">
                  <code class="font-mono text-primary-600">{{ prop.name }}</code>
                </td>
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-surface-700">{{ prop.type }}</code>
                </td>
                <td class="px-4 py-3 text-surface-500">{{ prop.default || '—' }}</td>
                <td class="px-4 py-3 text-surface-600">{{ prop.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <!-- Datepicker Outputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Datepicker Outputs</h2>
      <div class="overflow-x-auto rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead class="bg-surface-50">
            <tr class="border-b border-surface-200 text-left">
              <th class="px-4 py-3 font-semibold text-surface-700">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Description</th>
            </tr>
          </thead>
          <tbody>
            @for (prop of datepickerOutputs; track prop.name) {
              <tr class="border-b border-surface-100 last:border-0">
                <td class="px-4 py-3">
                  <code class="font-mono text-primary-600">{{ prop.name }}</code>
                </td>
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-surface-700">{{ prop.type }}</code>
                </td>
                <td class="px-4 py-3 text-surface-600">{{ prop.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <!-- Date Range Picker Inputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">DateRangePicker Additional Inputs</h2>
      <p class="mb-4 text-surface-600">
        DateRangePicker shares most inputs with Datepicker, plus these additional ones:
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead class="bg-surface-50">
            <tr class="border-b border-surface-200 text-left">
              <th class="px-4 py-3 font-semibold text-surface-700">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Default</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Description</th>
            </tr>
          </thead>
          <tbody>
            @for (prop of rangePickerInputs; track prop.name) {
              <tr class="border-b border-surface-100 last:border-0">
                <td class="px-4 py-3">
                  <code class="font-mono text-primary-600">{{ prop.name }}</code>
                </td>
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-surface-700">{{ prop.type }}</code>
                </td>
                <td class="px-4 py-3 text-surface-500">{{ prop.default || '—' }}</td>
                <td class="px-4 py-3 text-surface-600">{{ prop.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <!-- Form Integration -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Form Integration</h2>
      <p class="mb-4 text-surface-600">
        Both components implement ControlValueAccessor and Validator for seamless form integration.
      </p>
      <div class="space-y-4">
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Reactive Forms</h3>
          <int-code-block language="typescript" [code]="reactiveFormsCode" />
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Template-driven Forms</h3>
          <int-code-block language="typescript" [code]="templateFormsCode" />
        </div>
      </div>
    </section>

    <!-- Validation -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Built-in Validation</h2>
      <p class="mb-4 text-surface-600">
        The components provide built-in validation errors:
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead class="bg-surface-50">
            <tr class="border-b border-surface-200 text-left">
              <th class="px-4 py-3 font-semibold text-surface-700">Error Key</th>
              <th class="px-4 py-3 font-semibold text-surface-700">Condition</th>
            </tr>
          </thead>
          <tbody class="text-surface-600">
            <tr class="border-b border-surface-100">
              <td class="px-4 py-3"><code class="font-mono">required</code></td>
              <td class="py-3">When required=true and no value selected</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="px-4 py-3"><code class="font-mono">minDate</code></td>
              <td class="py-3">When selected date is before min</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="px-4 py-3"><code class="font-mono">maxDate</code></td>
              <td class="py-3">When selected date is after max</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="px-4 py-3"><code class="font-mono">dateFilter</code></td>
              <td class="py-3">When dateFilter returns false</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="font-mono">rangeInvalid</code></td>
              <td class="py-3">DateRangePicker: start date is after end date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Types -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
      <int-code-block language="typescript" [code]="typesCode" />
    </section>
  `,
})
export class DatepickerApi {
  protected readonly importCode = `import {
  ComDatepicker,
  ComDateRangePicker,
  provideNativeDateAdapter,
  createDateRangeValue,
  type DateRangeValue,
  type DateFormatPreset,
  type DatepickerSize,
  type DatepickerVariant,
  type DatepickerState,
} from 'ngx-com/components/calendar';`;

  protected readonly datepickerInputs: ApiProperty[] = [
    {
      name: 'value',
      type: 'D | null',
      default: 'null',
      description: 'The selected date value.',
    },
    {
      name: 'min',
      type: 'D | null',
      default: 'null',
      description: 'Minimum selectable date.',
    },
    {
      name: 'max',
      type: 'D | null',
      default: 'null',
      description: 'Maximum selectable date.',
    },
    {
      name: 'dateFilter',
      type: '(date: D) => boolean',
      default: 'null',
      description: 'Function to disable specific dates.',
    },
    {
      name: 'startAt',
      type: 'D | null',
      default: 'null',
      description: 'Date the calendar opens to (defaults to selected or today).',
    },
    {
      name: 'startView',
      type: "'month' | 'year' | 'multi-year'",
      default: "'month'",
      description: 'Initial calendar view when opened.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select date...'",
      description: 'Placeholder text for the input.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the datepicker is disabled.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the datepicker is required.',
    },
    {
      name: 'dateFormat',
      type: 'DateFormatPreset',
      default: "'medium'",
      description: 'Display format preset (short, medium, long, full).',
    },
    {
      name: 'showClearButton',
      type: 'boolean',
      default: 'false',
      description: 'Show clear button in the trigger.',
    },
    {
      name: 'showTodayButton',
      type: 'boolean',
      default: 'false',
      description: 'Show today button in the calendar footer.',
    },
    {
      name: 'allowManualInput',
      type: 'boolean',
      default: 'true',
      description: 'Allow typing dates directly in the input.',
    },
    {
      name: 'variant',
      type: 'DatepickerVariant',
      default: "'default'",
      description: 'Visual variant (default, outline, ghost, filled).',
    },
    {
      name: 'size',
      type: 'DatepickerSize',
      default: "'default'",
      description: 'Size variant (sm, default, lg).',
    },
    {
      name: 'state',
      type: 'DatepickerState',
      default: "'default'",
      description: 'Validation state (default, error, success).',
    },
  ];

  protected readonly datepickerOutputs: ApiProperty[] = [
    {
      name: 'dateChange',
      type: 'D | null',
      description: 'Emitted when a date is selected.',
    },
    {
      name: 'opened',
      type: 'void',
      description: 'Emitted when the calendar panel opens.',
    },
    {
      name: 'closed',
      type: 'void',
      description: 'Emitted when the calendar panel closes.',
    },
  ];

  protected readonly rangePickerInputs: ApiProperty[] = [
    {
      name: 'value',
      type: 'DateRangeValue<D> | null',
      default: 'null',
      description: 'The selected date range value.',
    },
    {
      name: 'startPlaceholder',
      type: 'string',
      default: "'Start date'",
      description: 'Placeholder for the start date input.',
    },
    {
      name: 'endPlaceholder',
      type: 'string',
      default: "'End date'",
      description: 'Placeholder for the end date input.',
    },
    {
      name: 'startAriaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label for start input.',
    },
    {
      name: 'endAriaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label for end input.',
    },
  ];

  protected readonly reactiveFormsCode = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComDatepicker, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-datepicker [formControl]="dateControl" />
    @if (dateControl.hasError('required')) {
      <span class="text-red-500">Date is required</span>
    }
  \`,
})
export class ReactiveFormsExample {
  dateControl = new FormControl<Date | null>(null, { nonNullable: false });
}`;

  protected readonly templateFormsCode = `import { FormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  imports: [ComDatepicker, FormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-datepicker
      [(ngModel)]="selectedDate"
      [required]="true"
      #dateModel="ngModel"
    />
    @if (dateModel.invalid && dateModel.touched) {
      <span class="text-red-500">Please select a date</span>
    }
  \`,
})
export class TemplateFormsExample {
  selectedDate: Date | null = null;
}`;

  protected readonly typesCode = `// Date format preset
type DateFormatPreset = 'short' | 'medium' | 'long' | 'full';

// Size variants
type DatepickerSize = 'sm' | 'default' | 'lg';

// Visual variants
type DatepickerVariant = 'default' | 'outline' | 'ghost' | 'filled';

// Validation state
type DatepickerState = 'default' | 'error' | 'success';

// DateRangePicker value type
interface DateRangeValue<D> {
  start: D | null;
  end: D | null;
}

// Create a DateRangeValue
function createDateRangeValue<D>(
  start: D | null = null,
  end: D | null = null
): DateRangeValue<D>;`;
}
