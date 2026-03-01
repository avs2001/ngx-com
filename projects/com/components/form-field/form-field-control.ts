import type { Signal } from '@angular/core';
import type { NgControl } from '@angular/forms';

/**
 * Contract that any control inside a form field must implement.
 *
 * This allows the form field to read state from any inner control
 * (input, textarea, custom controls) without knowing implementation details.
 *
 * @example Implementing for a custom phone input
 * ```ts
 * @Directive({
 *   selector: 'com-phone-input',
 *   providers: [{ provide: FormFieldControl, useExisting: PhoneInputComponent }],
 * })
 * export class PhoneInputComponent extends FormFieldControl<string> {
 *   // ... implement all abstract members
 * }
 * ```
 */
export abstract class FormFieldControl<T = unknown> {
  /** The NgControl bound to this control (if any). */
  abstract readonly ngControl: NgControl | null;

  /** Whether the control is focused. */
  abstract readonly focused: Signal<boolean>;

  /** Whether the label should float (focused or non-empty). */
  abstract readonly shouldLabelFloat: Signal<boolean>;

  /** Whether the control is required. */
  abstract readonly required: Signal<boolean>;

  /** Whether the control is disabled. */
  abstract readonly disabled: Signal<boolean>;

  /** Whether the control is in an error state. */
  abstract readonly errorState: Signal<boolean>;

  /** Unique ID for the control element. */
  abstract readonly id: Signal<string>;

  /** Called when the form field container is clicked. */
  abstract onContainerClick(event: MouseEvent): void;
}
