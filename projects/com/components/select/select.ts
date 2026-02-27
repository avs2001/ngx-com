import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  output,
  Renderer2,
  signal,
  viewChild,
  type ElementRef,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Combobox, ComboboxInput, ComboboxDialog, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { triggerVariants, dialogVariants } from './select.variants';
import { ComSelectOption } from './select-option';
import type { ComSelectSize, CompareFn, DisplayFn } from './select.types';

/**
 * Single-select component using Angular Aria dialog popup pattern.
 * Implements ControlValueAccessor for forms integration.
 *
 * @example
 * ```html
 * <com-select formControlName="country" placeholder="Select country">
 *   <com-select-option *ngFor="let c of countries" [value]="c" [label]="c.name">
 *     {{ c.name }}
 *   </com-select-option>
 * </com-select>
 * ```
 */
@Component({
  selector: 'com-select',
  template: `
    <div
      ngCombobox
      readonly
      #outerCombobox="ngCombobox"
      [class]="triggerClasses()"
      (click)="onTriggerClick()"
    >
      <!-- Trigger content -->
      <span class="flex-1 truncate" [class.text-surface-400]="!hasValue()">
        {{ displayValue() }}
      </span>

      <!-- Hidden input for ARIA -->
      <input
        ngComboboxInput
        class="sr-only"
        [attr.aria-label]="placeholder()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        readonly
      />

      <!-- Clear button -->
      @if (clearable() && hasValue() && !disabled()) {
        <button
          type="button"
          class="flex items-center justify-center w-5 h-5 rounded-full text-surface-400 hover:text-surface-600 hover:bg-surface-200 transition-colors"
          aria-label="Clear selection"
          (click)="onClear($event)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      }

      <!-- Arrow icon -->
      <span
        class="flex items-center justify-center text-surface-400 transition-transform"
        [class.rotate-180]="isOpen()"
        aria-hidden="true"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>

      <!-- Dialog popup container -->
      <ng-template ngComboboxPopupContainer>
        <dialog
          ngComboboxDialog
          #dialogRef
          [class]="dialogClasses()"
          [class.hidden]="!isOpen()"
        >
          <!-- Inner combobox for options -->
          <div
            ngCombobox
            filterMode="manual"
            alwaysExpanded
            #innerCombobox="ngCombobox"
          >
            <!-- Hidden input for inner combobox ARIA -->
            <input ngComboboxInput class="sr-only" readonly />

            <!-- Listbox with options -->
            <div
              ngListbox
              #listboxRef
              class="overflow-y-auto"
              [style.max-height]="maxListboxHeight()"
            >
              <ng-content select="com-select-option" />
            </div>
          </div>
        </dialog>
      </ng-template>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
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
    dialog {
      position: absolute;
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
    }
    dialog::backdrop {
      background: transparent;
    }
  `,
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxDialog,
    ComboboxPopupContainer,
    Listbox,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComSelect),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-select',
  },
})
export class ComSelect<T> implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);

  // View queries
  private readonly outerCombobox = viewChild<Combobox<T>>('outerCombobox');
  private readonly listbox = viewChild<Listbox<T>>('listboxRef');
  private readonly dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');
  private readonly options = contentChildren(ComSelectOption<T>);

  // Inputs
  /** Current selected value */
  readonly value: InputSignal<T | null> = input<T | null>(null);

  /** Placeholder text when no value is selected */
  readonly placeholder: InputSignal<string> = input('');

  /** Whether the select is disabled */
  readonly disabled: InputSignal<boolean> = input(false);

  /** Whether the select is required */
  readonly required: InputSignal<boolean> = input(false);

  /** Custom comparison function for values */
  readonly compareWith: InputSignal<CompareFn<T>> = input<CompareFn<T>>((a, b) => a === b);

  /** Custom display function for the selected value */
  readonly displayWith: InputSignal<DisplayFn<T> | null> = input<DisplayFn<T> | null>(null);

  /** Whether to show the clear button */
  readonly clearable: InputSignal<boolean> = input(false);

  /** Size variant */
  readonly size: InputSignal<ComSelectSize> = input<ComSelectSize>('md');

  /** Additional CSS class for the dialog panel */
  readonly panelClass: InputSignal<string> = input('');

  // Outputs
  /** Emits when the value changes */
  readonly valueChange: OutputEmitterRef<T | null> = output<T | null>();

  /** Emits when the dialog opens */
  readonly opened: OutputEmitterRef<void> = output<void>();

  /** Emits when the dialog closes */
  readonly closed: OutputEmitterRef<void> = output<void>();

  /** Emits when the value is cleared */
  readonly cleared: OutputEmitterRef<void> = output<void>();

  // Internal state
  private readonly internalValue: WritableSignal<T | null> = signal(null);
  private readonly isFocused: WritableSignal<boolean> = signal(false);

  /** Whether the dialog is currently open */
  readonly isOpen: Signal<boolean> = computed(() => {
    const combobox = this.outerCombobox();
    return combobox?.expanded() ?? false;
  });

  /** Whether there is a selected value */
  readonly hasValue: Signal<boolean> = computed(() => this.internalValue() !== null);

  /** Display value for the trigger */
  readonly displayValue: Signal<string> = computed(() => {
    const value = this.internalValue();
    if (value === null) {
      return this.placeholder();
    }
    const displayFn = this.displayWith();
    if (displayFn) {
      return displayFn(value);
    }
    return String(value);
  });

  /** Computed trigger classes */
  readonly triggerClasses: Signal<string> = computed(() => {
    let state: 'default' | 'focused' | 'open' | 'disabled' | 'invalid' = 'default';

    if (this.disabled()) {
      state = 'disabled';
    } else if (this.isOpen()) {
      state = 'open';
    } else if (this.isFocused()) {
      state = 'focused';
    }

    return triggerVariants({ state, size: this.size() });
  });

  /** Computed dialog classes */
  readonly dialogClasses: Signal<string> = computed(() => {
    const base = dialogVariants({ size: this.size() });
    const extra = this.panelClass();
    return extra ? `${base} ${extra}` : base;
  });

  /** Max height for listbox based on size */
  readonly maxListboxHeight: Signal<string> = computed(() => {
    switch (this.size()) {
      case 'sm':
        return '14rem'; // 224px
      case 'lg':
        return '24rem'; // 384px
      default:
        return '18rem'; // 288px
    }
  });

  // CVA callbacks
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync external value input with internal state
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== undefined) {
        this.internalValue.set(externalValue);
      }
    });

    // Watch listbox selection changes
    effect(() => {
      const lb = this.listbox();
      if (lb) {
        const values = lb.values();
        if (values.length > 0) {
          const newValue = values[0] as T | null;
          if (newValue !== undefined && !this.valuesEqual(newValue, this.internalValue())) {
            this.internalValue.set(newValue);
            this.onChange(newValue);
            this.valueChange.emit(newValue);
            // Close dialog after selection
            this.outerCombobox()?.close();
          }
        }
      }
    });

    // Watch for open/close state changes
    effect(() => {
      const open = this.isOpen();
      if (open) {
        this.opened.emit();
        this.positionDialog();
      } else {
        this.closed.emit();
        this.onTouched();
      }
    });
  }

  /** Handle trigger click */
  onTriggerClick(): void {
    if (this.disabled()) return;
    const combobox = this.outerCombobox();
    if (combobox) {
      if (combobox.expanded()) {
        combobox.close();
      } else {
        combobox.open();
      }
    }
  }

  /** Handle clear button click */
  onClear(event: Event): void {
    event.stopPropagation();
    this.internalValue.set(null);
    this.onChange(null);
    this.valueChange.emit(null);
    this.cleared.emit();
  }

  /** Position the dialog below the trigger */
  private positionDialog(): void {
    const dialog = this.dialogElement();
    if (!dialog) return;

    // Use requestAnimationFrame to ensure dialog is visible
    requestAnimationFrame(() => {
      const dialogEl = dialog.nativeElement;
      const triggerRect = (dialogEl.parentElement as HTMLElement)?.getBoundingClientRect();

      if (triggerRect) {
        this.renderer.setStyle(dialogEl, 'top', `${triggerRect.height + 4}px`);
        this.renderer.setStyle(dialogEl, 'left', '0');
        this.renderer.setStyle(dialogEl, 'width', `${triggerRect.width}px`);
      }
    });
  }

  /** Compare two values for equality */
  private valuesEqual(a: T | null, b: T | null): boolean {
    if (a === null || b === null) {
      return a === b;
    }
    return this.compareWith()(a, b);
  }

  // ControlValueAccessor implementation
  writeValue(value: T | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Disabled state is handled via input signal
    // Forms will update the disabled input directly
  }
}
