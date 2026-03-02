import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComSegmentedControl } from 'ngx-com/components/segmented-control';
import type { SegmentOption } from 'ngx-com/components/segmented-control';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-segmented-control-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSegmentedControl, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Interactive segmented control with two-way binding"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <com-segmented-control
            [options]="roleOptions"
            [(value)]="selectedRole"
            aria-label="Select role"
          />
          <p class="text-sm text-muted-foreground">
            Selected: <strong class="text-foreground">{{ selectedRole() }}</strong>
          </p>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the component in your templates"
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
        description="What makes com-segmented-control powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Two Rendering Modes"
            description="Simple label mode or custom templates for icons, badges, and rich content"
            icon="layout"
          />
          <com-item
            title="Two-Way Binding"
            description="Use [(value)] for reactive state management"
            icon="refresh-cw"
            iconColor="accent"
          />
          <com-item
            title="Keyboard Navigation"
            description="Arrow keys, Home/End with roving tabindex for accessibility"
            icon="keyboard"
          />
          <com-item
            title="Disabled Options"
            description="Individual options can be disabled and are skipped during navigation"
            icon="ban"
            iconColor="accent"
          />
          <com-item
            title="3 Sizes"
            description="Small, medium, and large with proportional spacing"
            icon="maximize"
          />
          <com-item
            title="Theme Aware"
            description="Uses semantic tokens for automatic dark mode and theme support"
            icon="sun-moon"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- When to Use -->
    <section>
      <com-item
        title="When to Use"
        description="Guidelines for effective segmented control usage"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <p class="mb-4 text-foreground">
          Segmented controls are ideal for:
        </p>
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>View switching:</strong> Toggle between grid/list views,
            daily/weekly/monthly calendars
          </li>
          <li>
            <strong>Filtering:</strong> Open/closed tickets, all/active/completed tasks
          </li>
          <li>
            <strong>Settings:</strong> Light/dark/system theme, role selection
          </li>
          <li>
            <strong>Data scope:</strong> Today/week/month/year ranges
          </li>
        </ul>
        <p class="mt-4 text-foreground">
          <strong>Not for:</strong> Tabs with associated content panels (use Tabs),
          multi-select (use checkboxes), long option lists (use dropdown/select).
        </p>
      </com-card>
    </section>
  `,
})
export class SegmentedControlOverview {
  protected readonly roleOptions: SegmentOption<string>[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ];

  protected readonly selectedRole = signal('admin');

  protected readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { ComSegmentedControl } from 'ngx-com/components/segmented-control';
import type { SegmentOption } from 'ngx-com/components/segmented-control';

@Component({
  selector: 'app-example',
  imports: [ComSegmentedControl],
  template: \`
    <com-segmented-control
      [options]="options"
      [(value)]="selected"
      aria-label="Select role"
    />
  \`,
})
export class Example {
  options: SegmentOption<string>[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ];

  selected = signal('admin');
}`;
}
