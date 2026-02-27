import {
  ChangeDetectionStrategy,
  Component,
  computed,
  viewChildren,
  type Signal,
} from '@angular/core';
import { ComCalendarCell, type CalendarCellKeyNavEvent } from '../calendar-cell';
import type { CalendarCell, CalendarView } from '../calendar.types';
import { MONTHS_PER_ROW, createCalendarCell } from '../calendar.types';
import { createGrid, isMonthDisabled } from '../calendar.utils';
import { CalendarViewBase } from './calendar-view-base';

const MONTHS_PER_YEAR = 12;

/**
 * Year view component displaying a 4x3 grid of months.
 * Allows the user to select a month within the currently active year.
 *
 * @example
 * ```html
 * <com-calendar-year-view
 *   [activeDate]="activeDate()"
 *   [selected]="selected()"
 *   (selectedChange)="onMonthSelected($event)"
 *   (activeDateChange)="onActiveMonthChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'com-calendar-year-view',
  template: `
    <div
      role="grid"
      class="com-calendar-year-view"
      [attr.aria-label]="gridLabel()"
      (mouseleave)="onGridMouseLeave()"
    >
      @for (row of cells(); track $index) {
        <div role="row" class="com-calendar-year-view__row grid grid-cols-4 gap-1">
          @for (cell of row; track cell.compareValue) {
            <com-calendar-cell
              [cell]="cell"
              [view]="view"
              [tabindex]="isActiveCell(cell) ? 0 : -1"
              [cellTemplate]="cellTemplate()"
              [attr.data-compare-value]="cell.compareValue"
              (selected)="onCellSelected($event)"
              (previewed)="onCellPreviewed($event)"
              (keyNav)="onKeyNav($event)"
            />
          }
        </div>
      }
    </div>
  `,
  imports: [ComCalendarCell],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-calendar-year-view-host',
  },
})
export class ComCalendarYearView<D> extends CalendarViewBase<D> {
  protected readonly view: CalendarView = 'year';

  /** Cell components for focus management */
  protected readonly cellComponents: Signal<readonly ComCalendarCell<D>[]> = viewChildren(ComCalendarCell<D>);

  /** The year being displayed */
  readonly displayYear: Signal<number> = computed(() => {
    return this.dateAdapter.getYear(this.activeDate());
  });

  /** Grid of month cells (4 columns x 3 rows = 12 months) */
  readonly cells: Signal<CalendarCell<D>[][]> = computed(() => {
    const year = this.displayYear();
    const monthNames = this.dateAdapter.getMonthNames('short');
    const today = this.today();
    const todayYear = this.dateAdapter.getYear(today);
    const todayMonth = this.dateAdapter.getMonth(today);
    const activeMonth = this.dateAdapter.getMonth(this.activeDate());
    const minDate = this.minDate();
    const maxDate = this.maxDate();
    const dateClass = this.dateClass();

    const months: CalendarCell<D>[] = [];

    for (let month = 0; month < MONTHS_PER_YEAR; month++) {
      const date = this.dateAdapter.createDate(year, month, 1);
      const isDisabled = isMonthDisabled(year, month, minDate, maxDate, this.dateAdapter);
      const isToday = year === todayYear && month === todayMonth;
      const isSelectedMonth = this.isMonthSelected(year, month);
      const cssClasses = dateClass ? dateClass(date, this.view) : '';

      const monthName = monthNames[month] ?? '';
      const cell = createCalendarCell<D>({
        value: date,
        displayValue: monthName,
        ariaLabel: `${monthName} ${year}`,
        enabled: !isDisabled,
        cssClasses,
        compareValue: month,
      });

      // Update computed properties
      cell.isToday = isToday;
      cell.isSelected = isSelectedMonth;
      cell.isRangeStart = this.isMonthRangeStart(year, month);
      cell.isRangeEnd = this.isMonthRangeEnd(year, month);
      cell.isRangeMiddle = this.isMonthRangeMiddle(year, month);
      cell.isPreviewStart = this.isMonthPreviewStart(year, month);
      cell.isPreviewEnd = this.isMonthPreviewEnd(year, month);
      cell.isPreviewMiddle = this.isMonthPreviewMiddle(year, month);

      months.push(cell);
    }

    return createGrid(months, MONTHS_PER_ROW);
  });

  /** Accessible label for the grid */
  readonly gridLabel: Signal<string> = computed(() => {
    return `${this.displayYear()}`;
  });

  protected getActiveCompareValue(): number {
    return this.dateAdapter.getMonth(this.activeDate());
  }

  /**
   * Handles keyboard navigation for the year view.
   * - Arrow left/right: ±1 month
   * - Arrow up/down: ±4 months (one row)
   * - Home: January
   * - End: December
   * - PageUp: Previous year
   * - PageDown: Next year
   */
  onKeyNav(event: CalendarCellKeyNavEvent<D>): void {
    const currentMonth = this.dateAdapter.getMonth(event.cell.value);
    const year = this.displayYear();
    let newDate: D | null = null;

    switch (event.direction) {
      case 'left':
        if (currentMonth > 0) {
          newDate = this.dateAdapter.addMonths(event.cell.value, -1);
          this.focusCell(currentMonth - 1);
        }
        break;

      case 'right':
        if (currentMonth < 11) {
          newDate = this.dateAdapter.addMonths(event.cell.value, 1);
          this.focusCell(currentMonth + 1);
        }
        break;

      case 'up':
        if (currentMonth >= MONTHS_PER_ROW) {
          newDate = this.dateAdapter.addMonths(event.cell.value, -MONTHS_PER_ROW);
          this.focusCell(currentMonth - MONTHS_PER_ROW);
        }
        break;

      case 'down':
        if (currentMonth < MONTHS_PER_YEAR - MONTHS_PER_ROW) {
          newDate = this.dateAdapter.addMonths(event.cell.value, MONTHS_PER_ROW);
          this.focusCell(currentMonth + MONTHS_PER_ROW);
        }
        break;

      case 'home':
        newDate = this.dateAdapter.createDate(year, 0, 1);
        this.focusCell(0);
        break;

      case 'end':
        newDate = this.dateAdapter.createDate(year, 11, 1);
        this.focusCell(11);
        break;

      case 'pageUp':
        newDate = this.dateAdapter.addYears(event.cell.value, -1);
        break;

      case 'pageDown':
        newDate = this.dateAdapter.addYears(event.cell.value, 1);
        break;
    }

    if (newDate) {
      this.activeDateChange.emit(newDate);
    }
  }

  private isMonthSelected(year: number, month: number): boolean {
    const sel = this.selected();
    if (!sel) return false;

    if (!this.isDateRange(sel)) {
      return (
        this.dateAdapter.getYear(sel) === year && this.dateAdapter.getMonth(sel) === month
      );
    }

    const range = sel;
    if (
      range.start &&
      this.dateAdapter.getYear(range.start) === year &&
      this.dateAdapter.getMonth(range.start) === month
    ) {
      return true;
    }
    if (
      range.end &&
      this.dateAdapter.getYear(range.end) === year &&
      this.dateAdapter.getMonth(range.end) === month
    ) {
      return true;
    }
    return false;
  }

  private isMonthRangeStart(year: number, month: number): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel) || !sel.start) return false;
    return (
      this.dateAdapter.getYear(sel.start) === year &&
      this.dateAdapter.getMonth(sel.start) === month
    );
  }

  private isMonthRangeEnd(year: number, month: number): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel) || !sel.end) return false;
    return (
      this.dateAdapter.getYear(sel.end) === year && this.dateAdapter.getMonth(sel.end) === month
    );
  }

  private isMonthRangeMiddle(year: number, month: number): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel) || !sel.start || !sel.end) return false;

    const monthDate = this.dateAdapter.createDate(year, month, 1);
    const startMonth = this.dateAdapter.createDate(
      this.dateAdapter.getYear(sel.start),
      this.dateAdapter.getMonth(sel.start),
      1
    );
    const endMonth = this.dateAdapter.createDate(
      this.dateAdapter.getYear(sel.end),
      this.dateAdapter.getMonth(sel.end),
      1
    );

    return (
      this.dateAdapter.compareDate(monthDate, startMonth) > 0 &&
      this.dateAdapter.compareDate(monthDate, endMonth) < 0
    );
  }

  private isMonthPreviewStart(year: number, month: number): boolean {
    const start = this.previewStart();
    if (!start) return false;
    return (
      this.dateAdapter.getYear(start) === year && this.dateAdapter.getMonth(start) === month
    );
  }

  private isMonthPreviewEnd(year: number, month: number): boolean {
    const end = this.previewEnd();
    if (!end) return false;
    return this.dateAdapter.getYear(end) === year && this.dateAdapter.getMonth(end) === month;
  }

  private isMonthPreviewMiddle(year: number, month: number): boolean {
    const start = this.previewStart();
    const end = this.previewEnd();
    if (!start || !end) return false;

    const monthDate = this.dateAdapter.createDate(year, month, 1);
    const startMonth = this.dateAdapter.createDate(
      this.dateAdapter.getYear(start),
      this.dateAdapter.getMonth(start),
      1
    );
    const endMonth = this.dateAdapter.createDate(
      this.dateAdapter.getYear(end),
      this.dateAdapter.getMonth(end),
      1
    );

    return (
      this.dateAdapter.compareDate(monthDate, startMonth) > 0 &&
      this.dateAdapter.compareDate(monthDate, endMonth) < 0
    );
  }
}
