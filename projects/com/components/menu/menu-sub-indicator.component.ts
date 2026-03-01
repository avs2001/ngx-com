import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Submenu indicator component — displays a chevron icon indicating a submenu.
 * Place inside a menu item that has `[comMenuTrigger]` to indicate it opens a submenu.
 *
 * @tokens `--color-muted-foreground`
 *
 * @example
 * ```html
 * <button comMenuItem [comMenuTrigger]="shareMenu">
 *   Share
 *   <com-menu-sub-indicator />
 * </button>
 * ```
 */
@Component({
  selector: 'com-menu-sub-indicator',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  `,
  host: {
    class: 'ml-auto inline-flex items-center justify-center w-4 h-4 text-muted-foreground',
    '[attr.aria-hidden]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSubIndicatorComponent {}
