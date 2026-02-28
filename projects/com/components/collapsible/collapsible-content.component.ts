import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  signal,
  effect,
} from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ComCollapsible } from './collapsible.directive';
import { ComCollapsibleContentTpl } from './directives/collapsible-content-tpl.directive';
import { ComCollapsibleLazy } from './directives/collapsible-lazy.directive';
import { mergeClasses } from './collapsible.utils';
import type { ComCollapsibleContentContext } from './collapsible.models';

/**
 * Collapsible content component — animated panel with region role.
 *
 * Uses CSS grid technique for smooth height animation without JS measurement.
 * Supports lazy rendering via `comCollapsibleLazy` directive.
 *
 * @tokens None (structural only — styling is applied via templates or consumer classes)
 *
 * @example Basic usage
 * ```html
 * <com-collapsible-content>
 *   <div class="p-4">Content here.</div>
 * </com-collapsible-content>
 * ```
 *
 * @example With custom duration
 * ```html
 * <com-collapsible-content [duration]="300">
 *   <div class="p-4">Slower animation.</div>
 * </com-collapsible-content>
 * ```
 *
 * @example With content chrome template
 * ```html
 * <com-collapsible-content>
 *   <ng-template comCollapsibleContentTpl let-open="open">
 *     <div class="border-t border-border p-4">
 *       <!-- Content with custom chrome -->
 *     </div>
 *   </ng-template>
 * </com-collapsible-content>
 * ```
 *
 * @example Lazy content
 * ```html
 * <com-collapsible-content>
 *   <ng-template comCollapsibleLazy>
 *     <app-heavy-component />
 *   </ng-template>
 * </com-collapsible-content>
 * ```
 */
@Component({
  selector: 'com-collapsible-content',
  template: `
    @if (contentTpl()) {
      <div class="com-collapsible-content-inner" [class]="innerClass()">
        <ng-container
          [ngTemplateOutlet]="contentTpl()!.templateRef"
          [ngTemplateOutletContext]="templateContext()"
        />
      </div>
    } @else if (lazyTpl()) {
      @if (hasBeenOpened()) {
        <div class="com-collapsible-content-inner" [class]="innerClass()">
          <ng-container [ngTemplateOutlet]="lazyTpl()!.templateRef" />
        </div>
      }
    } @else {
      <div class="com-collapsible-content-inner" [class]="innerClass()">
        <ng-content />
      </div>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--duration, 200ms) ease;
    }
    :host([data-state='open']) {
      grid-template-rows: 1fr;
    }
    .com-collapsible-content-inner {
      overflow: hidden;
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-collapsible-content',
    '[style.--duration.ms]': 'duration()',
    '[attr.id]': 'collapsible.contentId',
    '[attr.role]': '"region"',
    '[attr.aria-labelledby]': 'collapsible.triggerId',
    '[attr.data-state]': 'collapsible.isOpen() ? "open" : "closed"',
    '[attr.inert]': '!collapsible.isOpen() || null',
  },
})
export class ComCollapsibleContent {
  /** Parent collapsible directive (provides state). */
  protected readonly collapsible: ComCollapsible = inject(ComCollapsible);

  /** Custom content chrome template. */
  protected readonly contentTpl: Signal<ComCollapsibleContentTpl | undefined> =
    contentChild(ComCollapsibleContentTpl);

  /** Lazy content template. */
  protected readonly lazyTpl: Signal<ComCollapsibleLazy | undefined> =
    contentChild(ComCollapsibleLazy);

  /** Track if collapsible has ever been opened (for lazy rendering). */
  protected readonly hasBeenOpened: WritableSignal<boolean> = signal(false);

  // ============ INPUTS ============

  /** Transition duration in milliseconds. */
  readonly duration: InputSignal<number> = input<number>(200);

  /** Consumer CSS classes for the inner wrapper. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  // ============ COMPUTED STATE ============

  /** @internal Computed inner wrapper class. */
  protected readonly innerClass: Signal<string> = computed(() =>
    mergeClasses('com-collapsible-content-inner', this.userClass())
  );

  /** Context for content template. */
  readonly templateContext: Signal<ComCollapsibleContentContext> = computed(() => ({
    $implicit: this.collapsible.isOpen(),
    open: this.collapsible.isOpen(),
  }));

  constructor() {
    // Track first open for lazy rendering
    effect(() => {
      if (this.collapsible.isOpen() && !this.hasBeenOpened()) {
        this.hasBeenOpened.set(true);
      }
    });
  }
}
