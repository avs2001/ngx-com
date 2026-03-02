import {
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  numberAttribute,
  output,
  PLATFORM_ID,
  Renderer2,
  signal,
  ViewContainerRef,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  OutputEmitterRef,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import type { ConnectedPosition, ConnectedOverlayPositionChange, ConnectionPositionPair, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipPanelComponent } from './tooltip-panel.component';
import { generateTooltipId } from './tooltip.utils';
import type {
  TooltipColor,
  TooltipPosition,
  TooltipSize,
  TooltipSide,
  TooltipTemplateContext,
  TooltipTouchGestures,
} from './tooltip.models';

/** Default show delay in milliseconds. */
const DEFAULT_SHOW_DELAY = 200;

/** Default hide delay in milliseconds. */
const DEFAULT_HIDE_DELAY = 100;

/** Offset between trigger and tooltip in pixels. */
const TOOLTIP_OFFSET = 8;

/** Viewport margin in pixels. */
const VIEWPORT_MARGIN = 8;

/**
 * Build position strategy entries for the tooltip.
 * Primary position is the preferred direction, with fallbacks.
 */
function buildTooltipPositions(position: TooltipPosition): ConnectedPosition[] {
  const positions: Record<TooltipPosition, ConnectedPosition[]> = {
    top: [
      // Top center (preferred)
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -TOOLTIP_OFFSET },
      // Bottom center (flip)
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: TOOLTIP_OFFSET },
      // Right center (fallback)
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: TOOLTIP_OFFSET },
      // Left center (fallback)
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -TOOLTIP_OFFSET },
    ],
    bottom: [
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: TOOLTIP_OFFSET },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -TOOLTIP_OFFSET },
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: TOOLTIP_OFFSET },
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -TOOLTIP_OFFSET },
    ],
    left: [
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -TOOLTIP_OFFSET },
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: TOOLTIP_OFFSET },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -TOOLTIP_OFFSET },
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: TOOLTIP_OFFSET },
    ],
    right: [
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: TOOLTIP_OFFSET },
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -TOOLTIP_OFFSET },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -TOOLTIP_OFFSET },
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: TOOLTIP_OFFSET },
    ],
  };

  return positions[position];
}

/**
 * Derive the tooltip side from a position change event.
 */
function deriveSideFromPosition(pair: ConnectionPositionPair): TooltipSide {
  if (pair.originY === 'top' && pair.overlayY === 'bottom') return 'top';
  if (pair.originY === 'bottom' && pair.overlayY === 'top') return 'bottom';
  if (pair.originX === 'start' && pair.overlayX === 'end') return 'left';
  if (pair.originX === 'end' && pair.overlayX === 'start') return 'right';
  return 'top';
}

/**
 * Tooltip directive — displays supplementary information on hover/focus.
 *
 * Applied as an attribute directive to any trigger element. The tooltip panel
 * is rendered via CDK Overlay when triggered by mouse hover, keyboard focus,
 * or programmatically.
 *
 * @tokens `--color-surface-900`, `--color-surface-50`, `--color-primary`, `--color-primary-foreground`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-warn`, `--color-warn-foreground`,
 *         `--color-popover`, `--color-popover-foreground`, `--color-border`
 *
 * @example Simple text tooltip
 * ```html
 * <button comTooltip="Save your changes">
 *   <com-icon name="save" />
 * </button>
 * ```
 *
 * @example Positioned
 * ```html
 * <button comTooltip="Settings" comTooltipPosition="right">
 *   <com-icon name="settings" />
 * </button>
 * ```
 *
 * @example Color variants
 * ```html
 * <com-icon name="alert-triangle" comTooltip="3 warnings found" comTooltipColor="warn" />
 * ```
 *
 * @example Custom template
 * ```html
 * <button
 *   comTooltip="Keyboard shortcuts"
 *   [comTooltipTpl]="shortcutsTpl"
 *   comTooltipSize="lg"
 * >
 *   <com-icon name="keyboard" />
 * </button>
 *
 * <ng-template #shortcutsTpl let-hide="hide">
 *   <div class="flex flex-col gap-1">
 *     <span>Press Ctrl+S to save</span>
 *     <button (click)="hide()">Got it</button>
 *   </div>
 * </ng-template>
 * ```
 *
 * @example Programmatic control
 * ```html
 * <input
 *   #tooltipRef="comTooltip"
 *   comTooltip="Invalid email"
 *   comTooltipColor="warn"
 *   [comTooltipDisabled]="true"
 * />
 * ```
 *
 * ```ts
 * // Show tooltip on validation error
 * if (emailInvalid) {
 *   this.tooltipRef.show();
 * }
 * ```
 */
