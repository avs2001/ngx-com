import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-paginator-api',
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
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-paginator</code>
        <p class="mt-3 text-surface-600">
          Element selector for the paginator component.
        </p>
      </com-card>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comPaginator</code>
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">length</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">number</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">0</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Total number of items being paged</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">pageSize</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">number</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">10</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Number of items to display per page</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">pageIndex</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">number</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">0</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Current zero-based page index</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">pageSizeOptions</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">number[]</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">[]</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Available page size options (hides selector if empty)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">showFirstLastButtons</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Show first/last navigation buttons</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">disabled</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Disable all controls</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">hidePageSize</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Hide the page size selector</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'sm' | 'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Size variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">aria-label</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'Pagination'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Accessible label for the nav element</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">rangeLabel</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">RangeLabelFn</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">defaultRangeLabel</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Custom function for range label formatting (i18n)</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Outputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Outputs</h2>
      <com-card variant="outlined" class="overflow-hidden">
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
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">page</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">PageEvent</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Emitted when page index or page size changes</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- PageEvent Interface -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">PageEvent Interface</h2>
      <int-code-block language="typescript" [code]="pageEventCode" />
    </section>

    <!-- RangeLabelFn Type -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">RangeLabelFn Type</h2>
      <int-code-block language="typescript" [code]="rangeLabelFnCode" />
    </section>

    <!-- Public Methods -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Public Methods</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Method</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">firstPage()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Navigate to the first page</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">previousPage()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Navigate to the previous page</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">nextPage()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Navigate to the next page</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">lastPage()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Navigate to the last page</td>
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
            Container uses <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">&lt;nav role="navigation"&gt;</code>
            with <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-label</code>
          </li>
          <li>
            All buttons have descriptive
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-label</code>
            (e.g., "First page", "Previous page")
          </li>
          <li>
            Page size select is associated with its label via
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-labelledby</code>
          </li>
          <li>
            Disabled buttons have proper
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">disabled</code> attribute
          </li>
          <li>
            Focus ring uses
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">focus-visible:outline-ring</code>
            for keyboard users
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
              <td class="px-4 py-3 text-surface-700">--color-foreground</td>
              <td class="px-4 py-3 text-surface-600">Container text, select text</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted-foreground</td>
              <td class="px-4 py-3 text-surface-600">Range label, page size label</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-border</td>
              <td class="px-4 py-3 text-surface-600">Button borders, select border</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted</td>
              <td class="px-4 py-3 text-surface-600">Button/select hover background</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled, --color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-ring</td>
              <td class="px-4 py-3 text-surface-600">Focus ring outline</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Required Icons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Required Icons</h2>
      <p class="mb-4 text-surface-600">
        The component uses the following Lucide icons via <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">ComIcon</code>:
      </p>
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li><code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">chevron-left</code> - Previous page button</li>
          <li><code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">chevron-right</code> - Next page button</li>
          <li><code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">chevrons-left</code> - First page button</li>
          <li><code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">chevrons-right</code> - Last page button</li>
          <li><code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">chevron-down</code> - Page size select dropdown</li>
        </ul>
        <p class="mt-4 text-surface-600">
          Register these icons via <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">provideComIcons</code> in your app config.
        </p>
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
export class PaginatorApi {
  protected readonly importCode = `import { ComPaginator } from 'ngx-com/components/paginator';

// Optional: Import types and utilities
import {
  defaultRangeLabel,
  type PageEvent,
  type RangeLabelFn,
  type PaginatorSize,
} from 'ngx-com/components/paginator';`;

  protected readonly exportAsCode = `<com-paginator
  [length]="100"
  [pageSize]="10"
  [pageIndex]="0"
  #paginator="comPaginator"
/>
<button (click)="paginator.nextPage()">Next</button>`;

  protected readonly pageEventCode = `interface PageEvent {
  /** The current zero-based page index. */
  pageIndex: number;
  /** The previous zero-based page index. */
  previousPageIndex: number;
  /** The current page size. */
  pageSize: number;
  /** The total number of items being paged. */
  length: number;
}`;

  protected readonly rangeLabelFnCode = `/**
 * Function signature for custom range label formatting.
 * Used for i18n and custom label display.
 */
type RangeLabelFn = (page: number, pageSize: number, length: number) => string;

// Example: Custom label function
const customLabel: RangeLabelFn = (page, pageSize, length) => {
  const totalPages = Math.ceil(length / pageSize);
  return \`Page \${page + 1} of \${totalPages}\`;
};`;

  protected readonly typesCode = `// Size type
type PaginatorSize = 'sm' | 'md';

// CVA variant props (from class-variance-authority)
type PaginatorContainerVariants = {
  size?: PaginatorSize | null | undefined;
};

type PaginatorButtonVariants = {
  size?: PaginatorSize | null | undefined;
};

type PaginatorRangeLabelVariants = {
  size?: PaginatorSize | null | undefined;
};

type PaginatorSelectVariants = {
  size?: PaginatorSize | null | undefined;
};`;

  protected readonly cvaCode = `import {
  paginatorContainerVariants,
  paginatorButtonVariants,
  paginatorRangeLabelVariants,
  paginatorSelectVariants,
} from 'ngx-com/components/paginator';

// Generate container classes
const containerClasses = paginatorContainerVariants({ size: 'md' });
// => "flex items-center justify-end gap-4 text-sm ..."

// Generate button classes
const buttonClasses = paginatorButtonVariants({ size: 'md' });
// => "inline-flex items-center justify-center h-9 w-9 ..."

// Generate range label classes
const labelClasses = paginatorRangeLabelVariants({ size: 'md' });
// => "text-muted-foreground whitespace-nowrap text-sm"

// Generate select classes
const selectClasses = paginatorSelectVariants({ size: 'md' });
// => "appearance-none rounded-control border ... h-9 px-3 text-sm"`;
}
