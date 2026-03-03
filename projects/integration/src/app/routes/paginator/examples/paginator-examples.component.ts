import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComPaginator } from 'ngx-com/components/paginator';
import type { PageEvent, RangeLabelFn } from 'ngx-com/components/paginator';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-paginator-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComPaginator, ComCard, CodeBlock],
  template: `
    <!-- Basic -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic</h2>
      <p class="mb-4 text-surface-600">
        Minimal paginator with navigation buttons and range label.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-paginator
            [length]="basicLength()"
            [pageSize]="basicPageSize()"
            [pageIndex]="basicPageIndex()"
            (page)="onBasicPageChange($event)"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="basicCode" />
    </section>

    <!-- Numbered Pages -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Numbered Pages</h2>
      <p class="mb-4 text-surface-600">
        Display clickable page numbers with prev/next arrows. Use when users need direct page access.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-paginator
            [length]="numberedLength()"
            [pageSize]="numberedPageSize()"
            [pageIndex]="numberedPageIndex()"
            [showPageNumbers]="true"
            (page)="onNumberedPageChange($event)"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="numberedCode" />
    </section>

    <!-- Spread Layout -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Spread Layout</h2>
      <p class="mb-4 text-surface-600">
        Results summary on the left, navigation controls on the right. Ideal for data tables.
      </p>
      <com-card variant="outlined" class="p-8">
        <com-paginator
          [length]="spreadLength()"
          [pageSize]="spreadPageSize()"
          [pageIndex]="spreadPageIndex()"
          [showPageNumbers]="true"
          layout="spread"
          (page)="onSpreadPageChange($event)"
        />
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="spreadCode" />
    </section>

    <!-- Spread Layout Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Spread Layout Sizes</h2>
      <p class="mb-4 text-surface-600">
        Spread layout with different size variants. Great for tables with varying density.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Small (sm)</span>
            <div class="rounded-lg border border-surface-200 p-4">
              <div class="mb-3 text-xs text-surface-500">[Compact table content]</div>
              <com-paginator
                [length]="spreadSmLength()"
                [pageSize]="spreadSmPageSize()"
                [pageIndex]="spreadSmPageIndex()"
                [showPageNumbers]="true"
                layout="spread"
                size="sm"
                (page)="onSpreadSmPageChange($event)"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Medium (md) - Default</span>
            <div class="rounded-lg border border-surface-200 p-4">
              <div class="mb-3 text-sm text-surface-500">[Standard table content]</div>
              <com-paginator
                [length]="spreadMdLength()"
                [pageSize]="spreadMdPageSize()"
                [pageIndex]="spreadMdPageIndex()"
                [showPageNumbers]="true"
                layout="spread"
                size="md"
                (page)="onSpreadMdPageChange($event)"
              />
            </div>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="spreadSizesCode" />
    </section>

    <!-- Spread with Custom Label -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Spread with Custom Label</h2>
      <p class="mb-4 text-surface-600">
        Combine spread layout with custom range label for internationalization.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">"Showing X to Y of Z results"</span>
            <com-paginator
              [length]="spreadCustomLength()"
              [pageSize]="spreadCustomPageSize()"
              [pageIndex]="spreadCustomPageIndex()"
              [showPageNumbers]="true"
              layout="spread"
              [rangeLabel]="showingResultsLabel"
              (page)="onSpreadCustomPageChange($event)"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">"Page X of Y"</span>
            <com-paginator
              [length]="spreadCustom2Length()"
              [pageSize]="spreadCustom2PageSize()"
              [pageIndex]="spreadCustom2PageIndex()"
              [showPageNumbers]="true"
              layout="spread"
              size="sm"
              [rangeLabel]="pageOfTotalLabel"
              (page)="onSpreadCustom2PageChange($event)"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="typescript" [code]="spreadCustomLabelCode" />
    </section>

    <!-- Custom Sibling/Boundary Counts -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Range</h2>
      <p class="mb-4 text-surface-600">
        Control how many pages appear around the current page and at boundaries.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-surface-500">siblingCount=2, boundaryCount=1</span>
            <com-paginator
              [length]="200"
              [pageSize]="10"
              [pageIndex]="customRangeIndex()"
              [showPageNumbers]="true"
              [siblingCount]="2"
              [boundaryCount]="1"
              (page)="onCustomRangeChange($event)"
            />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-surface-500">siblingCount=1, boundaryCount=2</span>
            <com-paginator
              [length]="200"
              [pageSize]="10"
              [pageIndex]="customRangeIndex2()"
              [showPageNumbers]="true"
              [siblingCount]="1"
              [boundaryCount]="2"
              (page)="onCustomRangeChange2($event)"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="customRangeCode" />
    </section>

    <!-- With Page Size Options -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Page Size Options</h2>
      <p class="mb-4 text-surface-600">
        Add a dropdown to let users choose items per page.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-paginator
            [length]="100"
            [pageSize]="pageSizeOptionsSize()"
            [pageIndex]="pageSizeOptionsIndex()"
            [pageSizeOptions]="[5, 10, 25, 50, 100]"
            (page)="onPageSizeOptionsChange($event)"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="pageSizeOptionsCode" />
    </section>

    <!-- First/Last Buttons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">First/Last Buttons</h2>
      <p class="mb-4 text-surface-600">
        Show buttons for quick navigation to first and last pages.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-paginator
            [length]="100"
            [pageSize]="firstLastSize()"
            [pageIndex]="firstLastIndex()"
            [pageSizeOptions]="[10, 25, 50]"
            [showFirstLastButtons]="true"
            (page)="onFirstLastChange($event)"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="firstLastCode" />
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Two size variants for different contexts.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col gap-8">
          <div class="flex items-center gap-4">
            <span class="w-12 text-sm text-surface-500">sm</span>
            <com-paginator
              [length]="50"
              [pageSize]="10"
              [pageIndex]="0"
              [pageSizeOptions]="[5, 10, 25]"
              size="sm"
            />
          </div>
          <div class="flex items-center gap-4">
            <span class="w-12 text-sm text-surface-500">md</span>
            <com-paginator
              [length]="50"
              [pageSize]="10"
              [pageIndex]="0"
              [pageSizeOptions]="[5, 10, 25]"
              size="md"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Hidden Page Size -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Hidden Page Size</h2>
      <p class="mb-4 text-surface-600">
        Hide the page size selector even when options are provided.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-paginator
            [length]="100"
            [pageSize]="10"
            [pageIndex]="0"
            [pageSizeOptions]="[10, 25, 50]"
            [hidePageSize]="true"
            [showFirstLastButtons]="true"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="hidePageSizeCode" />
    </section>

    <!-- Disabled -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled</h2>
      <p class="mb-4 text-surface-600">
        Disable all controls while loading data.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-paginator
            [length]="100"
            [pageSize]="10"
            [pageIndex]="2"
            [pageSizeOptions]="[10, 25, 50]"
            [showFirstLastButtons]="true"
            [disabled]="true"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Custom Range Label -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Range Label</h2>
      <p class="mb-4 text-surface-600">
        Provide a custom function for i18n or different label formats.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-surface-500">Page X of Y format</span>
            <com-paginator
              [length]="100"
              [pageSize]="customLabelSize()"
              [pageIndex]="customLabelIndex()"
              [pageSizeOptions]="[10, 25, 50]"
              [rangeLabel]="pageOfTotalLabel"
              (page)="onCustomLabelChange($event)"
            />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs font-medium text-surface-500">German localization</span>
            <com-paginator
              [length]="100"
              [pageSize]="10"
              [pageIndex]="0"
              [rangeLabel]="germanLabel"
            />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="typescript" [code]="customLabelCode" />
    </section>

    <!-- Empty State -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Empty State</h2>
      <p class="mb-4 text-surface-600">
        Paginator gracefully handles zero items.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex justify-center">
          <com-paginator
            [length]="0"
            [pageSize]="10"
            [pageIndex]="0"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="emptyCode" />
    </section>

    <!-- Use Cases -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Common Use Cases</h2>
      <com-card variant="outlined" class="p-8">
        <div class="space-y-8">
          <!-- Data Table -->
          <div class="border-b border-surface-100 pb-8">
            <h3 class="mb-4 font-medium text-surface-900">Data Table</h3>
            <div class="rounded-lg border border-surface-200 p-4">
              <div class="mb-4 text-sm text-surface-500">
                [Table content would go here]
              </div>
              <com-paginator
                [length]="tableLength()"
                [pageSize]="tablePageSize()"
                [pageIndex]="tablePageIndex()"
                [pageSizeOptions]="[10, 25, 50, 100]"
                [showFirstLastButtons]="true"
                (page)="onTablePageChange($event)"
              />
            </div>
          </div>

          <!-- Card Grid -->
          <div class="border-b border-surface-100 pb-8">
            <h3 class="mb-4 font-medium text-surface-900">Card Grid</h3>
            <div class="mb-4 grid grid-cols-3 gap-2">
              @for (i of [1, 2, 3, 4, 5, 6]; track i) {
                <div class="rounded border border-surface-200 bg-surface-50 p-4 text-center text-sm text-surface-500">
                  Card {{ (gridPageIndex() * 6) + i }}
                </div>
              }
            </div>
            <com-paginator
              [length]="24"
              [pageSize]="6"
              [pageIndex]="gridPageIndex()"
              size="sm"
              (page)="onGridPageChange($event)"
            />
          </div>

          <!-- Minimal List -->
          <div>
            <h3 class="mb-4 font-medium text-surface-900">Minimal (No Page Size)</h3>
            <com-paginator
              [length]="50"
              [pageSize]="10"
              [pageIndex]="minimalPageIndex()"
              [hidePageSize]="true"
              size="sm"
              (page)="onMinimalPageChange($event)"
            />
          </div>
        </div>
      </com-card>
    </section>
  `,
})
export class PaginatorExamples {
  // Basic
  protected readonly basicLength = signal(50);
  protected readonly basicPageSize = signal(10);
  protected readonly basicPageIndex = signal(0);

