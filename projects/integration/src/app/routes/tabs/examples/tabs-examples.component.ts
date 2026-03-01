import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import {
  TabGroupComponent,
  TabComponent,
  TabLabelDirective,
  TabContentDirective,
  TabNavBarComponent,
  TabLinkDirective,
  type TabVariant,
  type TabSize,
  type TabColor,
} from 'ngx-com/components/tabs';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-tabs-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabGroupComponent,
    TabComponent,
    TabLabelDirective,
    TabContentDirective,
    TabNavBarComponent,
    TabLinkDirective,
    CodeBlock,
    TitleCasePipe,
  ],
  template: `
    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <p class="mb-4 text-surface-600">
        Four visual variants for different UI contexts.
      </p>
      <div class="space-y-6 rounded-xl border border-surface-200 bg-white p-8">
        @for (variant of variants; track variant) {
          <div>
            <p class="mb-2 text-sm font-medium text-surface-500">{{ variant | titlecase }}</p>
            <com-tab-group [variant]="variant">
              <com-tab label="Tab 1">
                <div class="py-3 text-surface-600">
                  Content for {{ variant }} variant.
                </div>
              </com-tab>
              <com-tab label="Tab 2">
                <div class="py-3 text-surface-600">Second panel.</div>
              </com-tab>
              <com-tab label="Tab 3">
                <div class="py-3 text-surface-600">Third panel.</div>
              </com-tab>
            </com-tab-group>
          </div>
        }
      </div>
      <int-code-block class="mt-4" language="html" [code]="variantsCode" />
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Three size options for different densities.
      </p>
      <div class="space-y-6 rounded-xl border border-surface-200 bg-white p-8">
        @for (size of sizes; track size) {
          <div>
            <p class="mb-2 text-sm font-medium text-surface-500">{{ size | titlecase }}</p>
            <com-tab-group [size]="size">
              <com-tab label="Overview">
                <div class="py-3 text-surface-600">Content.</div>
              </com-tab>
              <com-tab label="Details">
                <div class="py-3 text-surface-600">Content.</div>
              </com-tab>
            </com-tab-group>
          </div>
        }
      </div>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Colors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Colors</h2>
      <p class="mb-4 text-surface-600">
        Three color options for the active tab indicator.
      </p>
      <div class="space-y-6 rounded-xl border border-surface-200 bg-white p-8">
        @for (color of colors; track color) {
          <div>
            <p class="mb-2 text-sm font-medium text-surface-500">{{ color | titlecase }}</p>
            <com-tab-group [color]="color" variant="pill">
              <com-tab label="Tab 1">
                <div class="py-3 text-surface-600">Content.</div>
              </com-tab>
              <com-tab label="Tab 2">
                <div class="py-3 text-surface-600">Content.</div>
              </com-tab>
            </com-tab-group>
          </div>
        }
      </div>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Alignment -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Alignment</h2>
      <p class="mb-4 text-surface-600">
        Control tab positioning within the header.
      </p>
      <div class="space-y-6 rounded-xl border border-surface-200 bg-white p-8">
        <div>
          <p class="mb-2 text-sm font-medium text-surface-500">Start (default)</p>
          <com-tab-group alignment="start">
            <com-tab label="Tab 1"><div class="py-3 text-surface-600">Content.</div></com-tab>
            <com-tab label="Tab 2"><div class="py-3 text-surface-600">Content.</div></com-tab>
          </com-tab-group>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-surface-500">Center</p>
          <com-tab-group alignment="center">
            <com-tab label="Tab 1"><div class="py-3 text-surface-600">Content.</div></com-tab>
            <com-tab label="Tab 2"><div class="py-3 text-surface-600">Content.</div></com-tab>
          </com-tab-group>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-surface-500">Stretch</p>
          <com-tab-group alignment="stretch">
            <com-tab label="Tab 1"><div class="py-3 text-surface-600">Content.</div></com-tab>
            <com-tab label="Tab 2"><div class="py-3 text-surface-600">Content.</div></com-tab>
            <com-tab label="Tab 3"><div class="py-3 text-surface-600">Content.</div></com-tab>
          </com-tab-group>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="alignmentCode" />
    </section>

    <!-- Disabled Tabs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled Tabs</h2>
      <p class="mb-4 text-surface-600">
        Individual tabs can be disabled.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <com-tab-group>
          <com-tab label="Active">
            <div class="py-4 text-surface-600">This tab is selectable.</div>
          </com-tab>
          <com-tab label="Disabled" [disabled]="true">
            <div class="py-4 text-surface-600">You can't select this tab.</div>
          </com-tab>
          <com-tab label="Also Active">
            <div class="py-4 text-surface-600">This tab is selectable.</div>
          </com-tab>
        </com-tab-group>
      </div>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Closable Tabs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Closable Tabs</h2>
      <p class="mb-4 text-surface-600">
        Tabs can have a close button for dynamic tab management.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mb-4">
          <button
            class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover"
            (click)="addTab()"
          >
            + Add Tab
          </button>
        </div>
        <com-tab-group>
          <com-tab label="Main">
            <div class="py-4 text-surface-600">This tab cannot be closed.</div>
          </com-tab>
          @for (tab of dynamicTabs(); track tab.id) {
            <com-tab [label]="tab.name" [closable]="true" (closed)="removeTab(tab.id)">
              <div class="py-4 text-surface-600">{{ tab.content }}</div>
            </com-tab>
          }
        </com-tab-group>
      </div>
      <int-code-block class="mt-4" language="html" [code]="closableCode" />
    </section>

    <!-- Lazy Loading -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Lazy Loading</h2>
      <p class="mb-4 text-surface-600">
        Use [comTabContent] to defer rendering until first activation.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <com-tab-group>
          <com-tab label="Eager Load">
            <div class="py-4 text-surface-600">
              Rendered immediately. Timestamp: {{ eagerTimestamp }}
            </div>
          </com-tab>
          <com-tab label="Lazy Load">
            <ng-template comTabContent>
              <div class="py-4 text-surface-600">
                <p class="mb-2">This was rendered on first activation.</p>
                <div class="grid grid-cols-3 gap-4">
                  <div class="rounded-lg bg-primary-subtle p-3 text-center">
                    <div class="text-2xl font-bold text-primary-subtle-foreground">128</div>
                    <div class="text-xs text-primary-subtle-foreground">Users</div>
                  </div>
                  <div class="rounded-lg bg-accent-subtle p-3 text-center">
                    <div class="text-2xl font-bold text-accent-subtle-foreground">89%</div>
                    <div class="text-xs text-accent-subtle-foreground">Active</div>
                  </div>
                  <div class="rounded-lg bg-muted p-3 text-center">
                    <div class="text-2xl font-bold text-foreground">24</div>
                    <div class="text-xs text-muted-foreground">New</div>
                  </div>
                </div>
              </div>
            </ng-template>
          </com-tab>
        </com-tab-group>
      </div>
      <int-code-block class="mt-4" language="html" [code]="lazyCode" />
    </section>

    <!-- Preserve Content -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Preserve Content</h2>
      <p class="mb-4 text-surface-600">
        Keep tab content in DOM when switching tabs (useful for forms).
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <com-tab-group [preserveContent]="true">
          <com-tab label="Form A">
            <div class="space-y-3 py-4">
              <input
                type="text"
                class="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-input-foreground placeholder:text-input-placeholder"
                placeholder="Type something..."
              />
              <p class="text-sm text-surface-500">
                Switch tabs and come back - your input will be preserved.
              </p>
            </div>
          </com-tab>
          <com-tab label="Form B">
            <div class="space-y-3 py-4">
              <textarea
                class="w-full rounded-md border border-input-border bg-input-background px-3 py-2 text-input-foreground placeholder:text-input-placeholder"
                rows="3"
                placeholder="Enter notes..."
              ></textarea>
            </div>
          </com-tab>
        </com-tab-group>
      </div>
      <int-code-block class="mt-4" language="html" [code]="preserveCode" />
    </section>

    <!-- Custom Labels -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Labels</h2>
      <p class="mb-4 text-surface-600">
        Use [comTabLabel] for rich tab headers with icons and badges.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <com-tab-group>
          <com-tab>
            <ng-template comTabLabel>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Events</span>
              <span class="rounded-pill bg-warn px-1.5 py-0.5 text-xs text-warn-foreground">3</span>
            </ng-template>
            <div class="py-4 text-surface-600">Upcoming events with notification badge.</div>
          </com-tab>
          <com-tab>
            <ng-template comTabLabel>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Team</span>
            </ng-template>
            <div class="py-4 text-surface-600">Team members list.</div>
          </com-tab>
          <com-tab>
            <ng-template comTabLabel>
              <span class="relative">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-warn"></span>
              </span>
              <span>Notifications</span>
            </ng-template>
            <div class="py-4 text-surface-600">Recent notifications with status dot.</div>
          </com-tab>
        </com-tab-group>
      </div>
      <int-code-block class="mt-4" language="html" [code]="customLabelCode" />
    </section>

    <!-- Nav Tabs (Route-Driven) -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Nav Tabs (Route-Driven)</h2>
      <p class="mb-4 text-surface-600">
        Use com-tab-nav-bar with [comTabLink] for router integration.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <nav com-tab-nav-bar>
          <a comTabLink [active]="activeNavTab() === 'overview'" (click)="activeNavTab.set('overview')">
            Overview
          </a>
          <a comTabLink [active]="activeNavTab() === 'analytics'" (click)="activeNavTab.set('analytics')">
            Analytics
          </a>
          <a comTabLink [active]="activeNavTab() === 'settings'" (click)="activeNavTab.set('settings')">
            Settings
          </a>
          <a comTabLink [disabled]="true">
            Billing (soon)
          </a>
        </nav>
        <div class="mt-4 rounded-lg bg-muted p-4 text-surface-600">
          Selected: {{ activeNavTab() }}
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="navTabsCode" />
    </section>
  `,
})
export class TabsExamples {
  protected readonly variants: TabVariant[] = ['underline', 'pill', 'outline', 'solid'];
  protected readonly sizes: TabSize[] = ['sm', 'md', 'lg'];
  protected readonly colors: TabColor[] = ['primary', 'accent', 'muted'];

