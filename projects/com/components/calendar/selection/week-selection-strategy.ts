import { inject, Injectable } from '@angular/core';
import type { DateRange } from '../calendar.types';
import { DateAdapter, DATE_ADAPTER } from '../date-adapter';
import { CalendarSelectionStrategy, type SelectionResult } from './selection-strategy';

/**
 * Selection strategy for week selection.
 *
 * Behavior:
 * - Click any day → selects the entire week containing that day
 * - Week starts based on DateAdapter.getFirstDayOfWeek()
 * - Single click completes selection
 * - Output: DateRange<D> (Monday–Sunday or Sunday–Saturday)
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     { provide: CALENDAR_SELECTION_STRATEGY, useClass: WeekSelectionStrategy }
 *   ],
 *   template: `<com-calendar (selectedChange)="onWeekSelect($event)" />`
 * })
 * export class WeekPickerComponent {
 *   onWeekSelect(week: DateRange<Date>) {
 *     console.log('Week:', week.start, 'to', week.end);
 *   }
 * }
 * ```
 */
@Injectable()
export class WeekSelectionStrategy<D> extends CalendarSelectionStrategy<D, DateRange<D> | null> {
  private readonly dateAdapter = inject(DATE_ADAPTER) as DateAdapter<D>;

  select(date: D, _currentSelection: DateRange<D> | null): SelectionResult<D, DateRange<D> | null> {
    const weekRange = this.getWeekRange(date);
    return {
      selection: weekRange,
      isComplete: true,
    };
  }

  createPreview(activeDate: D | null, _currentSelection: DateRange<D> | null): DateRange<D> | null {
    if (!activeDate) return null;
    return this.getWeekRange(activeDate);
  }

  isSelected(date: D, currentSelection: DateRange<D> | null): boolean {
    if (!currentSelection?.start || !currentSelection?.end) return false;
    return this.dateAdapter.isDateInRange(date, currentSelection.start, currentSelection.end);
  }

  isRangeStart(date: D, currentSelection: DateRange<D> | null): boolean {
    if (!currentSelection?.start) return false;
    return this.dateAdapter.isSameDay(date, currentSelection.start);
  }

  isRangeEnd(date: D, currentSelection: DateRange<D> | null): boolean {
    if (!currentSelection?.end) return false;
    return this.dateAdapter.isSameDay(date, currentSelection.end);
  }

  isRangeMiddle(date: D, currentSelection: DateRange<D> | null): boolean {
    if (!currentSelection?.start || !currentSelection?.end) return false;
    return (
      this.isSelected(date, currentSelection) &&
      !this.isRangeStart(date, currentSelection) &&
      !this.isRangeEnd(date, currentSelection)
    );
  }

  /** Compute the week range for a given date */
  private getWeekRange(date: D): DateRange<D> {
    const dayOfWeek = this.dateAdapter.getDayOfWeek(date);
    const firstDayOfWeek = this.dateAdapter.getFirstDayOfWeek();

    // Calculate days to subtract to get to week start
    const daysToSubtract = (dayOfWeek - firstDayOfWeek + 7) % 7;
    const weekStart = this.dateAdapter.addDays(date, -daysToSubtract);
    const weekEnd = this.dateAdapter.addDays(weekStart, 6);

    return { start: weekStart, end: weekEnd };
  }
}
