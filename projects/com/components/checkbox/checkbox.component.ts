import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import {
  checkboxBoxVariants,
  checkboxIconVariants,
  checkboxLabelVariants,
} from './checkbox.variants';
import type { CheckboxSize, CheckboxVariant } from './checkbox.variants';
import { mergeClasses } from './checkbox.utils';

/** Event emitted when checkbox state changes. */
export interface CheckboxChange {
  checked: boolean;
  source: ComCheckbox;
}

/** Auto-incrementing ID counter for unique checkbox IDs. */
let nextId = 0;

/**
 * Production-grade checkbox component with full accessibility support.
 *
 * Uses a native `<input type="checkbox">` for built-in keyboard handling,
 * `:checked` and `:indeterminate` pseudo-classes, and screen reader support.
 *
 * Implements `ControlValueAccessor` for Reactive Forms integration via
 * `NgControl` injection pattern (no `NG_VALUE_ACCESSOR` provider).
 *
 * @tokens `--color-border`, `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-hover`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-hover`,
 *         `--color-disabled`, `--color-disabled-foreground`, `--color-ring`
 *
 * @example Basic usage
 * ```html
 * <com-checkbox [(checked)]="isActive">Enable feature</com-checkbox>
 * ```
 *
 * @example With reactive forms
 * ```html
 * <com-checkbox formControlName="acceptTerms">
 *   I accept the <a href="/terms">terms and conditions</a>
 * </com-checkbox>
 * ```
 *
 * @example Indeterminate state
 * ```html
 * <com-checkbox [(indeterminate)]="hasPartialSelection" (changed)="onSelectAll($event)">
 *   Select all
 * </com-checkbox>
 * ```
 *
 * @example Variants and sizes
 * ```html
 * <com-checkbox variant="accent" size="lg">Large accent checkbox</com-checkbox>
 * <com-checkbox variant="warn" size="sm">Small warning checkbox</com-checkbox>
 * ```
 */
@Component({
  selector: 'com-checkbox',
  exportAs: 'comCheckbox',
  template: `
    <label [class]="containerClasses()" class="group">
      <span><input
        #inputElement
        type="checkbox"
        class="peer inline sr-only"
        [id]="inputId()"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.name]="name()"
        [attr.value]="value()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-labelledby]="ariaLabelledby()"
        [attr.aria-describedby]="ariaDescribedby()"
        (change)="onInputChange($event)"
        (blur)="onTouched()"
      /></span>
      <span [class]="boxClasses()">
        @if (checked() && !indeterminate()) {
          <!-- Checkmark icon -->
          <svg
            [class]="iconClasses()"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <polyline points="4 12 9 17 20 6" />
          </svg>
        }
        @if (indeterminate()) {
          <!-- Indeterminate icon (dash) -->
          <svg
            [class]="iconClasses()"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        }
      </span>
      <span [class]="labelClasses()">
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
    class: 'com-checkbox inline-block align-middle',
    '[class.com-checkbox--disabled]': 'disabled()',
    '[class.com-checkbox--checked]': 'checked()',
    '[class.com-checkbox--indeterminate]': 'indeterminate()',
  },
})
export class ComCheckbox implements ControlValueAccessor {
  /** Optional NgControl for reactive forms integration. */
  readonly ngControl: NgControl | null = inject(NgControl, { optional: true, self: true });

  /** Reference to the native input element. */
  private readonly inputRef: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('inputElement');

  /** Unique ID for this checkbox instance. */
  private readonly uniqueId: string = `com-checkbox-${nextId++}`;

  // Inputs
  readonly size: InputSignal<CheckboxSize> = input<CheckboxSize>('md');
  readonly variant: InputSignal<CheckboxVariant> = input<CheckboxVariant>('primary');
  readonly checked: ModelSignal<boolean> = model<boolean>(false);
  readonly indeterminate: ModelSignal<boolean> = model<boolean>(false);
  readonly disabled: ModelSignal<boolean> = model<boolean>(false);
  readonly value: InputSignal<string | undefined> = input<string>();
  readonly name: InputSignal<string | undefined> = input<string>();
  readonly id: InputSignal<string | undefined> = input<string>();
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabelledby: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-labelledby' });
  readonly ariaDescribedby: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-describedby' });
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  // Outputs
  readonly changed: OutputEmitterRef<CheckboxChange> = output<CheckboxChange>();

  // Computed state
  readonly inputId: Signal<string> = computed(() => this.id() ?? this.uniqueId);

  protected readonly containerClasses: Signal<string> = computed(() =>
    mergeClasses(
      'relative inline-flex cursor-pointer items-center',
      this.disabled() && 'cursor-not-allowed',
      this.userClass()
    )
  );

  protected readonly boxClasses: Signal<string> = computed(() =>
    checkboxBoxVariants({
      variant: this.variant(),
      size: this.size(),
    })
  );

  protected readonly iconClasses: Signal<string> = computed(() =>
    checkboxIconVariants({ size: this.size() })
  );

  protected readonly labelClasses: Signal<string> = computed(() =>
    checkboxLabelVariants({ size: this.size() })
  );

  // CVA callbacks
  private onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    // Sync indeterminate state to DOM (needed because [indeterminate] is a property, not attribute)
    effect(() => {
      const isIndeterminate = this.indeterminate();
      const inputEl = this.inputRef()?.nativeElement;
      if (inputEl) {
        inputEl.indeterminate = isIndeterminate;
      }
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // Event handlers
  protected onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newChecked = input.checked;

    // Clear indeterminate on user interaction
    if (this.indeterminate()) {
      this.indeterminate.set(false);
      input.indeterminate = false;
    }

    this.checked.set(newChecked);
    this.onChange(newChecked);
    this.changed.emit({ checked: newChecked, source: this });
  }

  // Public API
  /** Toggles the checkbox state programmatically. */
  toggle(): void {
    if (this.disabled()) {
      return;
    }

    const newChecked = !this.checked();
    this.checked.set(newChecked);
    this.indeterminate.set(false);
    this.onChange(newChecked);
    this.changed.emit({ checked: newChecked, source: this });
  }
}
