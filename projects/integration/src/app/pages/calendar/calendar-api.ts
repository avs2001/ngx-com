import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block';

interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'int-calendar-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock, RouterLink],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <ol class="flex items-center gap-2 text-surface-500">
          <li><a routerLink="/" class="hover:text-primary-600">Home</a></li>
          <li>/</li>
          <li><a routerLink="/components/calendar" class="hover:text-primary-600">Calendar</a></li>
          <li>/</li>
          <li><span class="text-surface-900">API</span></li>
        </ol>
      </nav>

      <h1 class="mb-4 text-4xl font-bold text-surface-900">Calendar API</h1>
      <p class="mb-8 text-lg text-surface-600">
        Complete API reference for the Calendar component.
      </p>

      <!-- Import -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
        <int-code-block
          language="typescript"
          [code]="importCode"
        />
      </section>

      <!-- Selector -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Selector</h2>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <code class="font-mono text-primary-600">com-calendar</code>
        </div>
      </section>

      <!-- Inputs -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inputs</h2>
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
              @for (prop of inputs; track prop.name) {
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

      <!-- Outputs -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Outputs</h2>
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
              @for (prop of outputs; track prop.name) {
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

      <!-- Selection Strategies -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Selection Strategies</h2>
        <p class="mb-4 text-surface-600">
          Use provider functions to configure different selection modes:
        </p>
        <div class="space-y-4">
          @for (strategy of strategies; track strategy.name) {
            <div class="rounded-lg border border-surface-200 bg-white p-4">
              <h3 class="mb-2 font-semibold text-surface-900">{{ strategy.name }}</h3>
              <p class="mb-3 text-sm text-surface-600">{{ strategy.description }}</p>
              <int-code-block language="typescript" [code]="strategy.code" />
            </div>
          }
        </div>
      </section>

      <!-- Date Adapter -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Date Adapter</h2>
        <p class="mb-4 text-surface-600">
          The calendar requires a date adapter to be provided. Use the built-in native adapter or create a custom one.
        </p>
        <int-code-block language="typescript" [code]="adapterCode" />
      </section>

      <!-- Types -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
        <int-code-block language="typescript" [code]="typesCode" />
      </section>
    </div>
  `,
})
export class CalendarApi {
  protected readonly importCode = `import {
  ComCalendar,
  provideNativeDateAdapter,
  provideSingleSelectionStrategy,
  provideRangeSelectionStrategy,
  provideMultiSelectionStrategy,
  provideWeekSelectionStrategy,
} from 'ngx-com/components/calendar';`;

  protected readonly inputs: ApiProperty[] = [
    {
      name: 'activeDate',
      type: 'D',
      description: 'The date used for display and navigation.',
    },
    {
      name: 'selected',
      type: 'D | DateRange<D> | null',
      default: 'null',
      description: 'The currently selected date or date range.',
    },
    {
      name: 'minDate',
      type: 'D | null',
      default: 'null',
      description: 'Minimum selectable date.',
    },
    {
      name: 'maxDate',
      type: 'D | null',
      default: 'null',
      description: 'Maximum selectable date.',
    },
    {
      name: 'dateFilter',
      type: '(date: D) => boolean',
      default: 'null',
      description: 'Function to filter out specific dates. Return false to disable a date.',
    },
    {
      name: 'dateClass',
      type: '(date: D, view: CalendarView) => string',
      default: 'null',
      description: 'Function to add custom CSS classes to dates.',
    },
    {
      name: 'startView',
      type: "'month' | 'year' | 'multi-year'",
      default: "'month'",
      description: 'The view to display when the calendar opens.',
    },
    {
      name: 'firstDayOfWeek',
      type: 'number | null',
      default: 'null',
      description: 'Override first day of week (0=Sun, 1=Mon, ..., 6=Sat). Uses locale default if null.',
    },
    {
      name: 'cellTemplate',
      type: 'TemplateRef<{ $implicit: CalendarCell<D> }>',
      default: 'null',
      description: 'Custom template for cell content.',
    },
  ];

  protected readonly outputs: ApiProperty[] = [
    {
      name: 'selectedChange',
      type: 'D',
      description: 'Emitted when a date is selected.',
    },
    {
      name: 'viewChanged',
      type: 'CalendarView',
      description: 'Emitted when the view changes (month, year, multi-year).',
    },
    {
      name: 'activeDateChange',
      type: 'D',
      description: 'Emitted when navigation changes the active date.',
    },
  ];

  protected readonly strategies = [
    {
      name: 'Single Selection (Default)',
      description: 'Select a single date at a time.',
      code: `providers: [
  provideNativeDateAdapter(),
  provideSingleSelectionStrategy(), // Optional, this is the default
]`,
    },
    {
      name: 'Range Selection',
      description: 'Select a start and end date to create a date range.',
      code: `providers: [
  provideNativeDateAdapter(),
  provideRangeSelectionStrategy(),
]`,
    },
    {
      name: 'Multi Selection',
      description: 'Select multiple individual dates.',
      code: `providers: [
  provideNativeDateAdapter(),
  provideMultiSelectionStrategy(),
]`,
    },
    {
      name: 'Week Selection',
      description: 'Select entire weeks at a time.',
      code: `providers: [
  provideNativeDateAdapter(),
  provideWeekSelectionStrategy(),
]`,
    },
  ];

  protected readonly adapterCode = `// Use the built-in native date adapter
import { provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  providers: [provideNativeDateAdapter()],
})
export class MyComponent {}`;

  protected readonly typesCode = `// Calendar view type
type CalendarView = 'month' | 'year' | 'multi-year';

// Date range interface
interface DateRange<D> {
  start: D | null;
  end: D | null;
}

// Calendar cell data
interface CalendarCell<D> {
  value: D;
  displayValue: string;
  ariaLabel: string;
  enabled: boolean;
  cssClasses: string;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeMiddle: boolean;
  isRangeEnd: boolean;
  isPreviewStart: boolean;
  isPreviewMiddle: boolean;
  isPreviewEnd: boolean;
  compareValue: number;
}`;
}
