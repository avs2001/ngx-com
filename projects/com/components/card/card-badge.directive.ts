import { computed, Directive, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { cardBadgeVariants } from './card.variants';
import type { CardBadgeColor, CardBadgePosition } from './card.variants';

/**
 * Card badge directive - positioned overlay for labels, tags, or status indicators.
 *
 * Floats over the card content (e.g., "NEW", "SALE", "Featured").
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-accent`, `--color-accent-foreground`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-success`, `--color-success-foreground`,
 *         `--color-muted`, `--color-muted-foreground`, `--radius-pill`
 *
 * @example Badge in top-right corner
 * ```html
 * <com-card>
 *   <span comCardBadge>NEW</span>
 *   <img comCardMedia src="/product.jpg" alt="Product" />
 * </com-card>
 * ```
 *
 * @example Badge with custom position and color
 * ```html
 * <com-card>
 *   <span comCardBadge position="top-left" color="warn">SALE</span>
 *   <div comCardContent>Product details</div>
 * </com-card>
 * ```
 */
@Directive({
  selector: '[comCardBadge]',
  exportAs: 'comCardBadge',
  host: {
    '[class]': 'computedClass()',
  },
})
export class UiCardBadge {
  /** Badge position within the card. */
  readonly position: InputSignal<CardBadgePosition> = input<CardBadgePosition>('top-right');

  /** Badge color. */
  readonly color: InputSignal<CardBadgeColor> = input<CardBadgeColor>('primary');

  protected readonly computedClass: Signal<string> = computed(() =>
    cardBadgeVariants({
      position: this.position(),
      color: this.color(),
    })
  );
}
