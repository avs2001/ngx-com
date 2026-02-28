import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  model,
  input,
  output,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabHeaderComponent } from './tab-header.component';
import { tabPanelVariants } from './tabs.variants';
import type { TabVariant, TabSize, TabColor, TabAlignment } from './tabs.variants';
import { generateTabId } from './tabs.utils';

/** Event emitted when the selected tab changes. */
export interface TabChangeEvent {
  index: number;
  tab: TabComponent;
}

/**
 * Tab group component — orchestrates tab state and renders header + panels.
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-accent`, `--color-accent-foreground`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-border`, `--color-ring`,
 *         `--color-disabled`, `--color-disabled-foreground`
 *
 * @example Basic usage
 * ```html
 * <ui-tab-group>
 *   <ui-tab label="Overview">
 *     <p>Overview content.</p>
 *   </ui-tab>
 *   <ui-tab label="Settings">
 *     <p>Settings content.</p>
 *   </ui-tab>
 * </ui-tab-group>
 * ```
 *
 * @example With variants
 * ```html
 * <ui-tab-group variant="pill" color="accent">
 *   <ui-tab label="Tab 1"><p>Pill style.</p></ui-tab>
 *   <ui-tab label="Tab 2"><p>Content.</p></ui-tab>
 * </ui-tab-group>
 * ```
 *
 * @example Two-way binding
 * ```html
 * <ui-tab-group [(selectedIndex)]="currentTab">
 *   <ui-tab label="One"><p>First.</p></ui-tab>
 *   <ui-tab label="Two"><p>Second.</p></ui-tab>
 * </ui-tab-group>
 * ```
 *
 * @example Lazy loaded content
 * ```html
 * <ui-tab-group>
 *   <ui-tab label="Summary"><p>Loads immediately.</p></ui-tab>
 *   <ui-tab label="Analytics">
 *     <ng-template uiTabContent>
 *       <app-analytics-dashboard />
 *     </ng-template>
 *   </ui-tab>
 * </ui-tab-group>
 * ```
 */
@Component({
  selector: 'ui-tab-group',
  template: `
    <ui-tab-header
      [tabs]="tabs()"
      [selectedIndex]="selectedIndex()"
      [variant]="variant()"
      [size]="size()"
      [color]="color()"
      [alignment]="alignment()"
      [baseId]="baseId"
      (tabSelected)="onTabSelected($event)"
      (tabFocused)="onTabFocused($event)"
      (tabClosed)="onTabClosed($event)"
    />

    <div
      class="mt-2"
      role="tabpanel"
      [id]="activePanelId()"
      [attr.aria-labelledby]="activeTabId()"
      tabindex="0"
    >
      @if (preserveContent()) {
        @for (tab of tabs(); track $index; let i = $index) {
          <div
            [hidden]="selectedIndex() !== i"
            [class]="panelClasses()"
            role="tabpanel"
            [id]="getPanelId(i)"
            [attr.aria-labelledby]="getTabId(i)"
          >
            @if (shouldRenderTab(tab, i)) {
              <ng-container [ngTemplateOutlet]="tab.contentTemplate()!" />
            }
          </div>
        }
      } @else {
        @if (activeTab(); as tab) {
          <div [class]="panelClasses()">
            @if (shouldRenderTab(tab, selectedIndex())) {
              <ng-container [ngTemplateOutlet]="tab.contentTemplate()!" />
            }
          </div>
        }
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  imports: [TabHeaderComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-tab-group',
  },
})
export class TabGroupComponent {
  /** Unique ID for this tab group instance. */
  readonly baseId: string = generateTabId();

  // ─── Inputs ───

  /** Visual treatment of tab buttons. */
  readonly variant: InputSignal<TabVariant> = input<TabVariant>('underline');

  /** Controls tab button padding and font size. */
  readonly size: InputSignal<TabSize> = input<TabSize>('md');

  /** Active tab color. */
  readonly color: InputSignal<TabColor> = input<TabColor>('primary');

  /** Tab alignment within the header. */
  readonly alignment: InputSignal<TabAlignment> = input<TabAlignment>('start');

  /** Two-way bindable selected tab index. */
  readonly selectedIndex: ModelSignal<number> = model<number>(0);

  /** Enable/disable panel transition animation. */
  readonly animationEnabled: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  });

  /** When true, keeps inactive tab DOM alive (hidden); when false, destroys inactive tab content. */
  readonly preserveContent: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  // ─── Outputs ───

  /** Emits when the selected tab changes with index and tab reference. */
  readonly selectedTabChange: OutputEmitterRef<TabChangeEvent> = output<TabChangeEvent>();

  /** Emits the index of the focused (not yet selected) tab for keyboard navigation feedback. */
  readonly focusChange: OutputEmitterRef<number> = output<number>();

  // ─── Content Children ───

  /** All TabComponent children. */
  readonly tabs: Signal<readonly TabComponent[]> = contentChildren(TabComponent);

  // ─── Computed ───

  /** The currently active tab. */
  readonly activeTab: Signal<TabComponent | undefined> = computed(
    () => this.tabs()[this.selectedIndex()]
  );

  /** ID of the active tab button. */
  readonly activeTabId: Signal<string> = computed(() => this.getTabId(this.selectedIndex()));

  /** ID of the active panel. */
  readonly activePanelId: Signal<string> = computed(() => this.getPanelId(this.selectedIndex()));

  /** Classes for panel container. */
  readonly panelClasses: Signal<string> = computed(() =>
    tabPanelVariants({ animated: this.animationEnabled() })
  );

  constructor() {
    // Update isActive state on tabs when selection changes
    effect(() => {
      const currentIndex = this.selectedIndex();
      const allTabs = this.tabs();

      allTabs.forEach((tab, index) => {
        const isActive = index === currentIndex;
        tab.isActive.set(isActive);

        // Mark as activated for lazy loading
        if (isActive && !tab.hasBeenActivated()) {
          tab.hasBeenActivated.set(true);
        }
      });
    });
  }

  // ─── Public Methods ───

  getTabId(index: number): string {
    return `${this.baseId}-tab-${index}`;
  }

  getPanelId(index: number): string {
    return `${this.baseId}-panel-${index}`;
  }

  /**
   * Determines whether a tab's content should be rendered.
   * For lazy tabs, content is only rendered after first activation.
   */
  shouldRenderTab(tab: TabComponent, index: number): boolean {
    // Non-lazy tabs always render their content
    if (!tab.isLazy()) {
      return true;
    }

    // Lazy tabs render only if they've been activated at least once
    return tab.hasBeenActivated();
  }

  // ─── Event Handlers ───

  protected onTabSelected(index: number): void {
    const tab = this.tabs()[index];
    if (tab && !tab.disabled()) {
      this.selectedIndex.set(index);
      this.selectedTabChange.emit({ index, tab });
    }
  }

  protected onTabFocused(index: number): void {
    this.focusChange.emit(index);
  }

  protected onTabClosed(index: number): void {
    const tab = this.tabs()[index];
    if (tab) {
      tab.closed.emit();
    }
  }
}