  // Numbered pages
  protected readonly numberedLength = signal(97);
  protected readonly numberedPageSize = signal(10);
  protected readonly numberedPageIndex = signal(0);

  // Spread layout
  protected readonly spreadLength = signal(97);
  protected readonly spreadPageSize = signal(10);
  protected readonly spreadPageIndex = signal(0);

  // Spread layout sizes
  protected readonly spreadSmLength = signal(150);
  protected readonly spreadSmPageSize = signal(10);
  protected readonly spreadSmPageIndex = signal(4);

  protected readonly spreadMdLength = signal(150);
  protected readonly spreadMdPageSize = signal(10);
  protected readonly spreadMdPageIndex = signal(4);

  // Spread with custom label
  protected readonly spreadCustomLength = signal(97);
  protected readonly spreadCustomPageSize = signal(10);
  protected readonly spreadCustomPageIndex = signal(0);

  protected readonly spreadCustom2Length = signal(250);
  protected readonly spreadCustom2PageSize = signal(25);
  protected readonly spreadCustom2PageIndex = signal(3);

  // Custom range
  protected readonly customRangeIndex = signal(9);
  protected readonly customRangeIndex2 = signal(9);

  // Page size options
  protected readonly pageSizeOptionsSize = signal(10);
  protected readonly pageSizeOptionsIndex = signal(0);

