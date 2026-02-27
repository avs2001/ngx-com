/**
 * Calendar shared types and interfaces
 */

/** Represents a date range with a start and end date */
export interface DateRange<D> {
  /** Start of the date range */
  start: D | null;
  /** End of the date range */
  end: D | null;
}

/** Factory function to create a DateRange */
export function createDateRange<D>(start: D | null, end: D | null): DateRange<D> {
  return { start, end };
}

/** Available calendar views */
export type CalendarView = 'month' | 'year' | 'multi-year';

/** Cell states for styling */
export type CalendarCellState =
  | 'default'
  | 'today'
  | 'selected'
  | 'range-start'
  | 'range-middle'
  | 'range-end'
  | 'disabled'
  | 'preview-start'
  | 'preview-middle'
  | 'preview-end';

/** Data structure representing a calendar cell */
export interface CalendarCell<D> {
  /** The date value this cell represents */
  value: D;
  /** Display text for the cell */
  displayValue: string;
  /** Accessible label for screen readers */
  ariaLabel: string;
  /** Whether this cell is enabled/selectable */
  enabled: boolean;
  /** CSS classes to apply (from dateClass input) */
  cssClasses: string;
  /** Whether this cell represents today */
  isToday: boolean;
  /** Whether this cell is currently selected */
  isSelected: boolean;
  /** Whether this cell is the start of a range */
  isRangeStart: boolean;
  /** Whether this cell is in the middle of a range */
  isRangeMiddle: boolean;
  /** Whether this cell is the end of a range */
  isRangeEnd: boolean;
  /** Whether this cell is the start of a preview range */
  isPreviewStart: boolean;
  /** Whether this cell is in the middle of a preview range */
  isPreviewMiddle: boolean;
  /** Whether this cell is the end of a preview range */
  isPreviewEnd: boolean;
  /** Comparison value for keyboard navigation and selection */
  compareValue: number;
}

/** Configuration for creating a calendar cell */
export interface CalendarCellConfig<D> {
  value: D;
  displayValue: string;
  ariaLabel: string;
  enabled?: boolean;
  cssClasses?: string;
  compareValue: number;
}

/** Factory function to create a CalendarCell with defaults */
export function createCalendarCell<D>(config: CalendarCellConfig<D>): CalendarCell<D> {
  return {
    value: config.value,
    displayValue: config.displayValue,
    ariaLabel: config.ariaLabel,
    enabled: config.enabled ?? true,
    cssClasses: config.cssClasses ?? '',
    compareValue: config.compareValue,
    isToday: false,
    isSelected: false,
    isRangeStart: false,
    isRangeMiddle: false,
    isRangeEnd: false,
    isPreviewStart: false,
    isPreviewMiddle: false,
    isPreviewEnd: false,
  };
}

/** Style format for month and day names */
export type NameStyle = 'long' | 'short' | 'narrow';

/** Number of days in a week */
export const DAYS_PER_WEEK = 7;

/** Number of weeks displayed in month view */
export const WEEKS_PER_MONTH = 6;

/** Number of years displayed in multi-year view */
export const YEARS_PER_PAGE = 24;

/** Number of rows in multi-year view */
export const YEARS_PER_ROW = 4;

/** Number of months per row in year view */
export const MONTHS_PER_ROW = 4;

/** Function type for custom date filtering */
export type DateFilterFn<D> = (date: D) => boolean;

/** Function type for applying custom CSS classes to dates */
export type DateClassFn<D> = (date: D, view: CalendarView) => string;
