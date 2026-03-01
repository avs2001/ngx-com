/**
 * Types and interfaces for DatePicker and DateRangePicker components.
 */

/** Date format preset names */
export type DateFormatPreset = 'short' | 'medium' | 'long' | 'full';

/** Panel width configuration */
export type DatepickerPanelWidth = 'auto' | 'trigger' | `${number}px` | `${number}rem`;

/** Size variants for datepicker components */
export type DatepickerSize = 'sm' | 'default' | 'lg';

/** Visual variant for datepicker trigger */
export type DatepickerVariant = 'default' | 'outline' | 'ghost' | 'filled';

/** Validation state for datepicker */
export type DatepickerState = 'default' | 'error' | 'success';

/** Configuration for datepicker footer actions */
export interface DatepickerFooterConfig {
  /** Show today button */
  showToday?: boolean;
  /** Show clear button */
  showClear?: boolean;
  /** Custom today button label */
  todayLabel?: string;
  /** Custom clear button label */
  clearLabel?: string;
}

/** Value type for DateRangePicker */
export interface DateRangeValue<D> {
  /** Start date of the range */
  start: D | null;
  /** End date of the range */
  end: D | null;
}

/** Creates a DateRangeValue */
export function createDateRangeValue<D>(
  start: D | null = null,
  end: D | null = null
): DateRangeValue<D> {
  return { start, end };
}

/** Generates a unique ID for datepicker instances */
let datepickerIdCounter = 0;
export function generateDatepickerId(): string {
  return `com-datepicker-${datepickerIdCounter++}`;
}
