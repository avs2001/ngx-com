import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComSegmentedControl, ComSegmentDef } from 'ngx-com/components/segmented-control';
import type { SegmentOption } from 'ngx-com/components/segmented-control';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-segmented-control-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSegmentedControl, ComSegmentDef, ComCard, CodeBlock],
  template: `
    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Three sizes with proportional height, padding, and typography.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center gap-4">
            <span class="w-12 text-sm text-surface-500">sm</span>
            <com-segmented-control
              [options]="sizeOptions"
              [(value)]="sizeValue"
              size="sm"
              aria-label="Size small demo"
            />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-12 text-sm text-surface-500">md</span>
            <com-segmented-control
              [options]="sizeOptions"
              [(value)]="sizeValue"
              size="md"
              aria-label="Size medium demo"
            />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-12 text-sm text-surface-500">lg</span>
            <com-segmented-control
              [options]="sizeOptions"
              [(value)]="sizeValue"
              size="lg"
              aria-label="Size large demo"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Colors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Colors</h2>
      <p class="mb-4 text-surface-600">
        Three color schemes using semantic tokens.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center gap-4">
            <span class="w-16 text-sm text-surface-500">primary</span>
            <com-segmented-control
              [options]="colorOptions"
              [(value)]="colorValue"
              color="primary"
              aria-label="Primary color demo"
            />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-16 text-sm text-surface-500">accent</span>
            <com-segmented-control
              [options]="colorOptions"
              [(value)]="colorValue"
              color="accent"
              aria-label="Accent color demo"
            />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-16 text-sm text-surface-500">muted</span>
            <com-segmented-control
              [options]="colorOptions"
              [(value)]="colorValue"
              color="muted"
              aria-label="Muted color demo"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <p class="mb-4 text-surface-600">
        Filled (default) uses a solid background; outline uses a ring border.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center gap-4">
            <span class="w-16 text-sm text-surface-500">filled</span>
            <com-segmented-control
              [options]="variantOptions"
              [(value)]="variantValue"
              variant="filled"
              aria-label="Filled variant demo"
            />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-16 text-sm text-surface-500">outline</span>
            <com-segmented-control
              [options]="variantOptions"
              [(value)]="variantValue"
              variant="outline"
              aria-label="Outline variant demo"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="variantsCode" />
    </section>

    <!-- Full Width -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Full Width</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">fullWidth</code> to make segments stretch equally.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="mx-auto max-w-md">
          <com-segmented-control
            [options]="viewOptions"
            [(value)]="viewValue"
            [fullWidth]="true"
            aria-label="View selection"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="fullWidthCode" />
    </section>

    <!-- Disabled Options -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled Options</h2>
      <p class="mb-4 text-surface-600">
        Individual options can be disabled. They are skipped during keyboard navigation.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-segmented-control
            [options]="planOptions"
            [(value)]="planValue"
            color="primary"
            aria-label="Plan selection"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Multiple Options -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Multiple Options</h2>
      <p class="mb-4 text-surface-600">
        Supports any number of options (2, 3, 4, 5+).
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <com-segmented-control
            [options]="periodOptions"
            [(value)]="periodValue"
            color="accent"
            aria-label="Period selection"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="multipleCode" />
    </section>

    <!-- Custom Template: Icons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Template: Icons</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">ng-template[comSegmentDef]</code> for custom content.
        The <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">label</code> is used for accessibility.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <com-segmented-control
            [options]="viewIconOptions"
            [(value)]="viewIconValue"
            size="sm"
            aria-label="View mode"
          >
            <ng-template comSegmentDef let-option>
              @if (option.value === 'grid') {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              } @else {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              }
            </ng-template>
          </com-segmented-control>

          <com-segmented-control
            [options]="alignOptions"
            [(value)]="alignValue"
            size="sm"
            aria-label="Text alignment"
          >
            <ng-template comSegmentDef let-option>
              @switch (option.value) {
                @case ('left') {
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="17" y1="10" x2="3" y2="10"/>
                    <line x1="21" y1="6" x2="3" y2="6"/>
                    <line x1="21" y1="14" x2="3" y2="14"/>
                    <line x1="17" y1="18" x2="3" y2="18"/>
                  </svg>
                }
                @case ('center') {
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="10" x2="6" y2="10"/>
                    <line x1="21" y1="6" x2="3" y2="6"/>
                    <line x1="21" y1="14" x2="3" y2="14"/>
                    <line x1="18" y1="18" x2="6" y2="18"/>
                  </svg>
                }
                @case ('right') {
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="21" y1="10" x2="7" y2="10"/>
                    <line x1="21" y1="6" x2="3" y2="6"/>
                    <line x1="21" y1="14" x2="3" y2="14"/>
                    <line x1="21" y1="18" x2="7" y2="18"/>
                  </svg>
                }
              }
            </ng-template>
          </com-segmented-control>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="iconTemplateCode" />
    </section>

    <!-- Custom Template: Icon + Text -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Template: Icon + Text</h2>
      <p class="mb-4 text-surface-600">
        Combine icons with text labels.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-segmented-control
            [options]="viewIconOptions"
            [(value)]="viewIconValue"
            color="primary"
            aria-label="View mode with labels"
          >
            <ng-template comSegmentDef let-option>
              @if (option.value === 'grid') {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              } @else {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              }
              <span>{{ option.label }}</span>
            </ng-template>
          </com-segmented-control>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="iconTextTemplateCode" />
    </section>

    <!-- Custom Template: Badges -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Template: Badges</h2>
      <p class="mb-4 text-surface-600">
        Use the <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">active</code> context to style badges differently.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-segmented-control
            [options]="statusOptions"
            [(value)]="statusValue"
            color="accent"
            aria-label="Status filter"
          >
            <ng-template comSegmentDef let-option let-active="active">
              <span>{{ option.label }}</span>
              <span
                class="ml-1.5 rounded-pill px-1.5 text-xs"
                [class]="active ? 'bg-accent-foreground/20 text-accent-foreground' : 'bg-muted text-muted-foreground'"
              >
                {{ option.value === 'open' ? openCount : closedCount }}
              </span>
            </ng-template>
          </com-segmented-control>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="badgeTemplateCode" />
    </section>

    <!-- Use Cases -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Common Use Cases</h2>
      <com-card variant="outlined" class="p-8">
        <div class="space-y-8">
          <!-- View Toggle -->
          <div class="border-b border-surface-100 pb-8">
            <h3 class="mb-4 font-medium text-surface-900">View Toggle</h3>
            <com-segmented-control
              [options]="viewIconOptions"
              [(value)]="viewIconValue"
              size="sm"
              aria-label="View mode"
            >
              <ng-template comSegmentDef let-option>
                @if (option.value === 'grid') {
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                } @else {
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                }
              </ng-template>
            </com-segmented-control>
          </div>

          <!-- Time Period Filter -->
          <div class="border-b border-surface-100 pb-8">
            <h3 class="mb-4 font-medium text-surface-900">Time Period Filter</h3>
            <com-segmented-control
              [options]="periodOptions"
              [(value)]="periodValue"
              color="accent"
              aria-label="Time period"
            />
          </div>

          <!-- Role Selection -->
          <div>
            <h3 class="mb-4 font-medium text-surface-900">Role Selection</h3>
            <com-segmented-control
              [options]="[
                { value: 'viewer', label: 'Viewer' },
                { value: 'editor', label: 'Editor' },
                { value: 'admin', label: 'Admin' }
              ]"
              [(value)]="roleValue"
              color="primary"
              aria-label="User role"
            />
          </div>
        </div>
      </com-card>
    </section>
  `,
})
export class SegmentedControlExamples {
  // Size demo
  protected readonly sizeOptions: SegmentOption<string>[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];
  protected readonly sizeValue = signal('week');

