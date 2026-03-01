import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import type { PopoverAlignment, PopoverSide } from './popover.variants';
import { popoverArrowVariants } from './popover.variants';
import { mergeClasses } from './popover.utils';

/** Alignment offset classes for arrow positioning. */
const ALIGNMENT_OFFSETS: Record<PopoverSide, Record<PopoverAlignment, string>> = {
  top: { start: 'left-4 -translate-x-0', center: '', end: 'left-auto right-4 translate-x-0' },
  bottom: { start: 'left-4 -translate-x-0', center: '', end: 'left-auto right-4 translate-x-0' },
  left: { start: 'top-4 -translate-y-0', center: '', end: 'top-auto bottom-4 translate-y-0' },
  right: { start: 'top-4 -translate-y-0', center: '', end: 'top-auto bottom-4 translate-y-0' },
};

/**
 * Internal arrow component rendered inside the popover panel.
 * Points toward the trigger element based on the active position.
 *
 * @internal Not exported in public API
 *
 * @tokens `--color-popover`, `--color-border`
 */
@Component({
  selector: 'com-popover-arrow',
  template: `
    <svg
      [class]="arrowClasses()"
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- Border stroke (rendered underneath) -->
      <path
        d="M0 8L8 1L16 8"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        class="text-border"
      />
      <!-- Fill (covers the stroke at the base) -->
      <path d="M1 8L8 1.5L15 8" fill="currentColor" class="text-popover" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pointer-events-none',
  },
})
export class PopoverArrowComponent {
  /** Which side of the popover the arrow is on. */
  readonly side: InputSignal<PopoverSide> = input<PopoverSide>('top');

  /** Alignment along the edge (for offset positioning). */
  readonly alignment: InputSignal<PopoverAlignment> = input<PopoverAlignment>('center');

  /** Computed CSS classes for the arrow. */
  protected readonly arrowClasses: Signal<string> = computed(() =>
    mergeClasses(popoverArrowVariants({ side: this.side() }), ALIGNMENT_OFFSETS[this.side()][this.alignment()]),
  );
}
