import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComIcon, type IconColor, type IconSize } from 'ngx-com/components/icon';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-icon-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComIcon, ComButton, ComCard, CodeBlock],
  template: `
    <!-- Colors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Colors</h2>
      <p class="mb-4 text-surface-600">
        Seven semantic color variants. The default <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">current</code> inherits from the parent.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" />
            <span class="text-xs text-surface-500">current</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" color="primary" />
            <span class="text-xs text-surface-500">primary</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" color="accent" />
            <span class="text-xs text-surface-500">accent</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" color="warn" />
            <span class="text-xs text-surface-500">warn</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" color="success" />
            <span class="text-xs text-surface-500">success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" color="muted" />
            <span class="text-xs text-surface-500">muted</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" color="disabled" />
            <span class="text-xs text-surface-500">disabled</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Six sizes from 12px to 40px, mapped to dedicated CSS tokens for consistent scaling.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-end justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="xs" color="primary" />
            <span class="text-xs text-surface-500">xs (12px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="sm" color="primary" />
            <span class="text-xs text-surface-500">sm (16px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="md" color="primary" />
            <span class="text-xs text-surface-500">md (20px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="lg" color="primary" />
            <span class="text-xs text-surface-500">lg (24px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="xl" color="primary" />
            <span class="text-xs text-surface-500">xl (32px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="2xl" color="primary" />
            <span class="text-xs text-surface-500">2xl (40px)</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Stroke Width -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Stroke Width</h2>
      <p class="mb-4 text-surface-600">
        Customize stroke thickness. Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">absoluteStrokeWidth</code> to prevent scaling with size.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="xl" [strokeWidth]="1" color="primary" />
            <span class="text-xs text-surface-500">strokeWidth=1</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="xl" [strokeWidth]="1.5" color="primary" />
            <span class="text-xs text-surface-500">strokeWidth=1.5</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="xl" [strokeWidth]="2" color="primary" />
            <span class="text-xs text-surface-500">strokeWidth=2 (default)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="xl" [strokeWidth]="2.5" color="primary" />
            <span class="text-xs text-surface-500">strokeWidth=2.5</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" size="xl" [strokeWidth]="3" color="primary" />
            <span class="text-xs text-surface-500">strokeWidth=3</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="strokeWidthCode" />
    </section>

    <!-- Inline with Text -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inline with Text</h2>
      <p class="mb-4 text-surface-600">
        Icons scale and color appropriately when placed inline with text.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col gap-4">
          <p class="flex items-center gap-1.5 text-sm">
            <com-icon name="check-circle" size="sm" color="success" />
            Task completed successfully
          </p>
          <p class="flex items-center gap-1.5 text-base">
            <com-icon name="alert-triangle" size="md" color="warn" />
            Warning: This action cannot be undone
          </p>
          <p class="flex items-center gap-2 text-lg">
            <com-icon name="info" size="lg" color="muted" />
            Additional information about this feature
          </p>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="inlineCode" />
    </section>

    <!-- With Buttons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">With Buttons</h2>
      <p class="mb-4 text-surface-600">
        Combine icons with buttons for common UI patterns.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton>
            <com-icon name="plus" size="sm" /> Add Item
          </button>
          <button comButton variant="outline" color="accent">
            <com-icon name="heart" size="sm" /> Like
          </button>
          <button comButton variant="ghost" color="warn">
            <com-icon name="trash-2" size="sm" /> Delete
          </button>
          <button comButton size="icon" variant="outline" color="muted" aria-label="Settings">
            <com-icon name="settings" />
          </button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="buttonsCode" />
    </section>

    <!-- Dynamic Example -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Dynamic Properties</h2>
      <p class="mb-4 text-surface-600">
        Bind color and size dynamically based on application state.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <com-icon name="star" [color]="selectedColor()" [size]="selectedSize()" />
          <div class="flex flex-wrap justify-center gap-2">
            @for (color of colors; track color) {
              <button
                comButton
                type="button"
                size="sm"
                [variant]="selectedColor() === color ? 'solid' : 'outline'"
                [color]="selectedColor() === color ? 'primary' : 'muted'"
                (click)="selectedColor.set(color)"
              >
                {{ color }}
              </button>
            }
          </div>
          <div class="flex flex-wrap justify-center gap-2">
            @for (size of sizes; track size) {
              <button
                comButton
                type="button"
                size="sm"
                [variant]="selectedSize() === size ? 'solid' : 'outline'"
                [color]="selectedSize() === size ? 'primary' : 'muted'"
                (click)="selectedSize.set(size)"
              >
                {{ size }}
              </button>
            }
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="typescript" [code]="dynamicCode" />
    </section>

    <!-- Accessible Icons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accessible Icons</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">ariaLabel</code> for icons that convey meaning.
        Decorative icons are automatically hidden from screen readers.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <com-icon name="check-circle" color="success" ariaLabel="Success: Operation completed" />
            <span class="text-xs text-surface-500">With ariaLabel</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-icon name="star" color="primary" />
            <span class="text-xs text-surface-500">Decorative (hidden)</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="accessibleCode" />
    </section>

    <!-- Common Use Cases -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Common Use Cases</h2>
      <com-card variant="outlined" class="p-8">
        <div class="space-y-6">
          <!-- Status indicator -->
          <div class="flex items-center justify-between border-b border-surface-100 pb-4">
            <div>
              <h3 class="font-medium text-surface-900">Server Status</h3>
              <p class="text-sm text-surface-500">Production environment</p>
            </div>
            <div class="flex items-center gap-1.5 text-sm font-medium text-success">
              <com-icon name="check-circle" size="sm" color="success" />
              Healthy
            </div>
          </div>

          <!-- Warning message -->
          <div class="flex items-center justify-between border-b border-surface-100 pb-4">
            <div>
              <h3 class="font-medium text-surface-900">Disk Usage</h3>
              <p class="text-sm text-surface-500">85% of 500GB used</p>
            </div>
            <div class="flex items-center gap-1.5 text-sm font-medium text-warn">
              <com-icon name="alert-triangle" size="sm" color="warn" />
              Warning
            </div>
          </div>

          <!-- Info message -->
          <div class="flex items-center justify-between border-b border-surface-100 pb-4">
            <div>
              <h3 class="font-medium text-surface-900">Last Backup</h3>
              <p class="text-sm text-surface-500">2 hours ago</p>
            </div>
            <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
              <com-icon name="clock" size="sm" color="muted" />
              Scheduled
            </div>
          </div>

          <!-- Feature highlight -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-surface-900">New Feature</h3>
              <p class="text-sm text-surface-500">Dark mode support</p>
            </div>
            <div class="flex items-center gap-1.5 text-sm font-medium text-accent">
              <com-icon name="sparkles" size="sm" color="accent" />
              New
            </div>
          </div>
        </div>
      </com-card>
    </section>
  `,
})
export class IconExamples {
  protected readonly colors: IconColor[] = ['current', 'primary', 'accent', 'warn', 'success', 'muted', 'disabled'];
  protected readonly sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  protected readonly selectedColor = signal<IconColor>('primary');
  protected readonly selectedSize = signal<IconSize>('lg');

