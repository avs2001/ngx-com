import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { FormFieldControl } from './form-field-control';
import { ComLabel } from './label.directive';
import { ComHint } from './hint.directive';
import { ComError } from './error.directive';
import { ComPrefix } from './prefix.directive';
import { ComSuffix } from './suffix.directive';
import { ComInput } from './input.directive';
import {
  FORM_FIELD_DEFAULTS,
  type FormFieldAppearance,
  type FormFieldColor,
  type FormFieldFloatLabel,
  type FormFieldSubscriptSizing,
} from './form-field-defaults';
import {
  formFieldVariants,
  formFieldContainerVariants,
  formFieldLabelVariants,
  formFieldSubscriptVariants,
  inputVariants,
} from './form-field.variants';
import { mergeClasses } from './form-field.utils';

/**
 * Form field wrapper providing visual structure for form inputs.
 *
 * Provides floating labels, borders (outline/fill appearance), hints, errors,
 * and prefix/suffix slots. Automatically wires ARIA attributes for accessibility.
 *
 * The form field reads state from its inner `FormFieldControl` child (typically
 * a `ComInput` directive) and renders UI accordingly.
 *
 * @tokens `--color-foreground`, `--color-input-border`, `--color-input-background`,
 *         `--color-primary`, `--color-accent`, `--color-warn`, `--color-ring`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-disabled`,
 *         `--color-disabled-foreground`, `--color-background`, `--radius-input`
 *
 * @example Basic outline field
 * ```html
 * <com-form-field>
 *   <label comLabel>Email</label>
 *   <input comInput formControlName="email" />
 *   <span comHint>We'll never share your email.</span>
 *   <span comError match="required">Email is required.</span>
 * </com-form-field>
 * ```
 *
 * @example Fill appearance
 * ```html
 * <com-form-field appearance="fill">
 *   <label comLabel>Username</label>
 *   <input comInput formControlName="username" />
 * </com-form-field>
 * ```
 *
 * @example With prefix and suffix
 * ```html
 * <com-form-field>
 *   <label comLabel>Amount</label>
 *   <span comPrefix>$</span>
 *   <input comInput type="number" formControlName="amount" />
 *   <span comSuffix>.00</span>
 * </com-form-field>
 * ```
 */
