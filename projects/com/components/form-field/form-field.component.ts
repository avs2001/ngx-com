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
} from './form-field.variants';
import { mergeClasses } from 'ngx-com/utils';

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
      <div class="flex items-center w-full">
        @if (hasPrefix()) {
          <ng-content select="[comPrefix]" />
        }
        @if (labelChild()) {
          <span [class]="labelClasses()">
            <ng-content select="[comLabel]" />
            @if (showRequiredMarker()) {
              <span class="text-warn" aria-hidden="true">&thinsp;*</span>
            }
          </span>
        }
        <div class="flex-1 min-w-0">
          <ng-content />
        </div>
        @if (hasSuffix()) {
          <ng-content select="[comSuffix]" />
        }
      </div>
    </div>

    <div [class]="subscriptClasses()">
      <div [class.hidden]="!showErrors()">
        <ng-content select="[comError]" />
      </div>
      <div [class.hidden]="showErrors()" class="flex justify-between w-full gap-2">
        <ng-content select="[comHint]:not([align='end'])" />
        <ng-content select="[comHint][align='end']" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: `
    /* Hide placeholder when label exists and is not floating (label acts as placeholder) */
    com-form-field.com-form-field--has-label:not(.com-form-field--floating) input::placeholder,
    com-form-field.com-form-field--has-label:not(.com-form-field--floating) textarea::placeholder {
      color: transparent;
    }

    /* Hide dropdown placeholder when label exists and is not floating */
    com-form-field.com-form-field--has-label:not(.com-form-field--floating) com-dropdown .text-placeholder {
      display: none;
    }

    /* Make dropdown fill available space inside form-field */
    com-form-field com-dropdown {
      display: block;
      width: 100%;
    }
  `,
  host: {
    '[class]': 'hostClasses()',
    '[class.com-form-field--focused]': 'isFocused()',
    '[class.com-form-field--disabled]': 'isDisabled()',
    '[class.com-form-field--error]': 'hasError()',
    '[class.com-form-field--floating]': 'shouldLabelFloat()',
    '[class.com-form-field--has-label]': '!!labelChild()',
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
      const ctrl = this.control();
      if (!ctrl || !('setDescribedByIds' in ctrl)) return;

      const ids = this.showErrors()
        ? this.errorChildren().filter((e) => e.shouldShow()).map((e) => e.id)
        : this.hintChildren().map((h) => h.id);
      (ctrl as { setDescribedByIds: (ids: string) => void }).setDescribedByIds(ids.join(' '));
    });

    // Wire up appearance to control for proper styling
    effect(() => {
      const ctrl = this.control();
      if (ctrl && 'setAppearance' in ctrl) {
        (ctrl as { setAppearance: (appearance: FormFieldAppearance) => void }).setAppearance(this.appearance());
      }
    });

    // Wire up control reference to error directives (re-runs on error state change)
    effect(() => {
      // Read hasError to trigger re-evaluation when validation state changes
      this.hasError();
      const ctrl = this.control();
      const ngControl = ctrl?.ngControl?.control ?? null;
      this.errorChildren().forEach((error) => error.setControl(ngControl));
    });
  }

  protected onContainerClick(event: MouseEvent): void {
    this.control()?.onContainerClick(event);
  }
}
