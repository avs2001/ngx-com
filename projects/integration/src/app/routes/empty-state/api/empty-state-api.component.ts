import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-empty-state-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCard, CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- Main Component -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComEmptyState</h2>
      <com-card variant="outlined" class="mb-4 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-empty-state</code>
        <p class="mt-3 text-surface-600">
          Main container component. Uses content projection with directives for flexible structure.
        </p>
      </com-card>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Inputs</h3>
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'sm' | 'md' | 'lg'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Controls scale of all child elements</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">align</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'start' | 'center'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'center'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Horizontal alignment of content</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">orientation</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'vertical' | 'horizontal'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'vertical'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Layout direction</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Directives -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Directives</h2>

      <!-- Icon -->
      <com-card variant="outlined" class="mb-4 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comEmptyStateIcon]</code>
        <p class="mt-3 text-surface-600">
          Marks the icon/illustration container. Applies a styled muted background with responsive sizing.
          Place any content inside (typically <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">com-icon</code>).
        </p>
      </com-card>

      <!-- Title -->
      <com-card variant="outlined" class="mb-4 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comEmptyStateTitle]</code>
        <p class="mt-3 text-surface-600">
          Marks the title text. Apply to any heading element (h2, h3, etc.). Consumer picks the semantic level.
          Typography scales with the parent's size input.
        </p>
      </com-card>

      <!-- Description -->
      <com-card variant="outlined" class="mb-4 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comEmptyStateDescription]</code>
        <p class="mt-3 text-surface-600">
          Marks the supporting description text. Applies muted foreground color and max-width for readability.
        </p>
      </com-card>

      <!-- Actions -->
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comEmptyStateActions]</code>
        <p class="mt-3 text-surface-600">
          Container for action buttons. Applies flex layout with centered alignment and gap between buttons.
        </p>
      </com-card>
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The empty state component requires the following semantic CSS custom properties:
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
              <td class="px-4 py-3 text-surface-700">--color-muted</td>
              <td class="px-4 py-3 text-surface-600">Icon container background</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted-foreground</td>
              <td class="px-4 py-3 text-surface-600">Icon container text, description text</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-foreground</td>
              <td class="px-4 py-3 text-surface-600">Title text</td>
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
export class EmptyStateApi {
  protected readonly importCode = `import {
  ComEmptyState,
  ComEmptyStateIcon,
  ComEmptyStateTitle,
  ComEmptyStateDescription,
  ComEmptyStateActions,
} from 'ngx-com/components/empty-state';

// Optional: Import types for TypeScript
import type {
  EmptyStateSize,
  EmptyStateAlign,
  EmptyStateOrientation,
} from 'ngx-com/components/empty-state';`;

  protected readonly typesCode = `// Size variants
type EmptyStateSize = 'sm' | 'md' | 'lg';

// Alignment
type EmptyStateAlign = 'start' | 'center';

// Orientation
type EmptyStateOrientation = 'vertical' | 'horizontal';`;

  protected readonly cvaCode = `import {
  emptyStateVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateDescriptionVariants,
  emptyStateActionsVariants,
} from 'ngx-com/components/empty-state';

// Generate container classes
const containerClasses = emptyStateVariants({
  size: 'lg',
  align: 'center',
  orientation: 'vertical',
});
// => "flex flex-col items-center text-center gap-4 py-10"

// Generate icon container classes
const iconClasses = emptyStateIconVariants({ size: 'lg' });
// => "flex items-center justify-center shrink-0 bg-muted text-muted-foreground size-20 rounded-2xl"

// Generate title classes
const titleClasses = emptyStateTitleVariants({ size: 'lg' });
// => "font-heading tracking-tight text-foreground text-lg font-semibold"`;
}
