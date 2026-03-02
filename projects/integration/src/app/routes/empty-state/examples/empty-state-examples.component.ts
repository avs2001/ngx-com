import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { ComIcon } from 'ngx-com/components/icon';
import { ComButton } from 'ngx-com/components/button';
import {
  ComEmptyState,
  ComEmptyStateIcon,
  ComEmptyStateTitle,
  ComEmptyStateDescription,
  ComEmptyStateActions,
} from 'ngx-com/components/empty-state';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-empty-state-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComCard,
    ComIcon,
    ComButton,
    ComEmptyState,
    ComEmptyStateIcon,
    ComEmptyStateTitle,
    ComEmptyStateDescription,
    ComEmptyStateActions,
    CodeBlock,
  ],
  template: `
    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Three sizes for different contexts: small for inline, medium (default), and large for full-page states.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="grid gap-8 md:grid-cols-3">
          <!-- Small -->
          <div class="rounded-lg border border-dashed border-surface-300 p-4">
            <com-empty-state size="sm">
              <div comEmptyStateIcon>
                <com-icon name="list" size="lg" />
              </div>
              <h4 comEmptyStateTitle>No items</h4>
              <p comEmptyStateDescription>Add items to see them here.</p>
            </com-empty-state>
            <p class="mt-2 text-center text-xs text-surface-500">size="sm"</p>
          </div>

          <!-- Medium -->
          <div class="rounded-lg border border-dashed border-surface-300 p-4">
            <com-empty-state size="md">
              <div comEmptyStateIcon>
                <com-icon name="inbox" size="xl" />
              </div>
              <h3 comEmptyStateTitle>No messages</h3>
              <p comEmptyStateDescription>Your inbox is empty.</p>
            </com-empty-state>
            <p class="mt-2 text-center text-xs text-surface-500">size="md" (default)</p>
          </div>

          <!-- Large -->
          <div class="rounded-lg border border-dashed border-surface-300 p-4">
            <com-empty-state size="lg">
              <div comEmptyStateIcon>
                <com-icon name="rocket" size="2xl" />
              </div>
              <h2 comEmptyStateTitle>Welcome!</h2>
              <p comEmptyStateDescription>Get started by creating your first resource.</p>
            </com-empty-state>
            <p class="mt-2 text-center text-xs text-surface-500">size="lg"</p>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Search Empty State -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Search Results</h2>
      <p class="mb-4 text-surface-600">
        Common pattern for when search or filters return no results.
      </p>
      <com-card variant="outlined" class="p-8">
        <com-empty-state>
          <div comEmptyStateIcon>
            <com-icon name="search-x" size="xl" />
          </div>
          <h3 comEmptyStateTitle>No results found</h3>
          <p comEmptyStateDescription>
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <div comEmptyStateActions>
            <button comButton variant="outline">Clear Filters</button>
            <button comButton>New Search</button>
          </div>
        </com-empty-state>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="searchCode" />
    </section>

    <!-- Error Recovery -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Error Recovery</h2>
      <p class="mb-4 text-surface-600">
        When something goes wrong and the user can retry.
      </p>
      <com-card variant="outlined" class="p-8">
        <com-empty-state>
          <div comEmptyStateIcon>
            <com-icon name="alert-triangle" size="xl" />
          </div>
          <h3 comEmptyStateTitle>Something went wrong</h3>
          <p comEmptyStateDescription>
            We couldn't load your data. Please check your connection and try again.
          </p>
          <div comEmptyStateActions>
            <button comButton color="warn">Retry</button>
          </div>
        </com-empty-state>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="errorCode" />
    </section>

    <!-- Left Aligned -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Left Aligned</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">align="start"</code> for sidebars, panels, or constrained containers.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="max-w-xs rounded-lg border border-dashed border-surface-300 p-4">
          <com-empty-state align="start">
            <div comEmptyStateIcon>
              <com-icon name="users" size="lg" />
            </div>
            <h4 comEmptyStateTitle>No team members</h4>
            <p comEmptyStateDescription>Invite people to collaborate on this project.</p>
            <div comEmptyStateActions>
              <button comButton size="sm">Invite</button>
            </div>
          </com-empty-state>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="alignCode" />
    </section>

    <!-- Horizontal Orientation -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Horizontal Orientation</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">orientation="horizontal"</code> for wide, narrow containers.
      </p>
      <com-card variant="outlined" class="p-8">
        <com-empty-state orientation="horizontal" align="start" size="sm">
          <div comEmptyStateIcon>
            <com-icon name="bell-off" size="lg" />
          </div>
          <div class="flex flex-col gap-1">
            <h4 comEmptyStateTitle>No notifications</h4>
            <p comEmptyStateDescription>You're all caught up!</p>
          </div>
        </com-empty-state>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="horizontalCode" />
    </section>

    <!-- Full Page -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Full Page State</h2>
      <p class="mb-4 text-surface-600">
        Large size for dashboard or full-page empty states.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-surface-300 bg-surface-50">
          <com-empty-state size="lg">
            <div comEmptyStateIcon>
              <com-icon name="layout-dashboard" size="2xl" />
            </div>
            <h2 comEmptyStateTitle>Welcome to your dashboard</h2>
            <p comEmptyStateDescription>
              Your dashboard is ready. Start by creating your first widget or importing existing data.
            </p>
            <div comEmptyStateActions>
              <button comButton variant="outline">Import Data</button>
              <button comButton size="lg">Create Widget</button>
            </div>
          </com-empty-state>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="fullPageCode" />
    </section>

    <!-- Minimal -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Minimal</h2>
      <p class="mb-4 text-surface-600">
        Just icon and title for simple cases.
      </p>
      <com-card variant="outlined" class="p-8">
        <com-empty-state>
          <div comEmptyStateIcon>
            <com-icon name="file-x" size="xl" />
          </div>
          <h3 comEmptyStateTitle>No files</h3>
        </com-empty-state>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="minimalCode" />
    </section>
  `,
})
export class EmptyStateExamples {
  protected readonly sizesCode = `<!-- Small -->
<com-empty-state size="sm">
  <div comEmptyStateIcon>
    <com-icon name="list" size="lg" />
  </div>
  <h4 comEmptyStateTitle>No items</h4>
</com-empty-state>

<!-- Medium (default) -->
<com-empty-state size="md">
  <div comEmptyStateIcon>
    <com-icon name="inbox" size="xl" />
  </div>
  <h3 comEmptyStateTitle>No messages</h3>
</com-empty-state>

<!-- Large -->
<com-empty-state size="lg">
  <div comEmptyStateIcon>
    <com-icon name="rocket" size="2xl" />
  </div>
  <h2 comEmptyStateTitle>Welcome!</h2>
</com-empty-state>`;