  // Color demo
  protected readonly colorOptions: SegmentOption<string>[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ];
  protected readonly colorValue = signal('all');

  // Variant demo
  protected readonly variantOptions: SegmentOption<string>[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  protected readonly variantValue = signal('monthly');

  // Full width demo
  protected readonly viewOptions: SegmentOption<string>[] = [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
  ];
  protected readonly viewValue = signal('overview');

  // Disabled demo
  protected readonly planOptions: SegmentOption<string>[] = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ];
  protected readonly planValue = signal('free');

  // Multiple options demo
  protected readonly periodOptions: SegmentOption<string>[] = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'quarter', label: 'Quarter' },
    { value: 'year', label: 'Year' },
  ];
  protected readonly periodValue = signal('month');

  // Icon template demo
  protected readonly viewIconOptions: SegmentOption<string>[] = [
    { value: 'grid', label: 'Grid View' },
    { value: 'list', label: 'List View' },
  ];
  protected readonly viewIconValue = signal('grid');

  // Alignment demo
  protected readonly alignOptions: SegmentOption<string>[] = [
    { value: 'left', label: 'Align left' },
    { value: 'center', label: 'Align center' },
    { value: 'right', label: 'Align right' },
  ];
  protected readonly alignValue = signal('left');

  // Badge demo
  protected readonly statusOptions: SegmentOption<string>[] = [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
  ];
  protected readonly statusValue = signal('open');
  protected readonly openCount = 12;
  protected readonly closedCount = 48;

  // Role demo
  protected readonly roleValue = signal('editor');

  // Code examples
  protected readonly sizesCode = `<com-segmented-control [options]="options" [(value)]="value" size="sm" />
<com-segmented-control [options]="options" [(value)]="value" size="md" />
<com-segmented-control [options]="options" [(value)]="value" size="lg" />`;

  protected readonly colorsCode = `<com-segmented-control [options]="options" [(value)]="value" color="primary" />
<com-segmented-control [options]="options" [(value)]="value" color="accent" />
<com-segmented-control [options]="options" [(value)]="value" color="muted" />`;

  protected readonly variantsCode = `<com-segmented-control [options]="options" [(value)]="value" variant="filled" />
<com-segmented-control [options]="options" [(value)]="value" variant="outline" />`;

  protected readonly fullWidthCode = `<com-segmented-control
  [options]="options"
  [(value)]="value"
  [fullWidth]="true"
/>`;

  protected readonly disabledCode = `options = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

<com-segmented-control [options]="options" [(value)]="value" />`;

  protected readonly multipleCode = `options = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'year', label: 'Year' },
];

<com-segmented-control [options]="options" [(value)]="value" color="accent" />`;

  protected readonly iconTemplateCode = `<com-segmented-control
  [options]="[
    { value: 'grid', label: 'Grid View' },
    { value: 'list', label: 'List View' }
  ]"
  [(value)]="viewMode"
  size="sm"
>
  <ng-template comSegmentDef let-option>
    @if (option.value === 'grid') {
      <svg class="h-4 w-4">...</svg>
    } @else {
      <svg class="h-4 w-4">...</svg>
    }
  </ng-template>
</com-segmented-control>`;

  protected readonly iconTextTemplateCode = `<com-segmented-control [options]="options" [(value)]="value" color="primary">
  <ng-template comSegmentDef let-option>
    <svg class="h-4 w-4">...</svg>
    <span>{{ option.label }}</span>
  </ng-template>
</com-segmented-control>`;

  protected readonly badgeTemplateCode = `<com-segmented-control [options]="statusOptions" [(value)]="status" color="accent">
  <ng-template comSegmentDef let-option let-active="active">
    <span>{{ option.label }}</span>
    <span
      class="ml-1.5 rounded-pill px-1.5 text-xs"
      [class]="active
        ? 'bg-accent-foreground/20 text-accent-foreground'
        : 'bg-muted text-muted-foreground'"
    >
      {{ option.value === 'open' ? openCount : closedCount }}
    </span>
  </ng-template>
</com-segmented-control>`;
}
