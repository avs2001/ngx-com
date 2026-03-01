import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  input,
  linkedSignal,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { RADIO_GROUP_ORIENTATIONS } from './radio.variants';
import type { RadioOrientation, RadioSize, RadioVariant } from './radio.variants';
import { generateRadioGroupId } from './radio.utils';

/** Event emitted when radio group value changes. */
export interface RadioGroupChange {
  value: string | null;
}

/** Interface for radio items that register with the group. */
export interface RadioItem {
  value: () => string;
  isDisabled: () => boolean;
  focus: () => void;
}

/** Context provided to child radio components via DI. */
export interface ComRadioGroupContext {
  name: Signal<string>;
  value: Signal<string | null>;
  disabled: Signal<boolean>;
  size: Signal<RadioSize>;
  variant: Signal<RadioVariant>;
  orientation: Signal<RadioOrientation>;
  focusedValue: Signal<string | null>;
  select: (value: string) => void;
  focusNext: (currentValue: string) => void;
  focusPrevious: (currentValue: string) => void;
  register: (radio: RadioItem) => void;
  unregister: (radio: RadioItem) => void;
  onTouched?: () => void;
}

/** Injection token for radio group context. */
export const COM_RADIO_GROUP: InjectionToken<ComRadioGroupContext> = new InjectionToken<ComRadioGroupContext>('COM_RADIO_GROUP');

/**
 * Radio group component that manages a set of radio buttons.
 *
 * Provides mutual exclusion, shared name, and roving tabindex keyboard navigation.
 * Implements `ControlValueAccessor` for Reactive Forms integration.
 *
 * @tokens `--color-border`, `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-hover`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-hover`,
 *         `--color-disabled`, `--color-disabled-foreground`, `--color-ring`
 *
 * @example Basic usage
 * ```html
 * <com-radio-group [(value)]="selectedFruit" aria-label="Select a fruit">
 *   <com-radio value="apple">Apple</com-radio>
 *   <com-radio value="banana">Banana</com-radio>
 *   <com-radio value="cherry">Cherry</com-radio>
 * </com-radio-group>
 * ```
 *
 * @example With reactive forms
 * ```html
 * <com-radio-group formControlName="size" aria-label="Select size">
 *   <com-radio value="sm">Small</com-radio>
 *   <com-radio value="md">Medium</com-radio>
 *   <com-radio value="lg">Large</com-radio>
 * </com-radio-group>
 * ```
 *
 * @example Horizontal orientation
 * ```html
 * <com-radio-group [(value)]="color" orientation="horizontal">
 *   <com-radio value="red">Red</com-radio>
 *   <com-radio value="green">Green</com-radio>
 *   <com-radio value="blue">Blue</com-radio>
 * </com-radio-group>
 * ```
 *
 * @example With variants
 * ```html
 * <com-radio-group [(value)]="priority" variant="warn" size="lg">
 *   <com-radio value="low">Low</com-radio>
 *   <com-radio value="medium">Medium</com-radio>
 *   <com-radio value="high">High</com-radio>
 * </com-radio-group>
 * ```
 */
