import { computed, Directive, inject, type Signal } from '@angular/core';
import { ComEmptyState } from './empty-state.component';
import { emptyStateActionsVariants } from './empty-state.variants';

/**
 * Empty state actions directive - container for action buttons.
 *
 * Apply to a container element. Place buttons inside.
 * Styling automatically adapts to the parent's `size` input.
 *
 * @example Single action
 * ```html
 * <div comEmptyStateActions>
 *   <button comButton>Create Project</button>
 * </div>
 * ```
 *
 * @example Multiple actions
 * ```html
 * <div comEmptyStateActions>
 *   <button comButton variant="outline">Clear Filters</button>
 *   <button comButton>New Search</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[comEmptyStateActions]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComEmptyStateActions {
  private readonly emptyState = inject(ComEmptyState);

  protected readonly computedClass: Signal<string> = computed(() =>
    emptyStateActionsVariants({ size: this.emptyState.size() })
  );
}
