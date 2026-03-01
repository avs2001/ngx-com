import {
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, ModelSignal, OutputEmitterRef, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter } from 'rxjs/operators';
import { buildPopoverPositions } from 'ngx-com/components/popover';
import { MENU_REF, ROOT_MENU_TRIGGER, type MenuRef, type RootMenuTrigger } from './menu-tokens';
import { generateMenuId } from './menu.utils';
import type { MenuAlignment, MenuPosition } from './menu.variants';

/** Side for submenu positioning. */
export type MenuSide = 'left' | 'right';

/**
 * Unified menu trigger directive — opens a menu in a CDK overlay.
 *
 * **Root context** (outside a menu): Opens on click, has backdrop.
 * **Submenu context** (inside a menu): Opens on hover/ArrowRight, no backdrop.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`, `--shadow-lg`
 *
 * @example Root trigger
 * ```html
 * <button comButton [comMenuTrigger]="menu">Options</button>
 * <ng-template #menu>
 *   <com-menu>
 *     <button comMenuItem>Edit</button>
 *     <button comMenuItem>Delete</button>
 *   </com-menu>
 * </ng-template>
 * ```
 *
 * @example Submenu trigger (inside a menu, combined with comMenuItem)
 * ```html
 * <button comMenuItem [comMenuTrigger]="shareMenu" side="right" align="start">
 *   Share
 *   <com-menu-sub-indicator />
 * </button>
 * ```
 */
