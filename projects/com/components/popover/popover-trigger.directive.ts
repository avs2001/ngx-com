import {
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  output,
  signal,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import type { ConnectedOverlayPositionChange, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { filter } from 'rxjs/operators';
import { PopoverContentComponent } from './popover-content.component';
import { POPOVER_DATA, POPOVER_REF } from './popover-tokens';
import { buildPopoverPositions, deriveAlignmentFromPosition, deriveSideFromPosition } from './popover-positions';
import { generatePopoverId, mergeClasses } from './popover.utils';
import type {
  PopoverAlignment,
  PopoverBackdrop,
  PopoverPosition,
  PopoverSide,
  PopoverTriggerOn,
  PopoverVariant,
} from './popover.variants';

/**
 * Popover trigger directive — manages the popover overlay lifecycle.
 * Applied to the trigger element, it handles opening, closing, positioning,
 * and accessibility for floating popover content.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`, `--shadow-lg`, `--color-ring`
 *
 * @example Basic usage with template
 * ```html
 * <button uiButton [uiPopoverTrigger]="helpContent">Help</button>
 * <ng-template #helpContent>
 *   <p>This is help content.</p>
 * </ng-template>
 * ```
 *
 * @example With positioning
 * ```html
 * <button
 *   uiButton
 *   [uiPopoverTrigger]="menuContent"
 *   popoverPosition="below"
 *   popoverAlignment="start"
 *   [popoverShowArrow]="false"
 * >
 *   Menu
 * </button>
 * ```
 *
 * @example With component content
 * ```html
 * <button
 *   uiButton
 *   [uiPopoverTrigger]="UserProfilePopover"
 *   [popoverData]="{ userId: user.id }"
 * >
 *   Profile
 * </button>
 * ```
 *
 * @example Manual control
 * ```html
 * <button
 *   uiButton
 *   [uiPopoverTrigger]="content"
 *   popoverTriggerOn="manual"
 *   [(popoverOpen)]="isOpen"
 * >
 *   Controlled
 * </button>
 * ```
 */
@Directive({
  selector: '[uiPopoverTrigger]',
  exportAs: 'uiPopoverTrigger',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'popoverOpen()',
    '[attr.aria-controls]': 'ariaControls()',
    '(click)': 'onTriggerClick($event)',
    '(focus)': 'onTriggerFocus()',
    '(blur)': 'onTriggerBlur()',
    '(keydown.escape)': 'onEscapeKey($event)',
  },
})
export class PopoverTriggerDirective {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly focusTrapFactory = inject(FocusTrapFactory);
  private readonly document = inject(DOCUMENT);

  private overlayRef: OverlayRef | null = null;
  private focusTrap: FocusTrap | null = null;
  private scrollCleanup: (() => void) | null = null;
  private readonly popoverId: string = generatePopoverId();

  // ─── Inputs ───

  /** Content to render: TemplateRef or Component class. */
  readonly uiPopoverTrigger: InputSignal<TemplateRef<unknown> | Type<unknown>> = input.required();

  /** Preferred position direction. */
  readonly popoverPosition: InputSignal<PopoverPosition> = input<PopoverPosition>('auto');

  /** Alignment along the cross-axis. */
  readonly popoverAlignment: InputSignal<PopoverAlignment> = input<PopoverAlignment>('center');

  /** What interaction opens the popover. */
  readonly popoverTriggerOn: InputSignal<PopoverTriggerOn> = input<PopoverTriggerOn>('click');

  /** Gap in px between trigger and popover edge. */
  readonly popoverOffset: InputSignal<number> = input(8);

  /** Whether to render the connecting arrow. */
  readonly popoverShowArrow: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  });

  /** Size/padding preset for the content panel. */
  readonly popoverVariant: InputSignal<PopoverVariant> = input<PopoverVariant>('default');

  /** Backdrop behavior. */
  readonly popoverBackdrop: InputSignal<PopoverBackdrop> = input<PopoverBackdrop>('transparent');

  /** Close when clicking outside the popover. */
  readonly popoverCloseOnOutside: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  });

  /** Close on Escape key. */
  readonly popoverCloseOnEscape: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  });

  /** Close when ancestor scrollable container scrolls. */
  readonly popoverCloseOnScroll: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Prevents opening when true. */
  readonly popoverDisabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Two-way bindable open state. */
  readonly popoverOpen: ModelSignal<boolean> = model(false);

  /** Arbitrary data passed to the content component/template. */
  readonly popoverData: InputSignal<unknown> = input<unknown>(undefined);

  /** Custom CSS class(es) on the overlay panel. */
  readonly popoverPanelClass: InputSignal<string | string[]> = input<string | string[]>('');

  /** Trap focus inside popover. */
  readonly popoverTrapFocus: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Optional accessibility label for the popover dialog. */
  readonly popoverAriaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined);

  // ─── Outputs ───

  /** Emitted after popup opens and is visible. */
  readonly popoverOpened: OutputEmitterRef<void> = output<void>();

  /** Emitted after popup closes and is detached. */
  readonly popoverClosed: OutputEmitterRef<void> = output<void>();

  // ─── Internal State ───

  private readonly activeSide: WritableSignal<PopoverSide> = signal<PopoverSide>('top');
  private readonly activeAlignment: WritableSignal<PopoverAlignment> = signal<PopoverAlignment>('center');
  private readonly animationState: WritableSignal<'open' | 'closed'> = signal<'open' | 'closed'>('open');
  private contentComponentRef: PopoverContentComponent | null = null;

  // ─── Computed ───

  private readonly hasBackdrop: Signal<boolean> = computed(() => this.popoverBackdrop() !== 'none');

  private readonly backdropClass: Signal<string> = computed(() =>
    this.popoverBackdrop() === 'dimmed' ? 'cdk-overlay-dark-backdrop' : 'cdk-overlay-transparent-backdrop',
  );

  protected readonly ariaControls: Signal<string | null> = computed(() =>
    this.popoverOpen() ? this.popoverId : null,
  );

  private readonly panelClassArray: Signal<string[]> = computed(() => {
    const panelClass = this.popoverPanelClass();
    if (Array.isArray(panelClass)) return panelClass;
    return panelClass ? [panelClass] : [];
  });

  constructor() {
    // React to external open state changes
    effect(() => {
      const isOpen = this.popoverOpen();
      if (isOpen && !this.overlayRef?.hasAttached()) {
        this.openPopover();
      } else if (!isOpen && this.overlayRef?.hasAttached()) {
        this.closePopover();
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.disposeOverlay();
    });
  }

  // ─── Public API ───

  /** Programmatically open the popover. */
  open(): void {
    if (!this.popoverDisabled() && !this.overlayRef?.hasAttached()) {
      this.popoverOpen.set(true);
    }
  }

  /** Programmatically close the popover. */
  close(): void {
    if (this.overlayRef?.hasAttached()) {
      this.popoverOpen.set(false);
    }
  }

  /** Toggle the popover open/close state. */
  toggle(): void {
    this.popoverOpen() ? this.close() : this.open();
  }

  /** Force recalculation of position. */
  reposition(): void {
    if (this.overlayRef) {
      this.overlayRef.updatePosition();
    }
  }

  // ─── Event Handlers ───

  protected onTriggerClick(event: MouseEvent): void {
    if (this.popoverTriggerOn() === 'click') {
      event.preventDefault();
      this.toggle();
    }
  }

  protected onTriggerFocus(): void {
    if (this.popoverTriggerOn() === 'focus') {
      this.open();
    }
  }

  protected onTriggerBlur(): void {
    if (this.popoverTriggerOn() === 'focus') {
      // Delay to allow focus to move to popover content
      setTimeout(() => {
        if (!this.overlayRef?.overlayElement.contains(this.document.activeElement)) {
          this.close();
        }
      }, 0);
    }
  }

  protected onEscapeKey(event: Event): void {
    if (this.popoverCloseOnEscape() && this.popoverOpen()) {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      this.elementRef.nativeElement.focus();
    }
  }

  // ─── Private Methods ───

  private openPopover(): void {
    if (this.popoverDisabled()) return;

    this.createOverlay();
    this.attachContent();
    this.subscribeToCloseEvents();
    this.subscribeToScrollEvents();
    this.setupFocusTrap();

    this.animationState.set('open');
    this.popoverOpened.emit();
  }

  private closePopover(): void {
    this.animationState.set('closed');
    this.unsubscribeFromScrollEvents();

    // Wait for animation to complete before detaching
    setTimeout(() => {
      this.detachContent();
      this.destroyFocusTrap();
      this.popoverClosed.emit();
    }, 100); // Match animation duration
  }

  private subscribeToScrollEvents(): void {
    if (this.popoverCloseOnScroll()) return;

    const scrollHandler = (): void => this.overlayRef?.updatePosition();
    this.document.addEventListener('scroll', scrollHandler, true);
    this.scrollCleanup = () => this.document.removeEventListener('scroll', scrollHandler, true);
  }

  private unsubscribeFromScrollEvents(): void {
    this.scrollCleanup?.();
    this.scrollCleanup = null;
  }

  private createOverlay(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(buildPopoverPositions(this.popoverPosition(), this.popoverAlignment(), this.popoverOffset()))
      .withFlexibleDimensions(false)
      .withPush(true)
      .withViewportMargin(8);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.popoverCloseOnScroll()
        ? this.overlay.scrollStrategies.close()
        : this.overlay.scrollStrategies.reposition(),
      hasBackdrop: this.hasBackdrop(),
      backdropClass: this.backdropClass(),
      panelClass: ['ui-popover-panel', ...this.panelClassArray()],
    });

    // Track position changes for arrow placement
    (positionStrategy as FlexibleConnectedPositionStrategy).positionChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((change: ConnectedOverlayPositionChange) => {
        this.activeSide.set(deriveSideFromPosition(change.connectionPair));
        this.activeAlignment.set(deriveAlignmentFromPosition(change.connectionPair));
        this.updateContentComponentInputs();
      });
  }

  private attachContent(): void {
    if (!this.overlayRef) return;

    const content = this.uiPopoverTrigger();

    // Create the content wrapper component
    const contentInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: POPOVER_DATA, useValue: this.popoverData() },
        { provide: POPOVER_REF, useValue: this },
      ],
    });

    const contentPortal = new ComponentPortal(PopoverContentComponent, this.viewContainerRef, contentInjector);
    const contentRef = this.overlayRef.attach(contentPortal);
    this.contentComponentRef = contentRef.instance;

    // Create the inner content portal (template or component)
    let innerPortal: TemplatePortal<unknown> | ComponentPortal<unknown>;

    if (content instanceof TemplateRef) {
      innerPortal = new TemplatePortal(content, this.viewContainerRef, {
        $implicit: this.popoverData(),
        close: () => this.close(),
      });
    } else {
      const componentInjector = Injector.create({
        parent: this.injector,
        providers: [
          { provide: POPOVER_DATA, useValue: this.popoverData() },
          { provide: POPOVER_REF, useValue: this },
        ],
      });
      innerPortal = new ComponentPortal(content, this.viewContainerRef, componentInjector);
    }

    // Set content component inputs
    this.updateContentComponentInputs(innerPortal);
  }

  private updateContentComponentInputs(innerPortal?: TemplatePortal<unknown> | ComponentPortal<unknown>): void {
    const ref = this.contentComponentRef;
    if (!ref) return;

    if (innerPortal) {
      ref.contentPortal.set(innerPortal);
    }
    ref.variant.set(this.popoverVariant());
    ref.showArrow.set(this.popoverShowArrow());
    ref.activeSide.set(this.activeSide());
    ref.activeAlignment.set(this.activeAlignment());
    ref.popoverId.set(this.popoverId);
    ref.ariaLabel.set(this.popoverAriaLabel());
    ref.animationState.set(this.animationState());
    ref.panelClass.set(mergeClasses(...this.panelClassArray()));
  }

  private detachContent(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
    this.contentComponentRef = null;
  }

  private subscribeToCloseEvents(): void {
    if (!this.overlayRef) return;

    // Close on backdrop click
    if (this.popoverCloseOnOutside()) {
      this.overlayRef
        .backdropClick()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.close());
    }

    // Close on escape key (handled by overlay)
    if (this.popoverCloseOnEscape()) {
      this.overlayRef
        .keydownEvents()
        .pipe(
          filter((event) => event.key === 'Escape'),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((event) => {
          event.preventDefault();
          this.close();
          this.elementRef.nativeElement.focus();
        });
    }

    // Handle detachment
    this.overlayRef
      .detachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.popoverOpen.set(false);
      });
  }

  private setupFocusTrap(): void {
    if (this.popoverTrapFocus() && this.overlayRef) {
      this.focusTrap = this.focusTrapFactory.create(this.overlayRef.overlayElement);
      this.focusTrap.focusInitialElementWhenReady();
    }
  }

  private destroyFocusTrap(): void {
    if (this.focusTrap) {
      this.focusTrap.destroy();
      this.focusTrap = null;
    }
  }

  private disposeOverlay(): void {
    this.destroyFocusTrap();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.contentComponentRef = null;
  }
}
