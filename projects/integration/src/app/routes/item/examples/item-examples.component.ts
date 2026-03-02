import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ComItem,
  ComItemLeading,
  ComItemSuffix,
  ComItemTrailing,
} from 'ngx-com/components/item';
import { ComAvatar } from 'ngx-com/components/avatar';
import { ComIcon } from 'ngx-com/components/icon';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-item-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComItem,
    ComItemLeading,
    ComItemSuffix,
    ComItemTrailing,
    ComAvatar,
    ComIcon,
    ComCard,
    CodeBlock,
  ],
  template: `
    <!-- Sizes -->
    <section class="mb-12">
      <com-item
        title="Sizes"
        description="Three sizes for different contexts: small for dropdowns, medium for lists, large for headers"
        icon="settings"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-4">
          <div>
            <span class="mb-2 block text-xs text-surface-500">Small (sm)</span>
            <com-item
              title="Compact item"
              description="For dropdowns and dense lists"
              icon="star"
              size="sm"
            />
          </div>
          <div>
            <span class="mb-2 block text-xs text-surface-500">Medium (md) - default</span>
            <com-item
              title="Default item"
              description="Standard size for most use cases"
              icon="star"
              size="md"
            />
          </div>
          <div>
            <span class="mb-2 block text-xs text-surface-500">Large (lg)</span>
            <com-item
              title="Page Header Item"
              description="For section headers and prominent displays"
              icon="star"
              size="lg"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Densities -->
    <section class="mb-12">
      <com-item
        title="Densities"
        description="Control vertical padding independent of size"
        icon="settings"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-4">
          <div>
            <span class="mb-2 block text-xs text-surface-500">Compact</span>
            <com-item title="Compact density" icon="settings" density="compact" />
          </div>
          <div>
            <span class="mb-2 block text-xs text-surface-500">Default</span>
            <com-item title="Default density" icon="settings" density="default" />
          </div>
          <div>
            <span class="mb-2 block text-xs text-surface-500">Comfortable</span>
            <com-item title="Comfortable density" icon="settings" density="comfortable" />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="densitiesCode" />
    </section>

    <!-- Icon Colors -->
    <section class="mb-12">
      <com-item
        title="Icon Colors"
        description="Match your icon color to semantic meaning"
        icon="heart"
        iconColor="accent"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-2">
          <com-item title="Primary action" icon="star" iconColor="primary" />
          <com-item title="Secondary action" icon="heart" iconColor="accent" />
          <com-item title="Warning state" icon="alert-triangle" iconColor="warn" />
          <com-item title="Neutral state" icon="info" iconColor="muted" />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Interactive States -->
    <section class="mb-12">
      <com-item
        title="Interactive States"
        description="Enable hover, active, and focus states for clickable items"
        icon="user"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Dashboard"
            icon="sparkles"
            [interactive]="true"
            [active]="activeItem() === 'dashboard'"
            (click)="activeItem.set('dashboard')"
          />
          <com-item
            title="Settings"
            icon="settings"
            [interactive]="true"
            [active]="activeItem() === 'settings'"
            (click)="activeItem.set('settings')"
          />
          <com-item
            title="Account"
            icon="user"
            [interactive]="true"
            [active]="activeItem() === 'account'"
            (click)="activeItem.set('account')"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="interactiveCode" />
    </section>

    <!-- Custom Leading -->
    <section class="mb-12">
      <com-item
        title="Custom Leading"
        description="Replace the default icon avatar with any custom content"
        icon="user"
        iconColor="accent"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-2">
          <com-item title="Jane Doe" description="jane.doe&#64;example.com">
            <ng-template comItemLeading>
              <com-avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" size="sm" />
            </ng-template>
          </com-item>
          <com-item title="John Smith" description="Engineering Lead">
            <ng-template comItemLeading>
              <com-avatar name="John Smith" size="sm" color="accent" />
            </ng-template>
          </com-item>
          <com-item title="3 collaborators">
            <ng-template comItemLeading>
              <div class="flex -space-x-2">
                <com-avatar name="A" size="xs" variant="outline" />
                <com-avatar name="B" size="xs" variant="outline" />
                <com-avatar name="+1" size="xs" variant="outline" color="muted" />
              </div>
            </ng-template>
          </com-item>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="customLeadingCode" />
    </section>

    <!-- Suffix Content -->
    <section class="mb-12">
      <com-item
        title="Inline Suffix"
        description="Add badges, tags, or status indicators after the title"
        icon="star"
        iconColor="accent"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-2">
          <com-item
            title="My BP Datasource"
            description="View and manage configuration"
            icon="heart"
            iconColor="accent"
          >
            <ng-template comItemSuffix>
              <span class="inline-flex items-center rounded-full border border-primary/30 bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary-subtle-foreground">
                Bluetooth
              </span>
            </ng-template>
          </com-item>
          <com-item
            title="API Endpoint"
            description="Production server"
            icon="settings"
          >
            <ng-template comItemSuffix>
              <span class="inline-flex items-center gap-1 text-xs text-success">
                <span class="size-1.5 rounded-full bg-success"></span>
                Online
              </span>
            </ng-template>
          </com-item>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="suffixCode" />
    </section>

    <!-- Trailing Content -->
    <section class="mb-12">
      <com-item
        title="Trailing Content"
        description="Add actions, chevrons, or metadata at the far right"
        icon="chevron-right"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Notifications"
            description="Manage your alerts"
            icon="settings"
            [interactive]="true"
          >
            <ng-template comItemTrailing>
              <com-icon name="chevron-right" size="sm" color="muted" />
            </ng-template>
          </com-item>
          <com-item
            title="Last synced"
            description="Device data"
            icon="clock"
          >
            <ng-template comItemTrailing>
              <span class="text-sm text-muted-foreground">2 min ago</span>
            </ng-template>
          </com-item>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="trailingCode" />
    </section>

    <!-- Disabled State -->
    <section class="mb-12">
      <com-item
        title="Disabled State"
        description="Dim items that are not currently available"
        icon="x-circle"
        iconColor="muted"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-2">
          <com-item
            title="Enterprise Features"
            description="Available on Enterprise plan"
            icon="sparkles"
            [disabled]="true"
          />
          <com-item
            title="Premium Analytics"
            description="Upgrade to unlock"
            icon="star"
            [disabled]="true"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Text Only -->
    <section>
      <com-item
        title="Text Only"
        description="Simple items without icons for menu options"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item title="Select all" [interactive]="true" density="compact" />
          <com-item title="Copy" [interactive]="true" density="compact" />
          <com-item title="Paste" [interactive]="true" density="compact" />
          <com-item title="Delete" [interactive]="true" density="compact" />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="textOnlyCode" />
    </section>
  `,
})
export class ItemExamples {
  protected readonly activeItem = signal<string>('dashboard');

