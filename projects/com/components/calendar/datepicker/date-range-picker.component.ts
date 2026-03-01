import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
  ViewContainerRef,
  DOCUMENT,
} from '@angular/core';
import type {
  InputSignal,
  OnDestroy,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import type { ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import {
  Overlay,
  OverlayRef,
  OverlayModule,
} from '@angular/cdk/overlay';
import type { ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

import { ComCalendar } from '../calendar';
import { DateAdapter, DATE_ADAPTER } from '../date-adapter';
import {
  CALENDAR_SELECTION_STRATEGY,
  RangeSelectionStrategy,
} from '../selection';
import type { CalendarView, DateFilterFn, DateRange } from '../calendar.types';
import {
  datepickerTriggerVariants,
  datepickerDisabledVariants,
  datepickerInputVariants,
  datepickerIconVariants,
  datepickerClearVariants,
  datepickerPanelVariants,
  datepickerFooterVariants,
  datepickerFooterButtonVariants,
  datepickerRangeSeparatorVariants,
} from './datepicker.variants';
import type {
  DatepickerSize,
  DatepickerVariant,
  DatepickerState,
  DateFormatPreset,
  DatepickerPanelWidth,
  DateRangeValue,
} from './datepicker.types';
import { generateDatepickerId, createDateRangeValue } from './datepicker.types';

/** Default position for the datepicker panel. */
const DEFAULT_POSITIONS: ConnectedPosition[] = [
  // Below trigger, aligned start
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  // Above trigger, aligned start
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  // Below trigger, aligned end
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
  // Above trigger, aligned end
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
];

/**
 * Date range picker component with calendar popup.
 * Allows selecting a start and end date via a two-click interaction.
 * Implements ControlValueAccessor for Reactive Forms and Template-driven Forms.
 *
 * @tokens `--color-input-background`, `--color-input-foreground`, `--color-input-border`,
 *         `--color-input-placeholder`, `--color-ring`, `--color-muted`, `--color-muted-foreground`,
 *         `--color-popover`, `--color-popover-foreground`, `--color-border-subtle`,
 *         `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-warn`, `--color-success`, `--color-disabled`, `--color-disabled-foreground`
 *
 * @example
 * ```html
 * <com-date-range-picker
 *   formControlName="dateRange"
 *   startPlaceholder="Start date"
 *   endPlaceholder="End date"
 *   [min]="minDate"
 *   [max]="maxDate"
 *   [showTodayButton]="true"
 * />
 * ```
 */
@Component({
  selector: 'com-date-range-picker',
  exportAs: 'comDateRangePicker',
  template: `
    <!-- Trigger container -->
    <div
      #triggerElement
      [class]="triggerClasses()"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-haspopup]="'dialog'"
      [attr.aria-owns]="panelId()"
      [attr.aria-disabled]="disabled() || null"
      (click)="onTriggerClick()"
      (keydown)="onTriggerKeydown($event)"
    >
      <!-- Start date input -->
      <input
        #startInputElement
        type="text"
        [class]="inputClasses()"
        [value]="startDisplayValue()"
        [placeholder]="startPlaceholder()"
        [disabled]="disabled()"
        [readonly]="!allowManualInput()"
        [attr.id]="startInputId()"
        [attr.aria-label]="startAriaLabel() || startPlaceholder()"
        [attr.aria-invalid]="state() === 'error' || null"
        [attr.aria-required]="required() || null"
        (focus)="onStartInputFocus()"
        (input)="onStartInputChange($event)"
        (blur)="onStartInputBlur()"
        (keydown)="onInputKeydown($event, 'start')"
      />

      <!-- Range separator -->
      <span [class]="separatorClasses()">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>

      <!-- End date input -->
      <input
        #endInputElement
        type="text"
        [class]="inputClasses()"
        [value]="endDisplayValue()"
        [placeholder]="endPlaceholder()"
        [disabled]="disabled()"
        [readonly]="!allowManualInput()"
        [attr.id]="endInputId()"
        [attr.aria-label]="endAriaLabel() || endPlaceholder()"
        [attr.aria-invalid]="state() === 'error' || null"
        (focus)="onEndInputFocus()"
        (input)="onEndInputChange($event)"
        (blur)="onEndInputBlur()"
        (keydown)="onInputKeydown($event, 'end')"
      />

      <!-- Clear button -->
      @if (showClearButton() && hasValue() && !disabled()) {
        <button
          type="button"
          [class]="clearClasses()"
          [attr.aria-label]="'Clear date range'"
          (click)="clear($event)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-full w-full"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      }

      <!-- Calendar icon -->
      <button
        type="button"
        [class]="iconClasses()"
        [attr.aria-label]="isOpen() ? 'Close calendar' : 'Open calendar'"
        [disabled]="disabled()"
        tabindex="-1"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-full w-full"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>
    </div>

    <!-- Panel template (rendered in overlay) -->
    <ng-template #panelTemplate>
      <div
        [class]="panelClasses()"
        [attr.id]="panelId()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="'Choose date range'"
        (keydown)="onPanelKeydown($event)"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
      >
        <com-calendar
          [activeDate]="calendarActiveDate()"
          [selected]="calendarSelection()"
          [minDate]="min()"
          [maxDate]="max()"
          [dateFilter]="dateFilter()"
          [startView]="startView()"
          [firstDayOfWeek]="firstDayOfWeek()"
          [monthColumns]="2"
          [bordered]="false"
          (selectedChange)="onCalendarSelectionChange($event)"
          (activeDateChange)="onActiveDateChange($event)"
        />

        @if (showTodayButton() || showFooterClearButton()) {
          <div [class]="footerClasses()">
            @if (showTodayButton()) {
              <button
                type="button"
                [class]="todayButtonClasses()"
                (click)="selectToday()"
              >
                Today
              </button>
            }
            @if (showFooterClearButton()) {
              <button
                type="button"
                [class]="clearButtonClasses()"
                (click)="clear($event)"
              >
                Clear
              </button>
            }
          </div>
        }
      </div>
    </ng-template>

    <!-- Live announcer region -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ liveAnnouncement() }}
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
    OverlayModule,
    A11yModule,
    ComCalendar,
  ],
  providers: [
    RangeSelectionStrategy,
    { provide: CALENDAR_SELECTION_STRATEGY, useExisting: RangeSelectionStrategy },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-date-range-picker-host inline-block',
    '[class.com-date-range-picker-disabled]': 'disabled()',
    '[class.com-date-range-picker-open]': 'isOpen()',
  },
})
export class ComDateRangePicker<D> implements ControlValueAccessor, Validator, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly document = inject(DOCUMENT);
  private readonly dateAdapter = inject(DATE_ADAPTER) as DateAdapter<D>;

  /** Optional NgControl for form integration. */
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  /** Reference to the trigger element. */
  private readonly triggerRef: Signal<ElementRef<HTMLDivElement>> =
    viewChild.required<ElementRef<HTMLDivElement>>('triggerElement');

  /** Reference to the start input element. */
  private readonly startInputRef: Signal<ElementRef<HTMLInputElement>> =
    viewChild.required<ElementRef<HTMLInputElement>>('startInputElement');

  /** Reference to the end input element. */
  private readonly endInputRef: Signal<ElementRef<HTMLInputElement>> =
    viewChild.required<ElementRef<HTMLInputElement>>('endInputElement');

  /** Reference to the panel template. */
  private readonly panelTemplateRef: Signal<TemplateRef<unknown>> =
    viewChild.required<TemplateRef<unknown>>('panelTemplate');

  /** Overlay reference. */
  private overlayRef: OverlayRef | null = null;

  /** Unique ID for the datepicker. */
  private readonly datepickerId = generateDatepickerId();

  // ============ INPUTS ============

  /** Current value. */
  readonly value: InputSignal<DateRangeValue<D> | null> = input<DateRangeValue<D> | null>(null);

  /** Minimum selectable date. */
  readonly min: InputSignal<D | null> = input<D | null>(null);

  /** Maximum selectable date. */
  readonly max: InputSignal<D | null> = input<D | null>(null);

  /** Custom filter function to disable specific dates. */
  readonly dateFilter: InputSignal<DateFilterFn<D> | null> = input<DateFilterFn<D> | null>(null);

  /** Date the calendar opens to (defaults to start date or today). */
  readonly startAt: InputSignal<D | null> = input<D | null>(null);

  /** Initial calendar view. */
  readonly startView: InputSignal<CalendarView> = input<CalendarView>('month');

  /** First day of week override (0=Sun, 1=Mon, ..., 6=Sat). */
  readonly firstDayOfWeek: InputSignal<number | null> = input<number | null>(null);

  /** Placeholder text for start date. */
  readonly startPlaceholder: InputSignal<string> = input<string>('Start date');

  /** Placeholder text for end date. */
  readonly endPlaceholder: InputSignal<string> = input<string>('End date');

  /** Whether the datepicker is disabled. */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Whether the datepicker is required. */
  readonly required: InputSignal<boolean> = input<boolean>(false);

  /** Display format for the date. */
  readonly dateFormat: InputSignal<DateFormatPreset> = input<DateFormatPreset>('medium');

  /** Show a clear button in the trigger. */
  readonly showClearButton: InputSignal<boolean> = input<boolean>(false);

  /** Show a today button in the footer. */
  readonly showTodayButton: InputSignal<boolean> = input<boolean>(false);

  /** Show a clear button in the footer. */
  readonly showFooterClearButton: InputSignal<boolean> = input<boolean>(false);

  /** Don't auto-close on complete range selection. */
  readonly keepOpen: InputSignal<boolean> = input<boolean>(false);

  /** Allow manual text input. */
  readonly allowManualInput: InputSignal<boolean> = input<boolean>(true);

  /** Additional CSS classes for the panel. */
  readonly panelClass: InputSignal<string> = input<string>('');

  /** Panel width strategy. */
  readonly panelWidth: InputSignal<DatepickerPanelWidth> = input<DatepickerPanelWidth>('auto');

  /** CVA variant for trigger styling. */
  readonly variant: InputSignal<DatepickerVariant> = input<DatepickerVariant>('default');

  /** Size variant. */
  readonly size: InputSignal<DatepickerSize> = input<DatepickerSize>('default');

  /** Validation state. */
  readonly state: InputSignal<DatepickerState> = input<DatepickerState>('default');

  /** Additional CSS classes for the trigger. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** Accessible label for the start input. */
  readonly startAriaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the end input. */
  readonly endAriaLabel: InputSignal<string | null> = input<string | null>(null);

  // ============ OUTPUTS ============

  /** Emitted when a complete range is selected. */
  readonly rangeChange: OutputEmitterRef<DateRangeValue<D> | null> = output<DateRangeValue<D> | null>();

  /** Emitted when the panel opens. */
  readonly opened: OutputEmitterRef<void> = output<void>();

  /** Emitted when the panel closes. */
  readonly closed: OutputEmitterRef<void> = output<void>();

  // ============ INTERNAL STATE ============

  /** Whether the panel is open. */
  readonly isOpen: WritableSignal<boolean> = signal(false);

  /** Which input is currently focused. */
  readonly activeInput: WritableSignal<'start' | 'end' | null> = signal(null);

  /** Internal value state (managed by CVA or input). */
  readonly internalValue: WritableSignal<DateRangeValue<D> | null> = linkedSignal<DateRangeValue<D> | null>(
    () => this.value() ?? null
  );

  /** Calendar active date for navigation. */
  readonly calendarActiveDate: WritableSignal<D> = signal<D>(this.dateAdapter.today());

  /** Live announcements for screen readers. */
  readonly liveAnnouncement: WritableSignal<string> = signal('');

  // ============ COMPUTED STATE ============

  /** Start input element ID. */
  readonly startInputId: Signal<string> = computed(() => `${this.datepickerId}-start`);

  /** End input element ID. */
  readonly endInputId: Signal<string> = computed(() => `${this.datepickerId}-end`);

  /** Panel element ID. */
  readonly panelId: Signal<string> = computed(() => `${this.datepickerId}-panel`);

  /** Whether the datepicker has a value. */
  readonly hasValue: Signal<boolean> = computed(() => {
    const value = this.internalValue();
    return value !== null && (value.start !== null || value.end !== null);
  });

  /** Calendar selection (converts DateRangeValue to DateRange for calendar). */
  readonly calendarSelection: Signal<DateRange<D> | null> = computed(() => {
    const value = this.internalValue();
    if (!value) return null;
    return { start: value.start, end: value.end };
  });

  /** Formatted start display value. */
  readonly startDisplayValue: Signal<string> = computed(() => {
    const value = this.internalValue();
    if (!value?.start) return '';
    return this.dateAdapter.format(value.start, this.dateFormat());
  });

  /** Formatted end display value. */
  readonly endDisplayValue: Signal<string> = computed(() => {
    const value = this.internalValue();
    if (!value?.end) return '';
    return this.dateAdapter.format(value.end, this.dateFormat());
  });

  /** Computed trigger classes. */
  readonly triggerClasses: Signal<string> = computed(() => {
    const baseClasses = datepickerTriggerVariants({
      variant: this.variant(),
      size: this.size(),
      state: this.state(),
      open: this.isOpen(),
    });

    const disabledClasses = this.disabled() ? datepickerDisabledVariants() : '';

    return this.mergeClasses(baseClasses, disabledClasses, this.userClass());
  });

  /** Computed input classes. */
  readonly inputClasses: Signal<string> = computed(() => {
    return datepickerInputVariants({ size: this.size() });
  });

  /** Computed separator classes. */
  readonly separatorClasses: Signal<string> = computed(() => {
    return datepickerRangeSeparatorVariants({ size: this.size() });
  });

  /** Computed icon classes. */
  readonly iconClasses: Signal<string> = computed(() => {
    return datepickerIconVariants({ size: this.size() });
  });

  /** Computed clear button classes. */
  readonly clearClasses: Signal<string> = computed(() => {
    return datepickerClearVariants({ size: this.size() });
  });

  /** Computed panel classes. */
  readonly panelClasses: Signal<string> = computed(() => {
    const baseClasses = datepickerPanelVariants({ size: this.size() });
    return this.mergeClasses(baseClasses, this.panelClass());
  });

  /** Computed footer classes. */
  readonly footerClasses: Signal<string> = computed(() => {
    return datepickerFooterVariants({ size: this.size() });
  });

  /** Computed today button classes. */
  readonly todayButtonClasses: Signal<string> = computed(() => {
    return datepickerFooterButtonVariants({ size: this.size(), variant: 'primary' });
  });

  /** Computed clear button classes (footer). */
  readonly clearButtonClasses: Signal<string> = computed(() => {
    return datepickerFooterButtonVariants({ size: this.size(), variant: 'secondary' });
  });

  // ============ CVA CALLBACKS ============

  private onChange: (value: DateRangeValue<D> | null) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  constructor() {
    // Wire up NgControl if present
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    // Sync calendar active date with internal value or startAt
    effect(() => {
      const value = this.internalValue();
      const startAt = this.startAt();

      if (value?.start) {
        this.calendarActiveDate.set(value.start);
      } else if (startAt) {
        this.calendarActiveDate.set(startAt);
      } else {
        this.calendarActiveDate.set(this.dateAdapter.today());
      }
    }, {});
  }

  ngOnDestroy(): void {
    this.destroyOverlay();
  }

  // ============ CVA IMPLEMENTATION ============

  writeValue(value: DateRangeValue<D> | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: DateRangeValue<D> | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Disabled state is handled via the disabled input
  }

  // ============ VALIDATOR IMPLEMENTATION ============

  validate(): ValidationErrors | null {
    const value = this.internalValue();

    // Required validation
    if (this.required() && (!value || (!value.start && !value.end))) {
      return { required: true };
    }

    if (value) {
      const { start, end } = value;
      const min = this.min();
      const max = this.max();
      const dateFilter = this.dateFilter();

      // Min validation for start
      if (start && min && this.dateAdapter.compareDate(start, min) < 0) {
        return { minDate: { min, actual: start } };
      }

      // Max validation for end
      if (end && max && this.dateAdapter.compareDate(end, max) > 0) {
        return { maxDate: { max, actual: end } };
      }

      // Date filter validation
      if (start && dateFilter && !dateFilter(start)) {
        return { dateFilter: { date: start } };
      }
      if (end && dateFilter && !dateFilter(end)) {
        return { dateFilter: { date: end } };
      }

      // Range validation (start must be before or equal to end)
      if (start && end && this.dateAdapter.compareDate(start, end) > 0) {
        return { rangeInvalid: { start, end } };
      }
    }

    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  // ============ PUBLIC METHODS ============

  /** Opens the datepicker panel. */
  open(): void {
    if (this.disabled() || this.isOpen()) {
      return;
    }

    this.createOverlay();
    this.isOpen.set(true);
    this.opened.emit();
    this.announce('Calendar opened. Select a start date.');
  }

  /** Closes the datepicker panel. */
  close(): void {
    if (!this.isOpen()) {
      return;
    }

    this.destroyOverlay();
    this.isOpen.set(false);
    this.closed.emit();
    this.onTouched();

    // Return focus to appropriate input
    const activeInput = this.activeInput();
    if (activeInput === 'end') {
      this.endInputRef().nativeElement.focus();
    } else {
      this.startInputRef().nativeElement.focus();
    }
  }

  /** Toggles the datepicker panel. */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Clears the selected date range. */
  clear(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.updateValue(null);
    this.announce('Date range cleared');
  }

  /** Selects today's date as the start date. */
  selectToday(): void {
    const today = this.dateAdapter.today();
    const currentValue = this.internalValue();

    // Set today as start if no start, or as end if we have a start
    if (!currentValue?.start) {
      this.updateValue(createDateRangeValue(today, null));
      this.announce('Start date set to today');
    } else if (!currentValue.end) {
      // Ensure proper ordering
      const newRange = this.dateAdapter.compareDate(today, currentValue.start) < 0
        ? createDateRangeValue(today, currentValue.start)
        : createDateRangeValue(currentValue.start, today);
      this.updateValue(newRange);

      if (!this.keepOpen()) {
        this.close();
      }
    }
  }

  // ============ EVENT HANDLERS ============

  protected onTriggerClick(): void {
    if (!this.disabled() && !this.isOpen()) {
      this.open();
    }
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  protected onStartInputFocus(): void {
    this.activeInput.set('start');
  }

  protected onEndInputFocus(): void {
    this.activeInput.set('end');
  }

  protected onInputKeydown(event: KeyboardEvent, inputType: 'start' | 'end'): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (this.isOpen()) {
          // Commit manual input
          if (inputType === 'start') {
            this.parseAndSetStart(this.startInputRef().nativeElement.value);
          } else {
            this.parseAndSetEnd(this.endInputRef().nativeElement.value);
          }
        } else {
          this.open();
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
      case 'ArrowDown':
        if (!this.isOpen()) {
          event.preventDefault();
          this.open();
        }
        break;
      case 'Tab':
        // Allow natural tab navigation between inputs
        break;
    }
  }

  protected onStartInputChange(_event: Event): void {
    // Debounced in blur handler
  }

  protected onEndInputChange(_event: Event): void {
    // Debounced in blur handler
  }

  protected onStartInputBlur(): void {
    if (this.allowManualInput()) {
      this.parseAndSetStart(this.startInputRef().nativeElement.value);
    }
    this.onTouched();
  }

  protected onEndInputBlur(): void {
    if (this.allowManualInput()) {
      this.parseAndSetEnd(this.endInputRef().nativeElement.value);
    }
    this.onTouched();
  }

  protected onPanelKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  protected onCalendarSelectionChange(selection: unknown): void {
    // The calendar emits the selection from the strategy
    const range = selection as DateRange<D>;

    if (range) {
      const newValue = createDateRangeValue(range.start, range.end);
      this.updateValue(newValue);

      if (range.start && range.end) {
        // Complete range selected
        this.announce(`Range selected: ${this.formatDate(range.start)} to ${this.formatDate(range.end)}`);

        if (!this.keepOpen()) {
          this.close();
        }
      } else if (range.start) {
        this.announce(`Start date selected: ${this.formatDate(range.start)}. Now select end date.`);
      }
    }
  }

  protected onActiveDateChange(date: D): void {
    this.calendarActiveDate.set(date);
  }

  // ============ PRIVATE METHODS ============

  private createOverlay(): void {
    if (this.overlayRef) {
      return;
    }

    const hostEl = this.elementRef.nativeElement;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(hostEl)
      .withPositions(DEFAULT_POSITIONS)
      .withFlexibleDimensions(false)
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Attach panel template
    const portal = new TemplatePortal(this.panelTemplateRef(), this.viewContainerRef);
    this.overlayRef.attach(portal);

    // Close on backdrop click
    this.overlayRef
      .backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());

    // Close on outside click
    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private updateValue(value: DateRangeValue<D> | null): void {
    this.internalValue.set(value);
    this.onChange(value);
    this.rangeChange.emit(value);
    this.onValidatorChange();
  }

  private parseAndSetStart(inputValue: string): void {
    const currentValue = this.internalValue();

    if (!inputValue.trim()) {
      // Clear start date
      if (currentValue?.start) {
        this.updateValue(createDateRangeValue(null, currentValue.end));
      }
      return;
    }

    const parsed = this.dateAdapter.parse(inputValue, this.dateFormat());
    if (parsed && this.dateAdapter.isValid(parsed) && this.isDateValid(parsed)) {
      // Ensure start <= end
      if (currentValue?.end && this.dateAdapter.compareDate(parsed, currentValue.end) > 0) {
        // Swap dates
        this.updateValue(createDateRangeValue(currentValue.end, parsed));
      } else {
        this.updateValue(createDateRangeValue(parsed, currentValue?.end ?? null));
      }
    } else {
      // Revert to current value
      this.startInputRef().nativeElement.value = this.startDisplayValue();
    }
  }

  private parseAndSetEnd(inputValue: string): void {
    const currentValue = this.internalValue();

    if (!inputValue.trim()) {
      // Clear end date
      if (currentValue?.end) {
        this.updateValue(createDateRangeValue(currentValue.start, null));
      }
      return;
    }

    const parsed = this.dateAdapter.parse(inputValue, this.dateFormat());
    if (parsed && this.dateAdapter.isValid(parsed) && this.isDateValid(parsed)) {
      // Ensure start <= end
      if (currentValue?.start && this.dateAdapter.compareDate(parsed, currentValue.start) < 0) {
        // Swap dates
        this.updateValue(createDateRangeValue(parsed, currentValue.start));
      } else {
        this.updateValue(createDateRangeValue(currentValue?.start ?? null, parsed));
      }
    } else {
      // Revert to current value
      this.endInputRef().nativeElement.value = this.endDisplayValue();
    }
  }

  private isDateValid(date: D): boolean {
    const min = this.min();
    const max = this.max();
    const filter = this.dateFilter();

    if (min && this.dateAdapter.compareDate(date, min) < 0) {
      return false;
    }
    if (max && this.dateAdapter.compareDate(date, max) > 0) {
      return false;
    }
    if (filter && !filter(date)) {
      return false;
    }
    return true;
  }

  private formatDate(date: D): string {
    return this.dateAdapter.format(date, 'long');
  }

  private announce(message: string): void {
    this.liveAnnouncement.set(message);
  }

  private mergeClasses(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
  }
}
