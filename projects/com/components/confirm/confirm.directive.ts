import {
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  PLATFORM_ID,
  signal,
  ViewContainerRef,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';
import { ConfirmPanelComponent } from './confirm-panel.component';
import { generateConfirmTitleId, generateConfirmDescriptionId } from './confirm.utils';
import type { ConfirmColor, ConfirmTemplateContext, ConfirmPanelConfig } from './confirm.models';

/**
 * Confirmation directive — intercepts clicks and displays a confirmation panel
 * before allowing the action to proceed.
 *
 * The directive acts as an output gate: it captures clicks, shows confirmation UI,
 * and emits `true` (confirmed) or `false` (cancelled) through its output.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`,
 *         `--color-foreground`, `--color-muted-foreground`, `--color-background`,
 *         `--shadow-lg`, `--radius-popover`
 *
 * @example Basic confirmation
 * ```html
 * <button comButton (comConfirm)="onDelete($event)" confirmMessage="Delete this item?">
 *   Delete
 * </button>
 * ```
 *
 * @example Destructive action with warn styling
 * ```html
 * <button comButton color="warn"
 *   (comConfirm)="onPermanentDelete($event)"
 *   confirmTitle="Permanent Deletion"
 *   confirmMessage="This action cannot be undone."
 *   confirmLabel="Delete Forever"
 *   confirmColor="warn">
 *   Delete Permanently
 * </button>
 * ```
 *
 * @example Custom template
 * ```html
 * <button comButton (comConfirm)="onAction($event)" [confirmTpl]="customTpl">
 *   Action
 * </button>
 *
 * <ng-template #customTpl let-message let-confirm="confirm" let-cancel="cancel">
 *   <div class="flex flex-col gap-4">
 *     <p>{{ message }}</p>
 *     <div class="flex justify-end gap-2">
 *       <button comButton variant="ghost" (click)="cancel()">Cancel</button>
 *       <button comButton (click)="confirm()">Confirm</button>
 *     </div>
 *   </div>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[comConfirm]',
  exportAs: 'comConfirm',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'isOpen()',
    '(click)': 'onTriggerClick($event)',
  },
})
export class ComConfirm {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  private overlayRef: OverlayRef | null = null;
  private panelInstance: ConfirmPanelComponent | null = null;
  private readonly titleId = generateConfirmTitleId();
  private readonly descriptionId = generateConfirmDescriptionId();

  /** Whether the confirmation panel is currently open. */
  protected readonly isOpen: WritableSignal<boolean> = signal(false);

  // ─── Content Inputs ───

  /** The confirmation message to display. */
  readonly confirmMessage: InputSignal<string> = input<string>('Are you sure?');

  /** Optional title for the confirmation dialog. */
  readonly confirmTitle: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /** Label for the confirm button. */
  readonly confirmLabel: InputSignal<string> = input<string>('Confirm');

  /** Label for the cancel button. */
  readonly cancelLabel: InputSignal<string> = input<string>('Cancel');

  // ─── Styling Inputs ───

  /** Color variant for the confirm button. */
  readonly confirmColor: InputSignal<ConfirmColor> = input<ConfirmColor>('primary');

  // ─── Behavior Inputs ───

  /** When true, clicks pass through without showing confirmation. */
  readonly confirmDisabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Whether to show a backdrop behind the panel. */
  readonly confirmBackdrop: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Custom template for the panel content. */
  readonly confirmTpl: InputSignal<TemplateRef<ConfirmTemplateContext> | undefined> =
    input<TemplateRef<ConfirmTemplateContext> | undefined>(undefined);

  // ─── Output ───

  /**
   * Emits `true` when confirmed, `false` when cancelled or navigated away.
   * This is the main directive output — acts as an output gate for the action.
   */
  readonly comConfirm: OutputEmitterRef<boolean> = output<boolean>();

  // ─── Computed ───

  private readonly panelConfig: Signal<ConfirmPanelConfig> = computed(() => ({
    message: this.confirmMessage(),
    title: this.confirmTitle(),
    confirmLabel: this.confirmLabel(),
    cancelLabel: this.cancelLabel(),
    confirmColor: this.confirmColor(),
    hasBackdrop: this.confirmBackdrop(),
    customTemplate: this.confirmTpl(),
    titleId: this.titleId,
    descriptionId: this.descriptionId,
  }));

  constructor() {
    // Emit false and cleanup on destroy (navigation away)
    this.destroyRef.onDestroy(() => {
      if (this.isOpen()) {
        this.comConfirm.emit(false);
      }
      this.disposeOverlay();
    });
  }

  // ─── Public API ───

  /** Programmatically open the confirmation dialog. */
  open(): void {
    if (this.isOpen() || this.confirmDisabled()) return;
    this.createOverlay();
    this.attachPanel();
  }

  /** Programmatically close the confirmation dialog (emits false). */
  close(): void {
    if (!this.isOpen()) return;
    this.handleCancel();
  }

  // ─── Event Handlers ───

  protected onTriggerClick(event: Event): void {
    // If disabled, let the click pass through normally
    if (this.confirmDisabled()) return;

    // Intercept the click
    event.preventDefault();
    event.stopPropagation();

    this.open();
  }

  // ─── Overlay Management ───

  private createOverlay(): void {
    if (this.overlayRef) return;
    if (!isPlatformBrowser(this.platformId)) return;

    // Use GlobalPositionStrategy for centered modal
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: false, // We handle backdrop in the panel component
      panelClass: 'com-confirm-overlay',
      disposeOnNavigation: true,
    });
  }

  private attachPanel(): void {
    if (!this.overlayRef || this.overlayRef.hasAttached()) return;

    const portal = new ComponentPortal(ConfirmPanelComponent, this.viewContainerRef, this.injector);
    const componentRef = this.overlayRef.attach(portal);
    this.panelInstance = componentRef.instance;

    // Configure panel
    this.panelInstance.config.set(this.panelConfig());
    this.panelInstance.confirmFn.set(() => this.handleConfirm());
    this.panelInstance.cancelFn.set(() => this.handleCancel());

    // Subscribe to keyboard events (Escape to cancel)
    this.overlayRef
      .keydownEvents()
      .pipe(
        filter((event) => event.key === 'Escape'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        event.preventDefault();
        event.stopPropagation();
        this.handleCancel();
      });

    // Subscribe to detachments (cleanup)
    this.overlayRef
      .detachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.handleDetachment();
      });

    // Show panel after a microtask (allows initial styles to apply)
    requestAnimationFrame(() => {
      if (this.panelInstance) {
        this.panelInstance.visible.set(true);
      }
    });

    this.isOpen.set(true);
  }

  private handleConfirm(): void {
    if (!this.isOpen()) return;

    this.comConfirm.emit(true);
    this.closePanel();
  }

  private handleCancel(): void {
    if (!this.isOpen()) return;

    this.comConfirm.emit(false);
    this.closePanel();
  }

  private closePanel(): void {
    if (!this.panelInstance) return;

    // Trigger hide animation
    this.panelInstance.visible.set(false);

    // Wait for animation to complete before detaching
    setTimeout(() => {
      this.disposeOverlay();
      this.returnFocusToTrigger();
    }, 150); // Match animation duration
  }

  private handleDetachment(): void {
    this.isOpen.set(false);
    this.panelInstance?.destroyFocusTrap();
    this.panelInstance = null;
  }

  private disposeOverlay(): void {
    if (this.overlayRef) {
      this.panelInstance?.destroyFocusTrap();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.panelInstance = null;
    this.isOpen.set(false);
  }

  private returnFocusToTrigger(): void {
    this.elementRef.nativeElement.focus();
  }
}
