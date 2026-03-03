import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { AfterViewInit, Signal, WritableSignal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { ComButton } from 'ngx-com/components/button';
import {
  confirmPanelVariants,
  confirmBackdropVariants,
  confirmTitleVariants,
  confirmMessageVariants,
  confirmFooterVariants,
} from './confirm.variants';
import type { ConfirmTemplateContext, ConfirmPanelConfig } from './confirm.models';
import { mergeClasses } from './confirm.utils';

/**
 * Internal confirmation panel component rendered inside the CDK overlay.
 * Receives configuration from the directive and manages the dialog UI.
 *
 * @internal Not exported in public API
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`,
 *         `--color-foreground`, `--color-muted-foreground`, `--shadow-lg`, `--radius-popover`
 */
@Component({
  selector: 'com-confirm-panel',
  template: `
    @if (config()?.hasBackdrop) {
      <div
        [class]="backdropClasses()"
        [attr.data-state]="visible() ? 'open' : 'closed'"
        aria-hidden="true"
      ></div>
    }
    <div
      #panelElement
      [class]="panelClasses()"
      role="alertdialog"
      aria-modal="true"
      [attr.aria-labelledby]="config()?.title ? config()?.titleId : null"
      [attr.aria-describedby]="config()?.descriptionId"
      [attr.data-state]="visible() ? 'open' : 'closed'"
      tabindex="-1"
    >
      @if (config()?.customTemplate) {
        <ng-container
          [ngTemplateOutlet]="config()!.customTemplate!"
          [ngTemplateOutletContext]="templateContext()"
        />
      } @else {
        <div class="flex flex-col space-y-2">
          @if (config()?.title) {
            <h2 [id]="config()?.titleId" [class]="titleClasses()">
              {{ config()?.title }}
            </h2>
          }
          <p [id]="config()?.descriptionId" [class]="messageClasses()">
            {{ config()?.message }}
          </p>
        </div>
        <div [class]="footerClasses()">
          <button
            #cancelButton
            comButton
            variant="outline"
            (click)="onCancel()"
            type="button"
          >
            {{ config()?.cancelLabel }}
          </button>
          <button
            comButton
            [color]="config()?.confirmColor ?? 'primary'"
            (click)="onConfirm()"
            type="button"
          >
            {{ config()?.confirmLabel }}
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }

    /* Animation styles using Tailwind animate utilities */
    [data-state='open'] {
      --tw-enter-opacity: 0;
      --tw-enter-scale: 0.95;
    }

    [data-state='closed'] {
      --tw-exit-opacity: 0;
      --tw-exit-scale: 0.95;
    }

    @media (prefers-reduced-motion: reduce) {
      [data-state='open'],
      [data-state='closed'] {
        animation: none;
      }
    }
  `,
  imports: [NgTemplateOutlet, ComButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPanelComponent implements AfterViewInit {
  private readonly focusTrapFactory = inject(FocusTrapFactory);
  private focusTrap: FocusTrap | null = null;

  /** Reference to the panel element for focus trap. */
  private readonly panelElement = viewChild<ElementRef<HTMLElement>>('panelElement');

  /** Reference to the cancel button for initial focus. */
  private readonly cancelButton = viewChild<ElementRef<HTMLButtonElement>>('cancelButton');

  /** Panel configuration passed from the directive. */
  readonly config: WritableSignal<ConfirmPanelConfig | null> = signal(null);

  /** Whether the panel is visible (for animation state). */
  readonly visible: WritableSignal<boolean> = signal(false);

  /** Internal loading state for async operations. */
  readonly loading: WritableSignal<boolean> = signal(false);

  /** Function to confirm the action, set by directive. */
  readonly confirmFn: WritableSignal<() => void> = signal(() => {});

  /** Function to cancel the action, set by directive. */
  readonly cancelFn: WritableSignal<() => void> = signal(() => {});

  /** Computed template context for custom templates. */
  protected readonly templateContext: Signal<ConfirmTemplateContext> = computed(() => ({
    $implicit: this.config()?.message ?? '',
    title: this.config()?.title,
    confirm: () => this.onConfirm(),
    cancel: () => this.onCancel(),
    loading: this.loading(),
    setLoading: (value: boolean) => this.loading.set(value),
  }));

  /** Computed backdrop CSS classes. */
  protected readonly backdropClasses: Signal<string> = computed(() =>
    mergeClasses(confirmBackdropVariants({ visible: this.visible() })),
  );

  /** Computed panel CSS classes. */
  protected readonly panelClasses: Signal<string> = computed(() =>
    mergeClasses(confirmPanelVariants({ visible: this.visible() })),
  );

  /** Computed title CSS classes. */
  protected readonly titleClasses: Signal<string> = computed(() =>
    mergeClasses(confirmTitleVariants()),
  );

  /** Computed message CSS classes. */
  protected readonly messageClasses: Signal<string> = computed(() =>
    mergeClasses(confirmMessageVariants()),
  );

  /** Computed footer CSS classes. */
  protected readonly footerClasses: Signal<string> = computed(() =>
    mergeClasses(confirmFooterVariants()),
  );

  ngAfterViewInit(): void {
    this.setupFocusTrap();
    this.focusCancelButton();
  }

  /** Handle confirm button click. */
  protected onConfirm(): void {
    this.confirmFn()();
  }

  /** Handle cancel button click. */
  protected onCancel(): void {
    this.cancelFn()();
  }

  /** Clean up focus trap on destroy. */
  destroyFocusTrap(): void {
    this.focusTrap?.destroy();
    this.focusTrap = null;
  }

  private setupFocusTrap(): void {
    const panelEl = this.panelElement()?.nativeElement;
    if (panelEl) {
      this.focusTrap = this.focusTrapFactory.create(panelEl);
      this.focusTrap.focusInitialElementWhenReady();
    }
  }

  private focusCancelButton(): void {
    // Focus cancel button as safer default (prevents accidental confirmation)
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      const cancelBtn = this.cancelButton()?.nativeElement;
      if (cancelBtn) {
        cancelBtn.focus();
      }
    }, 0);
  }
}
