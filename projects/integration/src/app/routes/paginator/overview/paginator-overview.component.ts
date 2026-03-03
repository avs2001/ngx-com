import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComPaginator } from 'ngx-com/components/paginator';
import type { PageEvent } from 'ngx-com/components/paginator';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-paginator-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComPaginator, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Interactive paginator with page size selection"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <com-paginator
            [length]="totalItems()"
            [pageSize]="pageSize()"
            [pageIndex]="pageIndex()"
            [pageSizeOptions]="[5, 10, 25, 50]"
            (page)="onPageChange($event)"
          />
          <p class="text-sm text-muted-foreground">
            Page <strong class="text-foreground">{{ pageIndex() + 1 }}</strong>
            of <strong class="text-foreground">{{ totalPages() }}</strong>
            ({{ pageSize() }} items per page)
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
        description="What makes com-paginator powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Controlled Model"
            description="Parent controls state via inputs; component emits events on changes"
            icon="sliders"
          />
          <com-item
            title="Page Size Selection"
            description="Optional dropdown to change items per page with smart page recalculation"
            icon="list"
            iconColor="accent"
          />
          <com-item
            title="First/Last Navigation"
            description="Optional buttons for quick navigation to first and last pages"
            icon="chevrons-left"
          />
          <com-item
            title="Custom Range Labels"
            description="i18n support via custom range label function"
            icon="languages"
            iconColor="accent"
          />
          <com-item
            title="Two Sizes"
            description="Small and medium variants for different contexts"
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
        description="Guidelines for effective paginator usage"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <p class="mb-4 text-foreground">
          Paginator is ideal for:
        </p>
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>Data tables:</strong> Navigate through large datasets with page controls
          </li>
          <li>
            <strong>Search results:</strong> Browse paginated API responses
          </li>
          <li>
            <strong>Lists:</strong> Split long lists into manageable pages
          </li>
          <li>
            <strong>Admin panels:</strong> Manage records with pagination
          </li>
        </ul>
        <p class="mt-4 text-foreground">
          <strong>Consider instead:</strong> Virtual scrolling for very long lists,
          infinite scroll for social feeds, load-more buttons for simpler UX.
        </p>
      </com-card>
    </section>
  `,
})
export class PaginatorOverview {
  protected readonly totalItems = signal(100);
  protected readonly pageSize = signal(10);
  protected readonly pageIndex = signal(0);

  protected readonly totalPages = signal(Math.ceil(this.totalItems() / this.pageSize()));

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.totalPages.set(Math.ceil(event.length / event.pageSize));
  }

  protected readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { ComPaginator } from 'ngx-com/components/paginator';
import type { PageEvent } from 'ngx-com/components/paginator';

@Component({
  selector: 'app-example',
  imports: [ComPaginator],
  template: \`
    <com-paginator
      [length]="totalItems()"
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      [pageSizeOptions]="[5, 10, 25, 50]"
      (page)="onPageChange($event)"
    />
  \`,
})
export class Example {
  totalItems = signal(100);
  pageSize = signal(10);
  pageIndex = signal(0);

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}`;
}