  protected readonly searchCode = `<com-empty-state>
  <div comEmptyStateIcon>
    <com-icon name="search-x" size="xl" />
  </div>
  <h3 comEmptyStateTitle>No results found</h3>
  <p comEmptyStateDescription>
    Try adjusting your search terms or filters.
  </p>
  <div comEmptyStateActions>
    <button comButton variant="outline">Clear Filters</button>
    <button comButton>New Search</button>
  </div>
</com-empty-state>`;

  protected readonly errorCode = `<com-empty-state>
  <div comEmptyStateIcon>
    <com-icon name="alert-triangle" size="xl" />
  </div>
  <h3 comEmptyStateTitle>Something went wrong</h3>
  <p comEmptyStateDescription>
    We couldn't load your data. Please try again.
  </p>
  <div comEmptyStateActions>
    <button comButton color="warn">Retry</button>
  </div>
</com-empty-state>`;

  protected readonly alignCode = `<com-empty-state align="start">
  <div comEmptyStateIcon>
    <com-icon name="users" size="lg" />
  </div>
  <h4 comEmptyStateTitle>No team members</h4>
  <p comEmptyStateDescription>Invite people to collaborate.</p>
  <div comEmptyStateActions>
    <button comButton size="sm">Invite</button>
  </div>
</com-empty-state>`;

  protected readonly horizontalCode = `<com-empty-state orientation="horizontal" align="start" size="sm">
  <div comEmptyStateIcon>
    <com-icon name="bell-off" size="lg" />
  </div>
  <div class="flex flex-col gap-1">
    <h4 comEmptyStateTitle>No notifications</h4>
    <p comEmptyStateDescription>You're all caught up!</p>
  </div>
</com-empty-state>`;

  protected readonly fullPageCode = `<com-empty-state size="lg">
  <div comEmptyStateIcon>
    <com-icon name="layout-dashboard" size="2xl" />
  </div>
  <h2 comEmptyStateTitle>Welcome to your dashboard</h2>
  <p comEmptyStateDescription>
    Start by creating your first widget or importing data.
  </p>
  <div comEmptyStateActions>
    <button comButton variant="outline">Import Data</button>
    <button comButton size="lg">Create Widget</button>
  </div>
</com-empty-state>`;

  protected readonly minimalCode = `<com-empty-state>
  <div comEmptyStateIcon>
    <com-icon name="file-x" size="xl" />
  </div>
  <h3 comEmptyStateTitle>No files</h3>
</com-empty-state>`;
}
