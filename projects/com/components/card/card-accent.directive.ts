import { computed, Directive, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { cardAccentVariants } from './card.variants';
import type { CardAccentColor, CardAccentPosition } from './card.variants';

/**
 * Card accent directive - colored strip for status or category indication.
 *
 * Place as the first child of the card for top accent, or use position="left"
 * for a left-edge strip (requires adding left padding to content).
 *
 * @tokens `--color-primary`, `--color-accent`, `--color-warn`, `--color-success`, `--color-muted`
 *
 * @example Top accent strip
 * ```html
 * <com-card>
 *   <div comCardAccent color="warn"></div>
 *   <div comCardContent>Warning content</div>
 * </com-card>
 * ```
 *
 * @example Left accent strip
 * ```html
 * <com-card>
 *   <div comCardAccent color="success" position="left"></div>
 *   <div comCardContent class="pl-5">Content with left padding</div>
 * </com-card>
 * ```
 */
@Directive({
  selector: '[comCardAccent]',
  exportAs: 'comCardAccent',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComCardAccent {
  /** Accent color. */
  readonly color: InputSignal<CardAccentColor> = input<CardAccentColor>('primary');

  /** Position of the accent strip. */
  readonly position: InputSignal<CardAccentPosition> = input<CardAccentPosition>('top');

  protected readonly computedClass: Signal<string> = computed(() =>
    cardAccentVariants({
      color: this.color(),
      position: this.position(),
    })
  );
}
