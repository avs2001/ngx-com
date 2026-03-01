import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  output,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import type {
  InputSignal,
  ModelSignal,
  OnInit,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import {
  radioCircleVariants,
  RADIO_DOT_SIZES,
  RADIO_LABEL_SIZES,
} from './radio.variants';
import type { RadioSize, RadioVariant } from './radio.variants';
import { generateRadioId } from './radio.utils';
import { COM_RADIO_GROUP, type ComRadioGroupContext, type RadioItem } from './radio-group.component';

/** Event emitted when a radio is selected. */
export interface RadioChange {
  value: string;
  source: ComRadio;
}

/**
 * Production-grade radio component with full accessibility support.
 *
 * Uses a native `<input type="radio">` for built-in keyboard handling,
 * `:checked` pseudo-class, and screen reader support.
 *
 * Must be used within a `ComRadioGroup` which manages the selected value
 * and provides the shared `name` attribute.
 *
 * @tokens `--color-border`, `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-hover`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-hover`,
 *         `--color-disabled`, `--color-disabled-foreground`, `--color-ring`
 *
 * @example Basic usage within a group
 * ```html
 * <com-radio-group [(value)]="selectedOption">
 *   <com-radio value="option1">Option 1</com-radio>
 *   <com-radio value="option2">Option 2</com-radio>
 *   <com-radio value="option3">Option 3</com-radio>
 * </com-radio-group>
 * ```
 *
 * @example Disabled option
 * ```html
 * <com-radio-group [(value)]="selected">
 *   <com-radio value="enabled">Enabled option</com-radio>
 *   <com-radio value="disabled" [disabled]="true">Disabled option</com-radio>
 * </com-radio-group>
 * ```
 */
@Component({
  selector: 'com-radio',
  exportAs: 'comRadio',
  template: `
    <label
      class="group relative inline-flex items-center"
      [class.cursor-pointer]="!isDisabled()"
      [class.cursor-not-allowed]="isDisabled()"
    >
      <span><input
        #inputElement
        type="radio"
        class="peer sr-only"
        [id]="inputId()"
        [checked]="isChecked()"
        [disabled]="isDisabled()"
        [attr.name]="groupName()"
        [attr.value]="value()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-labelledby]="ariaLabelledby()"
        [attr.aria-describedby]="ariaDescribedby()"
        [attr.tabindex]="tabIndex()"
        (change)="onInputChange($event)"
        (blur)="onBlur()"
        (keydown)="onKeyDown($event)"
      /></span>
      <div [class]="circleClasses()">
        <div
          class="com-radio__dot rounded-full bg-current transition-transform duration-150 peer-disabled:bg-disabled-foreground"
          [class]="dotSizeClass()"
          [class.scale-100]="isChecked()"
          [class.scale-0]="!isChecked()"
        ></div>
      </div>
      <span
        class="com-radio__label select-none peer-disabled:cursor-not-allowed peer-disabled:text-disabled-foreground"
        [class]="labelSizeClass()"
      >
        <ng-content />
      </span>
    </label>
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
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'com-radio inline-block align-middle',
    '[class.com-radio--disabled]': 'isDisabled()',
    '[class.com-radio--checked]': 'isChecked()',
  },
})
export class ComRadio implements OnInit, RadioItem {
  /** Optional parent radio group context. */
  private readonly group: ComRadioGroupContext | null = inject(COM_RADIO_GROUP, {
    optional: true,
  });

  /** DestroyRef for cleanup. */
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  /** Reference to the native input element. */
  readonly inputRef: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('inputElement');

  /** Unique ID for this radio instance. */
  private readonly uniqueId: string = generateRadioId();

  // Inputs
  readonly value: InputSignal<string> = input.required<string>();
  readonly size: InputSignal<RadioSize> = input<RadioSize>('md');
  readonly variant: InputSignal<RadioVariant> = input<RadioVariant>('primary');
  readonly disabled: ModelSignal<boolean> = model<boolean>(false);
  readonly id: InputSignal<string | undefined> = input<string>();
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabelledby: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-labelledby' });
  readonly ariaDescribedby: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-describedby' });

  // Outputs
  readonly changed: OutputEmitterRef<RadioChange> = output<RadioChange>();

  // Computed state
  readonly inputId: Signal<string> = computed(() => this.id() ?? this.uniqueId);

  /** Resolve size from group or local input. */
  readonly resolvedSize: Signal<RadioSize> = computed(
    () => this.group?.size() ?? this.size()
  );

  /** Resolve variant from group or local input. */
  readonly resolvedVariant: Signal<RadioVariant> = computed(
    () => this.group?.variant() ?? this.variant()
  );

  /** Whether this radio is checked based on group value. */
  readonly isChecked: Signal<boolean> = computed(() => {
    if (!this.group) {
      return false;
    }
    return this.group.value() === this.value();
  });

  /** Whether this radio is disabled (from local or group). */
  readonly isDisabled: Signal<boolean> = computed(
    () => this.disabled() || (this.group?.disabled() ?? false)
  );

  /** Get name from group. */
  readonly groupName: Signal<string | undefined> = computed(() => this.group?.name());

  /** Tab index for roving tabindex pattern. */
  readonly tabIndex: Signal<number> = computed(() => {
    if (this.isDisabled()) {
      return -1;
    }
    if (!this.group) {
      return 0;
    }
    // Roving tabindex: only the selected or first focusable item gets tabindex 0
    const isSelected = this.isChecked();
    const isFocusTarget = this.group.focusedValue() === this.value();

    if (isSelected || isFocusTarget) {
      return 0;
    }
    return -1;
  });

  protected readonly circleClasses: Signal<string> = computed(() =>
    radioCircleVariants({ variant: this.resolvedVariant(), size: this.resolvedSize() })
  );

  protected readonly dotSizeClass: Signal<string> = computed(() => RADIO_DOT_SIZES[this.resolvedSize()]);
  protected readonly labelSizeClass: Signal<string> = computed(() => RADIO_LABEL_SIZES[this.resolvedSize()]);

  ngOnInit(): void {
    // Register with the group
    this.group?.register(this);

    // Unregister on destroy
    this.destroyRef.onDestroy(() => {
      this.group?.unregister(this);
    });
  }

  // Event handlers
  protected onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked && this.group) {
      this.group.select(this.value());
      this.changed.emit({ value: this.value(), source: this });
    }
  }

  protected onBlur(): void {
    this.group?.onTouched?.();
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (!this.group) {
      return;
    }

    const { key } = event;
    const isVertical = this.group.orientation() === 'vertical';
    const isHorizontal = this.group.orientation() === 'horizontal';

    let handled = false;

    if (
      (isVertical && key === 'ArrowDown') ||
      (isHorizontal && key === 'ArrowRight')
    ) {
      this.group.focusNext(this.value());
      handled = true;
    } else if (
      (isVertical && key === 'ArrowUp') ||
      (isHorizontal && key === 'ArrowLeft')
    ) {
      this.group.focusPrevious(this.value());
      handled = true;
    } else if (key === ' ') {
      // Space selects the focused radio
      if (!this.isChecked()) {
        this.group.select(this.value());
        this.changed.emit({ value: this.value(), source: this });
      }
      handled = true;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Public API
  /** Focuses this radio's input element. */
  focus(): void {
    this.inputRef()?.nativeElement.focus();
  }

  /** Selects this radio programmatically. */
  select(): void {
    if (this.isDisabled() || !this.group) {
      return;
    }
    this.group.select(this.value());
    this.changed.emit({ value: this.value(), source: this });
  }
}
