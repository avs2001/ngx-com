import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { TabLabelDirective } from './tab-label.directive';
import { TabContentDirective } from './tab-content.directive';

/**
 * Individual tab definition component.
 *
 * This is a **definition component** — it doesn't render anything itself.
 * It provides a label and content template to the parent `TabGroupComponent`.
 *
 * @example Basic usage
 * ```html
 * <com-tab label="Overview">
 *   <p>Overview content.</p>
 * </com-tab>
 * ```
 *
 * @example Custom label with icon
 * ```html
 * <com-tab>
 *   <ng-template comTabLabel>
 *     <svg class="w-4 h-4"><!-- icon --></svg>
 *     <span>Settings</span>
 *   </ng-template>
 *   <p>Settings content.</p>
 * </com-tab>
 * ```
 *
 * @example Lazy loaded content
 * ```html
 * <com-tab label="Analytics">
 *   <ng-template comTabContent>
 *     <app-heavy-dashboard />
 *   </ng-template>
 * </com-tab>
 * ```
 *
 * @example Closable tab
 * ```html
 * <com-tab label="Document" [closable]="true" (closed)="onClose()">
 *   <p>Document content.</p>
 * </com-tab>
 * ```
 */
@Component({
  selector: 'com-tab',
  template: `
    <ng-template #implicitContent>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  // ─── Inputs ───

  /** Plain text label; ignored if `[comTabLabel]` template is provided. */
  readonly label: InputSignal<string> = input<string>('');

  /** Prevents selection when true. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Shows a close/remove button on the tab. */
  readonly closable: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  // ─── Outputs ───

  /** Emitted when the close button is clicked. */
  readonly closed: OutputEmitterRef<void> = output<void>();

  // ─── Template References ───

  /** Custom label template (queried from content). */
  readonly customLabel: Signal<TabLabelDirective | undefined> = contentChild(TabLabelDirective);

  /** Lazy content template (queried from content). */
  readonly lazyContent: Signal<TabContentDirective | undefined> = contentChild(TabContentDirective);

  /** Implicit content template from ng-content. */
  readonly implicitContent: Signal<TemplateRef<unknown> | undefined> =
    viewChild<TemplateRef<unknown>>('implicitContent');

  // ─── State (set by parent TabGroupComponent) ───

  /** Whether this tab is currently active. Set by TabGroupComponent. */
  readonly isActive: WritableSignal<boolean> = signal(false);

  /** Whether this tab content has been rendered at least once. */
  readonly hasBeenActivated: WritableSignal<boolean> = signal(false);

  // ─── Computed ───

  /**
   * Returns the label template if provided, otherwise null.
   * Parent uses this to decide between string label or template.
   */
  readonly labelTemplate: Signal<TemplateRef<void> | null> = computed(
    () => this.customLabel()?.templateRef ?? null
  );

  /**
   * Returns the content template: lazy template if present, else implicit content.
   */
  readonly contentTemplate: Signal<TemplateRef<unknown> | undefined> = computed(
    () => this.lazyContent()?.templateRef ?? this.implicitContent()
  );

  /**
   * Whether this tab uses lazy loading.
   */
  readonly isLazy: Signal<boolean> = computed(() => !!this.lazyContent());
}