@Directive({
  selector: '[comTooltip]',
  exportAs: 'comTooltip',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut()',
    '(keydown.escape)': 'onEscapeKey()',
    '(touchstart)': 'onTouchStart($event)',
  },
})
export class ComTooltip {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  private overlayRef: OverlayRef | null = null;
  private panelInstance: TooltipPanelComponent | null = null;
  private showTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private hideTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private touchTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly tooltipId = generateTooltipId();

  /** Current active side (updated from position changes). */
  private readonly activeSide: WritableSignal<TooltipSide> = signal<TooltipSide>('top');

  /** Whether the tooltip is currently visible. */
  private readonly isVisible: WritableSignal<boolean> = signal(false);

  // ─── Content Inputs ───

  /** Simple text content for the tooltip. Also serves as the directive selector. */
  readonly comTooltip: InputSignal<string> = input.required<string>();

  /** Custom template for rich tooltip content. Takes precedence over text when provided. */
  readonly comTooltipTpl: InputSignal<TemplateRef<TooltipTemplateContext> | null> =
    input<TemplateRef<TooltipTemplateContext> | null>(null);

  // ─── Positioning Inputs ───

  /** Preferred position direction. Default: 'top'. */
  readonly comTooltipPosition: InputSignal<TooltipPosition> = input<TooltipPosition>('top');

  // ─── Behavior Inputs ───

  /** Delay in ms before showing the tooltip. Default: 200. */
  readonly comTooltipShowDelay: InputSignalWithTransform<number, unknown> = input(DEFAULT_SHOW_DELAY, {
    transform: numberAttribute,
  });

  /** Delay in ms before hiding the tooltip. Default: 100. */
  readonly comTooltipHideDelay: InputSignalWithTransform<number, unknown> = input(DEFAULT_HIDE_DELAY, {
    transform: numberAttribute,
  });

  /** Disable the tooltip entirely. Default: false. */
  readonly comTooltipDisabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Touch device handling. Default: 'auto'. */
  readonly comTooltipTouchGestures: InputSignal<TooltipTouchGestures> = input<TooltipTouchGestures>('auto');

  // ─── Variant Inputs ───

  /** Color variant. Default: 'default'. */
  readonly comTooltipColor: InputSignal<TooltipColor> = input<TooltipColor>('default');

  /** Size variant. Default: 'md'. */
  readonly comTooltipSize: InputSignal<TooltipSize> = input<TooltipSize>('md');

