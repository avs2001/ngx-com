import { Directive, inject, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { POPOVER_REF, type PopoverRef } from './popover-tokens';

/**
 * Convenience directive that closes the parent popover when clicked.
 * Applied to elements inside the popover that should dismiss it.
 *
 * @example
 * ```html
 * <ng-template #confirmPop>
 *   <div class="space-y-3">
 *     <p>Are you sure?</p>
 *     <div class="flex gap-2">
 *       <button uiButton variant="ghost" uiPopoverClose>Cancel</button>
 *       <button uiButton (click)="confirm()" uiPopoverClose>Confirm</button>
 *     </div>
 *   </div>
 * </ng-template>
 * ```
 *
 * @example With a result value
 * ```html
 * <button [uiPopoverClose]="'confirmed'" (click)="onConfirm()">Yes</button>
 * <button [uiPopoverClose]="'cancelled'">No</button>
 * ```
 */
@Directive({
  selector: '[uiPopoverClose]',
  exportAs: 'uiPopoverClose',
  host: {
    '(click)': 'closePopover()',
    '[attr.type]': '"button"',
  },
})
export class PopoverCloseDirective {
  private readonly popoverRef: PopoverRef | null = inject(POPOVER_REF, { optional: true });

  /**
   * Optional result value to pass when closing.
   * This value is emitted via the trigger's close event.
   */
  readonly uiPopoverClose: InputSignal<unknown> = input<unknown>(undefined);

  protected closePopover(): void {
    this.popoverRef?.close();
  }
}
