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
 * <div comCardActions>
 *   <button comButton variant="ghost" size="sm">Cancel</button>
 *   <button comButton size="sm">Confirm</button>
 * </div>
 * ```
 *
 * @example Stacked column layout
 * ```html
 * <div comCardActions direction="column" align="start">
 *   <button comButton fullWidth>Primary Action</button>
 *   <button comButton variant="outline" fullWidth>Secondary</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[comCardActions]',
  exportAs: 'comCardActions',
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