  // First/Last
  protected readonly firstLastSize = signal(10);
  protected readonly firstLastIndex = signal(5);

  // Custom label
  protected readonly customLabelSize = signal(10);
  protected readonly customLabelIndex = signal(0);

  // Table
  protected readonly tableLength = signal(250);
  protected readonly tablePageSize = signal(25);
  protected readonly tablePageIndex = signal(0);

  // Grid
  protected readonly gridPageIndex = signal(0);

  // Minimal
  protected readonly minimalPageIndex = signal(0);

  // Custom label functions
  protected readonly pageOfTotalLabel: RangeLabelFn = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return 'No results';
    }
    const totalPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${totalPages}`;
  };

  protected readonly germanLabel: RangeLabelFn = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return `0 von ${length}`;
    }
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `${start} – ${end} von ${length}`;
  };

  protected readonly showingResultsLabel: RangeLabelFn = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return 'No results';
    }
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `Showing ${start} to ${end} of ${length} results`;
  };

  // Event handlers
  protected onBasicPageChange(event: PageEvent): void {
    this.basicPageIndex.set(event.pageIndex);
  }

  protected onNumberedPageChange(event: PageEvent): void {
    this.numberedPageIndex.set(event.pageIndex);
  }

  protected onSpreadPageChange(event: PageEvent): void {
    this.spreadPageIndex.set(event.pageIndex);
  }

  protected onSpreadSmPageChange(event: PageEvent): void {
    this.spreadSmPageIndex.set(event.pageIndex);
  }

  protected onSpreadMdPageChange(event: PageEvent): void {
    this.spreadMdPageIndex.set(event.pageIndex);
  }

  protected onSpreadCustomPageChange(event: PageEvent): void {
    this.spreadCustomPageIndex.set(event.pageIndex);
  }

  protected onSpreadCustom2PageChange(event: PageEvent): void {
    this.spreadCustom2PageIndex.set(event.pageIndex);
  }

  protected onCustomRangeChange(event: PageEvent): void {
    this.customRangeIndex.set(event.pageIndex);
  }

  protected onCustomRangeChange2(event: PageEvent): void {
    this.customRangeIndex2.set(event.pageIndex);
  }

  protected onPageSizeOptionsChange(event: PageEvent): void {
    this.pageSizeOptionsSize.set(event.pageSize);
    this.pageSizeOptionsIndex.set(event.pageIndex);
  }

  protected onFirstLastChange(event: PageEvent): void {
    this.firstLastSize.set(event.pageSize);
    this.firstLastIndex.set(event.pageIndex);
  }

  protected onCustomLabelChange(event: PageEvent): void {
    this.customLabelSize.set(event.pageSize);
    this.customLabelIndex.set(event.pageIndex);
  }

  protected onTablePageChange(event: PageEvent): void {
    this.tablePageSize.set(event.pageSize);
    this.tablePageIndex.set(event.pageIndex);
  }

  protected onGridPageChange(event: PageEvent): void {
    this.gridPageIndex.set(event.pageIndex);
  }

  protected onMinimalPageChange(event: PageEvent): void {
    this.minimalPageIndex.set(event.pageIndex);
  }

  // Code examples
  protected readonly basicCode = `<com-paginator
  [length]="50"
  [pageSize]="10"
  [pageIndex]="0"
  (page)="onPageChange($event)"
