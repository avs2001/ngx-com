import { computed, Directive, inject, type Signal } from '@angular/core';
import { ComEmptyState } from './empty-state.component';
import { emptyStateTitleVariants } from './empty-state.variants';

/**
 * Empty state title directive - styled heading text.
 *
 * Apply to any heading element. Consumer picks the semantic level (h2, h3, etc.).
 * Styling automatically adapts to the parent's `size` input.
 *
 * @example
 * ```html
 * <h3 comEmptyStateTitle>No projects yet</h3>
 * ```
 *
 * @tokens `--color-foreground`
 */
@Directive({
  selector: '[comEmptyStateTitle]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComEmptyStateTitle {
  private readonly emptyState = inject(ComEmptyState);

  protected readonly computedClass: Signal<string> = computed(() =>
    emptyStateTitleVariants({ size: this.emptyState.size() })
  );
}
