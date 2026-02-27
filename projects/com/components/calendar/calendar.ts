import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type TemplateRef,
  type WritableSignal,
} from '@angular/core';
import { ComCalendarHeader } from './calendar-header';
import { calendarVariants } from './calendar.variants';
import type {
  CalendarCell,
  CalendarView,
  DateFilterFn,
  DateClassFn,
  DateRange,
} from './calendar.types';
import { YEARS_PER_PAGE } from './calendar.types';
import { DateAdapter, DATE_ADAPTER } from './date-adapter';
import {
  ComCalendarMonthView,
  ComCalendarYearView,
  ComCalendarMultiYearView,
} from './views';
import { getMultiYearStartingYear, isMonthDisabled, isYearDisabled } from './calendar.utils';
import {
  CalendarSelectionStrategy,
  CALENDAR_SELECTION_STRATEGY,
} from './selection';

/**
 * Main calendar orchestrator component.
 * Composes the calendar header and view components (month, year, multi-year)
 * with view switching, navigation, and enhanced accessibility.
 *
 * @example
 * ```html
 * <com-calendar
 *   [activeDate]="activeDate"
 *   [selected]="selectedDate"
 *   [minDate]="minDate"
 *   [maxDate]="maxDate"
 *   (selectedChange)="onDateSelected($event)"
 *   (viewChanged)="onViewChanged($event)"
 * />
 * ```
 */