  protected readonly eagerTimestamp = new Date().toISOString();
  protected readonly activeNavTab = signal('overview');

  protected readonly dynamicTabs = signal([
    { id: 1, name: 'Tab 1', content: 'Dynamic tab 1 content.' },
    { id: 2, name: 'Tab 2', content: 'Dynamic tab 2 content.' },
  ]);

  private nextTabId = 3;

  addTab(): void {
    this.dynamicTabs.update(tabs => [
      ...tabs,
      { id: this.nextTabId, name: `Tab ${this.nextTabId}`, content: `Dynamic tab ${this.nextTabId} content.` },
    ]);
    this.nextTabId++;
  }

  removeTab(id: number): void {
    this.dynamicTabs.update(tabs => tabs.filter(t => t.id !== id));
  }

  protected readonly variantsCode = `<com-tab-group variant="underline">...</com-tab-group>
<com-tab-group variant="pill">...</com-tab-group>
<com-tab-group variant="outline">...</com-tab-group>
<com-tab-group variant="solid">...</com-tab-group>`;

  protected readonly sizesCode = `<com-tab-group size="sm">...</com-tab-group>
<com-tab-group size="md">...</com-tab-group>
<com-tab-group size="lg">...</com-tab-group>`;

  protected readonly colorsCode = `<com-tab-group color="primary">...</com-tab-group>
<com-tab-group color="accent">...</com-tab-group>
<com-tab-group color="muted">...</com-tab-group>`;

