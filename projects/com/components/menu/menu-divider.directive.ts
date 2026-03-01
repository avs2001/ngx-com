import { Directive } from '@angular/core';

/**
 * Visual separator between menu sections.
 *
 * @tokens `--color-border`
 *
 * @example
 * ```html
 * <button comMenuItem>Edit</button>
 * <hr comMenuDivider />
 * <button comMenuItem>Delete</button>
 * ```
 */
@Directive({
  selector: '[comMenuDivider]',
  exportAs: 'comMenuDivider',
  host: {
    class: 'block border-t border-border my-1',
    '[attr.role]': '"separator"',
  },
})
export class MenuDividerDirective {}
