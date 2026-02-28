import { computed, Directive, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { cardActionsVariants } from './card.variants';
import type { CardAlign, CardActionsDirection } from './card.variants';

/**
 * Card actions directive - dedicated button row for primary card actions.
 *
 * Separate from footer because actions and footer metadata serve different purposes.
 *
 * @example Actions with alignment
 * ```html
 * <div uiCardActions>
 *   <button uiButton variant="ghost" size="sm">Cancel</button>
 *   <button uiButton size="sm">Confirm</button>
 * </div>
 * ```
 *
 * @example Stacked column layout
 * ```html
 * <div uiCardActions direction="column" align="start">
 *   <button uiButton fullWidth>Primary Action</button>
 *   <button uiButton variant="outline" fullWidth>Secondary</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[uiCardActions]',
  exportAs: 'uiCardActions',
  host: {
    '[class]': 'computedClass()',
  },
})
export class UiCardActions {
  /** Horizontal alignment of actions. */
  readonly align: InputSignal<CardAlign> = input<CardAlign>('end');

  /** Layout direction - row or column. */
  readonly direction: InputSignal<CardActionsDirection> = input<CardActionsDirection>('row');

  protected readonly computedClass: Signal<string> = computed(() =>
    cardActionsVariants({
      align: this.align(),
      direction: this.direction(),
    })
  );
}
