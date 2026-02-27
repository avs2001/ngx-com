/**
 * Selection strategies for calendar component.
 * Provides pluggable selection behaviors: single, range, multiple, and week selection.
 */

export {
  CalendarSelectionStrategy,
  CALENDAR_SELECTION_STRATEGY,
  type SelectionResult,
} from './selection-strategy';

export { SingleSelectionStrategy } from './single-selection-strategy';
export { RangeSelectionStrategy } from './range-selection-strategy';
export { MultiSelectionStrategy } from './multi-selection-strategy';
export { WeekSelectionStrategy } from './week-selection-strategy';
