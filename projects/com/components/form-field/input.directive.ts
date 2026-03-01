import {
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, OnInit, Signal, WritableSignal } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { FormFieldControl } from './form-field-control';
import { ErrorStateMatcher } from './error-state-matcher';
import type { FormFieldAppearance } from './form-field-defaults';

/** Auto-incrementing ID counter. */
let nextId = 0;

/**
 * Directive applied to native `<input>` and `<textarea>` elements to bridge
 * them to the form field wrapper. Implements the `FormFieldControl` contract.
 *
 * This directive does NOT implement `ControlValueAccessor` - it relies on
 * Angular's built-in value accessors (`DefaultValueAccessor`, `NumberValueAccessor`, etc.)
 * that are already applied to native elements with `formControlName` or `ngModel`.
 *
 * Instead, this directive reports state (focused, empty, disabled, error) to the
 * parent form field for proper visual presentation.
 *
 * @tokens (styling is controlled by the parent form field)
 *
 * @example Basic usage
 * ```html
 * <com-form-field>
 *   <label comLabel>Email</label>
 *   <input comInput formControlName="email" placeholder="you@example.com" />
 * </com-form-field>
 * ```
 *
 * @example Textarea
 * ```html
 * <com-form-field>
 *   <label comLabel>Description</label>
 *   <textarea comInput formControlName="description"></textarea>
 * </com-form-field>
 * ```
 *
 * @example Custom error state matcher
 * ```html
 * <com-form-field>
 *   <label comLabel>Code</label>
 *   <input comInput formControlName="code" [errorStateMatcher]="eagerMatcher" />
 * </com-form-field>
 * ```
 */
@Directive({
  selector: 'input[comInput], textarea[comInput]',
  exportAs: 'comInput',
  providers: [{ provide: FormFieldControl, useExisting: forwardRef(() => ComInput) }],
  host: {
    '[id]': 'id()',
    '[disabled]': 'disabled()',
    '[required]': 'required()',
    '[attr.aria-invalid]': 'errorState() || null',
    '[attr.aria-required]': 'required() || null',
    '[attr.aria-describedby]': 'ariaDescribedBy() || null',
    '[class]': 'hostClasses()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(input)': 'onInput()',
  },
})
export class ComInput implements FormFieldControl<string>, OnInit {
  private readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly autofillMonitor = inject(AutofillMonitor);
  private readonly defaultErrorStateMatcher = inject(ErrorStateMatcher);
  private readonly parentForm = inject(NgForm, { optional: true });
  private readonly parentFormGroup = inject(FormGroupDirective, { optional: true });

  /** NgControl bound to this input (if using reactive forms). */
  readonly ngControl: NgControl | null = inject(NgControl, { optional: true, self: true });

  // Inputs
  readonly inputId: InputSignal<string | undefined> = input<string>(undefined, { alias: 'id' });
  readonly inputDisabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly inputRequired: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly userAriaDescribedBy: InputSignal<string> = input<string>('', { alias: 'aria-describedby' });
  readonly errorStateMatcher: InputSignal<ErrorStateMatcher | undefined> = input<ErrorStateMatcher>();

  // Internal state
  private readonly _focused = signal(false);
  private readonly _autofilled = signal(false);
  private readonly _empty = signal(true);
  private readonly _uniqueId: string = `com-input-${nextId++}`;
  private readonly _appearance: WritableSignal<FormFieldAppearance> = signal<FormFieldAppearance>('outline');

  // Public signals implementing FormFieldControl
  readonly focused: Signal<boolean> = this._focused.asReadonly();

  readonly id: Signal<string> = computed(() => this.inputId() ?? this._uniqueId);

  readonly shouldLabelFloat: Signal<boolean> = computed(() => {
    return this._focused() || !this._empty() || this._autofilled();
  });

  readonly disabled: Signal<boolean> = computed(() => {
    if (this.inputDisabled()) return true;
    return this.ngControl?.control?.disabled ?? false;
  });

  readonly required: Signal<boolean> = computed(() => {
    if (this.inputRequired()) return true;
    const control = this.ngControl?.control;
    if (control?.validator) {
      const result = control.validator({ value: '' } as never);
      return result?.['required'] !== undefined;
    }
    return false;
  });

  readonly errorState: Signal<boolean> = computed(() => {
    // Read _focused to trigger re-evaluation on blur (when touched changes)
    // Read _empty to trigger re-evaluation on input (when validity changes)
    this._focused();
    this._empty();
    const matcher = this.errorStateMatcher() ?? this.defaultErrorStateMatcher;
    const form = this.parentFormGroup ?? this.parentForm;
    return matcher.isErrorState(this.ngControl?.control ?? null, form);
  });

  /** Combined aria-describedby including user-provided and form-field-generated IDs. */
  private readonly _describedByIds = signal('');

  readonly ariaDescribedBy: Signal<string> = computed(() => {
    const userIds = this.userAriaDescribedBy();
    const fieldIds = this._describedByIds();
    return [userIds, fieldIds].filter(Boolean).join(' ');
  });

  /** Computed host classes including appearance-based padding. */
  protected readonly hostClasses: Signal<string> = computed(() => {
    const base =
      'peer w-full bg-transparent text-foreground placeholder:text-input-placeholder outline-none border-none disabled:cursor-not-allowed disabled:text-disabled-foreground px-3';
    const padding = this._appearance() === 'fill' ? 'pt-5 pb-1.5' : 'py-2.5';
    return `${base} ${padding}`;
  });

  ngOnInit(): void {
    this.updateEmpty();

    const autofillSub = this.autofillMonitor.monitor(this.elementRef).subscribe((event) => {
      this._autofilled.set(event.isAutofilled);
    });

    this.destroyRef.onDestroy(() => {
      autofillSub.unsubscribe();
      this.autofillMonitor.stopMonitoring(this.elementRef);
    });
  }

  protected onFocus(): void {
    this._focused.set(true);
  }

  protected onBlur(): void {
    this._focused.set(false);
  }

  protected onInput(): void {
    this.updateEmpty();
  }

  private updateEmpty(): void {
    this._empty.set(!this.elementRef.nativeElement.value);
  }

  // FormFieldControl methods
  onContainerClick(event: MouseEvent): void {
    if (!this.disabled() && event.target !== this.elementRef.nativeElement) {
      this.elementRef.nativeElement.focus();
    }
  }

  /**
   * Sets the describedBy IDs from the form field.
   * Called by the parent form field component.
   */
  setDescribedByIds(ids: string): void {
    this._describedByIds.set(ids);
  }

  /**
   * Sets the appearance for styling.
   * Called by the parent form field component.
   */
  setAppearance(appearance: FormFieldAppearance): void {
    this._appearance.set(appearance);
  }

  /** Focus the native element. */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
