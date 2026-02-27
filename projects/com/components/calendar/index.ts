/**
 * ngx-com/components/calendar
 * Calendar component public API
 */

// Types
export type {
  DateRange,
  CalendarView,
  CalendarCellState,
  CalendarCell,
  CalendarCellConfig,
  NameStyle,
  DateFilterFn,
  DateClassFn,
} from './calendar.types';

export {
  createDateRange,
  createCalendarCell,
  DAYS_PER_WEEK,
  WEEKS_PER_MONTH,
  YEARS_PER_PAGE,
  YEARS_PER_ROW,
  MONTHS_PER_ROW,
} from './calendar.types';

// Date Adapter
export { DateAdapter, DATE_ADAPTER, NativeDateAdapter } from './date-adapter';

// Variants
export { calendarCellVariants, calendarCellWrapperVariants } from './calendar-cell.variants';
export type { CalendarCellVariants, CalendarCellWrapperVariants } from './calendar-cell.variants';

// Utilities
export {
  createGrid,
  navigateGrid,
  getWeekdayHeaders,
  isDateDisabled,
  isMonthDisabled,
  isYearDisabled,
  getMultiYearStartingYear,
} from './calendar.utils';
export type { WeekdayHeader } from './calendar.utils';

// Components
export { ComCalendarCell } from './calendar-cell';
export type { CalendarCellKeyNavEvent } from './calendar-cell';

// View Components
export {
  CalendarViewBase,
  ComCalendarMonthView,
  ComCalendarYearView,
  ComCalendarMultiYearView,
} from './views';
