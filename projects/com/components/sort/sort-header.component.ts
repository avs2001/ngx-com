import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  OnInit,
  Signal,
} from '@angular/core';
import { SortDirective } from './sort.directive';
import { SortIconComponent } from './sort-icon.component';
import { sortHeaderVariants } from './sort.variants';
import type { SortDirection } from './sort.variants';

/**
 * Sortable header component — child of [uiSort] directive.
 *
 * Apply to table headers, div columns, or any clickable element that should trigger sorting.
 *
 * @tokens `--color-foreground`, `--color-muted-foreground`, `--color-disabled-foreground`
 *
 * @example Basic usage
 * ```html
 * <tr comSort (sortChange)="onSort($event)">
 *   <th comSortHeader="name">Name</th>
 *   <th comSortHeader="age">Age</th>
 * </tr>
 * ```
 *
 * @example Arrow placement
 * ```html
 * <th comSortHeader="name" comSortHeaderArrowPosition="before">Name</th>
 * ```
 */
@Component({
  selector: '[comSortHeader]',
  template: `
    @if (sortHeaderArrowPosition() === 'before') {
      <com-sort-icon
        [direction]="direction()"
        [isSorted]="isSorted()"
        [showWhenUnsorted]="showUnsortedIndicator()"
      />
    }

    <ng-content />

    @if (sortHeaderArrowPosition() === 'after') {
      <com-sort-icon
        [direction]="direction()"
        [isSorted]="isSorted()"
        [showWhenUnsorted]="showUnsortedIndicator()"
      />
    }
  `,
  imports: [SortIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-sort]': 'ariaSort()',
    '[attr.role]': '"columnheader"',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': '$event.preventDefault(); onClick()',
  },
})
export class SortHeaderComponent implements OnInit {
  private readonly sort = inject(SortDirective, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  // ─── Inputs ───

  /** The column id — aliased from the selector */
  readonly id: InputSignal<string> = input.required<string>({ alias: 'comSortHeader' });

  /** Disable sorting for this specific header */
  readonly sortHeaderDisabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Override parent's sortShowIndicator for this header */
  readonly sortHeaderShowIndicator: InputSignal<boolean | undefined> = input<boolean | undefined>(
    undefined
  );

  /** Arrow placement relative to content */
  readonly sortHeaderArrowPosition: InputSignal<'before' | 'after'> = input<'before' | 'after'>(
    'after',
    { alias: 'comSortHeaderArrowPosition' }
  );

  // ─── Computed State (from parent signals) ───

  /** Whether this header is the currently active sort column */
  readonly isActive: Signal<boolean> = computed(() => this.sort?.sortActive() === this.id());

  /** Current direction if active, undefined otherwise */
  readonly direction: Signal<SortDirection> = computed(() =>
    this.isActive() ? this.sort?.sortDirection() : undefined
  );

  /** Whether this header is sorted (active + has direction) */
  readonly isSorted: Signal<boolean> = computed(
    () => this.isActive() && this.sort?.sortDirection() !== undefined
  );

  /** Whether to show the muted indicator when unsorted */
  readonly showUnsortedIndicator: Signal<boolean> = computed(
    () => this.sortHeaderShowIndicator() ?? this.sort?.sortShowIndicator() ?? false
  );

  /** Whether sorting is disabled for this header */
  readonly isDisabled: Signal<boolean> = computed(
    () => this.sortHeaderDisabled() || this.sort?.sortDisabled() || false
  );

  /** aria-sort attribute value */
  readonly ariaSort: Signal<'ascending' | 'descending' | 'none'> = computed(() => {
    if (!this.isSorted()) return 'none';
    return this.direction() === 'asc' ? 'ascending' : 'descending';
  });

  /** CVA-generated host classes */
  readonly hostClasses: Signal<string> = computed(() =>
    sortHeaderVariants({
      sortable: !this.isDisabled(),
      active: this.isSorted(),
      disabled: this.isDisabled(),
    })
  );

  constructor() {
    if (!this.sort) {
      throw new Error('comSortHeader must be placed inside a [comSort] container.');
    }

    this.destroyRef.onDestroy(() => {
      this.sort?.deregister(this.id());
    });
  }

  ngOnInit(): void {
    this.sort!.register(this);
  }

  // ─── Event Handlers ───

  protected onClick(): void {
    if (this.isDisabled()) return;
    this.sort!.sort(this.id());
  }
}
