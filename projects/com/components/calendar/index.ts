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
} from './calendar.types';

export {
  createDateRange,
  createCalendarCell,
  YEARS_PER_PAGE,
  YEARS_PER_ROW,
  MONTHS_PER_ROW,
} from './calendar.types';

// Date Adapter
export { DateAdapter, DATE_ADAPTER, NativeDateAdapter } from './date-adapter';

// Variants
export { calendarCellVariants, calendarCellWrapperVariants } from './calendar-cell.variants';
export type { CalendarCellVariants, CalendarCellWrapperVariants } from './calendar-cell.variants';

// Components
export { ComCalendarCell } from './calendar-cell';
export type { CalendarCellKeyNavEvent } from './calendar-cell';
