import {
  booleanAttribute,
  computed,
  Directive,
  input,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { mergeClasses } from './badge.utils';
import { badgeVariants } from './badge.variants';
import type { BadgeVariant, BadgeSize } from './badge.variants';

/**
 * Badge directive — applies styled badge classes to any host element.
 *
 * Works on `<span>`, `<a>`, `<button>`, or any other element.
 * Hover styles are automatically applied only on `<a>` elements via `[a&]:hover:`.
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-hover`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-hover`,
 *         `--color-success`, `--color-success-foreground`, `--color-success-hover`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-border`, `--color-foreground`, `--radius-pill`
 *
 * @example Basic usage
 * ```html
 * <span comBadge>Primary</span>
 * <span comBadge variant="accent">Accent</span>
 * <span comBadge variant="warn">Warning</span>
 * ```
 *
 * @example Pill shape
 * ```html
 * <span comBadge pill>New</span>
 * <span comBadge variant="success" pill>Online</span>
 * ```
 *
 * @example Sizes
 * ```html
 * <span comBadge size="sm">SM</span>
 * <span comBadge>Default</span>
 * <span comBadge size="lg">Large</span>
 * ```
 *
 * @example As a link (hover activates automatically)
 * ```html
 * <a href="/alerts" comBadge variant="warn">3 alerts</a>
 * ```
 *
 * @example With an icon (SVG auto-sized)
 * ```html
 * <span comBadge variant="success">
 *   <svg><!-- check icon --></svg>
 *   Online
 * </span>
 * ```
 *
 * @example Dynamic variant
 * ```html
 * <span comBadge [variant]="statusVariant()">{{ statusLabel() }}</span>
 * ```
 */
@Directive({
  selector: '[comBadge]',
  exportAs: 'comBadge',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComBadge {
  /** Visual variant — maps to semantic token pairings */
  readonly variant: InputSignal<BadgeVariant> = input<BadgeVariant>('primary');

  /** Badge size */
  readonly size: InputSignal<BadgeSize> = input<BadgeSize>('default');

  /** Fully rounded pill shape */
  readonly pill: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  /** Consumer CSS classes — merged with variant classes via mergeClasses() */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** @internal Computed host class from CVA + consumer overrides */
  protected readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      badgeVariants({
        variant: this.variant(),
        size: this.size(),
        pill: this.pill(),
      }),
      this.userClass()
    )
  );
}
