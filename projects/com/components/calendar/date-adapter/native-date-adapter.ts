import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { DateAdapter } from './date-adapter';
import type { NameStyle } from '../calendar.types';

/**
 * DateAdapter implementation using the native JavaScript Date object.
 * This is the default adapter shipped with the library.
 */
@Injectable()
export class NativeDateAdapter extends DateAdapter<Date> {
  private readonly localeId = inject(LOCALE_ID);

  constructor() {
    super();
    this.locale = this.localeId;
  }

  override today(): Date {
    return this.stripTime(new Date());
  }

  override getYear(date: Date): number {
    return date.getFullYear();
  }

  override getMonth(date: Date): number {
    return date.getMonth();
  }

  override getDate(date: Date): number {
    return date.getDate();
  }

  override getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  override addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return this.stripTime(result);
  }

  override addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    const targetMonth = result.getMonth() + months;
    const targetYear = result.getFullYear() + Math.floor(targetMonth / 12);
    const normalizedMonth = ((targetMonth % 12) + 12) % 12;

    // Handle month overflow (e.g., Jan 31 + 1 month = Feb 28/29)
    const daysInTargetMonth = this.getDaysInMonth(targetYear, normalizedMonth);
    const targetDay = Math.min(result.getDate(), daysInTargetMonth);

    result.setFullYear(targetYear, normalizedMonth, targetDay);
    return this.stripTime(result);
  }

  override addYears(date: Date, years: number): Date {
    return this.addMonths(date, years * 12);
  }

  override createDate(year: number, month: number, day: number): Date {
    // Validate inputs
    if (month < 0 || month > 11) {
      throw new Error(`Invalid month index "${month}". Month index must be between 0 and 11.`);
    }

    if (day < 1) {
      throw new Error(`Invalid date "${day}". Date must be greater than 0.`);
    }

    const result = new Date(year, month, day);

    // Check for date overflow (e.g., Feb 30)
    if (result.getMonth() !== month) {
      throw new Error(`Invalid date "${day}" for month index "${month}".`);
    }

    return this.stripTime(result);
  }

  override getNumDaysInMonth(date: Date): number {
    return this.getDaysInMonth(this.getYear(date), this.getMonth(date));
  }

  override getFirstDayOfWeek(): number {
    // Most locales start on Monday (1), but US and others start on Sunday (0)
    // This can be enhanced to use Intl.Locale.prototype.weekInfo when widely supported
    const sundayLocales = ['en', 'ja', 'ko', 'zh'];
    const localePrefix = this.locale.split('-')[0] ?? this.locale;
    return sundayLocales.includes(localePrefix) ? 0 : 1;
  }

  override getMonthNames(style: NameStyle): string[] {
    const formatter = new Intl.DateTimeFormat(this.locale, { month: style });
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2020, i, 1);
      return formatter.format(date);
    });
  }

  override getDayOfWeekNames(style: NameStyle): string[] {
    const formatter = new Intl.DateTimeFormat(this.locale, { weekday: style });
    // Start from a known Sunday (Jan 4, 2020 is a Saturday, Jan 5 is Sunday)
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2020, 0, 5 + i); // Jan 5, 2020 is a Sunday
      return formatter.format(date);
    });
  }

  override getYearName(date: Date): string {
    const formatter = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
    return formatter.format(date);
  }

  override format(date: Date, displayFormat: string): string {
    if (!this.isValid(date)) {
      throw new Error('Cannot format invalid date.');
    }

    // Support common format patterns
    const formatOptions = this.parseFormatString(displayFormat);
    const formatter = new Intl.DateTimeFormat(this.locale, formatOptions);
    return formatter.format(date);
  }

  override parse(value: string, _parseFormat: string): Date | null {
    if (!value) return null;

    // Attempt to parse using Date.parse
    const timestamp = Date.parse(value);
    if (isNaN(timestamp)) {
      return null;
    }

    return this.stripTime(new Date(timestamp));
  }

  override isValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  override isSameDay(first: Date, second: Date): boolean {
    return (
      this.getYear(first) === this.getYear(second) &&
      this.getMonth(first) === this.getMonth(second) &&
      this.getDate(first) === this.getDate(second)
    );
  }

  override compareDate(first: Date, second: Date): number {
    const yearDiff = this.getYear(first) - this.getYear(second);
    if (yearDiff !== 0) return yearDiff > 0 ? 1 : -1;

    const monthDiff = this.getMonth(first) - this.getMonth(second);
    if (monthDiff !== 0) return monthDiff > 0 ? 1 : -1;

    const dateDiff = this.getDate(first) - this.getDate(second);
    if (dateDiff !== 0) return dateDiff > 0 ? 1 : -1;

    return 0;
  }

  override clampDate(date: Date, min: Date | null, max: Date | null): Date {
    if (min && this.compareDate(date, min) < 0) {
      return min;
    }
    if (max && this.compareDate(date, max) > 0) {
      return max;
    }
    return date;
  }

  /**
   * Strips the time component from a date, returning midnight
   */
  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /**
   * Gets the number of days in a specific month
   */
  private getDaysInMonth(year: number, month: number): number {
    // Day 0 of next month gives us the last day of current month
    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * Parses a format string into Intl.DateTimeFormat options
   */
  private parseFormatString(format: string): Intl.DateTimeFormatOptions {
    // Simple format mapping - can be extended as needed
    const formatMap: Record<string, Intl.DateTimeFormatOptions> = {
      short: { dateStyle: 'short' },
      medium: { dateStyle: 'medium' },
      long: { dateStyle: 'long' },
      full: { dateStyle: 'full' },
      monthYear: { year: 'numeric', month: 'long' },
      monthYearShort: { year: 'numeric', month: 'short' },
      dayMonth: { day: 'numeric', month: 'long' },
      dayMonthYear: { day: 'numeric', month: 'long', year: 'numeric' },
    };

    return formatMap[format] ?? { dateStyle: 'medium' };
  }
}
