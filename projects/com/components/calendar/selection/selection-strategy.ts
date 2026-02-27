import { InjectionToken } from '@angular/core';
import type { DateRange } from '../calendar.types';

/**
 * Result returned from a selection strategy's select method.
 */
export interface SelectionResult<D, S> {
  /** The new selection value */
  selection: S;
  /** Whether the selection is complete (emit to consumer) */
  isComplete: boolean;
  /** Optional: dates to highlight during incomplete selection */
  preview?: DateRange<D> | null;
}

/**
 * Abstract selection strategy that defines how dates are selected and previewed.
 * Implement this class to create custom selection behaviors.
 *
 * @typeParam D - The date type (e.g., Date, Luxon DateTime)
 * @typeParam S - The selection type (e.g., D | null, DateRange<D>, D[])
 */
export abstract class CalendarSelectionStrategy<D, S = unknown> {
  /**
   * Process a date selection. Called when user clicks a date cell.
   * @param date The clicked date
   * @param currentSelection The current selection state
   * @returns Object with new selection and whether selection is complete
   */
  abstract select(date: D, currentSelection: S): SelectionResult<D, S>;

  /**
   * Create a preview range based on current selection and hovered date.
   * Used for showing range preview while hovering.
   * @param activeDate The currently hovered date
   * @param currentSelection The current selection state
   * @returns DateRange for preview styling, or null if no preview
   */
  abstract createPreview(activeDate: D | null, currentSelection: S): DateRange<D> | null;

  /**
   * Check if a date is part of the current selection.
   * Used for styling cells.
   */
  abstract isSelected(date: D, currentSelection: S): boolean;

  /**
   * Check if a date is the start of a selected range.
   */
  abstract isRangeStart(date: D, currentSelection: S): boolean;

  /**
   * Check if a date is the end of a selected range.
   */
  abstract isRangeEnd(date: D, currentSelection: S): boolean;

  /**
   * Check if a date is in the middle of a selected range.
   */
  abstract isRangeMiddle(date: D, currentSelection: S): boolean;
}

/** Injection token for the selection strategy */
export const CALENDAR_SELECTION_STRATEGY: InjectionToken<
  CalendarSelectionStrategy<unknown, unknown>
> = new InjectionToken<CalendarSelectionStrategy<unknown, unknown>>(
  'CalendarSelectionStrategy'
);
