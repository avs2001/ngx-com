import { InjectionToken } from '@angular/core';

/**
 * Interface for the root menu trigger, allowing items to close the entire menu tree.
 */
export interface RootMenuTrigger {
  /** Close the menu and all submenus. */
  close(): void;
  /** Whether to close the menu when an item is selected. */
  menuCloseOnSelect(): boolean;
  /** Called by MenuComponent to register itself when attached. */
  registerMenu?(menu: MenuRef): void;
}

/**
 * Interface for a parent menu, allowing items and submenus to coordinate.
 */
export interface MenuRef {
  /** Unique ID of the menu for ARIA. */
  readonly menuId: string;
  /** Size variant inherited by items. */
  readonly menuSize: () => 'sm' | 'md' | 'lg';
  /** Close this menu level. */
  close(): void;
  /** Focus the first item. */
  focusFirstItem(): void;
  /** Focus the last item. */
  focusLastItem(): void;
}

/**
 * Token to access the root menu trigger from anywhere in the menu tree.
 * Used by items to close the entire menu on selection.
 */
export const ROOT_MENU_TRIGGER: InjectionToken<RootMenuTrigger> = new InjectionToken<RootMenuTrigger>('ROOT_MENU_TRIGGER');

/**
 * Token to access the nearest parent menu component.
 * Used by items and submenu triggers to coordinate with their parent.
 */
export const MENU_REF: InjectionToken<MenuRef> = new InjectionToken<MenuRef>('MENU_REF');
