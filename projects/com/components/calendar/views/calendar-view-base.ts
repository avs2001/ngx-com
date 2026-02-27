import {
  Directive,
  ElementRef,
  afterEveryRender,
  inject,
  input,
  output,
  computed,
  signal,
  type Signal,
  type InputSignal,
  type OutputEmitterRef,
  type WritableSignal,
  type TemplateRef,
} from '@angular/core';
import type {
  CalendarCell,
  CalendarView,
  DateFilterFn,
  DateClassFn,
  DateRange,
} from '../calendar.types';
import { DateAdapter, DATE_ADAPTER } from '../date-adapter';

/**
 * Abstract base class for calendar view components.
 * Provides shared inputs, outputs, and utility methods for month, year, and multi-year views.
 */
@Directive()
export abstract class CalendarViewBase<D> {
  /** Date adapter for date operations */
  protected readonly dateAdapter: DateAdapter<D> = inject(DATE_ADAPTER) as DateAdapter<D>;

  /** Element reference for focus management */
  protected readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  /** The date to display and navigate from */
  readonly activeDate: InputSignal<D> = input.required<D>();

  /** The currently selected date or date range */
  readonly selected: InputSignal<D | DateRange<D> | null> = input<D | DateRange<D> | null>(null);

  /** Minimum selectable date */
  readonly minDate: InputSignal<D | null> = input<D | null>(null);

  /** Maximum selectable date */
  readonly maxDate: InputSignal<D | null> = input<D | null>(null);

  /** Custom filter function to disable specific dates */
  readonly dateFilter: InputSignal<DateFilterFn<D> | null> = input<DateFilterFn<D> | null>(null);

  /** Custom function to add CSS classes to dates */
  readonly dateClass: InputSignal<DateClassFn<D> | null> = input<DateClassFn<D> | null>(null);

  /** Start date for range preview (hover state) */
  readonly previewStart: InputSignal<D | null> = input<D | null>(null);

  /** End date for range preview (hover state) */
  readonly previewEnd: InputSignal<D | null> = input<D | null>(null);

  /** Custom template for cell content */
  readonly cellTemplate: InputSignal<TemplateRef<{ $implicit: CalendarCell<D> }> | null> = input<
    TemplateRef<{ $implicit: CalendarCell<D> }> | null
  >(null);

  /** Emitted when a date is selected */
  readonly selectedChange: OutputEmitterRef<D> = output<D>();

  /** Emitted when the active date changes (keyboard navigation) */
  readonly activeDateChange: OutputEmitterRef<D> = output<D>();

  /** Emitted when the preview range changes (mouse hover) */
  readonly previewChange: OutputEmitterRef<D | null> = output<D | null>();

  /** The calendar view type for this component */
  protected abstract readonly view: CalendarView;

  /** Internal signal for tracking the focused cell's compare value */
  protected readonly focusedCellValue: WritableSignal<number | null> = signal<number | null>(null);

  /** Signal for pending focus operation (set by focusCell, consumed by afterRender) */
  protected readonly focusPending: WritableSignal<number | null> = signal<number | null>(null);

  constructor() {
    // Handle focus after render to ensure DOM is updated
    afterEveryRender(() => {
      const pending = this.focusPending();
      if (pending !== null) {
        const cell = this.elementRef.nativeElement.querySelector(
          `[data-compare-value="${pending}"] button`
        ) as HTMLElement;
        cell?.focus();
        this.focusPending.set(null);
      }
    });
  }

  /**
   * The grid of cells to display.
   * Must be implemented by each view to generate the appropriate cells.
   */
  abstract readonly cells: Signal<CalendarCell<D>[][]>;

  /**
   * Accessible label for the grid (e.g., "January 2024").
   * Must be implemented by each view.
   */
  abstract readonly gridLabel: Signal<string>;

  /** Today's date for comparison */
  protected readonly today: Signal<D> = computed(() => this.dateAdapter.today());

