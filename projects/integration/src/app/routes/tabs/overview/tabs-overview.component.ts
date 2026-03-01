import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  TabGroupComponent,
  TabComponent,
  TabLabelDirective,
  TabContentDirective,
} from 'ngx-com/components/tabs';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-tabs-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabGroupComponent,
    TabComponent,
    TabLabelDirective,
    TabContentDirective,
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="space-y-6 rounded-xl border border-surface-200 bg-white p-8">
        <!-- Underline variant (default) -->
        <div>
          <p class="mb-3 text-sm font-medium text-surface-600">Underline (default)</p>
          <com-tab-group>
            <com-tab label="Overview">
              <div class="py-4 text-surface-600">
                This is the overview panel. Click other tabs to switch content.
              </div>
            </com-tab>
            <com-tab label="Settings">
              <div class="py-4 text-surface-600">
                Settings panel content goes here.
              </div>
            </com-tab>
            <com-tab label="Analytics">
              <div class="py-4 text-surface-600">
                Analytics dashboard would appear here.
              </div>
            </com-tab>
          </com-tab-group>
        </div>

        <!-- Pill variant -->
        <div>
          <p class="mb-3 text-sm font-medium text-surface-600">Pill variant</p>
          <com-tab-group variant="pill" color="accent">
            <com-tab label="All">
              <div class="py-4 text-surface-600">All items displayed.</div>
            </com-tab>
            <com-tab label="Active">
              <div class="py-4 text-surface-600">Only active items.</div>
            </com-tab>
            <com-tab label="Archived">
              <div class="py-4 text-surface-600">Archived items.</div>
            </com-tab>
          </com-tab-group>
        </div>

        <!-- Solid variant -->
        <div>
          <p class="mb-3 text-sm font-medium text-surface-600">Solid variant</p>
          <com-tab-group variant="solid">
            <com-tab label="Day">
              <div class="py-4 text-surface-600">Daily view.</div>
            </com-tab>
            <com-tab label="Week">
              <div class="py-4 text-surface-600">Weekly view.</div>
            </com-tab>
            <com-tab label="Month">
              <div class="py-4 text-surface-600">Monthly view.</div>
            </com-tab>
          </com-tab-group>
        </div>
      </div>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">4 Visual Variants</h3>
          <p class="text-sm text-surface-600">
            Underline, pill, outline, and solid variants for different contexts.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Two Modes</h3>
          <p class="text-sm text-surface-600">
            Content tabs with panel management or nav tabs for router integration.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Lazy Loading</h3>
          <p class="text-sm text-surface-600">
            Defer tab content rendering until first activation with [comTabContent].
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Overflow Scrolling</h3>
          <p class="text-sm text-surface-600">
            Automatic scroll buttons when tabs overflow the container.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Full Keyboard Support</h3>
          <p class="text-sm text-surface-600">
            Arrow keys, Home/End, Enter/Space following WAI-ARIA tabs pattern.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Closable Tabs</h3>
          <p class="text-sm text-surface-600">
            Optional close buttons on tabs with (closed) event handling.
          </p>
        </div>
      </div>
    </section>

    <!-- Custom Labels Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Labels</h2>
      <p class="mb-4 text-surface-600">
        Use [comTabLabel] directive for rich tab headers with icons and badges.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <com-tab-group>
          <com-tab>
            <ng-template comTabLabel>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </ng-template>
            <div class="py-4 text-surface-600">Home dashboard content.</div>
          </com-tab>
          <com-tab>
            <ng-template comTabLabel>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span>Projects</span>
              <span class="rounded-pill bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">5</span>
            </ng-template>
            <div class="py-4 text-surface-600">Active projects list.</div>
          </com-tab>
          <com-tab>
            <ng-template comTabLabel>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </ng-template>
            <div class="py-4 text-surface-600">Application settings.</div>
          </com-tab>
        </com-tab-group>
      </div>
    </section>

    <!-- Two-way Binding Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">External Control</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mb-4 flex gap-2">
          <button
            class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover"
            (click)="currentTab.set(0)"
          >
            Go to Tab 1
          </button>
          <button
            class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
            (click)="currentTab.set(1)"
          >
            Go to Tab 2
          </button>
          <button
            class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
            (click)="currentTab.set(2)"
          >
            Go to Tab 3
          </button>
          <span class="ml-4 flex items-center text-sm text-surface-600">
            Selected: Tab {{ currentTab() + 1 }}
          </span>
        </div>
        <com-tab-group [(selectedIndex)]="currentTab">
          <com-tab label="First">
            <div class="py-4 text-surface-600">First tab content.</div>
          </com-tab>
          <com-tab label="Second">
            <div class="py-4 text-surface-600">Second tab content.</div>
          </com-tab>
          <com-tab label="Third">
            <div class="py-4 text-surface-600">Third tab content.</div>
          </com-tab>
        </com-tab-group>
      </div>
    </section>

    <!-- Lazy Loading Demo -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Lazy Loading</h2>
      <p class="mb-4 text-surface-600">
        Content inside [comTabContent] is only rendered when the tab is first activated.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <com-tab-group>
          <com-tab label="Eager">
            <div class="py-4 text-surface-600">
              This content loads immediately. Timestamp: {{ eagerTimestamp }}
            </div>
          </com-tab>
          <com-tab label="Lazy">
            <ng-template comTabContent>
              <div class="py-4 text-surface-600">
                This content was lazily rendered on first activation.
                Timestamp: {{ lazyTimestamp }}
              </div>
            </ng-template>
          </com-tab>
        </com-tab-group>
      </div>
    </section>
  `,
})
export class TabsOverview {
  protected readonly currentTab = signal(0);
  protected readonly eagerTimestamp = new Date().toISOString();
  protected readonly lazyTimestamp = new Date().toISOString();

  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import {
  TabGroupComponent,
  TabComponent,
} from 'ngx-com/components/tabs';

@Component({
  selector: 'app-example',
  imports: [TabGroupComponent, TabComponent],
  template: \`
    <com-tab-group>
      <com-tab label="Overview">
        <p>Overview content.</p>
      </com-tab>
      <com-tab label="Settings">
        <p>Settings content.</p>
      </com-tab>
    </com-tab-group>
  \`,
})
export class Example {}`;
}