  protected readonly sizesCode = `<com-item title="Small" icon="star" size="sm" />
<com-item title="Medium" icon="star" size="md" />  <!-- default -->
<com-item title="Large" icon="star" size="lg" />`;

  protected readonly densitiesCode = `<com-item title="Compact" icon="settings" density="compact" />
<com-item title="Default" icon="settings" density="default" />
<com-item title="Comfortable" icon="settings" density="comfortable" />`;

  protected readonly colorsCode = `<com-item title="Primary" icon="star" iconColor="primary" />
<com-item title="Accent" icon="heart" iconColor="accent" />
<com-item title="Warning" icon="alert-triangle" iconColor="warn" />
<com-item title="Muted" icon="info" iconColor="muted" />`;

  protected readonly interactiveCode = `<com-item
  title="Dashboard"
  icon="sparkles"
  [interactive]="true"
  [active]="currentRoute === 'dashboard'"
  (click)="navigate('dashboard')"
/>`;

  protected readonly customLeadingCode = `<!-- User avatar -->
<com-item title="Jane Doe" description="jane@example.com">
  <ng-template comItemLeading>
    <com-avatar src="/photos/jane.jpg" name="Jane Doe" size="sm" />
  </ng-template>
</com-item>

<!-- Avatar stack -->
<com-item title="3 collaborators">
  <ng-template comItemLeading>
    <div class="flex -space-x-2">
      <com-avatar name="A" size="xs" variant="outline" />
      <com-avatar name="B" size="xs" variant="outline" />
      <com-avatar name="+1" size="xs" variant="outline" color="muted" />
    </div>
  </ng-template>
</com-item>`;

  protected readonly suffixCode = `<com-item title="Datasource" icon="heart">
  <ng-template comItemSuffix>
    <span class="badge">Bluetooth</span>
  </ng-template>
</com-item>`;

  protected readonly trailingCode = `<com-item title="Settings" icon="settings" [interactive]="true">
  <ng-template comItemTrailing>
    <com-icon name="chevron-right" size="sm" color="muted" />
  </ng-template>
</com-item>

<com-item title="Last synced" icon="clock">
  <ng-template comItemTrailing>
    <span class="text-sm text-muted-foreground">2 min ago</span>
  </ng-template>
</com-item>`;

  protected readonly disabledCode = `<com-item
  title="Enterprise Features"
  description="Available on Enterprise plan"
  icon="sparkles"
  [disabled]="true"
/>`;

  protected readonly textOnlyCode = `<com-item title="Select all" [interactive]="true" density="compact" />
<com-item title="Copy" [interactive]="true" density="compact" />
<com-item title="Paste" [interactive]="true" density="compact" />`;
}
