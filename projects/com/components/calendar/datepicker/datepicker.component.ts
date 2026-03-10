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
import { NgControl, Validators } from '@angular/forms';
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
import { ComIcon } from 'ngx-com/components/icon';
import type { IconSize } from 'ngx-com/components/icon';
import {
  CALENDAR_SELECTION_STRATEGY,
  SingleSelectionStrategy,
} from '../selection';
import type { CalendarView, DateFilterFn, DateRange } from '../calendar.types';
import { joinClasses } from '../calendar.utils';
import { ComTimePicker } from '../timepicker/timepicker.component';
import { timepickerSectionVariants } from '../timepicker/timepicker.variants';
import type { ComTimeValue } from '../timepicker/timepicker.types';
import { createTimeValue } from '../timepicker/timepicker.types';
import {
  datepickerTriggerVariants,
  datepickerDisabledVariants,
  datepickerInputVariants,
  datepickerIconVariants,
  datepickerClearVariants,
  datepickerPanelVariants,
  datepickerFooterVariants,
  datepickerFooterButtonVariants,
} from './datepicker.variants';
import type {
  DatepickerSize,
  DatepickerVariant,
  DatepickerState,
  DateFormatPreset,
  DatepickerPanelWidth,
} from './datepicker.types';
import { generateDatepickerId } from './datepicker.types';

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
 * Single date picker component with calendar popup.
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
 * <com-datepicker
 *   formControlName="birthDate"
 *   placeholder="Select date..."
 *   [min]="minDate"
 *   [max]="maxDate"
 *   [showTodayButton]="true"
 *   [showClearButton]="true"
 * />
 * ```
 */
@Component({
  selector: 'com-datepicker',
  exportAs: 'comDatepicker',
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
      <!-- Date input display -->
      <input
        #inputElement
        type="text"
        [class]="inputClasses()"
        [value]="displayValue()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="!allowManualInput()"
        [attr.id]="inputId()"
        [attr.aria-label]="ariaLabel() || placeholder()"
        [attr.aria-describedby]="ariaDescribedBy() || null"
        [attr.aria-invalid]="state() === 'error' || null"
        [attr.aria-required]="required() || null"
        (input)="onInputChange($event)"
        (blur)="onInputBlur()"
        (keydown)="onInputKeydown($event)"
      />

      <!-- Clear button -->
      @if (showClearButton() && hasValue() && !disabled()) {
        <button
          type="button"
          [class]="clearClasses()"
          [attr.aria-label]="'Clear date'"
          (click)="clear($event)"
        >
          <com-icon name="x" [size]="iconSize()" />
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
        <com-icon name="calendar" [size]="iconSize()" />
      </button>
    </div>

    <!-- Panel template (rendered in overlay) -->
    <ng-template #panelTemplate>
      <div
        [class]="panelClasses()"
        [attr.id]="panelId()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="'Choose date'"
        (keydown)="onPanelKeydown($event)"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
      >
        <com-calendar
          [activeDate]="calendarActiveDate()"
          [selected]="internalValue()"
          [minDate]="min()"
          [maxDate]="max()"
          [dateFilter]="dateFilter()"
          [startView]="startView()"
          [firstDayOfWeek]="firstDayOfWeek()"
          [bordered]="false"
          (selectedChange)="onDateSelected($event)"
          (activeDateChange)="onActiveDateChange($event)"
        />

        @if (showTimePicker()) {
          <div [class]="timeSectionClasses()">
            <com-time-picker
              variant="embedded"
              [size]="size()"
              [value]="timeValue()"
              [use12HourFormat]="use12HourFormat()"
              [showSeconds]="showSeconds()"
              [minuteStep]="minuteStep()"
              [disabled]="disabled()"
              (timeChange)="onTimeChange($event)"
            />
          </div>
        }

        @if (showTodayButton() || showFooterClearButton() || showTimePicker()) {
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
            @if (showTimePicker()) {
              <button
                type="button"
                [class]="todayButtonClasses()"
                (click)="close()"
              >
                Done
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
    ComIcon,
    ComTimePicker,
  ],
  providers: [
    SingleSelectionStrategy,
    { provide: CALENDAR_SELECTION_STRATEGY, useExisting: SingleSelectionStrategy },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-datepicker-host inline-block',
    '[class.com-datepicker-disabled]': 'disabled()',
    '[class.com-datepicker-open]': 'isOpen()',
  },
})
export class ComDatepicker<D> implements ControlValueAccessor, Validator, OnDestroy {
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

  /** Reference to the input element. */
  private readonly inputRef: Signal<ElementRef<HTMLInputElement>> =
    viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

  /** Reference to the panel template. */
  private readonly panelTemplateRef: Signal<TemplateRef<unknown>> =
    viewChild.required<TemplateRef<unknown>>('panelTemplate');

  /** Overlay reference. */
  private overlayRef: OverlayRef | null = null;

  /** Unique ID for the datepicker. */
  private readonly datepickerId: string = generateDatepickerId();

  // ============ INPUTS ============

  /** Current value. */
  readonly value: InputSignal<D | null> = input<D | null>(null);

  /** Minimum selectable date. */
  readonly min: InputSignal<D | null> = input<D | null>(null);

  /** Maximum selectable date. */
  readonly max: InputSignal<D | null> = input<D | null>(null);

  /** Custom filter function to disable specific dates. */
  readonly dateFilter: InputSignal<DateFilterFn<D> | null> = input<DateFilterFn<D> | null>(null);

  /** Date the calendar opens to (defaults to selected or today). */
  readonly startAt: InputSignal<D | null> = input<D | null>(null);

  /** Initial calendar view. */
  readonly startView: InputSignal<CalendarView> = input<CalendarView>('month');

  /** First day of week override (0=Sun, 1=Mon, ..., 6=Sat). */
  readonly firstDayOfWeek: InputSignal<number | null> = input<number | null>(null);

  /** Placeholder text. */
  readonly placeholder: InputSignal<string> = input<string>('Select date...');

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

  /** Don't auto-close on selection. */
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

  /** Accessible label for the input. */
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** ID of element describing the input. */
  readonly ariaDescribedBy: InputSignal<string | null> = input<string | null>(null);

  /** Whether to show the time picker below the calendar. */
  readonly showTimePicker: InputSignal<boolean> = input<boolean>(false);

  /** 12h vs 24h format for the time picker. `null` = auto-detect. */
  readonly use12HourFormat: InputSignal<boolean | null> = input<boolean | null>(null);

  /** Whether the time picker shows seconds. */
  readonly showSeconds: InputSignal<boolean> = input<boolean>(false);

  /** Step interval for minutes in the time picker. */
  readonly minuteStep: InputSignal<number> = input<number>(1);

  // ============ OUTPUTS ============

  /** Emitted when a date is selected. */
  readonly dateChange: OutputEmitterRef<D | null> = output<D | null>();

  /** Emitted when the panel opens. */
  readonly opened: OutputEmitterRef<void> = output<void>();

  /** Emitted when the panel closes. */
  readonly closed: OutputEmitterRef<void> = output<void>();

  // ============ INTERNAL STATE ============

  /** Whether the panel is open. */
  readonly isOpen: WritableSignal<boolean> = signal(false);

  /** Internal value state (managed by CVA or input). */
  readonly internalValue: WritableSignal<D | null> = linkedSignal<D | null>(
    () => this.value() ?? null
  );

  /** Calendar active date for navigation. */
  readonly calendarActiveDate: WritableSignal<D> = signal<D>(this.dateAdapter.today());

  /** Live announcements for screen readers. */
  readonly liveAnnouncement: WritableSignal<string> = signal('');

  // ============ COMPUTED STATE ============

  /** Input element ID. */
  readonly inputId: Signal<string> = computed(() => `${this.datepickerId}-input`);

  /** Panel element ID. */
  readonly panelId: Signal<string> = computed(() => `${this.datepickerId}-panel`);

  /** Whether the datepicker has a value. */
  readonly hasValue: Signal<boolean> = computed(() => this.internalValue() !== null);

  /** Icon size based on datepicker size. */
  readonly iconSize: Signal<IconSize> = computed(() => {
    const sizeMap: Record<DatepickerSize, IconSize> = {
      sm: 'sm',
      default: 'md',
      lg: 'lg',
    };
    return sizeMap[this.size()];
  });

  /** Formatted display value. */
  readonly displayValue: Signal<string> = computed(() => {
    const value = this.internalValue();
    if (!value) return '';
    return this.dateAdapter.format(value, this.effectiveDateFormat());
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

    return joinClasses(baseClasses, disabledClasses, this.userClass());
  });

  /** Computed input classes. */
  readonly inputClasses: Signal<string> = computed(() => {
    return datepickerInputVariants({ size: this.size() });
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
    return joinClasses(baseClasses, this.panelClass());
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

  /** Time section divider classes. */
  readonly timeSectionClasses: Signal<string> = computed(() => {
    return timepickerSectionVariants({ size: this.size() });
  });

  /** Time value derived from the current date value. */
  readonly timeValue: Signal<ComTimeValue | null> = computed(() => {
    const date = this.internalValue();
    if (!date) return null;
    return createTimeValue(
      this.dateAdapter.getHours(date),
      this.dateAdapter.getMinutes(date),
      this.dateAdapter.getSeconds(date),
    );
  });

  /** Effective display format — switches to dateTime when time picker is shown. */
  readonly effectiveDateFormat: Signal<DateFormatPreset> = computed(() => {
    if (this.showTimePicker()) {
      return this.showSeconds() ? 'dateTimeLong' : 'dateTimeMedium';
    }
    return this.dateFormat();
  });

  /** Whether the panel should stay open (keepOpen or time picker shown). */
  readonly effectiveKeepOpen: Signal<boolean> = computed(() => {
    return this.keepOpen() || this.showTimePicker();
  });

  // ============ CVA CALLBACKS ============

  private onChange: (value: D | null) => void = () => {};
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

      if (value) {
        this.calendarActiveDate.set(value);
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

  writeValue(value: D | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: D | null) => void): void {
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
    if (this.required() && !value) {
      return { required: true };
    }

    if (value) {
      // Min validation
      const min = this.min();
      if (min && this.dateAdapter.compareDate(value, min) < 0) {
        return { minDate: { min, actual: value } };
      }

      // Max validation
      const max = this.max();
      if (max && this.dateAdapter.compareDate(value, max) > 0) {
        return { maxDate: { max, actual: value } };
      }

      // Date filter validation
      const dateFilter = this.dateFilter();
      if (dateFilter && !dateFilter(value)) {
        return { dateFilter: true };
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
    this.announce('Calendar opened');
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

    // Return focus to trigger
    this.inputRef().nativeElement.focus();
  }

  /** Toggles the datepicker panel. */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Clears the selected date. */
  clear(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.updateValue(null);
    this.announce('Date cleared');
  }

  /** Selects today's date. */
  selectToday(): void {
    const today = this.dateAdapter.today();
    this.updateValue(today);

    if (!this.effectiveKeepOpen()) {
      this.close();
    }
  }

  // ============ EVENT HANDLERS ============

  protected onTriggerClick(): void {
    if (!this.disabled()) {
      this.toggle();
    }
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  protected onInputKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (this.isOpen()) {
          // Commit manual input
          this.parseAndSetValue(this.inputRef().nativeElement.value);
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
    }
  }

  protected onInputChange(event: Event): void {
    if (!this.allowManualInput()) {
      return;
    }

    const input = event.target as HTMLInputElement;
    // Debounce or wait for blur/enter to actually parse
    // For now, we just allow typing without immediate parsing
  }

  protected onInputBlur(): void {
    if (this.allowManualInput()) {
      this.parseAndSetValue(this.inputRef().nativeElement.value);
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

  protected onDateSelected(date: D): void {
    // Preserve time when selecting a new date if time picker is shown
    if (this.showTimePicker()) {
      const currentValue = this.internalValue();
      if (currentValue) {
        const withTime = this.dateAdapter.setTime(
          date,
          this.dateAdapter.getHours(currentValue),
          this.dateAdapter.getMinutes(currentValue),
          this.dateAdapter.getSeconds(currentValue),
        );
        this.updateValue(withTime);
      } else {
        this.updateValue(date);
      }
    } else {
      this.updateValue(date);
    }

    if (!this.effectiveKeepOpen()) {
      this.close();
    }

    this.announce(`Selected ${this.dateAdapter.format(date, 'long')}`);
  }

  protected onTimeChange(time: ComTimeValue | null): void {
    if (!time) return;
    const current = this.internalValue() ?? this.dateAdapter.today();
    const updated = this.dateAdapter.setTime(current, time.hours, time.minutes, time.seconds);
    this.updateValue(updated);
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

  private updateValue(value: D | null): void {
    this.internalValue.set(value);
    this.onChange(value);
    this.dateChange.emit(value);
    this.onValidatorChange();
  }

  private parseAndSetValue(inputValue: string): void {
    if (!inputValue.trim()) {
      // Empty input - clear if allowed
      if (this.hasValue()) {
        this.updateValue(null);
      }
      return;
    }

    const parsed = this.dateAdapter.parse(inputValue, this.effectiveDateFormat());
    if (parsed && this.dateAdapter.isValid(parsed)) {
      // Validate against min/max/filter
      if (this.isDateValid(parsed)) {
        this.updateValue(parsed);
      } else {
        // Invalid date - revert to current value
        this.inputRef().nativeElement.value = this.displayValue();
      }
    } else {
      // Parse failed - revert to current value
      this.inputRef().nativeElement.value = this.displayValue();
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

  private announce(message: string): void {
    this.liveAnnouncement.set(message);
  }
}