@Component({
  selector: 'com-radio-group',
  exportAs: 'comRadioGroup',
  template: `
    <div
      role="radiogroup"
      [class]="groupClasses()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-labelledby]="ariaLabelledby()"
      [attr.aria-describedby]="computedAriaDescribedby()"
      [attr.aria-required]="required() || null"
      [attr.aria-invalid]="hasError() || null"
    >
      <ng-content />
    </div>
    @if (hasError() && errorMessage()) {
      <div
        [id]="errorId"
        class="com-radio-group__error mt-1.5 text-sm text-warn"
        role="alert"
      >
        {{ errorMessage() }}
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: COM_RADIO_GROUP,
      useFactory: () => {
        const group = inject(ComRadioGroup);
        return group.createContext();
      },
    },
  ],
  host: {
    class: 'com-radio-group block',
    '[class.com-radio-group--disabled]': 'disabled()',
    '[class.com-radio-group--error]': 'hasError()',
  },
})
export class ComRadioGroup implements ControlValueAccessor {
  /** Optional NgControl for reactive forms integration. */
  readonly ngControl: NgControl | null = inject(NgControl, { optional: true, self: true });

  /** Unique ID for this radio group instance. */
  private readonly uniqueId: string = generateRadioGroupId();

  /** ID for the error message element. */
  readonly errorId: string = `${this.uniqueId}-error`;

  /** Registered radio items. */
  private readonly registeredRadios: WritableSignal<RadioItem[]> = signal([]);

  // Inputs
  readonly name: InputSignal<string> = input<string>(this.uniqueId);
  readonly value: ModelSignal<string | null> = model<string | null>(null);
  readonly disabled: ModelSignal<boolean> = model<boolean>(false);
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });
  readonly orientation: InputSignal<RadioOrientation> = input<RadioOrientation>('vertical');
  readonly size: InputSignal<RadioSize> = input<RadioSize>('md');
  readonly variant: InputSignal<RadioVariant> = input<RadioVariant>('primary');
  readonly hasError: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
    alias: 'error',
  });
  readonly errorMessage: InputSignal<string> = input<string>('');
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabelledby: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-labelledby' });
  readonly ariaDescribedby: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-describedby' });

  // Outputs
  /** Emits when the selection changes, with full event details. */
  readonly selectionChange: OutputEmitterRef<RadioGroupChange> = output<RadioGroupChange>();

  /**
   * Tracks the currently focused radio value for roving tabindex.
   * Resets to the current selection (or first focusable) when value or radios change.
   */
  private readonly focusedValueSignal: WritableSignal<string | null> = linkedSignal({
    source: () => ({ value: this.value(), radios: this.registeredRadios() }),
    computation: ({ value, radios }) => {
      if (value && radios.some((r) => r.value() === value && !r.isDisabled())) {
        return value;
      }
      const firstFocusable = radios.find((r) => !r.isDisabled());
      return firstFocusable?.value() ?? null;
    },
  });

  // Computed
  readonly computedAriaDescribedby: Signal<string | null> = computed(() => {
    const userDescribedby = this.ariaDescribedby();
    if (this.hasError() && this.errorMessage()) {
      return userDescribedby ? `${userDescribedby} ${this.errorId}` : this.errorId;
    }
    return userDescribedby;
  });

  protected readonly groupClasses: Signal<string> = computed(() =>
    RADIO_GROUP_ORIENTATIONS[this.orientation()]
  );

  // CVA callbacks
  private onChange: (value: string | null) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /** Creates the context object for child radios. */
  createContext(): ComRadioGroupContext {
    return {
      name: this.name,
      value: this.value,
      disabled: this.disabled,
      size: this.size,
      variant: this.variant,
      orientation: this.orientation,
      focusedValue: this.focusedValueSignal,
      select: this.select.bind(this),
      focusNext: this.focusNext.bind(this),
      focusPrevious: this.focusPrevious.bind(this),
      register: this.register.bind(this),
      unregister: this.unregister.bind(this),
      onTouched: () => this.onTouchedCallback(),
    };
  }

  /** Register a radio item with the group. */
  private register(radio: RadioItem): void {
    this.registeredRadios.update((radios) => [...radios, radio]);
  }

  /** Unregister a radio item from the group. */
  private unregister(radio: RadioItem): void {
    this.registeredRadios.update((radios) => radios.filter((r) => r !== radio));
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // Public API
  /** Selects a radio by value. */
  select(newValue: string): void {
    if (this.disabled()) {
      return;
    }
    this.value.set(newValue);
    this.focusedValueSignal.set(newValue);
    this.onChange(newValue);
    this.selectionChange.emit({ value: newValue });
  }

  /** Focuses the next non-disabled radio (with cyclic wrap). */
  focusNext(currentValue: string): void {
    const allRadios = this.registeredRadios();
    const focusableRadios = allRadios.filter((r) => !r.isDisabled());

    if (focusableRadios.length === 0) {
      return;
    }

    const currentIndex = focusableRadios.findIndex((r) => r.value() === currentValue);
    const nextIndex = (currentIndex + 1) % focusableRadios.length;
    const nextRadio = focusableRadios[nextIndex];

    if (nextRadio) {
      this.focusedValueSignal.set(nextRadio.value());
      this.select(nextRadio.value());
      nextRadio.focus();
    }
  }

  /** Focuses the previous non-disabled radio (with cyclic wrap). */
  focusPrevious(currentValue: string): void {
    const allRadios = this.registeredRadios();
    const focusableRadios = allRadios.filter((r) => !r.isDisabled());

    if (focusableRadios.length === 0) {
      return;
    }

    const currentIndex = focusableRadios.findIndex((r) => r.value() === currentValue);
    const prevIndex = (currentIndex - 1 + focusableRadios.length) % focusableRadios.length;
    const prevRadio = focusableRadios[prevIndex];

    if (prevRadio) {
      this.focusedValueSignal.set(prevRadio.value());
      this.select(prevRadio.value());
      prevRadio.focus();
    }
  }
}
