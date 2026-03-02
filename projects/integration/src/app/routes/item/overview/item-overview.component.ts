import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComItem, ComItemTrailing } from 'ngx-com/components/item';
import { ComIcon } from 'ngx-com/components/icon';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-item-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComItem, ComItemTrailing, ComIcon, ComCard, CodeBlock],
  template: `
    <!-- Page Header -->
    <section class="mb-12">
      <div class="rounded-xl bg-primary-subtle p-6">
        <com-item
          title="Dashboard"
          icon="sparkles"
          iconColor="accent"
          size="lg"
        />
      </div>
    </section>

    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Device List"
        description="Common use case for displaying a list of items"
        icon="settings"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-2">
          <com-item
            title="Dexcom G7"
            description="109123c2d2194bffe519b03ceb51730d5064f9de46c54c4e..."
            icon="settings"
          />
          <com-item
            title="Blood Pressure Monitor"
            description="Connected via Bluetooth"
            icon="heart"
            iconColor="accent"
          />
          <com-item
            title="Alert Configuration"
            description="Manage your notification preferences"
            icon="alert-triangle"
            iconColor="warn"
          />
        </div>
      </com-card>
    </section>

    <!-- Interactive Demo -->
    <section class="mb-12">
      <com-item
        title="Interactive Items"
        description="Clickable items with hover states and trailing chevrons"
        icon="user"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Bluetooth Settings"
            description="Manage paired devices"
            icon="settings"
            [interactive]="true"
          >
            <ng-template comItemTrailing>
              <com-icon name="chevron-right" size="sm" color="muted" />
            </ng-template>
          </com-item>
          <com-item
            title="Account Settings"
            description="Update your profile information"
            icon="user"
            [interactive]="true"
          >
            <ng-template comItemTrailing>
              <com-icon name="chevron-right" size="sm" color="muted" />
            </ng-template>
          </com-item>
          <com-item
            title="Delete Account"
            description="Permanently remove your data"
            icon="trash-2"
            iconColor="warn"
            [interactive]="true"
          >
            <ng-template comItemTrailing>
              <com-icon name="chevron-right" size="sm" color="muted" />
            </ng-template>
          </com-item>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the component in your templates"
        icon="info"
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
        description="What makes com-item powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="5 Content Zones"
            description="Leading visual, title, inline suffix, description, and trailing content"
            icon="settings"
          />
          <com-item
            title="Smart Defaults"
            description="Icons automatically render inside a soft, rounded avatar container"
            icon="sparkles"
            iconColor="accent"
          />
          <com-item
            title="3 Sizes"
            description="Small for dropdowns, medium for lists, large for headers"
            icon="settings"
          />
          <com-item
            title="3 Densities"
            description="Compact, default, and comfortable padding for any context"
            icon="settings"
          />
          <com-item
            title="Interactive Mode"
            description="Enable hover, active, and focus states for clickable items"
            icon="user"
          />
          <com-item
            title="Full Customization"
            description="Five projection directives for complete control over each zone"
            icon="star"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Use Cases -->
    <section>
      <com-item
        title="Use Cases"
        description="Where to use the item component"
        icon="check-circle"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="List rows"
            description="Device lists, settings menus, search results"
            icon="settings"
          />
          <com-item
            title="Page headers"
            description="Section headers with icons and badges"
            icon="star"
            iconColor="accent"
          />
          <com-item
            title="Dropdown menus"
            description="Compact density with interactive states"
            icon="settings"
          />
          <com-item
            title="Card headers"
            description="Title + description + trailing action"
            icon="info"
          />
          <com-item
            title="Nav items"
            description="Active states for selected navigation"
            icon="user"
          />
        </div>
      </com-card>
    </section>
  `,
})
export class ItemOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComItem, ComItemTrailing } from 'ngx-com/components/item';
import { ComIcon } from 'ngx-com/components/icon';

@Component({
  selector: 'app-example',
  imports: [ComItem, ComItemTrailing, ComIcon],
  template: \`
    <!-- Simple text-only item -->
    <com-item title="Select all" />

    <!-- Icon + title + description -->
    <com-item
      title="Dexcom G7"
      description="Connected device"
      icon="smartphone"
    />

    <!-- Interactive with trailing -->
    <com-item
      title="Settings"
      icon="settings"
      [interactive]="true"
    >
      <ng-template comItemTrailing>
        <com-icon name="chevron-right" size="sm" color="muted" />
      </ng-template>
    </com-item>
  \`,
})
export class Example {}`;
}
