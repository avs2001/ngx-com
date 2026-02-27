import { inject, Injectable } from '@angular/core';
import type { DateRange } from '../calendar.types';
import { DateAdapter, DATE_ADAPTER } from '../date-adapter';
import { CalendarSelectionStrategy, type SelectionResult } from './selection-strategy';

/**
 * Selection strategy for date range selection.
 *
 * Behavior:
 * - First click → sets range start, selection incomplete
 * - Second click → sets range end, selection complete
 * - If second date is before first, swap them
 * - Hovering after first click shows preview range
 * - Output: DateRange<D>
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     { provide: CALENDAR_SELECTION_STRATEGY, useClass: RangeSelectionStrategy }
 *   ],
 *   template: `
 *     <com-calendar
 *       [selected]="selectedRange()"
 *       (selectedChange)="onRangeSelect($event)"
 *     />
 *   `
 * })
 * export class RangePickerComponent {
 *   selectedRange = signal<DateRange<Date> | null>(null);
 *
 *   onRangeSelect(range: DateRange<Date>) {
 *     this.selectedRange.set(range);
 *   }
 * }
 * ```
 */
@Injectable()
export class RangeSelectionStrategy<D> extends CalendarSelectionStrategy<D, DateRange<D> | null> {
  private readonly dateAdapter = inject(DATE_ADAPTER) as DateAdapter<D>;

  select(date: D, currentSelection: DateRange<D> | null): SelectionResult<D, DateRange<D> | null> {
    // If no selection or selection is complete, start new range
    if (!currentSelection || (currentSelection.start && currentSelection.end)) {
      return {
        selection: { start: date, end: null },
        isComplete: false,
      };
    }

    // We have a start but no end - complete the range
    const start = currentSelection.start!;
    let rangeStart: D;
    let rangeEnd: D;

    // Ensure start <= end
    if (this.dateAdapter.compareDate(date, start) < 0) {
      rangeStart = date;
      rangeEnd = start;
    } else {
      rangeStart = start;
      rangeEnd = date;
    }

    return {
      selection: { start: rangeStart, end: rangeEnd },
      isComplete: true,
    };
  }

  createPreview(activeDate: D | null, currentSelection: DateRange<D> | null): DateRange<D> | null {
    // Only show preview when we have start but no end
    if (!activeDate || !currentSelection?.start || currentSelection.end) {
      return null;
    }

    const start = currentSelection.start;
    // Ensure preview has correct order
    if (this.dateAdapter.compareDate(activeDate, start) < 0) {
      return { start: activeDate, end: start };
    }
    return { start, end: activeDate };
  }

  isSelected(date: D, currentSelection: DateRange<D> | null): boolean {
    if (!currentSelection) return false;
    const { start, end } = currentSelection;
    if (start && this.dateAdapter.isSameDay(date, start)) return true;
    if (end && this.dateAdapter.isSameDay(date, end)) return true;
    return false;
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
      this.dateAdapter.isDateInRange(date, currentSelection.start, currentSelection.end) &&
      !this.isRangeStart(date, currentSelection) &&
      !this.isRangeEnd(date, currentSelection)
    );
  }
}
