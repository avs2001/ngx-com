import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-segmented-control-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCard, CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- Selector -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Selector</h2>
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-segmented-control</code>
        <p class="mt-3 text-surface-600">
          Element selector for the segmented control component.
        </p>
      </com-card>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comSegmentedControl</code>
        <p class="mt-3 text-surface-600">
          Template reference name for accessing the component instance.
        </p>
        <int-code-block class="mt-4" language="html" [code]="exportAsCode" />
      </com-card>
    </section>

    <!-- Inputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inputs</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">options</code>
                <span class="ml-1 text-xs text-warn">*</span>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">SegmentOption&lt;T&gt;[]</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">required</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Array of options to display</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">value</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">T | undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Currently selected value (two-way bindable)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'sm' | 'md' | 'lg'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Control size with proportional spacing</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary' | 'accent' | 'muted'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Color scheme for active segment</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'filled' | 'outline'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'filled'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Visual treatment: solid background or ring border</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">fullWidth</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Stretch segments equally to fill container</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">aria-label</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string | null</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">null</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Accessible label for the radiogroup</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">class</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">''</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Additional CSS classes merged via tailwind-merge</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- SegmentOption Interface -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">SegmentOption Interface</h2>
      <int-code-block language="typescript" [code]="segmentOptionCode" />
    </section>

    <!-- Directive: comSegmentDef -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComSegmentDef Directive</h2>
      <com-card variant="outlined" class="p-6">
        <p class="mb-4 text-surface-600">
          Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">ng-template[comSegmentDef]</code>
          to customize segment content. The template receives a context object:
        </p>
        <int-code-block language="typescript" [code]="templateContextCode" />
        <h3 class="mb-3 mt-6 font-semibold text-surface-900">Usage</h3>
        <int-code-block language="html" [code]="templateUsageCode" />
      </com-card>
    </section>

    <!-- Keyboard Navigation -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Keyboard Navigation</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Key</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ArrowRight</code> /
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ArrowDown</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Select next enabled option (wraps to start)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ArrowLeft</code> /
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ArrowUp</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Select previous enabled option (wraps to end)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">Home</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Select first enabled option</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">End</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Select last enabled option</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Accessibility -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accessibility</h2>
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            Container uses <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">role="radiogroup"</code>
            with <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-label</code>
          </li>
          <li>
            Each segment uses <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">role="radio"</code>
            with <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-checked</code>
          </li>
          <li>
            Roving tabindex: only selected segment has
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">tabindex="0"</code>
          </li>
          <li>
            When using custom templates, the
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">label</code> property provides
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-label</code> for screen readers
          </li>
          <li>
            Disabled options have
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-disabled="true"</code>
            and are skipped during keyboard navigation
          </li>
        </ul>
      </com-card>
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The component requires the following semantic CSS custom properties:
      </p>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Token</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Used By</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100 font-mono text-xs">
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-primary, --color-primary-foreground</td>
              <td class="px-4 py-3 text-surface-600">Primary filled/outline active</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-accent, --color-accent-foreground</td>
              <td class="px-4 py-3 text-surface-600">Accent filled/outline active</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted, --color-muted-foreground, --color-muted-hover</td>
              <td class="px-4 py-3 text-surface-600">Track background, inactive hover</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-background, --color-foreground</td>
              <td class="px-4 py-3 text-surface-600">Muted active segment</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled, --color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled options</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-border</td>
              <td class="px-4 py-3 text-surface-600">Muted outline active ring</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-ring</td>
              <td class="px-4 py-3 text-surface-600">Focus ring outline</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Types -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
      <int-code-block language="typescript" [code]="typesCode" />
    </section>

    <!-- CVA Customization -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Advanced: CVA Customization</h2>
      <p class="mb-4 text-surface-600">
        For advanced use cases, you can import and use the CVA variants directly:
      </p>
      <int-code-block language="typescript" [code]="cvaCode" />
    </section>
  `,
})
export class SegmentedControlApi {
  protected readonly importCode = `import { ComSegmentedControl, ComSegmentDef } from 'ngx-com/components/segmented-control';

// Optional: Import types for TypeScript
import type {
  SegmentOption,
  SegmentTemplateContext,
  SegmentedControlSize,
  SegmentedControlColor,
  SegmentedControlVariant,
} from 'ngx-com/components/segmented-control';`;

  protected readonly exportAsCode = `<com-segmented-control
  [options]="options"
  [(value)]="value"
  #ctrl="comSegmentedControl"
/>
<p>Is 'admin' active: {{ ctrl.isActive({ value: 'admin', label: 'Admin' }) }}</p>`;

  protected readonly segmentOptionCode = `interface SegmentOption<T = unknown> {
  /** The value associated with this option. */
  value: T;
  /** Display label (also used as aria-label for custom templates). */
  label: string;
  /** Whether this option is disabled. */
  disabled?: boolean;
}`;

  protected readonly templateContextCode = `interface SegmentTemplateContext<T = unknown> {
  /** The option object (default for \`let-option\`). */
  $implicit: SegmentOption<T>;
  /** Whether this segment is currently selected. */
  active: boolean;
  /** Whether this segment is disabled. */
  disabled: boolean;
  /** Position in the options list (0-indexed). */
  index: number;
}`;

  protected readonly templateUsageCode = `<com-segmented-control [options]="options" [(value)]="value">
  <ng-template comSegmentDef let-option let-active="active" let-index="index">
    <span [class.font-bold]="active">{{ option.label }}</span>
    @if (index === 0) {
      <span class="text-xs text-muted-foreground">(default)</span>
    }
  </ng-template>
</com-segmented-control>`;

  protected readonly typesCode = `// Size type
type SegmentedControlSize = 'sm' | 'md' | 'lg';

// Color type
type SegmentedControlColor = 'primary' | 'accent' | 'muted';

// Variant type
type SegmentedControlVariant = 'filled' | 'outline';

// CVA variant props (from class-variance-authority)
type SegmentedControlContainerVariants = {
  size?: SegmentedControlSize | null | undefined;
  fullWidth?: boolean | null | undefined;
};

type SegmentedControlSegmentVariants = {
  size?: SegmentedControlSize | null | undefined;
  color?: SegmentedControlColor | null | undefined;
  variant?: SegmentedControlVariant | null | undefined;
  active?: boolean | null | undefined;
  fullWidth?: boolean | null | undefined;
};`;

  protected readonly cvaCode = `import {
  segmentedControlContainerVariants,
  segmentedControlSegmentVariants,
} from 'ngx-com/components/segmented-control';

// Generate container classes
const containerClasses = segmentedControlContainerVariants({
  size: 'md',
  fullWidth: false,
});
// => "inline-flex items-center rounded-pill bg-muted p-1 gap-1 ..."

// Generate segment classes for active state
const activeSegmentClasses = segmentedControlSegmentVariants({
  size: 'md',
  color: 'primary',
  variant: 'filled',
  active: true,
});
// => "... bg-primary text-primary-foreground shadow-sm"

// Generate segment classes for inactive state
const inactiveSegmentClasses = segmentedControlSegmentVariants({
  size: 'md',
  color: 'primary',
  variant: 'filled',
  active: false,
});
// => "... text-foreground hover:bg-muted-hover"`;
}
