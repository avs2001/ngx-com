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
 * <ui-card>
 *   <div uiCardAccent color="warn"></div>
 *   <div uiCardContent>Warning content</div>
 * </ui-card>
 * ```
 *
 * @example Left accent strip
 * ```html
 * <ui-card>
 *   <div uiCardAccent color="success" position="left"></div>
 *   <div uiCardContent class="pl-5">Content with left padding</div>
 * </ui-card>
 * ```
 */
@Directive({
  selector: '[uiCardAccent]',
  exportAs: 'uiCardAccent',
  host: {
    '[class]': 'computedClass()',
  },
})
export class UiCardAccent {
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
