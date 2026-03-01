import { InjectionToken } from '@angular/core';

/**
 * Interface for the popover reference injected into content.
 * Provides methods to control the popover from within content.
 */
export interface PopoverRef {
  /** Programmatically open the popover. */
  open(): void;
  /** Programmatically close the popover. */
  close(): void;
  /** Toggle the popover open/close state. */
  toggle(): void;
  /** Force recalculation of position. */
  reposition(): void;
}

/**
 * Data passed to a component rendered inside the popover.
 * Inject this token to access the data provided via `popoverData` input.
 *
 * @example
 * ```ts
 * @Component({ ... })
 * export class UserProfilePopover {
 *   readonly data = inject(POPOVER_DATA); // { userId: '123' }
 * }
 * ```
 */
export const POPOVER_DATA: InjectionToken<unknown> = new InjectionToken<unknown>('POPOVER_DATA');

/**
 * Reference to the popover trigger directive for closing from inside the popover.
 * Inject this token to programmatically close the popover from within content.
 *
 * @example
 * ```ts
 * @Component({ ... })
 * export class UserProfilePopover {
 *   readonly popoverRef = inject(POPOVER_REF);
 *
 *   save(): void {
 *     // ... save logic
 *     this.popoverRef.close();
 *   }
 * }
 * ```
 */
export const POPOVER_REF: InjectionToken<PopoverRef> = new InjectionToken<PopoverRef>('POPOVER_REF');
