import { booleanAttribute, Directive, input, model, output } from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OutputEmitterRef,
} from '@angular/core';
import type { SortDirection, SortCycle, SortEvent } from './sort.variants';
import type { SortHeaderComponent } from './sort-header.component';

const DEFAULT_SORT_CYCLE: SortCycle = ['asc', 'desc', undefined];

/**
 * Parent directive that manages sort state for a group of sortable headers.
 *
 * Apply to a container element (e.g., `<tr>`, `<div>`) that contains `[uiSortHeader]` children.
 * Children inject this directive via DI and read its signals directly.
 *
 * @tokens `--color-foreground`, `--color-muted-foreground`
 *
 * @example Basic usage
 * ```html
 * <tr comSort (sortChange)="onSort($event)">
 *   <th comSortHeader="name">Name</th>
 *   <th comSortHeader="age">Age</th>
 * </tr>
 * ```
 *
 * @example Two-way binding
 * ```html
 * <tr comSort [(sortActive)]="column" [(sortDirection)]="direction">
 *   <th comSortHeader="name">Name</th>
 * </tr>
 * ```
 */
@Directive({
  selector: '[comSort]',
  exportAs: 'comSort',
  host: {
    class: 'contents',
  },
})
export class SortDirective {
  // ─── Inputs ───

  /** Currently active sort column id — two-way via model() */
  readonly sortActive: ModelSignal<string | undefined> = model<string | undefined>(undefined);

  /** Current sort direction — two-way via model() */
  readonly sortDirection: ModelSignal<SortDirection> = model<SortDirection>(undefined);

  /** Disables all sorting in this container */
  readonly sortDisabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Customize the click cycle (e.g., ['asc', 'desc'] to skip unsorted) */
  readonly sortCycle: InputSignal<SortCycle> = input<SortCycle>(DEFAULT_SORT_CYCLE);

  /** Show a muted arrow on unsorted headers */
  readonly sortShowIndicator: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  // ─── Outputs ───

  /** Emitted when active column or direction changes */
  readonly sortChange: OutputEmitterRef<SortEvent> = output<SortEvent>();

  // ─── Registration ───

  private readonly headers: Map<string, SortHeaderComponent> = new Map<string, SortHeaderComponent>();

  /** Register a sort header with this parent */
  register(header: SortHeaderComponent): void {
    this.headers.set(header.id(), header);
  }

  /** Deregister a sort header */
  deregister(id: string): void {
    this.headers.delete(id);
  }

  // ─── Public API ───

  /** Programmatically sort by a column */
  sort(id: string): void {
    if (this.sortDisabled()) return;

    const cycle = this.sortCycle();

    if (this.sortActive() !== id) {
      // New column — start at first direction in cycle
      this.sortActive.set(id);
      this.sortDirection.set(cycle[0]);
    } else {
      // Same column — advance cycle
      const currentIndex = cycle.indexOf(this.sortDirection());
      const nextIndex = (currentIndex + 1) % cycle.length;
      const nextDir = cycle[nextIndex];
      this.sortDirection.set(nextDir);

      // If direction is undefined, clear active
      if (nextDir === undefined) {
        this.sortActive.set(undefined);
      }
    }

    this.sortChange.emit({
      active: this.sortActive(),
      direction: this.sortDirection(),
    });
  }

  /** Returns the next direction in the cycle for a given column */
  getNextDirection(id: string): SortDirection {
    const cycle = this.sortCycle();

    if (this.sortActive() !== id) {
      return cycle[0];
    }

    const currentIndex = cycle.indexOf(this.sortDirection());
    const nextIndex = (currentIndex + 1) % cycle.length;
    return cycle[nextIndex];
  }
}
