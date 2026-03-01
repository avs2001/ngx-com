import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-sort-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- SortDirective -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">SortDirective</h2>
      <p class="mb-4 text-surface-600">
        Parent directive that manages sort state for a group of sortable headers.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
      <div class="rounded-lg border border-surface-200 bg-white p-4">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comSort]</code>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Export As</h3>
      <div class="rounded-lg border border-surface-200 bg-white p-4">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comSort</code>
        <span class="ml-2 text-sm text-surface-600">(for template ref access)</span>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Inputs</h3>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">sortActive</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">model&lt;string | undefined&gt;</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Currently active sort column id (two-way)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">sortDirection</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">model&lt;SortDirection&gt;</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Current direction (two-way)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">sortDisabled</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Disables all sorting in this container</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">sortCycle</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">SortCycle</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">['asc', 'desc', undefined]</code></td>
              <td class="px-4 py-3 text-surface-600">Customize the click cycle order</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">sortShowIndicator</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Show muted arrow on unsorted headers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Outputs</h3>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3"><code class="text-xs">sortChange</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">SortEvent</code></td>
              <td class="px-4 py-3 text-surface-600">Emitted when active column or direction changes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Methods</h3>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Method</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Returns</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3"><code class="text-xs">sort(id: string)</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">void</code></td>
              <td class="px-4 py-3 text-surface-600">Programmatically sort by a column</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="text-xs">getNextDirection(id: string)</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">SortDirection</code></td>
              <td class="px-4 py-3 text-surface-600">Returns the next direction in the cycle for a column</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SortHeaderComponent -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">SortHeaderComponent</h2>
      <p class="mb-4 text-surface-600">
        Individual sortable header. Must be placed inside a [comSort] container.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
      <div class="rounded-lg border border-surface-200 bg-white p-4">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comSortHeader]</code>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Inputs</h3>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comSortHeader</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">(required)</code></td>
              <td class="px-4 py-3 text-surface-600">The column id for sorting</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">sortHeaderDisabled</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Disable sorting for this specific header</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">sortHeaderShowIndicator</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean | undefined</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">(from parent)</code></td>
              <td class="px-4 py-3 text-surface-600">Override parent's sortShowIndicator for this header</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comSortHeaderArrowPosition</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'before' | 'after'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'after'</code></td>
              <td class="px-4 py-3 text-surface-600">Arrow placement relative to content</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Types -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
      <int-code-block language="typescript" [code]="typesCode" />
    </section>

    <!-- Accessibility -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accessibility</h2>
      <p class="mb-4 text-surface-600">
        The sort component follows WAI-ARIA guidelines for sortable tables.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">ARIA Attributes</h3>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Element</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Attribute</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Value</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100 font-mono text-xs">
            <tr>
              <td class="px-4 py-3">Sort header</td>
              <td class="px-4 py-3 text-surface-600">role</td>
              <td class="px-4 py-3 text-surface-600">"columnheader"</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Sort header</td>
              <td class="px-4 py-3 text-surface-600">aria-sort</td>
              <td class="px-4 py-3 text-surface-600">"ascending" | "descending" | "none"</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Sort header</td>
              <td class="px-4 py-3 text-surface-600">tabindex</td>
              <td class="px-4 py-3 text-surface-600">0 (enabled) | -1 (disabled)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Sort header (disabled)</td>
              <td class="px-4 py-3 text-surface-600">aria-disabled</td>
              <td class="px-4 py-3 text-surface-600">"true"</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Sort icon</td>
              <td class="px-4 py-3 text-surface-600">aria-hidden</td>
              <td class="px-4 py-3 text-surface-600">"true"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Keyboard Navigation</h3>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Key</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3"><kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">Enter</kbd></td>
              <td class="px-4 py-3 text-surface-600">Activate sorting for the focused header</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="px-4 py-3 text-surface-600">Activate sorting for the focused header</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">Tab</kbd></td>
              <td class="px-4 py-3 text-surface-600">Move focus between sortable headers</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Token</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Used For</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100 font-mono text-xs">
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-foreground</td>
              <td class="px-4 py-3 text-surface-600">Active sort header text</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted-foreground</td>
              <td class="px-4 py-3 text-surface-600">Inactive sort header text</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled sort header text</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CVA Customization -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Advanced: CVA Variants</h2>
      <p class="mb-4 text-surface-600">
        Import CVA functions for custom implementations.
      </p>
      <int-code-block language="typescript" [code]="cvaCode" />
    </section>
  `,
})
export class SortApi {
  protected readonly importCode = `import {
  SortDirective,
  SortHeaderComponent,
} from 'ngx-com/components/sort';

// Optional: Types and CVA
import type {
  SortDirection,
  SortCycle,
  SortEvent,
} from 'ngx-com/components/sort';

import {
  sortHeaderVariants,
  sortIconVariants,
} from 'ngx-com/components/sort';`;

  protected readonly typesCode = `// Sort direction — three states
type SortDirection = 'asc' | 'desc' | undefined;

// Configures the three-state sort cycle
type SortCycle = SortDirection[];

// Emitted when sort state changes
interface SortEvent {
  active: string | undefined;
  direction: SortDirection;
}`;

  protected readonly cvaCode = `import {
  sortHeaderVariants,
  sortIconVariants,
} from 'ngx-com/components/sort';

// Generate sort header classes
const headerClasses = sortHeaderVariants({
  sortable: true,
  active: true,
  disabled: false,
});
// => "inline-flex items-center gap-1.5 select-none text-foreground cursor-pointer..."

// Generate sort icon classes
const iconClasses = sortIconVariants({
  size: 'md',
  state: 'asc',
});
// => "inline-flex items-center justify-center size-3.5 opacity-100 rotate-0..."`;
}