@Component({
  selector: 'com-calendar',
  template: `
    <div
      [class]="calendarClasses()"
      role="application"
      aria-label="Calendar"
    >
      <com-calendar-header
        [periodLabel]="periodLabel()"
        [periodAriaLabel]="periodAriaLabel()"
        [prevAriaLabel]="prevAriaLabel()"
        [nextAriaLabel]="nextAriaLabel()"
        [prevDisabled]="prevDisabled()"
        [nextDisabled]="nextDisabled()"
        [canSwitchView]="currentView() !== 'multi-year'"
        (prevClicked)="onPrevClicked()"
        (nextClicked)="onNextClicked()"
        (periodClicked)="onPeriodClicked()"
      />

      <!-- Live region for screen reader announcements -->
      <div
        class="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ liveAnnouncement() }}
      </div>

      @switch (currentView()) {
        @case ('month') {
          <com-calendar-month-view
            [activeDate]="internalActiveDate()"
            [selected]="selected()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            [dateFilter]="dateFilter()"
            [dateClass]="dateClass()"
            [cellTemplate]="cellTemplate()"
            [firstDayOfWeek]="computedFirstDayOfWeek()"
            [previewStart]="previewRange()?.start ?? null"
            [previewEnd]="previewRange()?.end ?? null"
            (selectedChange)="onDateSelected($event)"
            (activeDateChange)="onActiveDateChange($event)"
            (previewChange)="onPreviewChange($event)"
          />
        }
        @case ('year') {
          <com-calendar-year-view
            [activeDate]="internalActiveDate()"
            [selected]="selected()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            [dateClass]="dateClass()"
            [cellTemplate]="cellTemplate()"
            [previewStart]="previewRange()?.start ?? null"
            [previewEnd]="previewRange()?.end ?? null"
            (selectedChange)="onMonthSelected($event)"
            (activeDateChange)="onActiveDateChange($event)"
            (previewChange)="onPreviewChange($event)"
          />
        }
        @case ('multi-year') {
          <com-calendar-multi-year-view
            [activeDate]="internalActiveDate()"
            [selected]="selected()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            [dateClass]="dateClass()"
            [cellTemplate]="cellTemplate()"
            [previewStart]="previewRange()?.start ?? null"
            [previewEnd]="previewRange()?.end ?? null"
            (selectedChange)="onYearSelected($event)"
            (activeDateChange)="onActiveDateChange($event)"
            (previewChange)="onPreviewChange($event)"
          />
        }
      }
    </div>
  `,
  styles: `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
  imports: [
    ComCalendarHeader,
    ComCalendarMonthView,
    ComCalendarYearView,
    ComCalendarMultiYearView,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-calendar-host block',
  },
})
export class ComCalendar<D> {
  /** Date adapter for date operations */
  private readonly dateAdapter: DateAdapter<D> = inject(DATE_ADAPTER) as DateAdapter<D>;

  /** Optional selection strategy for custom selection behaviors */
  private readonly selectionStrategy = inject(CALENDAR_SELECTION_STRATEGY, {
    optional: true,
  }) as CalendarSelectionStrategy<D, unknown> | null;

  /** The date to display and navigate from */
  readonly activeDate: InputSignal<D | undefined> = input<D>();

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

  /** Initial view to display */
  readonly startView: InputSignal<CalendarView> = input<CalendarView>('month');

  /** Override first day of week (0=Sun, 1=Mon, ..., 6=Sat). Uses locale default if null. */
  readonly firstDayOfWeek: InputSignal<number | null> = input<number | null>(null);

  /** Computed first day of week (input override or adapter default) */
  readonly computedFirstDayOfWeek: Signal<number> = computed(() => {
    const override = this.firstDayOfWeek();
    if (override !== null && override >= 0 && override <= 6) {
      return override;
    }
    return this.dateAdapter.getFirstDayOfWeek();
  });

  /** Custom template for cell content */
  readonly cellTemplate: InputSignal<TemplateRef<{ $implicit: CalendarCell<D> }> | null> = input<
    TemplateRef<{ $implicit: CalendarCell<D> }> | null
  >(null);

  /** Emitted when a date is selected */
  readonly selectedChange: OutputEmitterRef<D> = output<D>();

  /** Emitted when the view changes */
  readonly viewChanged: OutputEmitterRef<CalendarView> = output<CalendarView>();

  /** Emitted when the active date changes */
  readonly activeDateChange: OutputEmitterRef<D> = output<D>();

  /** Current view state */
  readonly currentView: WritableSignal<CalendarView> = signal<CalendarView>('month');

  /** Internal active date signal */
  readonly internalActiveDate: WritableSignal<D> = signal<D>(this.dateAdapter.today());

  /** Live announcement for screen readers */
  readonly liveAnnouncement: WritableSignal<string> = signal<string>('');

  /** Internal selection state managed by strategy */
  readonly internalSelection: WritableSignal<unknown> = signal<unknown>(null);

  /** Currently hovered/previewed date */
  readonly previewDate: WritableSignal<D | null> = signal<D | null>(null);

  /** Computed preview range from strategy */
  readonly previewRange: Signal<DateRange<D> | null> = computed(() => {
    if (!this.selectionStrategy) return null;
    return this.selectionStrategy.createPreview(
      this.previewDate(),
      this.internalSelection()
    );
  });

  /** Calendar container classes */
  readonly calendarClasses: Signal<string> = computed(() => calendarVariants());

  /** Month names for formatting */
  private readonly monthNames: Signal<string[]> = computed(() =>
    this.dateAdapter.getMonthNames('long')
  );

  /** Period label for the header (e.g., "January 2024", "2024", "2000 – 2023") */
  readonly periodLabel: Signal<string> = computed(() => {
    const date = this.internalActiveDate();
    const view = this.currentView();
    const year = this.dateAdapter.getYear(date);
    const month = this.dateAdapter.getMonth(date);

    switch (view) {
      case 'month':
        return `${this.monthNames()[month]} ${year}`;
      case 'year':
        return `${year}`;
      case 'multi-year': {
        const startYear = getMultiYearStartingYear(year, YEARS_PER_PAGE);
        const endYear = startYear + YEARS_PER_PAGE - 1;
        return `${startYear} – ${endYear}`;
      }
    }
  });

  /** Accessible label for the period button */
  readonly periodAriaLabel: Signal<string> = computed(() => {
    const view = this.currentView();
    const label = this.periodLabel();

    switch (view) {
      case 'month':
        return `${label}, click to switch to year view`;
      case 'year':
        return `${label}, click to switch to multi-year view`;
      case 'multi-year':
        return label;
    }
  });

  /** Accessible label for the previous button */
  readonly prevAriaLabel: Signal<string> = computed(() => {
    const view = this.currentView();
    switch (view) {
      case 'month':
        return 'Previous month';
      case 'year':
        return 'Previous year';
      case 'multi-year':
        return `Previous ${YEARS_PER_PAGE} years`;
    }
  });

  /** Accessible label for the next button */
  readonly nextAriaLabel: Signal<string> = computed(() => {
    const view = this.currentView();
    switch (view) {
      case 'month':
        return 'Next month';
      case 'year':
        return 'Next year';
      case 'multi-year':
        return `Next ${YEARS_PER_PAGE} years`;
    }
  });

  /** Whether the previous button is disabled */
  readonly prevDisabled: Signal<boolean> = computed(() => {
    const date = this.internalActiveDate();
    const minDate = this.minDate();
    if (!minDate) return false;

    const view = this.currentView();
    const year = this.dateAdapter.getYear(date);
    const month = this.dateAdapter.getMonth(date);

    switch (view) {
      case 'month': {
        // Disabled if previous month is entirely before min
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        return isMonthDisabled(prevYear, prevMonth, minDate, null, this.dateAdapter);
      }
      case 'year': {
        // Disabled if previous year is entirely before min
        return isYearDisabled(year - 1, minDate, null, this.dateAdapter);
      }
      case 'multi-year': {
        // Disabled if previous page's last year is before min
        const startYear = getMultiYearStartingYear(year, YEARS_PER_PAGE);
        const prevPageLastYear = startYear - 1;
        return isYearDisabled(prevPageLastYear, minDate, null, this.dateAdapter);
      }
    }
  });

  /** Whether the next button is disabled */
  readonly nextDisabled: Signal<boolean> = computed(() => {
    const date = this.internalActiveDate();
    const maxDate = this.maxDate();
    if (!maxDate) return false;

    const view = this.currentView();
    const year = this.dateAdapter.getYear(date);
    const month = this.dateAdapter.getMonth(date);

    switch (view) {
      case 'month': {
        // Disabled if next month is entirely after max
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        return isMonthDisabled(nextYear, nextMonth, null, maxDate, this.dateAdapter);
      }
      case 'year': {
        // Disabled if next year is entirely after max
        return isYearDisabled(year + 1, null, maxDate, this.dateAdapter);
      }
      case 'multi-year': {
        // Disabled if next page's first year is after max
        const startYear = getMultiYearStartingYear(year, YEARS_PER_PAGE);
        const nextPageFirstYear = startYear + YEARS_PER_PAGE;
        return isYearDisabled(nextPageFirstYear, null, maxDate, this.dateAdapter);
      }
    }
  });

  constructor() {
    // Initialize currentView from startView input
    effect(() => {
      const startView = this.startView();
      this.currentView.set(startView);
    }, { allowSignalWrites: true });

    // Sync activeDate input with internal state
    effect(() => {
      const inputDate = this.activeDate();
      if (inputDate !== undefined) {
        this.internalActiveDate.set(inputDate);
      }
    }, { allowSignalWrites: true });

    // Sync external selected input with internal selection state (for strategy use)
    effect(() => {
      const external = this.selected();
      if (external !== undefined) {
        this.internalSelection.set(external);
      }
    }, { allowSignalWrites: true });
  }

  /**
   * Handles previous button click.
   * Navigates to the previous period based on current view.
   */
  onPrevClicked(): void {
    const view = this.currentView();
    const date = this.internalActiveDate();
    let newDate: D;

    switch (view) {
      case 'month':
        newDate = this.dateAdapter.addMonths(date, -1);
        break;
      case 'year':
        newDate = this.dateAdapter.addYears(date, -1);
        break;
      case 'multi-year':
        newDate = this.dateAdapter.addYears(date, -YEARS_PER_PAGE);
        break;
    }

    this.internalActiveDate.set(newDate);
    this.activeDateChange.emit(newDate);
    this.announceNavigation('previous');
  }

  /**
   * Handles next button click.
   * Navigates to the next period based on current view.
   */
  onNextClicked(): void {
    const view = this.currentView();
    const date = this.internalActiveDate();
    let newDate: D;

    switch (view) {
      case 'month':
        newDate = this.dateAdapter.addMonths(date, 1);
        break;
      case 'year':
        newDate = this.dateAdapter.addYears(date, 1);
        break;
      case 'multi-year':
        newDate = this.dateAdapter.addYears(date, YEARS_PER_PAGE);
        break;
    }

    this.internalActiveDate.set(newDate);
    this.activeDateChange.emit(newDate);
    this.announceNavigation('next');
  }

  /**
   * Handles period label click.
   * Switches to the next higher view (month → year → multi-year).
   */
  onPeriodClicked(): void {
    const current = this.currentView();
    if (current === 'month') {
      this.currentView.set('year');
    } else if (current === 'year') {
      this.currentView.set('multi-year');
    }
    // multi-year cannot switch further up
    this.viewChanged.emit(this.currentView());
    this.announceViewChange();
  }

  /**
   * Handles date selection from month view.
   * Uses selection strategy if available, otherwise emits directly.
   */
  onDateSelected(date: D): void {
    if (this.selectionStrategy) {
      const result = this.selectionStrategy.select(date, this.internalSelection());
      this.internalSelection.set(result.selection);

      if (result.isComplete) {
        // Cast to D for the output - the strategy determines the actual type
        this.selectedChange.emit(result.selection as D);
      }
    } else {
      // Fallback: default single selection behavior
      this.selectedChange.emit(date);
    }
  }

  /**
   * Handles preview change from views (mouse hover).
   * Updates the preview date for strategy to compute preview range.
   */
  onPreviewChange(date: D | null): void {
    this.previewDate.set(date);
  }

  /**
   * Handles month selection from year view.
   * Drills down to month view with the selected month.
   */
  onMonthSelected(date: D): void {
    this.internalActiveDate.set(date);
    this.currentView.set('month');
    this.viewChanged.emit('month');
    this.activeDateChange.emit(date);
    this.announceViewChange();
  }

  /**
   * Handles year selection from multi-year view.
   * Drills down to year view with the selected year.
   */
  onYearSelected(date: D): void {
    this.internalActiveDate.set(date);
    this.currentView.set('year');
    this.viewChanged.emit('year');
    this.activeDateChange.emit(date);
    this.announceViewChange();
  }

  /**
   * Handles active date change from child views (keyboard navigation).
   */
  onActiveDateChange(date: D): void {
    this.internalActiveDate.set(date);
    this.activeDateChange.emit(date);
  }

  /**
   * Announces a view change to screen readers.
   */
  private announceViewChange(): void {
    const view = this.currentView();
    const label = this.periodLabel();
    const viewLabel = view === 'multi-year' ? 'multi-year' : view;
    this.liveAnnouncement.set(`${viewLabel} view, ${label}`);
  }

  /**
   * Announces navigation to screen readers.
   */
  private announceNavigation(direction: 'previous' | 'next'): void {
    this.liveAnnouncement.set(`Navigated to ${direction} ${this.periodLabel()}`);
  }
}
