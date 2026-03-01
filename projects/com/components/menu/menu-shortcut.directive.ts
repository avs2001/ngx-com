import { computed, Directive, inject } from '@angular/core';
import type { Signal } from '@angular/core';
import { MENU_REF } from './menu-tokens';
import { menuShortcutVariants, type MenuSize } from './menu.variants';
import { mergeClasses } from './menu.utils';

/**
 * Keyboard shortcut hint displayed in a menu item.
 *
 * @tokens `--color-muted-foreground`
 *
 * @example
 * ```html
 * <button comMenuItem>
 *   Save
 *   <span comMenuShortcut>⌘S</span>
 * </button>
 * ```
 */
@Directive({
  selector: '[comMenuShortcut]',
  exportAs: 'comMenuShortcut',
  host: {
    '[class]': 'shortcutClasses()',
  },
})
export class MenuShortcutDirective {
  private readonly menu = inject(MENU_REF, { optional: true });

  private readonly size: Signal<MenuSize> = computed(() => this.menu?.menuSize() ?? 'md');

  protected readonly shortcutClasses: Signal<string> = computed(() =>
    mergeClasses(menuShortcutVariants({ size: this.size() })),
  );
}