@Component({
  selector: 'com-form-field',
  exportAs: 'comFormField',
  template: `
    <div [class]="containerClasses()" (click)="onContainerClick($event)">
      @if (labelChild()) {
        <span [class]="labelClasses()">
          <ng-content select="[comLabel]" />
          @if (showRequiredMarker()) {
            <span class="text-warn" aria-hidden="true">&thinsp;*</span>
          }
        </span>
      }

      <div class="flex items-center w-full">
        @if (hasPrefix()) {
          <ng-content select="[comPrefix]" />
        }
        <div class="flex-1 min-w-0" [class]="inputWrapperClasses()">
          <ng-content />
        </div>
        @if (hasSuffix()) {
          <ng-content select="[comSuffix]" />
        }
      </div>
    </div>

    <div [class]="subscriptClasses()">
      @if (showErrors()) {
        @for (error of visibleErrors(); track error.id) {
          <ng-content select="[comError]" />
        }
      } @else {
        <div class="flex justify-between w-full gap-2">
          <ng-content select="[comHint]:not([align='end'])" />
          <ng-content select="[comHint][align='end']" />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    '[class]': 'hostClasses()',
    '[class.com-form-field--focused]': 'isFocused()',
    '[class.com-form-field--disabled]': 'isDisabled()',
    '[class.com-form-field--error]': 'hasError()',
    '[class.com-form-field--floating]': 'shouldLabelFloat()',
  },
})
export class ComFormField {
  private readonly defaults = inject(FORM_FIELD_DEFAULTS, { optional: true });

  // Content children
  readonly control: Signal<FormFieldControl | undefined> = contentChild(FormFieldControl);
  readonly inputDirective: Signal<ComInput | undefined> = contentChild(ComInput);
  readonly labelChild: Signal<ComLabel | undefined> = contentChild(ComLabel);
  readonly hintChildren: Signal<readonly ComHint[]> = contentChildren(ComHint);
  readonly errorChildren: Signal<readonly ComError[]> = contentChildren(ComError);
  readonly prefixChild: Signal<ComPrefix | undefined> = contentChild(ComPrefix);
  readonly suffixChild: Signal<ComSuffix | undefined> = contentChild(ComSuffix);

  // Inputs with defaults fallback
  readonly appearance: InputSignal<FormFieldAppearance> = input<FormFieldAppearance>(
    this.defaults?.appearance ?? 'outline'
  );
  readonly color: InputSignal<FormFieldColor> = input<FormFieldColor>(this.defaults?.color ?? 'primary');
  readonly floatLabel: InputSignal<FormFieldFloatLabel> = input<FormFieldFloatLabel>(
    this.defaults?.floatLabel ?? 'auto'
  );
  readonly hideRequiredMarker: InputSignalWithTransform<boolean, unknown> = input(
    this.defaults?.hideRequiredMarker ?? false,
    { transform: booleanAttribute }
  );
  readonly subscriptSizing: InputSignal<FormFieldSubscriptSizing> = input<FormFieldSubscriptSizing>(
    this.defaults?.subscriptSizing ?? 'fixed'
  );
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  // Derived state from inner control
  readonly shouldLabelFloat: Signal<boolean> = computed(() => {
    if (this.floatLabel() === 'always') return true;
    return this.control()?.shouldLabelFloat() ?? false;
  });

  readonly isFocused: Signal<boolean> = computed(() => this.control()?.focused() ?? false);
  readonly isDisabled: Signal<boolean> = computed(() => this.control()?.disabled() ?? false);
  readonly hasError: Signal<boolean> = computed(() => this.control()?.errorState() ?? false);
  readonly hasPrefix: Signal<boolean> = computed(() => !!this.prefixChild());
  readonly hasSuffix: Signal<boolean> = computed(() => !!this.suffixChild());

  readonly showRequiredMarker: Signal<boolean> = computed(() => {
    if (this.hideRequiredMarker()) return false;
    return this.control()?.required() ?? false;
  });

  readonly showErrors: Signal<boolean> = computed(() => this.hasError() && this.errorChildren().length > 0);

  readonly visibleErrors: Signal<readonly ComError[]> = computed(() =>
    this.errorChildren().filter((e) => e.shouldShow())
  );

  // Computed classes
  protected readonly hostClasses: Signal<string> = computed(() =>
    mergeClasses(formFieldVariants({ disabled: this.isDisabled() }), this.userClass())
  );

  protected readonly containerClasses: Signal<string> = computed(() =>
    formFieldContainerVariants({
      appearance: this.appearance(),
      color: this.color(),
      focused: this.isFocused(),
      error: this.hasError(),
      disabled: this.isDisabled(),
    })
  );

  protected readonly labelClasses: Signal<string> = computed(() =>
    formFieldLabelVariants({
      appearance: this.appearance(),
      floating: this.shouldLabelFloat(),
      color: this.color(),
      error: this.hasError(),
      focused: this.isFocused(),
      disabled: this.isDisabled(),
    })
  );

  protected readonly inputWrapperClasses: Signal<string> = computed(() =>
    inputVariants({
      appearance: this.appearance(),
      hasPrefix: this.hasPrefix(),
      hasSuffix: this.hasSuffix(),
    })
  );

  protected readonly subscriptClasses: Signal<string> = computed(() =>
    formFieldSubscriptVariants({ sizing: this.subscriptSizing() })
  );

  constructor() {
    // Wire up label to control
    effect(() => {
      const label = this.labelChild();
      const ctrl = this.control();
      if (label && ctrl) {
        label.setForId(ctrl.id());
      }
    });

    // Wire up aria-describedby on the control
    effect(() => {
      const inputEl = this.inputDirective();
      if (!inputEl) return;

      const ids: string[] = [];
      if (this.showErrors()) {
        this.visibleErrors().forEach((e) => ids.push(e.id));
      } else {
        this.hintChildren().forEach((h) => ids.push(h.id));
      }
      inputEl.setDescribedByIds(ids.join(' '));
    });
  }

  protected onContainerClick(event: MouseEvent): void {
    this.control()?.onContainerClick(event);
  }
}
