import { computed, Directive, inject, type Signal } from '@angular/core';
import { ComEmptyState } from './empty-state.component';
import { emptyStateIconVariants } from './empty-state.variants';

/**
 * Empty state icon container directive - styled circular background for icon/illustration.
 *
 * Apply to a container element. Place any content inside (typically `com-icon`).
 * Styling automatically adapts to the parent's `size` input.
 *
 * @example
 * ```html
 * <div comEmptyStateIcon>
 *   <com-icon name="inbox" size="xl" />
 * </div>
 * ```
 *
 * @example With custom illustration
 * ```html
 * <div comEmptyStateIcon>
 *   <img src="/assets/empty-mailbox.svg" alt="" class="size-8" />
 * </div>
 * ```
 *
 * @tokens `--color-muted`, `--color-muted-foreground`
 */
@Directive({
  selector: '[comEmptyStateIcon]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComEmptyStateIcon {
  private readonly emptyState = inject(ComEmptyState);

  protected readonly computedClass: Signal<string> = computed(() =>
    emptyStateIconVariants({ size: this.emptyState.size() })
  );
}
