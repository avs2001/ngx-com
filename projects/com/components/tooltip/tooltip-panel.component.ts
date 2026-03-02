import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { Signal, TemplateRef, WritableSignal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { tooltipPanelVariants, tooltipArrowVariants } from './tooltip.variants';
import type { TooltipColor, TooltipSize, TooltipSide, TooltipTemplateContext } from './tooltip.models';
import { mergeClasses } from './tooltip.utils';

/**
 * Internal tooltip panel component rendered inside the CDK overlay.
 * Receives content (string or template) and variant inputs from the directive.
 *
 * @internal Not exported in public API
 *
 * @tokens `--color-tooltip`, `--color-tooltip-foreground`, `--color-primary`, `--color-primary-foreground`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-warn`, `--color-warn-foreground`,
 *         `--color-popover`, `--color-popover-foreground`, `--color-border`
 */
@Component({
  selector: 'com-tooltip-panel',
  template: `
    <div
      class="relative"
      [attr.data-state]="visible() ? 'visible' : 'hidden'"
      [attr.data-side]="activeSide()"
    >
      @if (showArrow()) {
        <span [class]="arrowClasses()" aria-hidden="true"></span>
      }
      <div
        [class]="panelClasses()"
        role="tooltip"
        [attr.id]="tooltipId()"
      >
        @if (templateRef()) {
          <ng-container
            [ngTemplateOutlet]="templateRef()!"
            [ngTemplateOutletContext]="templateContext()"
          />
        } @else {
          {{ textContent() }}
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }

    /* Animation styles */
    [data-state='visible'] {
      animation: tooltip-in 120ms ease-out;
    }

    [data-state='hidden'] {
      animation: tooltip-out 80ms ease-in forwards;
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

    @keyframes tooltip-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes tooltip-out {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-state='visible'],
      [data-state='hidden'] {
        animation: none;
      }
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPanelComponent {
  /** Plain text content to display. */
  readonly textContent: WritableSignal<string> = signal('');

  /** Optional template for rich content. */
  readonly templateRef: WritableSignal<TemplateRef<TooltipTemplateContext> | null> = signal(null);

  /** Color variant. */
  readonly color: WritableSignal<TooltipColor> = signal<TooltipColor>('default');

  /** Size variant. */
  readonly size: WritableSignal<TooltipSize> = signal<TooltipSize>('md');

  /** Whether to show the arrow. */
  readonly showArrow: WritableSignal<boolean> = signal(true);

  /** Which side the tooltip is positioned on. */
  readonly activeSide: WritableSignal<TooltipSide> = signal<TooltipSide>('top');

  /** Unique ID for accessibility. */
  readonly tooltipId: WritableSignal<string> = signal('');

  /** Whether the tooltip is visible (for animation state). */
  readonly visible: WritableSignal<boolean> = signal(false);

  /** Function to hide the tooltip (passed to template context). */
  readonly hideFn: WritableSignal<() => void> = signal(() => {});

  /** Computed template context. */
  protected readonly templateContext: Signal<TooltipTemplateContext> = computed(() => ({
    $implicit: this.textContent(),
    hide: this.hideFn(),
  }));

  /** Computed panel CSS classes. */
  protected readonly panelClasses: Signal<string> = computed(() =>
    mergeClasses(
      tooltipPanelVariants({
        color: this.color(),
        size: this.size(),
      }),
    ),
  );

  /** Computed arrow CSS classes. */
  protected readonly arrowClasses: Signal<string> = computed(() =>
    mergeClasses(
      tooltipArrowVariants({
        color: this.color(),
        side: this.activeSide(),
      }),
    ),
  );
}