/>`;

  protected readonly numberedCode = `<com-paginator
  [length]="97"
  [pageSize]="10"
  [pageIndex]="pageIndex()"
  [showPageNumbers]="true"
  (page)="onPageChange($event)"
/>`;

  protected readonly spreadCode = `<com-paginator
  [length]="97"
  [pageSize]="10"
  [pageIndex]="pageIndex()"
  [showPageNumbers]="true"
  layout="spread"
  (page)="onPageChange($event)"
/>`;

  protected readonly spreadSizesCode = `<!-- Small spread layout -->
<com-paginator
  [length]="150"
  [pageSize]="10"
  [showPageNumbers]="true"
  layout="spread"
  size="sm"
/>

<!-- Medium spread layout (default) -->
<com-paginator
  [length]="150"
  [pageSize]="10"
  [showPageNumbers]="true"
  layout="spread"
  size="md"
/>`;

  protected readonly spreadCustomLabelCode = `// "Showing X to Y of Z results" format
showingResultsLabel: RangeLabelFn = (page, pageSize, length) => {
  if (length === 0 || pageSize === 0) {
    return 'No results';
  }
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, length);
  return \`Showing \${start} to \${end} of \${length} results\`;
};

// Usage with spread layout
<com-paginator
  [length]="97"
  [pageSize]="10"
  [showPageNumbers]="true"
  layout="spread"
  [rangeLabel]="showingResultsLabel"
/>`;

  protected readonly customRangeCode = `<!-- More siblings around current page -->
<com-paginator
  [length]="200"
  [pageSize]="10"
  [showPageNumbers]="true"
  [siblingCount]="2"
  [boundaryCount]="1"
/>

<!-- More boundary pages at start/end -->
<com-paginator
  [length]="200"
  [pageSize]="10"
  [showPageNumbers]="true"
  [siblingCount]="1"
  [boundaryCount]="2"
/>`;

  protected readonly pageSizeOptionsCode = `<com-paginator
  [length]="100"
  [pageSize]="pageSize()"
  [pageIndex]="pageIndex()"
  [pageSizeOptions]="[5, 10, 25, 50, 100]"
  (page)="onPageChange($event)"
/>`;

  protected readonly firstLastCode = `<com-paginator
  [length]="100"
  [pageSize]="pageSize()"
  [pageIndex]="pageIndex()"
  [pageSizeOptions]="[10, 25, 50]"
  [showFirstLastButtons]="true"
  (page)="onPageChange($event)"
/>`;

  protected readonly sizesCode = `<!-- Small -->
<com-paginator [length]="50" [pageSize]="10" size="sm" />

<!-- Medium (default) -->
<com-paginator [length]="50" [pageSize]="10" size="md" />`;

  protected readonly hidePageSizeCode = `<com-paginator
  [length]="100"
  [pageSize]="10"
  [pageIndex]="0"
  [pageSizeOptions]="[10, 25, 50]"
  [hidePageSize]="true"
  [showFirstLastButtons]="true"
/>`;

  protected readonly disabledCode = `<com-paginator
  [length]="100"
  [pageSize]="10"
  [pageIndex]="2"
  [pageSizeOptions]="[10, 25, 50]"
  [showFirstLastButtons]="true"
  [disabled]="isLoading()"
/>`;

  protected readonly customLabelCode = `import { RangeLabelFn } from 'ngx-com/components/paginator';

// Page X of Y format
pageOfTotalLabel: RangeLabelFn = (page, pageSize, length) => {
  if (length === 0 || pageSize === 0) {
    return 'No results';
  }
  const totalPages = Math.ceil(length / pageSize);
  return \`Page \${page + 1} of \${totalPages}\`;
};

// German localization
germanLabel: RangeLabelFn = (page, pageSize, length) => {
  if (length === 0 || pageSize === 0) {
    return \`0 von \${length}\`;
  }
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, length);
  return \`\${start} – \${end} von \${length}\`;
};

// Usage
<com-paginator
  [length]="100"
  [pageSize]="10"
  [rangeLabel]="pageOfTotalLabel"
/>`;

  protected readonly emptyCode = `<com-paginator
  [length]="0"
  [pageSize]="10"
  [pageIndex]="0"
/>
<!-- Displays "0 of 0" -->`;
}