  protected readonly alignmentCode = `<com-tab-group alignment="start">...</com-tab-group>
<com-tab-group alignment="center">...</com-tab-group>
<com-tab-group alignment="end">...</com-tab-group>
<com-tab-group alignment="stretch">...</com-tab-group>`;

  protected readonly disabledCode = `<com-tab-group>
  <com-tab label="Active">...</com-tab>
  <com-tab label="Disabled" [disabled]="true">...</com-tab>
  <com-tab label="Also Active">...</com-tab>
</com-tab-group>`;

  protected readonly closableCode = `<com-tab-group>
  <com-tab label="Main">...</com-tab>
  @for (tab of tabs(); track tab.id) {
    <com-tab [label]="tab.name" [closable]="true" (closed)="removeTab(tab.id)">
      {{ tab.content }}
    </com-tab>
  }
</com-tab-group>`;

  protected readonly lazyCode = `<com-tab-group>
  <com-tab label="Eager">
    <p>Rendered immediately.</p>
  </com-tab>
  <com-tab label="Lazy">
    <ng-template comTabContent>
      <app-heavy-dashboard />
    </ng-template>
  </com-tab>
</com-tab-group>`;

  protected readonly preserveCode = `<com-tab-group [preserveContent]="true">
  <com-tab label="Form A">
    <input type="text" />
  </com-tab>
  <com-tab label="Form B">
    <textarea></textarea>
  </com-tab>
</com-tab-group>`;

  protected readonly customLabelCode = `<com-tab>
  <ng-template comTabLabel>
    <svg class="h-4 w-4">...</svg>
    <span>Events</span>
    <span class="badge">3</span>
  </ng-template>
  <p>Tab content</p>
</com-tab>`;

  protected readonly navTabsCode = `<nav com-tab-nav-bar>
  <a comTabLink routerLink="overview" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">
    Overview
  </a>
  <a comTabLink routerLink="settings" routerLinkActive #rla2="routerLinkActive" [active]="rla2.isActive">
    Settings
  </a>
  <a comTabLink [disabled]="true">Coming Soon</a>
</nav>
<router-outlet />`;
}
