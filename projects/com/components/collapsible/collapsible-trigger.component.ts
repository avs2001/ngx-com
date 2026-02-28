import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ComCollapsible } from './collapsible.directive';
import { ComCollapsibleTriggerTpl } from './directives/collapsible-trigger-tpl.directive';
import { ComCollapsibleIconTpl } from './directives/collapsible-icon-tpl.directive';
import { mergeClasses } from './collapsible.utils';
import { collapsibleTriggerVariants } from './collapsible-trigger.variants';
import type { CollapsibleTriggerVariant, CollapsibleTriggerSize } from './collapsible-trigger.variants';
import type { ComCollapsibleTriggerContext, ComCollapsibleIconContext } from './collapsible.models';

/**
 * Collapsible trigger component — handles toggle interaction, ARIA, keyboard, and template rendering.
 *
 * Uses attribute selector so it can be applied to `<button>` or any focusable element.
 * Injects the parent `ComCollapsible` directive to access state.
 * Supports custom trigger layout via `comCollapsibleTriggerTpl` and custom icon via `comCollapsibleIcon`.
 *
 * @tokens `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-ring`, `--color-disabled-foreground`
 *
 * @example Default trigger with auto icon
 * ```html
 * <button comCollapsibleTrigger>Section Title</button>
 * ```
 *
 * @example Without icon
 * ```html
 * <button comCollapsibleTrigger [showIcon]="false">Section Title</button>
 * ```
 *
 * @example With custom icon
 * ```html
 * <button comCollapsibleTrigger>
 *   Settings
 *   <ng-template comCollapsibleIcon let-open="open">
 *     <span class="text-xs text-muted-foreground">{{ open ? '▲' : '▼' }}</span>
 *   </ng-template>
 * </button>
 * ```
 *
 * @example Full trigger layout override
 * ```html
 * <button comCollapsibleTrigger>
 *   <ng-template comCollapsibleTriggerTpl let-open let-toggle="toggle">
 *     <div class="flex items-center gap-3 w-full">
 *       <span class="h-2 w-2 rounded-full" [class]="open ? 'bg-success' : 'bg-muted'"></span>
 *       <span class="font-medium">Notifications</span>
 *       <svg class="com-collapsible-icon h-4 w-4" [attr.data-state]="open ? 'open' : 'closed'">
 *         <!-- chevron -->
 *       </svg>
 *     </div>
 *   </ng-template>
 * </button>
 * ```
 */
@Component({
  selector: '[comCollapsibleTrigger]',
  template: `
    @if (triggerTpl()) {
      <ng-container
        [ngTemplateOutlet]="triggerTpl()!.templateRef"
        [ngTemplateOutletContext]="triggerContext()"
      />
    } @else {
      <span class="flex-1 truncate text-left">
        <ng-content />
      </span>
      @if (showIcon()) {
        @if (iconTpl()) {
          <ng-container
            [ngTemplateOutlet]="iconTpl()!.templateRef"
            [ngTemplateOutletContext]="iconContext()"
          />
        } @else {
          <svg
            class="com-collapsible-icon h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
            [attr.data-state]="collapsible.isOpen() ? 'open' : 'closed'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        }
      }
    }
  `,
  styles: `
    :host {
      display: flex;
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
    '[attr.id]': 'collapsible.triggerId',
    '[attr.type]': '"button"',
    '[attr.aria-expanded]': 'collapsible.isOpen()',
    '[attr.aria-controls]': 'collapsible.contentId',
    '[attr.aria-disabled]': 'collapsible.isDisabled() || null',
    '[attr.data-state]': 'collapsible.isOpen() ? "open" : "closed"',
    '[attr.disabled]': 'collapsible.isDisabled() || null',
    '[tabindex]': 'collapsible.isDisabled() ? -1 : 0',
    '(click)': 'onClick($event)',
    '(keydown.enter)': 'onKeydown($event)',
    '(keydown.space)': 'onKeydown($event)',
  },
})
export class ComCollapsibleTrigger {
  /** Parent collapsible directive (provides state). */
  protected readonly collapsible: ComCollapsible = inject(ComCollapsible);

  /** Custom trigger layout template (replaces inner content). */
  protected readonly triggerTpl: Signal<ComCollapsibleTriggerTpl | undefined> =
    contentChild(ComCollapsibleTriggerTpl);

  /** Custom icon template (replaces default chevron). */
  protected readonly iconTpl: Signal<ComCollapsibleIconTpl | undefined> =
    contentChild(ComCollapsibleIconTpl);

  // ============ INPUTS ============

  /** Trigger preset variant. */
  readonly variant: InputSignal<CollapsibleTriggerVariant> =
    input<CollapsibleTriggerVariant>('ghost');

  /** Trigger size. */
  readonly size: InputSignal<CollapsibleTriggerSize> =
    input<CollapsibleTriggerSize>('default');

  /** Show/hide the toggle icon. */
  readonly showIcon: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  });

  /** Consumer CSS classes — merged with variant classes. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  // ============ COMPUTED STATE ============

  /** @internal Computed host class from CVA + consumer overrides. */
  protected readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      collapsibleTriggerVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.userClass()
    )
  );

  /** Context for trigger template. */
  readonly triggerContext: Signal<ComCollapsibleTriggerContext> = computed(() => ({
    $implicit: this.collapsible.isOpen(),
    open: this.collapsible.isOpen(),
    disabled: this.collapsible.isDisabled(),
    toggle: () => this.collapsible.toggle(),
  }));

  /** Context for icon template. */
  readonly iconContext: Signal<ComCollapsibleIconContext> = computed(() => ({
    $implicit: this.collapsible.isOpen(),
    open: this.collapsible.isOpen(),
  }));

  // ============ EVENT HANDLERS ============

  /** @internal */
  protected onClick(event: Event): void {
    event.preventDefault();
    this.collapsible.toggle();
  }

  /** @internal */
  protected onKeydown(event: Event): void {
    event.preventDefault();
    this.collapsible.toggle();
  }
}