  /** Whether to show the arrow/caret. Default: true. */
  readonly comTooltipHasArrow: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  });

  // ─── Outputs ───

  /** Emitted when the tooltip becomes visible (after delay + animation). */
  readonly comTooltipShown: OutputEmitterRef<void> = output<void>();

  /** Emitted when the tooltip is fully hidden. */
  readonly comTooltipHidden: OutputEmitterRef<void> = output<void>();

  constructor() {
    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.clearTimers();
      this.disposeOverlay();
    });
  }

  // ─── Public API ───

  /** Programmatically show the tooltip (ignores disabled state for error validation use cases). */
  show(): void {
    if (this.isVisible()) return;
    this.clearTimers();
    this.createOverlay();
    this.attachPanel();
  }

  /** Programmatically hide the tooltip. */
  hide(): void {
    if (!this.isVisible()) return;
    this.clearTimers();
    this.detachPanel();
  }

  // ─── Event Handlers ───

  protected onMouseEnter(): void {
    if (this.comTooltipDisabled()) return;
    this.scheduleShow(this.comTooltipShowDelay());
  }

  protected onMouseLeave(): void {
    this.scheduleHide(this.comTooltipHideDelay());
  }

  protected onFocusIn(): void {
    if (this.comTooltipDisabled()) return;
    // Keyboard users get instant feedback
    this.scheduleShow(0);
  }

  protected onFocusOut(): void {
    this.scheduleHide(this.comTooltipHideDelay());
  }

  protected onEscapeKey(): void {
    if (this.isVisible()) {
      this.hide();
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    const touchMode = this.comTooltipTouchGestures();
    if (touchMode === 'off' || this.comTooltipDisabled()) return;

    // Long-press to show (500ms)
    this.clearTimers();
    this.touchTimeoutId = setTimeout(() => {
      this.show();

      // Set up tap-elsewhere to hide
      const touchEndHandler = (e: Event): void => {
        const touch = (e as TouchEvent).changedTouches?.[0];
        if (touch) {
          const target = document.elementFromPoint(touch.clientX, touch.clientY);
          if (!this.overlayRef?.overlayElement.contains(target)) {
            this.hide();
          }
        }
        document.removeEventListener('touchend', touchEndHandler);
      };
      document.addEventListener('touchend', touchEndHandler);
    }, 500);

    // Cancel long-press if finger moves
    const touchMoveHandler = (): void => {
      this.clearTouchTimeout();
      document.removeEventListener('touchmove', touchMoveHandler);
    };
    document.addEventListener('touchmove', touchMoveHandler);

    // Cancel long-press if finger lifts before timeout
    const touchEndCancelHandler = (): void => {
      this.clearTouchTimeout();
      document.removeEventListener('touchend', touchEndCancelHandler);
    };
    document.addEventListener('touchend', touchEndCancelHandler);
  }

  // ─── Panel Mouse Events ───

  /** Called when mouse enters the tooltip panel. */
  private onPanelMouseEnter(): void {
    // Cancel hide timer when hovering over panel (for interactive templates)
    this.clearHideTimeout();
  }

  /** Called when mouse leaves the tooltip panel. */
  private onPanelMouseLeave(): void {
    this.scheduleHide(this.comTooltipHideDelay());
  }

  // ─── Timer Management ───

  private scheduleShow(delay: number): void {
    this.clearTimers();
    if (delay === 0) {
      this.createOverlay();
      this.attachPanel();
    } else {
      this.showTimeoutId = setTimeout(() => {
        this.createOverlay();
        this.attachPanel();
      }, delay);
    }
  }

  private scheduleHide(delay: number): void {
    this.clearShowTimeout();
    if (!this.isVisible()) return;

    if (delay === 0) {
      this.detachPanel();
    } else {
      this.hideTimeoutId = setTimeout(() => {
        this.detachPanel();
      }, delay);
    }
  }

  private clearTimers(): void {
    this.clearShowTimeout();
    this.clearHideTimeout();
    this.clearTouchTimeout();
  }

  private clearShowTimeout(): void {
    if (this.showTimeoutId !== null) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
  }

  private clearHideTimeout(): void {
    if (this.hideTimeoutId !== null) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }
  }

  private clearTouchTimeout(): void {
    if (this.touchTimeoutId !== null) {
      clearTimeout(this.touchTimeoutId);
      this.touchTimeoutId = null;
    }
  }

  // ─── Overlay Management ───

  private createOverlay(): void {
    if (this.overlayRef) return;
    if (!isPlatformBrowser(this.platformId)) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(buildTooltipPositions(this.comTooltipPosition()))
      .withFlexibleDimensions(false)
      .withPush(true)
      .withViewportMargin(VIEWPORT_MARGIN);

    const scrollStrategy = this.overlay.scrollStrategies.reposition({ autoClose: true });

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      panelClass: 'com-tooltip-overlay',
      hasBackdrop: false,
    });

    // Track position changes for arrow orientation
    (positionStrategy as FlexibleConnectedPositionStrategy).positionChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((change: ConnectedOverlayPositionChange) => {
        const side = deriveSideFromPosition(change.connectionPair);
        this.activeSide.set(side);
        if (this.panelInstance) {
          this.panelInstance.activeSide.set(side);
        }
      });

    // Close when overlay detaches
    this.overlayRef
      .detachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.handleDetachment();
      });
  }

  private attachPanel(): void {
    if (!this.overlayRef || this.overlayRef.hasAttached()) return;

    const portal = new ComponentPortal(TooltipPanelComponent, this.viewContainerRef, this.injector);
    const componentRef = this.overlayRef.attach(portal);
    this.panelInstance = componentRef.instance;

    // Configure panel inputs
    this.panelInstance.textContent.set(this.comTooltip());
    this.panelInstance.templateRef.set(this.comTooltipTpl());
    this.panelInstance.color.set(this.comTooltipColor());
    this.panelInstance.size.set(this.comTooltipSize());
    this.panelInstance.showArrow.set(this.comTooltipHasArrow());
    this.panelInstance.activeSide.set(this.activeSide());
    this.panelInstance.tooltipId.set(this.tooltipId);
    this.panelInstance.hideFn.set(() => this.hide());

    // Set up panel mouse events for interactive templates
    const overlayElement = this.overlayRef.overlayElement;
    this.renderer.listen(overlayElement, 'mouseenter', () => this.onPanelMouseEnter());
    this.renderer.listen(overlayElement, 'mouseleave', () => this.onPanelMouseLeave());

    // Set ARIA on trigger
    this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-describedby', this.tooltipId);

    // Trigger show animation after a microtask (allows initial styles to apply)
    requestAnimationFrame(() => {
      if (this.panelInstance) {
        this.panelInstance.visible.set(true);
      }
    });

    this.isVisible.set(true);
    this.comTooltipShown.emit();
  }

  private detachPanel(): void {
    if (!this.panelInstance) return;

    // Trigger hide animation
    this.panelInstance.visible.set(false);

    // Wait for animation to complete before detaching
    setTimeout(() => {
      this.disposeOverlay();
    }, 80); // Match animation duration
  }

  private handleDetachment(): void {
    // Remove ARIA from trigger
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'aria-describedby');

    this.isVisible.set(false);
    this.panelInstance = null;
    this.comTooltipHidden.emit();
  }

  private disposeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.panelInstance = null;
    this.isVisible.set(false);

    // Remove ARIA from trigger
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'aria-describedby');
  }
}
