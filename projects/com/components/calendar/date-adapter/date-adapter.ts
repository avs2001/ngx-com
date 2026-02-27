import { InjectionToken } from '@angular/core';
import type { NameStyle } from '../calendar.types';

/**
 * Abstract date adapter class that provides date manipulation operations.
 * Implement this class to support different date libraries (date-fns, Luxon, Temporal, etc.)
 */
export abstract class DateAdapter<D> {
  /** The locale to use for formatting. Can be overridden. */
  locale: string = 'en-US';

  /** Gets today's date */
  abstract today(): D;

  /** Gets the year component of the given date */
  abstract getYear(date: D): number;

  /** Gets the month component of the given date (0-indexed, 0 = January) */
  abstract getMonth(date: D): number;

  /** Gets the day of month component of the given date */
  abstract getDate(date: D): number;

  /** Gets the day of the week (0 = Sunday, 6 = Saturday) */
  abstract getDayOfWeek(date: D): number;

  /** Adds the given number of days to the date */
  abstract addDays(date: D, days: number): D;

  /** Adds the given number of months to the date */
  abstract addMonths(date: D, months: number): D;

  /** Adds the given number of years to the date */
  abstract addYears(date: D, years: number): D;

  /** Creates a new date with the given year, month (0-indexed), and day */
  abstract createDate(year: number, month: number, date: number): D;

  /** Gets the number of days in the month of the given date */
  abstract getNumDaysInMonth(date: D): number;

  /** Gets the first day of the week (0 = Sunday, 1 = Monday, etc.) */
  abstract getFirstDayOfWeek(): number;

  /** Gets the names of the months */
  abstract getMonthNames(style: NameStyle): string[];

  /** Gets the names of the days of the week */
  abstract getDayOfWeekNames(style: NameStyle): string[];

  /** Gets the display name for a year */
  abstract getYearName(date: D): string;

  /** Formats the date according to the given format string */
  abstract format(date: D, displayFormat: string): string;

  /** Parses a date string into a date object */
  abstract parse(value: string, parseFormat: string): D | null;

  /** Checks whether the given date is valid */
  abstract isValid(date: D): boolean;

  /** Checks whether two dates are the same day */
  abstract isSameDay(first: D, second: D): boolean;

  /** Compares two dates. Returns -1 if first < second, 0 if equal, 1 if first > second */
  abstract compareDate(first: D, second: D): number;

  /** Clamps the given date to the specified min/max range */
  abstract clampDate(date: D, min: D | null, max: D | null): D;

  /**
   * Gets the first day of the month for the given date
   */
  getFirstDayOfMonth(date: D): D {
    return this.createDate(this.getYear(date), this.getMonth(date), 1);
  }

  /**
   * Checks whether two dates are in the same month and year
   */
  isSameMonthAndYear(first: D, second: D): boolean {
    return (
      this.getYear(first) === this.getYear(second) &&
      this.getMonth(first) === this.getMonth(second)
    );
  }

  /**
   * Checks whether the given date is within the specified range
   */
  isDateInRange(date: D, start: D | null, end: D | null): boolean {
    if (!start || !end) return false;
    const compareToStart = this.compareDate(date, start);
    const compareToEnd = this.compareDate(date, end);
    return compareToStart >= 0 && compareToEnd <= 0;
  }

  /**
   * Gets a unique identifier for the date (useful for trackBy)
   */
  getId(date: D): string {
    return `${this.getYear(date)}-${this.getMonth(date)}-${this.getDate(date)}`;
  }

  /**
   * Sets the locale for the adapter
   */
  setLocale(locale: string): void {
    this.locale = locale;
  }
}

/** Injection token for the DateAdapter */
export const DATE_ADAPTER: InjectionToken<DateAdapter<unknown>> = new InjectionToken<DateAdapter<unknown>>('DATE_ADAPTER');
