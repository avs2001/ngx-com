import {
  ChangeDetectionStrategy,
  Component,
  computed,
  type Signal,
} from '@angular/core';
import { ComCalendarCell, type CalendarCellKeyNavEvent } from '../calendar-cell';
import type { CalendarCell, CalendarView } from '../calendar.types';
import { YEARS_PER_PAGE, YEARS_PER_ROW, createCalendarCell } from '../calendar.types';
import { createGrid, getMultiYearStartingYear, isYearDisabled } from '../calendar.utils';
import { CalendarViewBase } from './calendar-view-base';

/**
 * Multi-year view component displaying a 4x6 grid of years (24 years total).
 * Allows the user to select a year within the displayed range.
 *
 * @example
 * ```html
 * <com-calendar-multi-year-view
 *   [activeDate]="activeDate()"
 *   [selected]="selected()"
 *   (selectedChange)="onYearSelected($event)"
 *   (activeDateChange)="onActiveYearChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'com-calendar-multi-year-view',
  template: `
    <div
      role="grid"
      class="com-calendar-multi-year-view"
      [attr.aria-label]="gridLabel()"
      (mouseleave)="onGridMouseLeave()"
    >
      @for (row of cells(); track $index) {
        <div role="row" class="com-calendar-multi-year-view__row grid grid-cols-4 gap-1">
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
    class: 'com-calendar-multi-year-view-host',
  },
})
export class ComCalendarMultiYearView<D> extends CalendarViewBase<D> {
  protected readonly view: CalendarView = 'multi-year';

  /** The first year in the displayed range */
  readonly startYear: Signal<number> = computed(() => {
    const activeYear = this.dateAdapter.getYear(this.activeDate());
    return getMultiYearStartingYear(activeYear, YEARS_PER_PAGE);
  });

  /** The last year in the displayed range */
  readonly endYear: Signal<number> = computed(() => {
    return this.startYear() + YEARS_PER_PAGE - 1;
  });

  /** Grid of year cells (4 columns x 6 rows = 24 years) */
  readonly cells: Signal<CalendarCell<D>[][]> = computed(() => {
    const start = this.startYear();
    const today = this.today();
    const todayYear = this.dateAdapter.getYear(today);
    const activeYear = this.dateAdapter.getYear(this.activeDate());
    const minDate = this.minDate();
    const maxDate = this.maxDate();
    const dateClass = this.dateClass();

    const years: CalendarCell<D>[] = [];

    for (let i = 0; i < YEARS_PER_PAGE; i++) {
      const year = start + i;
      const date = this.dateAdapter.createDate(year, 0, 1);
      const isDisabled = isYearDisabled(year, minDate, maxDate, this.dateAdapter);
      const isToday = year === todayYear;
      const isSelectedYear = this.isYearSelected(year);
      const cssClasses = dateClass ? dateClass(date, this.view) : '';

      const cell = createCalendarCell<D>({
        value: date,
        displayValue: this.dateAdapter.getYearName(date),
        ariaLabel: this.dateAdapter.getYearName(date),
        enabled: !isDisabled,
        cssClasses,
        compareValue: year,
      });

      // Update computed properties
      cell.isToday = isToday;
      cell.isSelected = isSelectedYear;
      cell.isRangeStart = this.isYearRangeStart(year);
      cell.isRangeEnd = this.isYearRangeEnd(year);
      cell.isRangeMiddle = this.isYearRangeMiddle(year);
      cell.isPreviewStart = this.isYearPreviewStart(year);
      cell.isPreviewEnd = this.isYearPreviewEnd(year);
      cell.isPreviewMiddle = this.isYearPreviewMiddle(year);

      years.push(cell);
    }

    return createGrid(years, YEARS_PER_ROW);
  });

  /** Accessible label for the grid showing the year range */
  readonly gridLabel: Signal<string> = computed(() => {
    return `${this.startYear()} – ${this.endYear()}`;
  });

  protected getActiveCompareValue(): number {
    return this.dateAdapter.getYear(this.activeDate());
  }

  /**
   * Handles keyboard navigation for the multi-year view.
   * - Arrow left/right: ±1 year
   * - Arrow up/down: ±4 years (one row)
   * - Home: First year in range
   * - End: Last year in range
   * - PageUp: Previous 24 years
   * - PageDown: Next 24 years
   */
  onKeyNav(event: CalendarCellKeyNavEvent<D>): void {
    const currentYear = this.dateAdapter.getYear(event.cell.value);
    const start = this.startYear();
    const end = this.endYear();
    const indexInPage = currentYear - start;
    let newDate: D | null = null;

    switch (event.direction) {
      case 'left':
        if (currentYear > start) {
          newDate = this.dateAdapter.addYears(event.cell.value, -1);
          this.focusCell(currentYear - 1);
        }
        break;

      case 'right':
        if (currentYear < end) {
          newDate = this.dateAdapter.addYears(event.cell.value, 1);
          this.focusCell(currentYear + 1);
        }
        break;

      case 'up':
        if (indexInPage >= YEARS_PER_ROW) {
          newDate = this.dateAdapter.addYears(event.cell.value, -YEARS_PER_ROW);
          this.focusCell(currentYear - YEARS_PER_ROW);
        }
        break;

      case 'down':
        if (indexInPage < YEARS_PER_PAGE - YEARS_PER_ROW) {
          newDate = this.dateAdapter.addYears(event.cell.value, YEARS_PER_ROW);
          this.focusCell(currentYear + YEARS_PER_ROW);
        }
        break;

      case 'home':
        newDate = this.dateAdapter.createDate(start, 0, 1);
        this.focusCell(start);
        break;

      case 'end':
        newDate = this.dateAdapter.createDate(end, 0, 1);
        this.focusCell(end);
        break;

      case 'pageUp':
        newDate = this.dateAdapter.addYears(event.cell.value, -YEARS_PER_PAGE);
        break;

      case 'pageDown':
        newDate = this.dateAdapter.addYears(event.cell.value, YEARS_PER_PAGE);
        break;
    }

    if (newDate) {
      this.activeDateChange.emit(newDate);
    }
  }

  private isYearSelected(year: number): boolean {
    const sel = this.selected();
    if (!sel) return false;

    if (!this.isDateRange(sel)) {
      return this.dateAdapter.getYear(sel) === year;
    }

    const range = sel;
    if (range.start && this.dateAdapter.getYear(range.start) === year) {
      return true;
    }
    if (range.end && this.dateAdapter.getYear(range.end) === year) {
      return true;
    }
    return false;
  }

  private isYearRangeStart(year: number): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel) || !sel.start) return false;
    return this.dateAdapter.getYear(sel.start) === year;
  }

  private isYearRangeEnd(year: number): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel) || !sel.end) return false;
    return this.dateAdapter.getYear(sel.end) === year;
  }

  private isYearRangeMiddle(year: number): boolean {
    const sel = this.selected();
    if (!sel || !this.isDateRange(sel) || !sel.start || !sel.end) return false;

    const startYear = this.dateAdapter.getYear(sel.start);
    const endYear = this.dateAdapter.getYear(sel.end);

    return year > startYear && year < endYear;
  }

  private isYearPreviewStart(year: number): boolean {
    const start = this.previewStart();
    if (!start) return false;
    return this.dateAdapter.getYear(start) === year;
  }

  private isYearPreviewEnd(year: number): boolean {
    const end = this.previewEnd();
    if (!end) return false;
    return this.dateAdapter.getYear(end) === year;
  }

  private isYearPreviewMiddle(year: number): boolean {
    const start = this.previewStart();
    const end = this.previewEnd();
    if (!start || !end) return false;

    const startYear = this.dateAdapter.getYear(start);
    const endYear = this.dateAdapter.getYear(end);

    return year > startYear && year < endYear;
  }
}