  /**
   * Checks if a date is the currently selected date.
   */
  protected isSelected(date: D): boolean {
    const sel = this.selected();
    if (!sel) return false;

    // Single date selection
    if (!this.isDateRange(sel)) {
      return this.dateAdapter.isSameDay(date, sel);
    }

    // Range selection - check start or end
    const range = sel as DateRange<D>;
    if (range.start && this.dateAdapter.isSameDay(date, range.start)) return true;
    if (range.end && this.dateAdapter.isSameDay(date, range.end)) return true;
    return false;
  }

  /**
   * Checks if a date is the start of a selected range.
   */
  protected isRangeStart(date: D): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel)) return false;
    return sel.start !== null && this.dateAdapter.isSameDay(date, sel.start);
  }

  /**
   * Checks if a date is the end of a selected range.
   */
  protected isRangeEnd(date: D): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel)) return false;
    return sel.end !== null && this.dateAdapter.isSameDay(date, sel.end);
  }

  /**
   * Checks if a date is in the middle of a selected range.
   */
  protected isRangeMiddle(date: D): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel)) return false;
    if (!sel.start || !sel.end) return false;
    return this.dateAdapter.isDateInRange(date, sel.start, sel.end) && !this.isRangeStart(date) && !this.isRangeEnd(date);
  }

  /**
   * Checks if a date is the start of the preview range.
   */
  protected isPreviewStart(date: D): boolean {
    const start = this.previewStart();
    return start !== null && this.dateAdapter.isSameDay(date, start);
  }

  /**
   * Checks if a date is the end of the preview range.
   */
  protected isPreviewEnd(date: D): boolean {
    const end = this.previewEnd();
    return end !== null && this.dateAdapter.isSameDay(date, end);
  }

  /**
   * Checks if a date is in the middle of the preview range.
   */
  protected isPreviewMiddle(date: D): boolean {
    const start = this.previewStart();
    const end = this.previewEnd();
    if (!start || !end) return false;
    return (
      this.dateAdapter.isDateInRange(date, start, end) && !this.isPreviewStart(date) && !this.isPreviewEnd(date)
    );
  }

  /**
   * Type guard to check if a value is a DateRange.
   */
  protected isDateRange(value: D | DateRange<D>): value is DateRange<D> {
    return value !== null && typeof value === 'object' && 'start' in value && 'end' in value;
  }

  /**
   * Handles cell selection events.
   */
  onCellSelected(cell: CalendarCell<D>): void {
    if (cell.enabled) {
      this.selectedChange.emit(cell.value);
    }
  }

  /**
   * Handles cell preview events (mouse hover).
   */
  onCellPreviewed(cell: CalendarCell<D>): void {
    this.previewChange.emit(cell.value);
  }

  /**
   * Clears the preview when mouse leaves the grid.
   */
  onGridMouseLeave(): void {
    this.previewChange.emit(null);
  }

  /**
   * Handles keyboard navigation within the grid.
   * Must be implemented by each view to handle view-specific navigation.
   */
  abstract onKeyNav(event: { direction: string; cell: CalendarCell<D> }): void;

  /**
   * Checks if a cell should have tabindex="0" (be the focusable cell).
   */
  isActiveCell(cell: CalendarCell<D>): boolean {
    const focused = this.focusedCellValue();
    if (focused !== null) {
      return cell.compareValue === focused;
    }
    // Default to the active date's cell
    return this.getActiveCompareValue() === cell.compareValue;
  }

  /**
   * Gets the compare value for the active date.
   * Must be implemented by each view.
   */
  protected abstract getActiveCompareValue(): number;

  /**
   * Focuses the cell with the given compare value.
   * Uses afterRender to ensure DOM is updated before focusing.
   */
  protected focusCell(compareValue: number): void {
    this.focusedCellValue.set(compareValue);
    this.focusPending.set(compareValue);
  }
}
