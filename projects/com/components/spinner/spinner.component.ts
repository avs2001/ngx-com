import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import {
  spinnerVariants,
  spinnerContainerVariants,
  SPINNER_LABEL_SIZES,
} from './spinner.variants';
import type {
  SpinnerSize,
  SpinnerColor,
  SpinnerLabelPosition,
} from './spinner.variants';

/**
 * A minimal, CSS-only loading indicator.
 *
 * Drop-in anywhere: inside buttons, next to inline text, centered in cards,
 * or as a page-level overlay. The animation is fast (0.6s) for a snappy feel.
 *
 * @tokens `--color-primary`, `--color-accent`, `--color-warn`, `--color-success`, `--color-muted-foreground`
 *
 * @example Simplest usage (inherits parent text color)
 * ```html
 * <com-spinner />
 * ```
 *
 * @example Inside a button (inline, inherits button text color)
 * ```html
 * <button class="btn-primary" [disabled]="saving">
 *   @if (saving) {
 *     <com-spinner size="xs" />
 *   }
 *   Save
 * </button>
 * ```
 *
 * @example With visible label
 * ```html
 * <com-spinner label="Loading results..." />
 * ```
 *
 * @example Centered in a card
 * ```html
 * <div class="flex items-center justify-center p-8">
 *   <com-spinner size="lg" color="primary" label="Loading..." labelPosition="bottom" />
 * </div>
 * ```
 *
 * @example Inline with text
 * ```html
 * <p class="text-muted-foreground">
 *   <com-spinner size="xs" /> Checking availability...
 * </p>
 * ```
 *
 * @example Color variants
 * ```html
 * <com-spinner color="primary" />
 * <com-spinner color="accent" />
 * <com-spinner color="warn" />
 * ```
 *
 * @example Large page-level
 * ```html
 * <com-spinner size="xl" color="primary" label="Preparing your dashboard..." labelPosition="bottom" />
 * ```
 */
@Component({
  selector: 'com-spinner',
  exportAs: 'comSpinner',
  template: `
    <span [class]="spinnerClasses()" aria-hidden="true"></span>
    @if (label()) {
      <span class="select-none text-muted-foreground" [class]="labelSizeClass()">
        {{ label() }}
      </span>
    } @else {
      <span class="sr-only">Loading</span>
    }
  `,
  styles: `
    @keyframes com-spin {
      to {
        transform: rotate(360deg);
      }
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'status',
    '[class]': 'containerClasses()',
  },
})
export class ComSpinner {
  /**
   * Optional loading text (e.g., "Loading...", "Saving...").
   * When omitted, "Loading" is rendered for screen readers only (sr-only).
   * When provided, the label is visible next to or below the spinner.
   */
  readonly label: InputSignal<string | undefined> = input<string>();

  /**
   * Position of the label relative to the spinner.
   * Only relevant when a visible `label` is provided.
   */
  readonly labelPosition: InputSignal<SpinnerLabelPosition> = input<SpinnerLabelPosition>('right');

  /** Size of the spinner. */
  readonly size: InputSignal<SpinnerSize> = input<SpinnerSize>('md');

  /**
   * Color of the spinner.
   * `current` inherits from `currentColor` to match surrounding text.
   */
  readonly color: InputSignal<SpinnerColor> = input<SpinnerColor>('current');

  /** @internal Computed classes for the spinning circle. */
  protected readonly spinnerClasses: Signal<string> = computed(() =>
    spinnerVariants({
      size: this.size(),
      color: this.color(),
    })
  );

  /** @internal Computed classes for the container/host. */
  protected readonly containerClasses: Signal<string> = computed(() =>
    this.label()
      ? spinnerContainerVariants({ labelPosition: this.labelPosition() })
      : spinnerContainerVariants()
  );

  /** @internal Computed label font size class. */
  protected readonly labelSizeClass: Signal<string> = computed(
    () => SPINNER_LABEL_SIZES[this.size()]
  );
}
