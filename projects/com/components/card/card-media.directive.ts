import { computed, Directive, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { cardMediaVariants } from './card.variants';
import type { CardMediaPosition } from './card.variants';

/**
 * Card media directive - image/video slot with aspect ratio handling.
 *
 * Apply to <img>, <video>, <picture>, or a wrapper <div>.
 *
 * @example Top media (bleeds to edge)
 * ```html
 * <img comCardMedia src="/hero.jpg" alt="Hero image" />
 * ```
 *
 * @example Inset media (padded with rounded corners)
 * ```html
 * <img comCardMedia position="inset" src="/preview.jpg" alt="Preview" />
 * ```
 */
@Directive({
  selector: '[comCardMedia]',
  exportAs: 'comCardMedia',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComCardMedia {
  /** Media positioning within the card. */
  readonly position: InputSignal<CardMediaPosition> = input<CardMediaPosition>('top');

  protected readonly computedClass: Signal<string> = computed(() =>
    cardMediaVariants({ position: this.position() })
  );
}
