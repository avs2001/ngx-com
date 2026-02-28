import { booleanAttribute, computed, Directive, input } from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { mergeClasses } from './button.utils';
import { buttonVariants, type ButtonVariant, type ButtonColor, type ButtonSize } from './button.variants';

/**
 * Button directive — applies styled button classes to native `<button>` and `<a>` elements.
 *
 * Using a directive on native elements preserves:
 * - Full control over native attributes (`type="submit"`, `routerLink`, `download`, etc.)
 * - Native accessibility (keyboard handling, focus, ARIA)
 * - No wrapper elements in the DOM
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`, `--color-primary-subtle`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-hover`, `--color-accent-subtle`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-hover`, `--color-warn-subtle`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-disabled`, `--color-disabled-foreground`,
 *         `--color-border`, `--color-ring`
 *
 * @example Basic usage
 * ```html
 * <button uiButton>Save</button>
 * <button uiButton variant="outline" color="accent">Cancel</button>
 * ```
 *
 * @example Link button
 * ```html
 * <a uiButton variant="link" href="/docs">Documentation</a>
 * <a uiButton variant="outline" routerLink="/dashboard">Dashboard</a>
 * ```
 *
 * @example Icon button
 * ```html
 * <button uiButton variant="ghost" size="icon" aria-label="Settings">
 *   <svg>...</svg>
 * </button>
 * ```
 *
 * @example Full width
 * ```html
 * <button uiButton fullWidth>Submit Application</button>
 * ```
 */
@Directive({
  selector: 'button[uiButton], a[uiButton]',
  exportAs: 'uiButton',
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-disabled]': 'ariaDisabled()',
  },
})
export class UiButton {
  readonly variant: InputSignal<ButtonVariant> = input<ButtonVariant>('solid');
  readonly color: InputSignal<ButtonColor> = input<ButtonColor>('primary');
  readonly size: InputSignal<ButtonSize> = input<ButtonSize>('md');
  readonly fullWidth: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly userClass: InputSignal<string> = input('', { alias: 'class' });

  protected readonly ariaDisabled: Signal<'true' | null> = computed(() =>
    this.disabled() ? 'true' : null
  );

  protected readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      buttonVariants({
        variant: this.variant(),
        color: this.color(),
        size: this.size(),
        fullWidth: this.fullWidth(),
      }),
      this.disabled() && 'pointer-events-none',
      this.userClass()
    )
  );
}
