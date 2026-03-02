import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { mergeClasses } from 'ngx-com/utils';
import { emptyStateVariants } from './empty-state.variants';
import type { EmptyStateSize, EmptyStateAlign, EmptyStateOrientation } from './empty-state.variants';

/**
 * Empty state component - a placeholder surface for when there is no data to display.
 *
 * Common use cases include:
 * - Empty lists or tables ("No results found")
 * - Initial states before user action ("Create your first project")
 * - Search results with no matches ("No items match your search")
 * - Error recovery states ("Something went wrong. Try again.")
 *
 * The component is a pure layout container that accepts projected content through attribute directives.
 *
 * @tokens `--color-muted`, `--color-muted-foreground`, `--color-foreground`
 *
 * @example Minimal empty state
 * ```html
 * <com-empty-state>
 *   <div comEmptyStateIcon>
 *     <com-icon name="inbox" size="xl" />
 *   </div>
 *   <h3 comEmptyStateTitle>No messages</h3>
 * </com-empty-state>
 * ```
 *
 * @example Full empty state with description and action
 * ```html
 * <com-empty-state>
 *   <div comEmptyStateIcon>
 *     <com-icon name="folder-open" size="xl" />
 *   </div>
 *   <h3 comEmptyStateTitle>No projects yet</h3>
 *   <p comEmptyStateDescription>
 *     Create your first project to get started organizing your work.
 *   </p>
 *   <div comEmptyStateActions>
 *     <button comButton>Create Project</button>
 *   </div>
 * </com-empty-state>
 * ```
 *
 * @example Search empty state with secondary action
 * ```html
 * <com-empty-state>
 *   <div comEmptyStateIcon>
 *     <com-icon name="search-x" size="xl" />
 *   </div>
 *   <h3 comEmptyStateTitle>No results found</h3>
 *   <p comEmptyStateDescription>
 *     Try adjusting your search terms or filters.
 *   </p>
 *   <div comEmptyStateActions>
 *     <button comButton variant="outline">Clear Filters</button>
 *     <button comButton>New Search</button>
 *   </div>
 * </com-empty-state>
 * ```
 *
 * @example Small size for inline contexts
 * ```html
 * <com-empty-state size="sm">
 *   <div comEmptyStateIcon>
 *     <com-icon name="list" size="lg" />
 *   </div>
 *   <h4 comEmptyStateTitle>No items</h4>
 * </com-empty-state>
 * ```
 *
 * @example Large size for full-page empty states
 * ```html
 * <com-empty-state size="lg">
 *   <div comEmptyStateIcon>
 *     <com-icon name="rocket" size="2xl" />
 *   </div>
 *   <h2 comEmptyStateTitle>Welcome to Acme</h2>
 *   <p comEmptyStateDescription>
 *     Your dashboard is ready. Start by creating your first resource.
 *   </p>
 *   <div comEmptyStateActions>
 *     <button comButton size="lg">Get Started</button>
 *   </div>
 * </com-empty-state>
 * ```
 *
 * @example Horizontal orientation
 * ```html
 * <com-empty-state orientation="horizontal" align="start">
 *   <div comEmptyStateIcon>
 *     <com-icon name="alert-circle" size="lg" />
 *   </div>
 *   <h4 comEmptyStateTitle>No notifications</h4>
 *   <p comEmptyStateDescription>You're all caught up!</p>
 * </com-empty-state>
 * ```
 *
 * @example Left-aligned for sidebar contexts
 * ```html
 * <com-empty-state align="start">
 *   <div comEmptyStateIcon>
 *     <com-icon name="users" size="lg" />
 *   </div>
 *   <h4 comEmptyStateTitle>No team members</h4>
 *   <p comEmptyStateDescription>Invite people to collaborate.</p>
 *   <div comEmptyStateActions>
 *     <button comButton size="sm">Invite</button>
 *   </div>
 * </com-empty-state>
 * ```
 */
@Component({
  selector: 'com-empty-state',
  exportAs: 'comEmptyState',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComEmptyState {
  /** Controls overall scale: icon container size, text sizes, spacing. */
  readonly size: InputSignal<EmptyStateSize> = input<EmptyStateSize>('md');

  /** Horizontal alignment of content. */
  readonly align: InputSignal<EmptyStateAlign> = input<EmptyStateAlign>('center');

  /** Layout direction: vertical stacks content, horizontal places icon beside text. */
  readonly orientation: InputSignal<EmptyStateOrientation> = input<EmptyStateOrientation>('vertical');

  /** Consumer CSS classes - merged with variant classes. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  protected readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      emptyStateVariants({
        size: this.size(),
        align: this.align(),
        orientation: this.orientation(),
      }),
      this.userClass()
    )
  );
}
