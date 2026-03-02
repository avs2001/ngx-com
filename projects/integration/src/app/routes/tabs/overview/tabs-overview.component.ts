import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
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
    ComCard,
    ComItem,
    ComButton,
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Tab variants and styles in action"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="space-y-6 p-8">
        <!-- Underline variant (default) -->
        <div>
          <p class="mb-3 text-sm font-medium text-muted-foreground">Underline (default)</p>
          <com-tab-group>
            <com-tab label="Overview">
              <div class="py-4 text-foreground">
                This is the overview panel. Click other tabs to switch content.
              </div>
            </com-tab>
            <com-tab label="Settings">
              <div class="py-4 text-foreground">
                Settings panel content goes here.
              </div>
            </com-tab>
            <com-tab label="Analytics">
              <div class="py-4 text-foreground">
                Analytics dashboard would appear here.
              </div>
            </com-tab>
          </com-tab-group>
        </div>

        <!-- Pill variant -->
        <div>
          <p class="mb-3 text-sm font-medium text-muted-foreground">Pill variant</p>
          <com-tab-group variant="pill" color="accent">
            <com-tab label="All">
              <div class="py-4 text-foreground">All items displayed.</div>
            </com-tab>
            <com-tab label="Active">
              <div class="py-4 text-foreground">Only active items.</div>
            </com-tab>
            <com-tab label="Archived">
              <div class="py-4 text-foreground">Archived items.</div>
            </com-tab>
          </com-tab-group>
        </div>

        <!-- Solid variant -->
        <div>
          <p class="mb-3 text-sm font-medium text-muted-foreground">Solid variant</p>
          <com-tab-group variant="solid">
            <com-tab label="Day">
              <div class="py-4 text-foreground">Daily view.</div>
            </com-tab>
            <com-tab label="Week">
              <div class="py-4 text-foreground">Weekly view.</div>
            </com-tab>
            <com-tab label="Month">
              <div class="py-4 text-foreground">Monthly view.</div>
            </com-tab>
          </com-tab-group>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and compose tab components"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes com-tab-group powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="4 Visual Variants"
            description="Underline, pill, outline, and solid variants for different contexts"
            icon="layers"
          />
          <com-item
            title="Two Modes"
            description="Content tabs with panel management or nav tabs for router integration"
            icon="layout"
            iconColor="accent"
          />
          <com-item
            title="Lazy Loading"
            description="Defer tab content rendering until first activation with [comTabContent]"
            icon="zap"
          />
          <com-item
            title="Overflow Scrolling"
            description="Automatic scroll buttons when tabs overflow the container"
            icon="move-horizontal"
            iconColor="accent"
          />
          <com-item
            title="Full Keyboard Support"
            description="Arrow keys, Home/End, Enter/Space following WAI-ARIA tabs pattern"
            icon="keyboard"
          />
          <com-item
            title="Closable Tabs"
            description="Optional close buttons on tabs with (closed) event handling"
            icon="x"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Custom Labels Demo -->
    <section class="mb-12">
      <com-item
        title="Custom Labels"
        description="Rich tab headers with icons and badges"
        icon="sparkles"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <com-tab-group>
          <com-tab>
            <ng-template comTabLabel>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </ng-template>
            <div class="py-4 text-foreground">Home dashboard content.</div>
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
            <div class="py-4 text-foreground">Active projects list.</div>
          </com-tab>
          <com-tab>
            <ng-template comTabLabel>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Settings</span>
            </ng-template>
            <div class="py-4 text-foreground">Application settings.</div>
          </com-tab>
        </com-tab-group>
      </com-card>
    </section>

    <!-- Two-way Binding Demo -->
    <section class="mb-12">
      <com-item
        title="External Control"
        description="Programmatic control via selectedIndex binding"
        icon="settings"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="mb-4 flex gap-2">
          <button comButton size="sm" (click)="currentTab.set(0)">
            Go to Tab 1
          </button>
          <button comButton variant="outline" color="muted" size="sm" (click)="currentTab.set(1)">
            Go to Tab 2
          </button>
          <button comButton variant="outline" color="muted" size="sm" (click)="currentTab.set(2)">
            Go to Tab 3
          </button>
          <span class="ml-4 flex items-center text-sm text-muted-foreground">
            Selected: Tab {{ currentTab() + 1 }}
          </span>
        </div>
        <com-tab-group [(selectedIndex)]="currentTab">
          <com-tab label="First">
            <div class="py-4 text-foreground">First tab content.</div>
          </com-tab>
          <com-tab label="Second">
            <div class="py-4 text-foreground">Second tab content.</div>
          </com-tab>
          <com-tab label="Third">
            <div class="py-4 text-foreground">Third tab content.</div>
          </com-tab>
        </com-tab-group>
      </com-card>
    </section>

    <!-- Lazy Loading Demo -->
    <section>
      <com-item
        title="Lazy Loading"
        description="Defer rendering until tab is first activated"
        icon="zap"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <com-tab-group>
          <com-tab label="Eager">
            <div class="py-4 text-foreground">
              This content loads immediately. Timestamp: {{ eagerTimestamp }}
            </div>
          </com-tab>
          <com-tab label="Lazy">
            <ng-template comTabContent>
              <div class="py-4 text-foreground">
                This content was lazily rendered on first activation.
                Timestamp: {{ lazyTimestamp }}
              </div>
            </ng-template>
          </com-tab>
        </com-tab-group>
      </com-card>
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
