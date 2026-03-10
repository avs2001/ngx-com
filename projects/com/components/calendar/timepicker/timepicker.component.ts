import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
  linkedSignal,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import type { ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';

import { joinClasses } from '../calendar.utils';
import {
  timepickerContainerVariants,
  timepickerDisabledVariants,
  timepickerSegmentVariants,
  timepickerSeparatorVariants,
  timepickerPeriodVariants,
} from './timepicker.variants';
import type {
  ComTimeValue,
  TimePickerSize,
  TimePickerVariant,
  TimePickerState,
  TimePeriod,
  TimeSegment,
} from './timepicker.types';
import { compareTime, generateTimePickerId } from './timepicker.types';

/**
 * Time picker component with segmented numeric input fields.
 * Supports standalone usage with ControlValueAccessor and embedded usage
 * within datepicker/date-range-picker panels.
 *
 * Visual layout: `[HH] : [MM] : [SS] [AM|PM]`
 *
 * @tokens `--color-input-background`, `--color-input-foreground`, `--color-input-border`,
 *         `--color-ring`, `--color-primary-subtle`, `--color-primary-subtle-foreground`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-disabled`, `--color-disabled-foreground`,
 *         `--color-warn`, `--color-success`, `--color-border`
 *
 * @example
 * ```html
 * <!-- Standalone with reactive forms -->
 * <com-time-picker formControlName="startTime" />
 *
 * <!-- 12-hour format with seconds -->
 * <com-time-picker formControlName="alarm" [use12HourFormat]="true" [showSeconds]="true" />
 *
 * <!-- 15-minute steps -->
 * <com-time-picker formControlName="meeting" [minuteStep]="15" />
 *
 * <!-- Embedded inside datepicker panel -->
 * <com-time-picker variant="embedded" [value]="time" (timeChange)="onTime($event)" />
 * ```
 */
@Component({
  selector: 'com-time-picker',
  exportAs: 'comTimePicker',
  template: `
    <div [class]="containerClasses()">
      <!-- Hours -->
      <input
        #hoursInput
        type="text"
        inputmode="numeric"
        role="spinbutton"
        [class]="segmentClasses()"
        [attr.aria-label]="'Hours'"
        [attr.aria-valuenow]="displayHours()"
        [attr.aria-valuemin]="is12Hour() ? 1 : 0"
        [attr.aria-valuemax]="is12Hour() ? 12 : 23"
        [value]="formattedHours()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        maxlength="2"
        (keydown)="onSegmentKeydown($event, 'hours')"
        (input)="onSegmentInput($event, 'hours')"
        (focus)="onSegmentFocus('hours')"
        (blur)="onSegmentBlur('hours')"
      />

      <span [class]="separatorClasses()" aria-hidden="true">:</span>

      <!-- Minutes -->
      <input
        #minutesInput
        type="text"
        inputmode="numeric"
        role="spinbutton"
        [class]="segmentClasses()"
        [attr.aria-label]="'Minutes'"
        [attr.aria-valuenow]="internalValue()?.minutes ?? null"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="59"
        [value]="formattedMinutes()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        maxlength="2"
        (keydown)="onSegmentKeydown($event, 'minutes')"
        (input)="onSegmentInput($event, 'minutes')"
        (focus)="onSegmentFocus('minutes')"
        (blur)="onSegmentBlur('minutes')"
      />

      @if (showSeconds()) {
        <span [class]="separatorClasses()" aria-hidden="true">:</span>

        <!-- Seconds -->
        <input
          #secondsInput
          type="text"
          inputmode="numeric"
          role="spinbutton"
          [class]="segmentClasses()"
          [attr.aria-label]="'Seconds'"
          [attr.aria-valuenow]="internalValue()?.seconds ?? null"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="59"
          [value]="formattedSeconds()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          maxlength="2"
          (keydown)="onSegmentKeydown($event, 'seconds')"
          (input)="onSegmentInput($event, 'seconds')"
          (focus)="onSegmentFocus('seconds')"
          (blur)="onSegmentBlur('seconds')"
        />
      }

      @if (is12Hour()) {
        <button
          #periodButton
          type="button"
          [class]="periodClasses()"
          [attr.aria-label]="'Toggle AM/PM, currently ' + period()"
          [disabled]="disabled()"
          (click)="togglePeriod()"
          (keydown)="onPeriodKeydown($event)"
        >
          {{ period() }}
        </button>
      }
    </div>

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-time-picker-host inline-block',
    '[class.com-time-picker-disabled]': 'disabled()',
    '[attr.role]': '"group"',
    '[attr.aria-label]': 'ariaLabel() || "Time picker"',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class ComTimePicker implements ControlValueAccessor, Validator {
  private readonly localeId: string = inject(LOCALE_ID);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly timepickerId: string = generateTimePickerId();

  private readonly hoursInputRef: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('hoursInput');
  private readonly minutesInputRef: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('minutesInput');
  private readonly secondsInputRef: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('secondsInput');
  private readonly periodButtonRef: Signal<ElementRef<HTMLButtonElement> | undefined> =
    viewChild<ElementRef<HTMLButtonElement>>('periodButton');

  // ============ INPUTS ============

  /** Current time value. */
  readonly value: InputSignal<ComTimeValue | null> = input<ComTimeValue | null>(null);

  /** Whether the time picker is disabled. */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Whether the time picker is required. */
  readonly required: InputSignal<boolean> = input<boolean>(false);

  /** Whether to show the seconds segment. */
  readonly showSeconds: InputSignal<boolean> = input<boolean>(false);

  /** 12h vs 24h format. `null` = auto-detect from locale. */
  readonly use12HourFormat: InputSignal<boolean | null> = input<boolean | null>(null);

  /** Step interval for minutes. */
  readonly minuteStep: InputSignal<number> = input<number>(1);

  /** Step interval for seconds. */
  readonly secondStep: InputSignal<number> = input<number>(1);

  /** Minimum selectable time. */
  readonly minTime: InputSignal<ComTimeValue | null> = input<ComTimeValue | null>(null);

  /** Maximum selectable time. */
  readonly maxTime: InputSignal<ComTimeValue | null> = input<ComTimeValue | null>(null);

  /** Visual variant. */
  readonly variant: InputSignal<TimePickerVariant> = input<TimePickerVariant>('standalone');

  /** Size variant. */
  readonly size: InputSignal<TimePickerSize> = input<TimePickerSize>('default');

  /** Validation state. */
  readonly state: InputSignal<TimePickerState> = input<TimePickerState>('default');

  /** Accessible label for the group. */
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS classes. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** Placeholder text for empty segments. */
  readonly placeholder: InputSignal<string> = input<string>('--');

  // ============ OUTPUTS ============

  /** Emitted when time value changes. */
  readonly timeChange: OutputEmitterRef<ComTimeValue | null> = output<ComTimeValue | null>();

  // ============ INTERNAL STATE ============

  /** Internal value state. */
  readonly internalValue: WritableSignal<ComTimeValue | null> = linkedSignal<ComTimeValue | null>(
    () => this.value() ?? null,
  );

  /** Which segment is currently focused. */
  readonly activeSegment: WritableSignal<TimeSegment | 'period' | null> = signal(null);

  /** Pending typed digits for auto-advance. */
  readonly pendingDigits: WritableSignal<string> = signal('');

  /** Live announcements for screen readers. */
  readonly liveAnnouncement: WritableSignal<string> = signal('');

  // ============ COMPUTED STATE ============

  /** Whether to use 12-hour format. */
  readonly is12Hour: Signal<boolean> = computed(() => {
    const explicit = this.use12HourFormat();
    if (explicit !== null) return explicit;
    try {
      const options = new Intl.DateTimeFormat(this.localeId, { hour: 'numeric' }).resolvedOptions();
      return options.hour12 === true;
    } catch {
      return false;
    }
  });

  /** Current period (AM/PM). */
  readonly period: Signal<TimePeriod> = computed(() => {
    const value = this.internalValue();
    if (!value) return 'AM';
    return value.hours >= 12 ? 'PM' : 'AM';
  });

  /** Display hours (converted from 24h to 12h when needed). */
  readonly displayHours: Signal<number | null> = computed(() => {
    const value = this.internalValue();
    if (!value) return null;
    if (!this.is12Hour()) return value.hours;
    const h = value.hours % 12;
    return h === 0 ? 12 : h;
  });

  /** Formatted hours string. */
  readonly formattedHours: Signal<string> = computed(() => {
    const h = this.displayHours();
    if (h === null) return '';
    return h.toString().padStart(2, '0');
  });

  /** Formatted minutes string. */
  readonly formattedMinutes: Signal<string> = computed(() => {
    const value = this.internalValue();
    if (!value) return '';
    return value.minutes.toString().padStart(2, '0');
  });

  /** Formatted seconds string. */
  readonly formattedSeconds: Signal<string> = computed(() => {
    const value = this.internalValue();
    if (!value) return '';
    return value.seconds.toString().padStart(2, '0');
  });

  /** Container classes. */
  readonly containerClasses: Signal<string> = computed(() => {
    const base = timepickerContainerVariants({
      variant: this.variant(),
      size: this.size(),
      state: this.state(),
    });
    const disabled = this.disabled() ? timepickerDisabledVariants() : '';
    return joinClasses(base, disabled, this.userClass());
  });

  /** Segment input classes. */
  readonly segmentClasses: Signal<string> = computed(() => {
    return timepickerSegmentVariants({ size: this.size() });
  });

  /** Separator classes. */
  readonly separatorClasses: Signal<string> = computed(() => {
    return timepickerSeparatorVariants({ size: this.size() });
  });

  /** Period button classes. */
  readonly periodClasses: Signal<string> = computed(() => {
    return timepickerPeriodVariants({ size: this.size() });
  });

  // ============ CVA CALLBACKS ============

  private onChange: (value: ComTimeValue | null) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ============ CVA IMPLEMENTATION ============

  writeValue(value: ComTimeValue | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: ComTimeValue | null) => void): void {
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

    if (this.required() && !value) {
      return { required: true };
    }

    if (value) {
      const minTime = this.minTime();
      if (minTime && compareTime(value, minTime) < 0) {
        return { minTime: { min: minTime, actual: value } };
      }

      const maxTime = this.maxTime();
      if (maxTime && compareTime(value, maxTime) > 0) {
        return { maxTime: { max: maxTime, actual: value } };
      }
    }

    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  // ============ EVENT HANDLERS ============

  protected onSegmentFocus(segment: TimeSegment): void {
    this.activeSegment.set(segment);
    this.pendingDigits.set('');
  }

  protected onSegmentBlur(segment: TimeSegment): void {
    this.activeSegment.set(null);
    this.pendingDigits.set('');
    this.snapToStep(segment);
    this.onTouched();
  }

  protected onSegmentInput(event: Event, segment: TimeSegment): void {
    // Prevent default browser input handling — we manage value via keydown
    const input = event.target as HTMLInputElement;
    const value = this.internalValue();
    // Restore the formatted value to prevent browser from changing display
    if (segment === 'hours') {
      input.value = this.formattedHours();
    } else if (segment === 'minutes') {
      input.value = this.formattedMinutes();
    } else {
      input.value = this.formattedSeconds();
    }
  }

  protected onSegmentKeydown(event: KeyboardEvent, segment: TimeSegment): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.incrementSegment(segment, 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.incrementSegment(segment, -1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.focusNextSegment(segment);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.focusPrevSegment(segment);
        break;
      case 'Home':
        event.preventDefault();
        this.setSegmentToMin(segment);
        break;
      case 'End':
        event.preventDefault();
        this.setSegmentToMax(segment);
        break;
      case 'Backspace':
      case 'Delete':
        event.preventDefault();
        this.pendingDigits.set('');
        break;
      default:
        if (/^[0-9]$/.test(event.key)) {
          event.preventDefault();
          this.handleDigitInput(event.key, segment);
        }
        break;
    }
  }

  protected onPeriodKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.togglePeriod();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.focusPrevSegment('period');
        break;
      case 'a':
      case 'A':
        event.preventDefault();
        this.setPeriod('AM');
        break;
      case 'p':
      case 'P':
        event.preventDefault();
        this.setPeriod('PM');
        break;
    }
  }

  protected togglePeriod(): void {
    const value = this.internalValue();
    if (!value) {
      this.updateValue({ hours: 12, minutes: 0, seconds: 0 });
      return;
    }

    const newHours = value.hours >= 12 ? value.hours - 12 : value.hours + 12;
    this.updateValue({ ...value, hours: newHours });
  }

  // ============ PRIVATE METHODS ============

  private setPeriod(period: TimePeriod): void {
    const value = this.internalValue();
    if (!value) {
      const hours = period === 'AM' ? 0 : 12;
      this.updateValue({ hours, minutes: 0, seconds: 0 });
      return;
    }

    const currentPeriod = this.period();
    if (currentPeriod === period) return;

    const newHours = period === 'AM' ? value.hours - 12 : value.hours + 12;
    this.updateValue({ ...value, hours: newHours });
  }

  private incrementSegment(segment: TimeSegment, direction: 1 | -1): void {
    const value = this.internalValue() ?? { hours: 0, minutes: 0, seconds: 0 };
    const step = segment === 'minutes' ? this.minuteStep() : segment === 'seconds' ? this.secondStep() : 1;
    const delta = step * direction;

    let newValue: ComTimeValue;

    switch (segment) {
      case 'hours': {
        const max = this.is12Hour() ? 12 : 23;
        const min = this.is12Hour() ? 1 : 0;
        let h = this.is12Hour() ? (this.displayHours() ?? min) : value.hours;
        h += delta;
        // Wrap
        if (this.is12Hour()) {
          if (h > max) h = min;
          if (h < min) h = max;
          // Convert back to 24h
          const isPM = this.period() === 'PM';
          let h24 = h === 12 ? 0 : h;
          if (isPM) h24 += 12;
          newValue = { ...value, hours: h24 };
        } else {
          if (h > 23) h = 0;
          if (h < 0) h = 23;
          newValue = { ...value, hours: h };
        }
        break;
      }
      case 'minutes': {
        let m = value.minutes + delta;
        if (m > 59) m = 0;
        if (m < 0) m = 59;
        newValue = { ...value, minutes: m };
        break;
      }
      case 'seconds': {
        let s = value.seconds + delta;
        if (s > 59) s = 0;
        if (s < 0) s = 59;
        newValue = { ...value, seconds: s };
        break;
      }
    }

    this.updateValue(newValue);
  }

  private handleDigitInput(digit: string, segment: TimeSegment): void {
    const pending = this.pendingDigits() + digit;

    const value = this.internalValue() ?? { hours: 0, minutes: 0, seconds: 0 };
    let parsed = parseInt(pending, 10);

    switch (segment) {
      case 'hours': {
        const max = this.is12Hour() ? 12 : 23;
        const min = this.is12Hour() ? 1 : 0;
        if (parsed > max) parsed = parseInt(digit, 10);
        if (parsed < min && pending.length >= 2) parsed = min;
        // Convert to 24h if 12h mode
        let h24 = parsed;
        if (this.is12Hour()) {
          const isPM = this.period() === 'PM';
          h24 = parsed === 12 ? 0 : parsed;
          if (isPM) h24 += 12;
        }
        this.updateValue({ ...value, hours: h24 });
        break;
      }
      case 'minutes': {
        if (parsed > 59) parsed = parseInt(digit, 10);
        this.updateValue({ ...value, minutes: parsed });
        break;
      }
      case 'seconds': {
        if (parsed > 59) parsed = parseInt(digit, 10);
        this.updateValue({ ...value, seconds: parsed });
        break;
      }
    }

    // Auto-advance after 2 digits
    if (pending.length >= 2) {
      this.pendingDigits.set('');
      this.focusNextSegment(segment);
    } else {
      this.pendingDigits.set(pending);
    }
  }

  private snapToStep(segment: TimeSegment): void {
    const value = this.internalValue();
    if (!value) return;

    if (segment === 'minutes' && this.minuteStep() > 1) {
      const step = this.minuteStep();
      const snapped = Math.round(value.minutes / step) * step;
      const clamped = Math.min(snapped, 59);
      if (clamped !== value.minutes) {
        this.updateValue({ ...value, minutes: clamped });
      }
    }

    if (segment === 'seconds' && this.secondStep() > 1) {
      const step = this.secondStep();
      const snapped = Math.round(value.seconds / step) * step;
      const clamped = Math.min(snapped, 59);
      if (clamped !== value.seconds) {
        this.updateValue({ ...value, seconds: clamped });
      }
    }
  }

  private setSegmentToMin(segment: TimeSegment): void {
    const value = this.internalValue() ?? { hours: 0, minutes: 0, seconds: 0 };
    switch (segment) {
      case 'hours': {
        if (this.is12Hour()) {
          // Min display is 1; convert to 24h
          const isPM = this.period() === 'PM';
          const h24 = isPM ? 13 : 1;
          this.updateValue({ ...value, hours: h24 });
        } else {
          this.updateValue({ ...value, hours: 0 });
        }
        break;
      }
      case 'minutes':
        this.updateValue({ ...value, minutes: 0 });
        break;
      case 'seconds':
        this.updateValue({ ...value, seconds: 0 });
        break;
    }
  }

  private setSegmentToMax(segment: TimeSegment): void {
    const value = this.internalValue() ?? { hours: 0, minutes: 0, seconds: 0 };
    switch (segment) {
      case 'hours': {
        if (this.is12Hour()) {
          // Max display is 12; 12 in 12h = 0 in 24h (for AM) or 12 (for PM)
          const isPM = this.period() === 'PM';
          const h24 = isPM ? 12 : 0;
          this.updateValue({ ...value, hours: h24 });
        } else {
          this.updateValue({ ...value, hours: 23 });
        }
        break;
      }
      case 'minutes':
        this.updateValue({ ...value, minutes: 59 });
        break;
      case 'seconds':
        this.updateValue({ ...value, seconds: 59 });
        break;
    }
  }

  private focusNextSegment(current: TimeSegment | 'period'): void {
    switch (current) {
      case 'hours':
        this.minutesInputRef()?.nativeElement.focus();
        break;
      case 'minutes':
        if (this.showSeconds()) {
          this.secondsInputRef()?.nativeElement.focus();
        } else if (this.is12Hour()) {
          this.periodButtonRef()?.nativeElement.focus();
        }
        break;
      case 'seconds':
        if (this.is12Hour()) {
          this.periodButtonRef()?.nativeElement.focus();
        }
        break;
    }
  }

  private focusPrevSegment(current: TimeSegment | 'period'): void {
    switch (current) {
      case 'minutes':
        this.hoursInputRef()?.nativeElement.focus();
        break;
      case 'seconds':
        this.minutesInputRef()?.nativeElement.focus();
        break;
      case 'period':
        if (this.showSeconds()) {
          this.secondsInputRef()?.nativeElement.focus();
        } else {
          this.minutesInputRef()?.nativeElement.focus();
        }
        break;
    }
  }

  private updateValue(value: ComTimeValue | null): void {
    this.internalValue.set(value);
    this.onChange(value);
    this.timeChange.emit(value);
    this.onValidatorChange();

    if (value) {
      const h = this.is12Hour()
        ? `${(value.hours % 12 || 12)}:${value.minutes.toString().padStart(2, '0')}${this.showSeconds() ? ':' + value.seconds.toString().padStart(2, '0') : ''} ${value.hours >= 12 ? 'PM' : 'AM'}`
        : `${value.hours.toString().padStart(2, '0')}:${value.minutes.toString().padStart(2, '0')}${this.showSeconds() ? ':' + value.seconds.toString().padStart(2, '0') : ''}`;
      this.liveAnnouncement.set(`Time set to ${h}`);
    }
  }
}
