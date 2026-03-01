import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CdkPortalOutlet, type Portal } from '@angular/cdk/portal';
import { PopoverArrowComponent } from './popover-arrow.component';
import type { PopoverAlignment, PopoverSide, PopoverVariant } from './popover.variants';
import { popoverPanelVariants } from './popover.variants';
import { mergeClasses } from './popover.utils';

/**
 * Internal content wrapper component for the popover.
 * Renders the panel styling, arrow, and consumer content.
 *
 * @internal Not exported in public API
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`, `--shadow-lg`, `--radius-popover`, `--radius-overlay`
 */
@Component({
  selector: 'com-popover-content',
  template: `
    <div
      class="relative"
      [attr.data-state]="animationState()"
      [attr.data-side]="activeSide()"
    >
      @if (showArrow()) {
        <com-popover-arrow [side]="activeSide()" [alignment]="activeAlignment()" />
      }
      <div
        [class]="panelClasses()"
        role="dialog"
        [attr.id]="popoverId()"
        [attr.aria-label]="ariaLabel() || null"
      >
        <ng-template [cdkPortalOutlet]="contentPortal()" />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }

    /* Animation styles */
    [data-state='open'] {
      animation: popover-in 150ms ease-out;
    }

    [data-state='closed'] {
      animation: popover-out 100ms ease-in forwards;
    }

    /* Transform origin based on side */
    [data-side='top'] {
      transform-origin: bottom center;
    }

    [data-side='bottom'] {
      transform-origin: top center;
    }

    [data-side='left'] {
      transform-origin: right center;
    }

    [data-side='right'] {
      transform-origin: left center;
    }

    @keyframes popover-in {
      from {
        opacity: 0;
        transform: scale(0.96) translateY(4px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes popover-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-state='open'],
      [data-state='closed'] {
        animation: none;
      }
    }
  `,
  imports: [CdkPortalOutlet, PopoverArrowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent {
  /** The portal containing consumer content to render. */
  readonly contentPortal: WritableSignal<Portal<unknown> | null> = signal<Portal<unknown> | null>(null);

  /** Size/padding variant for the panel. */
  readonly variant: WritableSignal<PopoverVariant> = signal<PopoverVariant>('default');

  /** Whether to render the arrow. */
  readonly showArrow: WritableSignal<boolean> = signal(true);

  /** Which side the popover is on relative to the trigger. */
  readonly activeSide: WritableSignal<PopoverSide> = signal<PopoverSide>('top');

  /** Alignment along the cross-axis. */
  readonly activeAlignment: WritableSignal<PopoverAlignment> = signal<PopoverAlignment>('center');

  /** Unique ID for accessibility. */
  readonly popoverId: WritableSignal<string> = signal('');

  /** Optional accessibility label. */
  readonly ariaLabel: WritableSignal<string | undefined> = signal<string | undefined>(undefined);

  /** Animation state for enter/leave. */
  readonly animationState: WritableSignal<'open' | 'closed'> = signal<'open' | 'closed'>('open');

  /** Additional CSS classes for the panel. */
  readonly panelClass: WritableSignal<string> = signal('');

  /** Computed CSS classes for the panel. */
  protected readonly panelClasses: Signal<string> = computed(() =>
    mergeClasses(popoverPanelVariants({ variant: this.variant() }), this.panelClass()),
  );
}
