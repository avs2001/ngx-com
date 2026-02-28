import { computed, Directive, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { cardFooterVariants } from './card.variants';
import type { CardAlign } from './card.variants';

/**
 * Card footer directive - bottom section for metadata or secondary actions.
 *
 * @example Footer with alignment
 * ```html
 * <div uiCardFooter align="between">
 *   <span class="text-sm text-muted-foreground">Updated 3m ago</span>
 *   <a uiButton variant="link" size="sm">View details</a>
 * </div>
 * ```
 */
@Directive({
  selector: '[uiCardFooter]',
  exportAs: 'uiCardFooter',
  host: {
    '[class]': 'computedClass()',
  },
})
export class UiCardFooter {
  /** Horizontal alignment of footer content. */
  readonly align: InputSignal<CardAlign> = input<CardAlign>('end');

  protected readonly computedClass: Signal<string> = computed(() =>
    cardFooterVariants({ align: this.align() })
  );
}
