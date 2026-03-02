import { computed, Directive, inject, type Signal } from '@angular/core';
import { ComEmptyState } from './empty-state.component';
import { emptyStateDescriptionVariants } from './empty-state.variants';

/**
 * Empty state description directive - supporting text.
 *
 * Apply to a paragraph or text element.
 * Styling automatically adapts to the parent's `size` input.
 *
 * @example
 * ```html
 * <p comEmptyStateDescription>
 *   Create your first project to get started organizing your work.
 * </p>
 * ```
 *
 * @tokens `--color-muted-foreground`
 */
@Directive({
  selector: '[comEmptyStateDescription]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComEmptyStateDescription {
  private readonly emptyState = inject(ComEmptyState);

  protected readonly computedClass: Signal<string> = computed(() =>
    emptyStateDescriptionVariants({ size: this.emptyState.size() })
  );
}
