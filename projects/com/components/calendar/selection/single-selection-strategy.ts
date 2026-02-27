import { inject, Injectable } from '@angular/core';
import type { DateRange } from '../calendar.types';
import { DateAdapter, DATE_ADAPTER } from '../date-adapter';
import { CalendarSelectionStrategy, type SelectionResult } from './selection-strategy';

/**
 * Selection strategy for single date selection.
 *
 * Behavior:
 * - Click date → immediately selects it
 * - No preview range
 * - Output: single date D
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     { provide: CALENDAR_SELECTION_STRATEGY, useClass: SingleSelectionStrategy }
 *   ],
 *   template: `<com-calendar (selectedChange)="onSelect($event)" />`
 * })
 * export class SinglePickerComponent {
 *   onSelect(date: Date) {
 *     console.log('Selected:', date);
 *   }
 * }
 * ```
 */
@Injectable()
export class SingleSelectionStrategy<D> extends CalendarSelectionStrategy<D, D | null> {
  private readonly dateAdapter = inject(DATE_ADAPTER) as DateAdapter<D>;

  select(date: D, _currentSelection: D | null): SelectionResult<D, D | null> {
    return {
      selection: date,
      isComplete: true,
    };
  }

  createPreview(_activeDate: D | null, _currentSelection: D | null): DateRange<D> | null {
    // Single selection has no preview
    return null;
  }

  isSelected(date: D, currentSelection: D | null): boolean {
    if (!currentSelection) return false;
    return this.dateAdapter.isSameDay(date, currentSelection);
  }

  isRangeStart(_date: D, _currentSelection: D | null): boolean {
    // No range in single selection
    return false;
  }

  isRangeEnd(_date: D, _currentSelection: D | null): boolean {
    return false;
  }

  isRangeMiddle(_date: D, _currentSelection: D | null): boolean {
    return false;
  }
}
