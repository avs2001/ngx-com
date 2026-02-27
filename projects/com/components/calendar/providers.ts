import type { Provider } from '@angular/core';
import { DATE_ADAPTER, NativeDateAdapter } from './date-adapter';
import { CALENDAR_SELECTION_STRATEGY } from './selection/selection-strategy';
import { SingleSelectionStrategy } from './selection/single-selection-strategy';
import { RangeSelectionStrategy } from './selection/range-selection-strategy';
import { MultiSelectionStrategy } from './selection/multi-selection-strategy';
import { WeekSelectionStrategy } from './selection/week-selection-strategy';

/**
 * Provides the native JavaScript Date adapter for the calendar.
 * This is required for the calendar component to work with native Date objects.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [provideNativeDateAdapter()],
 * })
 * export class MyComponent {}
 * ```
 */
export function provideNativeDateAdapter(): Provider {
  return { provide: DATE_ADAPTER, useClass: NativeDateAdapter };
}

/**
 * Provides the single selection strategy (default behavior).
 * Allows selecting one date at a time.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     provideNativeDateAdapter(),
 *     provideSingleSelectionStrategy(),
 *   ],
 * })
 * export class MyComponent {}
 * ```
 */
export function provideSingleSelectionStrategy(): Provider {
  return { provide: CALENDAR_SELECTION_STRATEGY, useClass: SingleSelectionStrategy };
}

/**
 * Provides the range selection strategy.
 * Allows selecting a start and end date to create a date range.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     provideNativeDateAdapter(),
 *     provideRangeSelectionStrategy(),
 *   ],
 * })
 * export class MyComponent {
 *   range = signal<DateRange<Date> | null>(null);
 * }
 * ```
 */
export function provideRangeSelectionStrategy(): Provider {
  return { provide: CALENDAR_SELECTION_STRATEGY, useClass: RangeSelectionStrategy };
}

/**
 * Provides the multi selection strategy.
 * Allows selecting multiple individual dates.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     provideNativeDateAdapter(),
 *     provideMultiSelectionStrategy(),
 *   ],
 * })
 * export class MyComponent {
 *   dates = signal<Date[]>([]);
 * }
 * ```
 */
export function provideMultiSelectionStrategy(): Provider {
  return { provide: CALENDAR_SELECTION_STRATEGY, useClass: MultiSelectionStrategy };
}

/**
 * Provides the week selection strategy.
 * Allows selecting entire weeks at a time.
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     provideNativeDateAdapter(),
 *     provideWeekSelectionStrategy(),
 *   ],
 * })
 * export class MyComponent {
 *   range = signal<DateRange<Date> | null>(null);
 * }
 * ```
 */
export function provideWeekSelectionStrategy(): Provider {
  return { provide: CALENDAR_SELECTION_STRATEGY, useClass: WeekSelectionStrategy };
}