@Directive({
  selector: '[comMenuTrigger]',
  exportAs: 'comMenuTrigger',
  host: {
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'menuOpen()',
    '[attr.aria-controls]': 'ariaControls()',
    '(click)': 'onClick($event)',
    '(keydown.arrowdown)': 'onArrowDown($event)',
    '(keydown.arrowup)': 'onArrowUp($event)',
    '(keydown.arrowright)': 'onArrowRight($event)',
    '(keydown.arrowleft)': 'onArrowLeft($event)',
    '(keydown.enter)': 'onEnter($event)',
    '(keydown.space)': 'onSpace($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class MenuTriggerDirective implements RootMenuTrigger {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly renderer = inject(Renderer2);

  // Context detection - if MENU_REF exists, we're inside a menu (submenu trigger)
  private readonly parentMenu = inject(MENU_REF, { optional: true });
  private readonly parentRootTrigger = inject(ROOT_MENU_TRIGGER, { optional: true });

  private overlayRef: OverlayRef | null = null;
  private attachedMenu: MenuRef | null = null;
  private readonly menuId: string = generateMenuId();

  // Submenu hover timers
  private openDelayTimer: ReturnType<typeof setTimeout> | null = null;
  private closeDelayTimer: ReturnType<typeof setTimeout> | null = null;
  private mouseInSubmenu = false;

  // Listener cleanup functions
  private submenuMouseEnterCleanup: (() => void) | null = null;
  private submenuMouseLeaveCleanup: (() => void) | null = null;

  // ─── Context ───

  /** Whether this trigger is inside a menu (submenu context). */
  readonly isSubmenu: Signal<boolean> = computed(() => !!this.parentMenu);

  // ─── Inputs ───

  /** Template containing `<com-menu>` with items. */
  readonly comMenuTrigger: InputSignal<TemplateRef<unknown>> = input.required<TemplateRef<unknown>>();

  /** Preferred position direction (root trigger only). */
  readonly menuPosition: InputSignal<MenuPosition> = input<MenuPosition>('below');

  /** Alignment along cross-axis (root trigger only). */
  readonly menuAlignment: InputSignal<MenuAlignment> = input<MenuAlignment>('start');

  /** Gap in px between trigger and menu. */
  readonly menuOffset: InputSignal<number> = input<number>(4);

  /** Prevents opening when true. */
  readonly menuDisabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  /** Two-way bindable open state. */
  readonly menuOpen: ModelSignal<boolean> = model<boolean>(false);

  /** Custom CSS class(es) on the overlay panel. */
  readonly menuPanelClass: InputSignal<string | string[]> = input<string | string[]>('');

  /** Close menu when an item is selected. */
  readonly menuCloseOnSelect: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute });

  /** Side for submenu positioning (submenu context only). */
  readonly side: InputSignal<MenuSide> = input<MenuSide>('right');

  /** Alignment for submenu positioning (submenu context only). */
  readonly align: InputSignal<MenuAlignment> = input<MenuAlignment>('start');

  /** Hover delay before submenu opens in ms (submenu context only). */
  readonly subMenuOpenDelay: InputSignal<number> = input<number>(200);

  /** Hover delay before submenu closes in ms (submenu context only). */
  readonly subMenuCloseDelay: InputSignal<number> = input<number>(150);

  // ─── Outputs ───

  /** Emitted after menu opens. */
  readonly menuOpened: OutputEmitterRef<void> = output<void>();

  /** Emitted after menu closes. */
  readonly menuClosed: OutputEmitterRef<void> = output<void>();

  // ─── Computed ───

  protected readonly ariaControls: Signal<string | null> = computed(() =>
    this.menuOpen() ? this.menuId : null,
  );

  private readonly panelClassArray: Signal<string[]> = computed(() => {
    const panelClass = this.menuPanelClass();
    if (Array.isArray(panelClass)) return panelClass;
    return panelClass ? [panelClass] : [];
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.disposeOverlay());
  }

  // ─── Public API ───

  /** Programmatically open the menu. */
  open(): void {
    if (!this.menuDisabled() && !this.overlayRef?.hasAttached()) {
      this.openMenu();
      this.menuOpen.set(true);
    }
  }

  /** Programmatically close the menu. */
  close(): void {
    if (this.isSubmenu()) {
      // For submenu, close this level
      this.closeSubmenu();
    } else {
      // For root, close entire menu tree
      this.closeMenu();
    }
    this.menuOpen.set(false);
  }

  /** Toggle the menu open/close state. */
  toggle(): void {
    if (this.menuOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Called by MenuComponent to register itself when attached. */
  registerMenu(menu: MenuRef): void {
    this.attachedMenu = menu;
  }

  // ─── Event Handlers ───

  protected onClick(event: Event): void {
    if (this.menuDisabled()) return;

    if (!this.isSubmenu()) {
      this.toggle();
      return;
    }

    // Submenu: prevent comMenuItem's click handler and open submenu
    event.preventDefault();
    event.stopPropagation();
    this.cancelOpenTimer();
    this.openSubmenuInternal();
    this.focusFirstItemDeferred();
  }

  protected onArrowDown(event: Event): void {
    if (this.isSubmenu() || this.menuOpen()) return;

    event.preventDefault();
    this.open();
    this.focusFirstItemDeferred();
  }

  protected onArrowUp(event: Event): void {
    if (this.isSubmenu() || this.menuOpen()) return;

    event.preventDefault();
    this.open();
    this.focusLastItemDeferred();
  }

  protected onArrowRight(event: Event): void {
    if (!this.isSubmenu() || this.side() !== 'right') return;

    event.preventDefault();
    event.stopPropagation();
    this.openSubmenuInternal();
    this.focusFirstItemDeferred();
  }

  protected onArrowLeft(event: Event): void {
    if (!this.isSubmenu()) return;

    if (this.side() === 'left') {
      event.preventDefault();
      event.stopPropagation();
      this.openSubmenuInternal();
      this.focusFirstItemDeferred();
    } else if (this.menuOpen()) {
      event.preventDefault();
      event.stopPropagation();
      this.closeSubmenu();
    }
  }

  protected onEnter(event: Event): void {
    if (this.menuDisabled()) return;

    event.preventDefault();
    event.stopPropagation();

    if (this.isSubmenu()) {
      this.openSubmenuInternal();
      this.focusFirstItemDeferred();
    } else if (!this.menuOpen()) {
      this.open();
      this.focusFirstItemDeferred();
    }
  }

  protected onSpace(event: Event): void {
    this.onEnter(event);
  }

  protected onMouseEnter(): void {
    if (this.menuDisabled()) return;
    if (!this.isSubmenu()) return; // Hover only opens submenus

    this.cancelCloseTimer();

    this.openDelayTimer = setTimeout(() => {
      this.openSubmenuInternal();
    }, this.subMenuOpenDelay());
  }

  protected onMouseLeave(): void {
    if (!this.isSubmenu()) return;

    this.cancelOpenTimer();

    this.closeDelayTimer = setTimeout(() => {
      if (!this.mouseInSubmenu) {
        this.closeSubmenu();
      }
    }, this.subMenuCloseDelay());
  }

  private focusFirstItemDeferred(): void {
    setTimeout(() => this.attachedMenu?.focusFirstItem(), 0);
  }

  private focusLastItemDeferred(): void {
    setTimeout(() => this.attachedMenu?.focusLastItem(), 0);
  }

  // ─── Menu Management ───

  private openMenu(): void {
    if (this.menuDisabled()) return;

    this.createOverlay();
    this.attachContent();
    this.subscribeToCloseEvents();

    this.menuOpened.emit();
  }

  private closeMenu(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
    this.attachedMenu = null;
    this.menuClosed.emit();
    this.elementRef.nativeElement.focus();
  }

  // ─── Submenu Management ───

  private openSubmenuInternal(): void {
    if (this.menuOpen() || this.menuDisabled()) return;

    this.createOverlay();
    this.attachContent();
    this.subscribeToSubmenuCloseEvents();
    this.menuOpen.set(true);
    this.menuOpened.emit();
  }

  private closeSubmenu(): void {
    if (!this.menuOpen()) return;

    this.cleanupSubmenuListeners();
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
    this.menuOpen.set(false);
    this.attachedMenu = null;
    this.menuClosed.emit();
  }

  // ─── Overlay Management ───

  private createOverlay(): void {
    if (this.overlayRef) return;

    const positions = this.isSubmenu()
      ? buildPopoverPositions(this.side(), this.align(), 0)
      : buildPopoverPositions(this.menuPosition(), this.menuAlignment(), this.menuOffset());

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withViewportMargin(8);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: !this.isSubmenu(),
      backdropClass: this.isSubmenu() ? '' : 'cdk-overlay-transparent-backdrop',
      panelClass: ['com-menu-panel', ...this.panelClassArray()],
    });
  }

  private attachContent(): void {
    if (!this.overlayRef) return;

    const template = this.comMenuTrigger();

    // For submenu, wrap the root trigger to delegate close to the actual root
    const rootTriggerValue: RootMenuTrigger = this.isSubmenu()
      ? {
          close: () => this.parentRootTrigger?.close(),
          menuCloseOnSelect: () => this.parentRootTrigger?.menuCloseOnSelect() ?? true,
          registerMenu: (menu: MenuRef) => {
            this.attachedMenu = menu;
          },
        }
      : this;

    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: ROOT_MENU_TRIGGER, useValue: rootTriggerValue }],
    });

    const portal = new TemplatePortal(template, this.viewContainerRef, undefined, injector);
    this.overlayRef.attach(portal);

    // For submenu, track mouse in overlay using Renderer2
    if (this.isSubmenu()) {
      const overlayEl = this.overlayRef.overlayElement;
      this.submenuMouseEnterCleanup = this.renderer.listen(overlayEl, 'mouseenter', () => this.onSubmenuMouseEnter());
      this.submenuMouseLeaveCleanup = this.renderer.listen(overlayEl, 'mouseleave', () => this.onSubmenuMouseLeave());
    }
  }

  private subscribeToCloseEvents(): void {
    if (!this.overlayRef) return;

    this.overlayRef
      .backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());

    this.overlayRef
      .keydownEvents()
      .pipe(
        filter((event) => event.key === 'Escape'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        event.preventDefault();
        this.close();
      });

    this.overlayRef
      .detachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.menuOpen.set(false);
      });
  }

  private subscribeToSubmenuCloseEvents(): void {
    if (!this.overlayRef) return;

    const closeKey = this.side() === 'right' ? 'ArrowLeft' : 'ArrowRight';

    this.overlayRef
      .keydownEvents()
      .pipe(
        filter((event) => event.key === 'Escape' || event.key === closeKey),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        event.preventDefault();
        event.stopPropagation();
        this.closeSubmenu();
        this.elementRef.nativeElement.focus();
      });

    this.overlayRef
      .detachments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.menuOpen.set(false);
      });
  }

  // ─── Submenu Hover Tracking ───

  private onSubmenuMouseEnter(): void {
    this.mouseInSubmenu = true;
    this.cancelCloseTimer();
  }

  private onSubmenuMouseLeave(): void {
    this.mouseInSubmenu = false;

    this.closeDelayTimer = setTimeout(() => {
      if (!this.mouseInSubmenu) {
        this.closeSubmenu();
      }
    }, this.subMenuCloseDelay());
  }

  private cancelOpenTimer(): void {
    if (this.openDelayTimer) {
      clearTimeout(this.openDelayTimer);
      this.openDelayTimer = null;
    }
  }

  private cancelCloseTimer(): void {
    if (this.closeDelayTimer) {
      clearTimeout(this.closeDelayTimer);
      this.closeDelayTimer = null;
    }
  }

  // ─── Cleanup ───

  private disposeOverlay(): void {
    this.cancelOpenTimer();
    this.cancelCloseTimer();
    this.cleanupSubmenuListeners();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.attachedMenu = null;
  }

  private cleanupSubmenuListeners(): void {
    this.submenuMouseEnterCleanup?.();
    this.submenuMouseEnterCleanup = null;
    this.submenuMouseLeaveCleanup?.();
    this.submenuMouseLeaveCleanup = null;
  }
}
