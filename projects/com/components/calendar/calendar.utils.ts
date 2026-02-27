import type { DateAdapter } from './date-adapter';
import type { NameStyle } from './calendar.types';

/**
 * Creates a 2D grid from a flat array of items.
 *
 * @param items The flat array of items to arrange into a grid
 * @param columns Number of columns per row
 * @returns 2D array where each inner array is a row
 */
export function createGrid<T>(items: T[], columns: number): T[][] {
  const grid: T[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    grid.push(items.slice(i, i + columns));
  }
  return grid;
}

/**
 * Calculates the new index when navigating a grid with arrow keys.
 *
 * @param currentIndex Current position in the flat array
 * @param direction Navigation direction ('left' | 'right' | 'up' | 'down')
 * @param totalItems Total number of items in the grid
 * @param columns Number of columns per row
 * @returns New index or null if navigation would go out of bounds
 */
export function navigateGrid(
  currentIndex: number,
  direction: 'left' | 'right' | 'up' | 'down',
  totalItems: number,
  columns: number
): number | null {
  let newIndex: number;

  switch (direction) {
    case 'left':
      newIndex = currentIndex - 1;
      break;
    case 'right':
      newIndex = currentIndex + 1;
      break;
    case 'up':
      newIndex = currentIndex - columns;
      break;
    case 'down':
      newIndex = currentIndex + columns;
      break;
    default:
      return null;
  }

  if (newIndex < 0 || newIndex >= totalItems) {
    return null;
  }

  return newIndex;
}

/**
 * Weekday header information for the month view.
 */
export interface WeekdayHeader {
  /** Full label for the weekday (used in aria-label) */
  label: string;
  /** Narrow/abbreviated label (displayed in the header cell) */
  narrow: string;
}

/**
 * Gets weekday headers for the calendar month view.
 * The headers are ordered starting from the first day of the week.
 *
 * @param adapter Date adapter to use for getting weekday names
 * @param style Style for the full label ('long' | 'short' | 'narrow')
 * @returns Array of weekday headers starting from first day of week
 */
export function getWeekdayHeaders<D>(
  adapter: DateAdapter<D>,
  style: NameStyle = 'long'
): WeekdayHeader[] {
  const firstDayOfWeek = adapter.getFirstDayOfWeek();
  const longNames = adapter.getDayOfWeekNames(style);
  const narrowNames = adapter.getDayOfWeekNames('narrow');

  const headers: WeekdayHeader[] = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (firstDayOfWeek + i) % 7;
    headers.push({
      label: longNames[dayIndex] ?? '',
      narrow: narrowNames[dayIndex] ?? '',
    });
  }
  return headers;
}

/**
 * Checks whether a date should be disabled based on constraints.
 *
 * @param date The date to check
 * @param minDate Minimum allowed date (inclusive)
 * @param maxDate Maximum allowed date (inclusive)
 * @param dateFilter Custom filter function
 * @param adapter Date adapter for comparisons
 * @returns true if the date should be disabled
 */
export function isDateDisabled<D>(
  date: D,
  minDate: D | null,
  maxDate: D | null,
  dateFilter: ((d: D) => boolean) | null,
  adapter: DateAdapter<D>
): boolean {
  if (minDate && adapter.compareDate(date, minDate) < 0) {
    return true;
  }
  if (maxDate && adapter.compareDate(date, maxDate) > 0) {
    return true;
  }
  if (dateFilter && !dateFilter(date)) {
    return true;
  }
  return false;
}

/**
 * Checks whether a month should be disabled based on constraints.
 * A month is disabled if ALL days in that month are disabled.
 *
 * @param year The year of the month to check
 * @param month The month to check (0-indexed)
 * @param minDate Minimum allowed date
 * @param maxDate Maximum allowed date
 * @param adapter Date adapter for date operations
 * @returns true if the entire month should be disabled
 */
export function isMonthDisabled<D>(
  year: number,
  month: number,
  minDate: D | null,
  maxDate: D | null,
  adapter: DateAdapter<D>
): boolean {
  const firstOfMonth = adapter.createDate(year, month, 1);
  const lastOfMonth = adapter.createDate(year, month, adapter.getNumDaysInMonth(firstOfMonth));

  // Month is disabled if it's entirely before min or entirely after max
  if (minDate && adapter.compareDate(lastOfMonth, minDate) < 0) {
    return true;
  }
  if (maxDate && adapter.compareDate(firstOfMonth, maxDate) > 0) {
    return true;
  }
  return false;
}

/**
 * Checks whether a year should be disabled based on constraints.
 * A year is disabled if ALL months in that year are disabled.
 *
 * @param year The year to check
 * @param minDate Minimum allowed date
 * @param maxDate Maximum allowed date
 * @param adapter Date adapter for date operations
 * @returns true if the entire year should be disabled
 */
export function isYearDisabled<D>(
  year: number,
  minDate: D | null,
  maxDate: D | null,
  adapter: DateAdapter<D>
): boolean {
  const firstOfYear = adapter.createDate(year, 0, 1);
  const lastOfYear = adapter.createDate(year, 11, 31);

  // Year is disabled if it's entirely before min or entirely after max
  if (minDate && adapter.compareDate(lastOfYear, minDate) < 0) {
    return true;
  }
  if (maxDate && adapter.compareDate(firstOfYear, maxDate) > 0) {
    return true;
  }
  return false;
}

/**
 * Gets the starting year for the multi-year view grid.
 * Aligns the year to be at the start of a YEARS_PER_PAGE block.
 *
 * @param activeYear The currently active year
 * @param yearsPerPage Number of years shown per page (default 24)
 * @returns The first year of the multi-year page
 */
export function getMultiYearStartingYear(activeYear: number, yearsPerPage: number = 24): number {
  return Math.floor(activeYear / yearsPerPage) * yearsPerPage;
}
