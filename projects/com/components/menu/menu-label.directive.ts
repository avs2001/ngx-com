import { computed, Directive, inject } from '@angular/core';
import type { Signal } from '@angular/core';
import { MENU_REF } from './menu-tokens';
import { menuLabelVariants, type MenuSize } from './menu.variants';
import { mergeClasses } from './menu.utils';

let labelIdCounter = 0;

/**
 * Non-interactive section label/header inside a menu.
 *
 * @tokens `--color-muted-foreground`
 *
 * @example
 * ```html
 * <span comMenuLabel>Team</span>
 * <button comMenuItem>View Members</button>
 * ```
 */
@Directive({
  selector: '[comMenuLabel]',
  exportAs: 'comMenuLabel',
  host: {
    '[class]': 'labelClasses()',
    '[attr.role]': '"presentation"',
    '[id]': 'labelId',
  },
})
export class MenuLabelDirective {
  private readonly menu = inject(MENU_REF, { optional: true });

  /** Unique ID that can be referenced by aria-labelledby. */
  readonly labelId: string = `menu-label-${++labelIdCounter}`;

  private readonly size: Signal<MenuSize> = computed(() => this.menu?.menuSize() ?? 'md');

  protected readonly labelClasses: Signal<string> = computed(() =>
    mergeClasses(menuLabelVariants({ size: this.size() })),
  );
}
