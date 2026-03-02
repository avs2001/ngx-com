import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { sortIconVariants } from './sort.variants';
import type { SortDirection } from './sort.variants';

/**
 * Internal animated SVG arrow indicator for sort headers.
 * Not exported — used only inside SortHeaderComponent.
 *
 * @tokens `--color-foreground`, `--color-muted-foreground`
 */
@Component({
  selector: 'com-sort-icon',
  template: `
    <span [class]="iconClasses()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-full"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortIconComponent {
  /** Current sort direction */
  readonly direction: InputSignal<SortDirection> = input<SortDirection>(undefined);

  /** Whether the column is actively sorted */
  readonly isSorted: InputSignal<boolean> = input(false);

  /** Show a muted indicator when not sorted */
  readonly showWhenUnsorted: InputSignal<boolean> = input(false);

  /** Compute the icon state for CVA */
  private readonly iconState: Signal<'asc' | 'desc' | 'unsorted' | 'hidden'> = computed(() => {
    if (this.isSorted()) {
      return this.direction() === 'asc' ? 'asc' : 'desc';
    }
    if (this.showWhenUnsorted()) {
      return 'unsorted';
    }
    return 'hidden';
  });

  /** CVA-generated classes for the icon container */
  readonly iconClasses: Signal<string> = computed(() =>
    sortIconVariants({
      size: 'md',
      state: this.iconState(),
    })
  );
}
