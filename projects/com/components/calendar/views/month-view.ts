import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  viewChildren,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { ComCalendarCell, type CalendarCellKeyNavEvent } from '../calendar-cell';
import type { CalendarCell, CalendarView } from '../calendar.types';
import {
  DAYS_PER_WEEK,
  WEEKS_PER_MONTH,
  createCalendarCell,
} from '../calendar.types';
import { createGrid, getWeekdayHeaders, isDateDisabled, type WeekdayHeader } from '../calendar.utils';
import { CalendarViewBase } from './calendar-view-base';

const TOTAL_CELLS = DAYS_PER_WEEK * WEEKS_PER_MONTH;

/**
 * Month view component displaying a 7x6 grid of days.
 * Shows the days of the current month with leading/trailing days from adjacent months.
 *
 * @example
 * ```html
 * <com-calendar-month-view
 *   [activeDate]="activeDate()"
 *   [selected]="selected()"
 *   (selectedChange)="onDateSelected($event)"
 *   (activeDateChange)="onActiveDateChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'com-calendar-month-view',
  template: `
    <div
      role="grid"
      class="com-calendar-month-view"
      [attr.aria-label]="gridLabel()"
      (mouseleave)="onGridMouseLeave()"
    >
      <!-- Weekday headers -->
      <div role="row" class="com-calendar-month-view__header grid grid-cols-7 gap-0">
        @for (header of weekdayHeaders(); track $index) {
          <div
            role="columnheader"
            class="com-calendar-month-view__header-cell flex items-center justify-center h-9 text-xs font-medium text-surface-500 dark:text-surface-400"
            [attr.aria-label]="header.label"
          >
            {{ header.narrow }}
          </div>
        }
      </div>

      <!-- Day cells -->
      @for (row of cells(); track $index) {
        <div role="row" class="com-calendar-month-view__row grid grid-cols-7 gap-0">
          @for (cell of row; track cell.compareValue) {
            <com-calendar-cell
              [cell]="cell"
              [view]="view"
              [outside]="isOutsideMonth(cell)"
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
    class: 'com-calendar-month-view-host',
  },
})
export class ComCalendarMonthView<D> extends CalendarViewBase<D> {
  protected readonly view: CalendarView = 'month';

  /** Cell components for focus management */
  protected readonly cellComponents: Signal<readonly ComCalendarCell<D>[]> = viewChildren(ComCalendarCell<D>);

  /** Override first day of week (0=Sun, 1=Mon, ..., 6=Sat) */
  readonly firstDayOfWeek: InputSignal<number> = input<number>(0);

  /** Weekday header labels */
  readonly weekdayHeaders: Signal<WeekdayHeader[]> = computed(() => {
    return getWeekdayHeaders(this.dateAdapter, 'long', this.firstDayOfWeek());
  });

  /** The month being displayed (0-indexed) */
  readonly displayMonth: Signal<number> = computed(() => {
    return this.dateAdapter.getMonth(this.activeDate());
  });

  /** The year being displayed */
  readonly displayYear: Signal<number> = computed(() => {
    return this.dateAdapter.getYear(this.activeDate());
  });

  /** Grid of day cells (7 columns x 6 rows = 42 cells) */
  readonly cells: Signal<CalendarCell<D>[][]> = computed(() => {
    const activeDate = this.activeDate();
    const year = this.dateAdapter.getYear(activeDate);
    const month = this.dateAdapter.getMonth(activeDate);
    const firstOfMonth = this.dateAdapter.getFirstDayOfMonth(activeDate);
    const firstDayOfWeek = this.firstDayOfWeek();

    // Calculate the offset to start the grid
    // How many days from the previous month should we show?
    const firstDayOfMonthWeekday = this.dateAdapter.getDayOfWeek(firstOfMonth);
    const offset = (firstDayOfMonthWeekday - firstDayOfWeek + DAYS_PER_WEEK) % DAYS_PER_WEEK;

    // Start date is the first cell (may be in previous month)
    const startDate = this.dateAdapter.addDays(firstOfMonth, -offset);

    const today = this.today();
    const minDate = this.minDate();
    const maxDate = this.maxDate();
    const dateFilter = this.dateFilter();
    const dateClass = this.dateClass();

    const days: CalendarCell<D>[] = [];

    for (let i = 0; i < TOTAL_CELLS; i++) {
      const date = this.dateAdapter.addDays(startDate, i);
      const dayOfMonth = this.dateAdapter.getDate(date);
      const cellMonth = this.dateAdapter.getMonth(date);
      const isDisabled = isDateDisabled(date, minDate, maxDate, dateFilter, this.dateAdapter);
      const isToday = this.dateAdapter.isSameDay(date, today);
      const cssClasses = dateClass ? dateClass(date, this.view) : '';

      // Create a unique compare value using year, month, day
      const cellYear = this.dateAdapter.getYear(date);
      const compareValue = cellYear * 10000 + cellMonth * 100 + dayOfMonth;

      const cell = createCalendarCell<D>({
        value: date,
        displayValue: String(dayOfMonth),
        ariaLabel: this.dateAdapter.format(date, 'fullDate'),
        enabled: !isDisabled,
        cssClasses,
        compareValue,
      });

      // Update computed properties
      cell.isToday = isToday;
      cell.isSelected = this.isSelected(date);
      cell.isRangeStart = this.isRangeStart(date);
      cell.isRangeEnd = this.isRangeEnd(date);
      cell.isRangeMiddle = this.isRangeMiddle(date);
      cell.isPreviewStart = this.isPreviewStart(date);
      cell.isPreviewEnd = this.isPreviewEnd(date);
      cell.isPreviewMiddle = this.isPreviewMiddle(date);

      days.push(cell);
    }

    return createGrid(days, DAYS_PER_WEEK);
  });

  /** Accessible label for the grid showing month and year */
  readonly gridLabel: Signal<string> = computed(() => {
    const monthNames = this.dateAdapter.getMonthNames('long');
    return `${monthNames[this.displayMonth()]} ${this.displayYear()}`;
  });

  /** First date of the displayed month */
  private readonly firstOfMonth: Signal<D> = computed(() => {
    return this.dateAdapter.getFirstDayOfMonth(this.activeDate());
  });

  protected getActiveCompareValue(): number {
    const date = this.activeDate();
    const year = this.dateAdapter.getYear(date);
    const month = this.dateAdapter.getMonth(date);
    const day = this.dateAdapter.getDate(date);
    return year * 10000 + month * 100 + day;
  }

  /**
   * Checks if a cell is outside the current displayed month.
   */
  isOutsideMonth(cell: CalendarCell<D>): boolean {
    const cellMonth = this.dateAdapter.getMonth(cell.value);
    return cellMonth !== this.displayMonth();
  }

  /**
   * Handles keyboard navigation for the month view.
   * - Arrow left/right: ±1 day
   * - Arrow up/down: ±7 days (one week)
   * - Home: First day of week
   * - End: Last day of week
   * - PageUp: Previous month
   * - PageDown: Next month
   */
  onKeyNav(event: CalendarCellKeyNavEvent<D>): void {
    const currentDate = event.cell.value;
    let newDate: D | null = null;

    switch (event.direction) {
      case 'left':
        newDate = this.dateAdapter.addDays(currentDate, -1);
        break;

      case 'right':
        newDate = this.dateAdapter.addDays(currentDate, 1);
        break;

      case 'up':
        newDate = this.dateAdapter.addDays(currentDate, -DAYS_PER_WEEK);
        break;

      case 'down':
        newDate = this.dateAdapter.addDays(currentDate, DAYS_PER_WEEK);
        break;

      case 'home': {
        // Go to first day of the week
        const dayOfWeek = this.dateAdapter.getDayOfWeek(currentDate);
        const firstDay = this.firstDayOfWeek();
        const diff = (dayOfWeek - firstDay + DAYS_PER_WEEK) % DAYS_PER_WEEK;
        newDate = this.dateAdapter.addDays(currentDate, -diff);
        break;
      }

      case 'end': {
        // Go to last day of the week
        const dayOfWeek = this.dateAdapter.getDayOfWeek(currentDate);
        const firstDay = this.firstDayOfWeek();
        const daysUntilEnd = (6 - dayOfWeek + firstDay + DAYS_PER_WEEK) % DAYS_PER_WEEK;
        newDate = this.dateAdapter.addDays(currentDate, daysUntilEnd);
        break;
      }

      case 'pageUp':
        newDate = this.dateAdapter.addMonths(currentDate, -1);
        break;

      case 'pageDown':
        newDate = this.dateAdapter.addMonths(currentDate, 1);
        break;
    }

    if (newDate) {
      // Update focus cell compare value
      const year = this.dateAdapter.getYear(newDate);
      const month = this.dateAdapter.getMonth(newDate);
      const day = this.dateAdapter.getDate(newDate);
      const compareValue = year * 10000 + month * 100 + day;
      this.focusCell(compareValue);
      this.activeDateChange.emit(newDate);
    }
  }
}
