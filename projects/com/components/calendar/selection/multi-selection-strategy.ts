import { inject, Injectable } from '@angular/core';
import type { DateRange } from '../calendar.types';
import { DateAdapter, DATE_ADAPTER } from '../date-adapter';
import { CalendarSelectionStrategy, type SelectionResult } from './selection-strategy';

/**
 * Selection strategy for multiple date selection.
 *
 * Behavior:
 * - Click date → toggles it in/out of selection array
 * - Each click is complete (emits immediately)
 * - No preview range
 * - Output: D[]
 *
 * @example
 * ```typescript
 * @Component({
 *   providers: [
 *     { provide: CALENDAR_SELECTION_STRATEGY, useClass: MultiSelectionStrategy }
 *   ],
 *   template: `<com-calendar (selectedChange)="onMultiSelect($event)" />`
 * })
 * export class MultiPickerComponent {
 *   selectedDates = signal<Date[]>([]);
 *
 *   onMultiSelect(dates: Date[]) {
 *     this.selectedDates.set(dates);
 *   }
 * }
 * ```
 */
@Injectable()
export class MultiSelectionStrategy<D> extends CalendarSelectionStrategy<D, D[]> {
  private readonly dateAdapter = inject(DATE_ADAPTER) as DateAdapter<D>;

  select(date: D, currentSelection: D[]): SelectionResult<D, D[]> {
    const existing = currentSelection ?? [];
    const index = existing.findIndex(d => this.dateAdapter.isSameDay(d, date));

    let newSelection: D[];
    if (index >= 0) {
      // Date exists, remove it
      newSelection = [...existing.slice(0, index), ...existing.slice(index + 1)];
    } else {
      // Date doesn't exist, add it
      newSelection = [...existing, date];
    }

    return {
      selection: newSelection,
      isComplete: true, // Each toggle is a complete action
    };
  }

  createPreview(_activeDate: D | null, _currentSelection: D[]): DateRange<D> | null {
    // Multi-selection has no range preview
    return null;
  }

  isSelected(date: D, currentSelection: D[]): boolean {
    const selection = currentSelection ?? [];
    return selection.some(d => this.dateAdapter.isSameDay(d, date));
  }

  isRangeStart(_date: D, _currentSelection: D[]): boolean {
    // No ranges in multi-selection
    return false;
  }

  isRangeEnd(_date: D, _currentSelection: D[]): boolean {
    return false;
  }

  isRangeMiddle(_date: D, _currentSelection: D[]): boolean {
    return false;
  }
}
