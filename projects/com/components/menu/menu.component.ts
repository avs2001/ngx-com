import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { FocusKeyManager, type FocusableOption } from '@angular/cdk/a11y';
import { MENU_REF, ROOT_MENU_TRIGGER, type MenuRef } from './menu-tokens';
import { menuPanelVariants, type MenuSize, type MenuVariant } from './menu.variants';
import { generateMenuId, mergeClasses } from './menu.utils';

/**
 * Base class for focusable menu items.
 * All item directives must implement this interface for FocusKeyManager.
 */
export abstract class MenuItemBase implements FocusableOption {
  abstract focus(): void;
  abstract getLabel(): string;
  /** Whether the item is disabled. */
  abstract get disabled(): boolean;
}

/**
 * Menu panel component that renders inside an overlay.
 * Manages keyboard navigation across its items using CDK FocusKeyManager.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`, `--shadow-lg`
 *
 * @example
 * ```html
 * <com-menu>
 *   <button comMenuItem>Edit</button>
 *   <button comMenuItem>Delete</button>
 * </com-menu>
 * ```
 */
@Component({
  selector: 'com-menu',
  template: `
    <div
      [class]="panelClasses()"
      role="menu"
      [attr.aria-label]="ariaLabel() || null"
      [attr.aria-labelledby]="ariaLabelledBy() || null"
      [id]="menuId"
      [attr.data-state]="animationState()"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }

    [data-state='open'] {
      animation: menu-in 150ms ease-out;
    }

    [data-state='closed'] {
      animation: menu-out 100ms ease-in forwards;
    }

    @keyframes menu-in {
      from {
        opacity: 0;
        transform: scale(0.96) translateY(4px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes menu-out {
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
  providers: [{ provide: MENU_REF, useExisting: forwardRef(() => MenuComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements MenuRef {
  private readonly rootTrigger = inject(ROOT_MENU_TRIGGER, { optional: true });

  private keyManager: FocusKeyManager<MenuItemBase> | null = null;

  // ─── Inputs ───

  /** Size variant for the menu panel. */
  readonly menuSize: InputSignal<MenuSize> = input<MenuSize>('md');

  /** Spacing density variant. */
  readonly menuVariant: InputSignal<MenuVariant> = input<MenuVariant>('default');

  /** Accessible label for the menu. */
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** ID of element labeling this menu. */
  readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  // ─── Internal State ───

  readonly menuId: string = generateMenuId();
  readonly animationState: WritableSignal<'open' | 'closed'> = signal<'open' | 'closed'>('open');

  /** Query all focusable items in the menu. */
  private readonly items = contentChildren(MenuItemBase);

  // ─── Computed ───

  protected readonly panelClasses: Signal<string> = computed(() =>
    mergeClasses(menuPanelVariants({ size: this.menuSize(), variant: this.menuVariant() })),
  );

  constructor() {
    this.rootTrigger?.registerMenu?.(this);

    effect(() => {
      const items = this.items();
      if (items.length > 0 && !this.keyManager) {
        this.keyManager = new FocusKeyManager(items as MenuItemBase[])
          .withVerticalOrientation()
          .withWrap()
          .withHomeAndEnd()
          .withTypeAhead(200);
      }
    });
  }

  // ─── Public API ───

  /** Focus the first non-disabled item. */
  focusFirstItem(): void {
    this.keyManager?.setFirstItemActive();
  }

  /** Focus the last non-disabled item. */
  focusLastItem(): void {
    this.keyManager?.setLastItemActive();
  }

  /** Close this menu level. */
  close(): void {
    this.rootTrigger?.close();
  }

  // ─── Event Handlers ───

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      return;
    }

    // ArrowRight/ArrowLeft are handled by submenu triggers
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      this.keyManager?.onKeydown(event);
    }
  }
}