  protected readonly colorsCode = `<com-icon name="star" />                  <!-- current (inherit) -->
<com-icon name="star" color="primary" />
<com-icon name="star" color="accent" />
<com-icon name="star" color="warn" />
<com-icon name="star" color="success" />
<com-icon name="star" color="muted" />
<com-icon name="star" color="disabled" />`;

  protected readonly sizesCode = `<com-icon name="star" size="xs" />   <!-- 12px -->
<com-icon name="star" size="sm" />   <!-- 16px -->
<com-icon name="star" size="md" />   <!-- 20px -->
<com-icon name="star" size="lg" />   <!-- 24px (default) -->
<com-icon name="star" size="xl" />   <!-- 32px -->
<com-icon name="star" size="2xl" />  <!-- 40px -->`;

  protected readonly strokeWidthCode = `<com-icon name="star" [strokeWidth]="1" />
<com-icon name="star" [strokeWidth]="1.5" />
<com-icon name="star" [strokeWidth]="2" />     <!-- default -->
<com-icon name="star" [strokeWidth]="2.5" />
<com-icon name="star" [strokeWidth]="3" />

<!-- Prevent stroke scaling with icon size -->
<com-icon name="star" size="xl" [absoluteStrokeWidth]="true" />`;

  protected readonly inlineCode = `<p class="flex items-center gap-1.5 text-sm">
  <com-icon name="check-circle" size="sm" color="success" />
  Task completed successfully
</p>
<p class="flex items-center gap-1.5 text-base">
  <com-icon name="alert-triangle" size="md" color="warn" />
  Warning: This action cannot be undone
</p>`;

  protected readonly buttonsCode = `<button comButton>
  <com-icon name="plus" size="sm" /> Add Item
</button>

<button comButton variant="outline" color="accent">
  <com-icon name="heart" size="sm" /> Like
</button>

<!-- Icon-only button -->
<button comButton size="icon" variant="outline" aria-label="Settings">
  <com-icon name="settings" />
</button>`;

  protected readonly dynamicCode = `import { Component, signal } from '@angular/core';
import { ComIcon, type IconColor, type IconSize } from 'ngx-com/components/icon';

@Component({
  imports: [ComIcon],
  template: \`
    <com-icon
      name="star"
      [color]="selectedColor()"
      [size]="selectedSize()"
    />
  \`,
})
export class Example {
  selectedColor = signal<IconColor>('primary');
  selectedSize = signal<IconSize>('lg');
}`;

  protected readonly accessibleCode = `<!-- Meaningful icon — screen readers will announce it -->
<com-icon
  name="check-circle"
  color="success"
  ariaLabel="Success: Operation completed"
/>

<!-- Decorative icon — hidden from screen readers -->
<com-icon name="star" color="primary" />

<!-- Icon with adjacent text (icon is decorative) -->
<span class="flex items-center gap-1.5">
  <com-icon name="check-circle" size="sm" />
  Success  <!-- Text provides the meaning -->
</span>`;
}
