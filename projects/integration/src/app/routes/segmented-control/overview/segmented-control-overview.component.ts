import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComSegmentedControl } from 'ngx-com/components/segmented-control';
import type { SegmentOption } from 'ngx-com/components/segmented-control';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-segmented-control-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSegmentedControl, ComCard, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <com-segmented-control
            [options]="roleOptions"
            [(value)]="selectedRole"
            aria-label="Select role"
          />
          <p class="text-sm text-surface-600">
            Selected: <strong class="text-surface-900">{{ selectedRole() }}</strong>
          </p>
        </div>
      </com-card>
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
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Two Rendering Modes</h3>
          <p class="text-sm text-surface-600">
            Simple label mode or custom templates for icons, badges, and rich content.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Two-Way Binding</h3>
          <p class="text-sm text-surface-600">
            Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[(value)]</code> for reactive state.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Keyboard Navigation</h3>
          <p class="text-sm text-surface-600">
            Arrow keys, Home/End with roving tabindex for accessibility.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Disabled Options</h3>
          <p class="text-sm text-surface-600">
            Individual options can be disabled and are skipped during navigation.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">3 Sizes</h3>
          <p class="text-sm text-surface-600">
            Small, medium, and large with proportional spacing.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Theme Aware</h3>
          <p class="text-sm text-surface-600">
            Uses semantic tokens for automatic dark mode and theme support.
          </p>
        </com-card>
      </div>
    </section>

    <!-- When to Use -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">When to Use</h2>
      <com-card variant="outlined" class="p-6">
        <p class="mb-4 text-surface-600">
          Segmented controls are ideal for:
        </p>
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <strong class="text-surface-900">View switching:</strong> Toggle between grid/list views,
            daily/weekly/monthly calendars
          </li>
          <li>
            <strong class="text-surface-900">Filtering:</strong> Open/closed tickets, all/active/completed tasks
          </li>
          <li>
            <strong class="text-surface-900">Settings:</strong> Light/dark/system theme, role selection
          </li>
          <li>
            <strong class="text-surface-900">Data scope:</strong> Today/week/month/year ranges
          </li>
        </ul>
        <p class="mt-4 text-surface-600">
          <strong class="text-surface-900">Not for:</strong> Tabs with associated content panels (use Tabs),
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
