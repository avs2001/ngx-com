import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { ComIcon } from 'ngx-com/components/icon';
import { ComButton } from 'ngx-com/components/button';
import { ComItem } from 'ngx-com/components/item';
import {
  ComEmptyState,
  ComEmptyStateIcon,
  ComEmptyStateTitle,
  ComEmptyStateDescription,
  ComEmptyStateActions,
} from 'ngx-com/components/empty-state';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-empty-state-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComCard,
    ComIcon,
    ComButton,
    ComItem,
    ComEmptyState,
    ComEmptyStateIcon,
    ComEmptyStateTitle,
    ComEmptyStateDescription,
    ComEmptyStateActions,
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Empty state with icon, title, description, and action"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <com-empty-state>
          <div comEmptyStateIcon>
            <com-icon name="folder-open" size="xl" />
          </div>
          <h3 comEmptyStateTitle>No projects yet</h3>
          <p comEmptyStateDescription>
            Create your first project to get started organizing your work.
          </p>
          <div comEmptyStateActions>
            <button comButton>Create Project</button>
          </div>
        </com-empty-state>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and compose empty state primitives"
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
        description="What makes com-empty-state powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Content Projection"
            description="Flexible structure using directives for icon, title, description, and actions"
            icon="layout"
          />
          <com-item
            title="3 Sizes"
            description="Small (sm) for inline, medium (md) for default, and large (lg) for full-page empty states"
            icon="maximize"
            iconColor="accent"
          />
          <com-item
            title="Flexible Alignment"
            description="Center (default) or start alignment for different contexts like sidebars or panels"
            icon="align-center"
          />
          <com-item
            title="Two Orientations"
            description="Vertical (stacked) or horizontal layout for different container shapes"
            icon="layout"
            iconColor="accent"
          />
          <com-item
            title="Semantic Tokens"
            description="Uses only semantic tokens (muted, foreground) for consistent theming across modes"
            icon="sun-moon"
          />
          <com-item
            title="Composable"
            description="Works seamlessly with com-icon and comButton components"
            icon="puzzle"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Use Cases -->
    <section>
      <com-item
        title="Common Use Cases"
        description="Where to use empty state components"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>Empty lists:</strong> When a collection has no items ("No messages")
          </li>
          <li>
            <strong>Initial states:</strong> Before user takes first action ("Create your first project")
          </li>
          <li>
            <strong>Search results:</strong> When no matches are found ("No results for 'xyz'")
          </li>
          <li>
            <strong>Error recovery:</strong> After a failure with retry option ("Something went wrong")
          </li>
          <li>
            <strong>Filtered views:</strong> When filters exclude all items ("No items match your filters")
          </li>
        </ul>
      </com-card>
    </section>
  `,
})
export class EmptyStateOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import {
  ComEmptyState,
  ComEmptyStateIcon,
  ComEmptyStateTitle,
  ComEmptyStateDescription,
  ComEmptyStateActions,
} from 'ngx-com/components/empty-state';
import { ComIcon } from 'ngx-com/components/icon';
import { ComButton } from 'ngx-com/components/button';

@Component({
  selector: 'app-example',
  imports: [
    ComEmptyState,
    ComEmptyStateIcon,
    ComEmptyStateTitle,
    ComEmptyStateDescription,
    ComEmptyStateActions,
    ComIcon,
    ComButton,
  ],
  template: \`
    <com-empty-state>
      <div comEmptyStateIcon>
        <com-icon name="inbox" size="xl" />
      </div>
      <h3 comEmptyStateTitle>No messages</h3>
      <p comEmptyStateDescription>
        Your inbox is empty. New messages will appear here.
      </p>
      <div comEmptyStateActions>
        <button comButton>Compose</button>
      </div>
    </com-empty-state>
  \`,
})
export class Example {}`;
}
