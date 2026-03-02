import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComItem } from 'ngx-com/components/item';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-item-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComItem, ComCard, CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <com-item
        title="Import"
        description="Add the component to your imports array"
        icon="plus"
        size="lg"
        class="mb-4"
      />
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- ComItem -->
    <section class="mb-12">
      <com-item
        title="ComItem"
        description="Main component API reference"
        icon="settings"
        size="lg"
        class="mb-4"
      />

      <com-item title="Selector" icon="info" class="mb-3" />
      <com-card variant="outlined" class="mb-6 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-item</code>
      </com-card>

      <com-item title="Inputs" icon="settings" class="mb-3" />
      <com-card variant="outlined" class="mb-6 overflow-hidden">
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">title</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Primary text (required unless using comItemTitle)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">description</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Secondary text below title</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">icon</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Lucide icon name; renders inside com-avatar</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">iconColor</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">AvatarColor</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary'</code></td>
              <td class="px-4 py-3 text-surface-600">Color for the leading avatar container</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'sm' | 'md' | 'lg'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'md'</code></td>
              <td class="px-4 py-3 text-surface-600">Size variant affecting typography and spacing</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">density</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'compact' | 'default' | 'comfortable'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'default'</code></td>
              <td class="px-4 py-3 text-surface-600">Vertical padding variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">interactive</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Enable hover/active/focus states</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">active</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Show selected/active highlight</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">disabled</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Dims item and disables pointer events</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">truncate</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">true</code></td>
              <td class="px-4 py-3 text-surface-600">Truncate title and description text</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Content Projection Directives -->
    <section class="mb-12">
      <com-item
        title="Content Projection Directives"
        description="Use ng-template directives to customize each zone"
        icon="star"
        iconColor="accent"
        size="lg"
        class="mb-4"
      />

      <com-card variant="outlined" class="mb-6 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Directive</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Zone</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comItemLeading</code></td>
              <td class="px-4 py-3 text-surface-600">Leading visual</td>
              <td class="px-4 py-3 text-surface-600">Replaces the default icon avatar (use for custom avatars, images, etc.)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comItemTitle</code></td>
              <td class="px-4 py-3 text-surface-600">Title</td>
              <td class="px-4 py-3 text-surface-600">Replaces title input with rich content (links, formatting)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comItemSuffix</code></td>
              <td class="px-4 py-3 text-surface-600">Inline suffix</td>
              <td class="px-4 py-3 text-surface-600">Content after title (badges, tags, status indicators)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comItemDescription</code></td>
              <td class="px-4 py-3 text-surface-600">Description</td>
              <td class="px-4 py-3 text-surface-600">Replaces description input with rich content (code, timestamps)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comItemTrailing</code></td>
              <td class="px-4 py-3 text-surface-600">Trailing</td>
              <td class="px-4 py-3 text-surface-600">Far-right content (chevrons, actions, timestamps)</td>
            </tr>
          </tbody>
        </table>
      </com-card>

      <int-code-block language="html" [code]="directivesCode" />
    </section>

    <!-- Accessibility -->
    <section class="mb-12">
      <com-item
        title="Accessibility"
        description="WCAG compliance and keyboard support"
        icon="check-circle"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="role=&quot;button&quot;"
            description="Applied when interactive is true, with tabindex=&quot;0&quot;"
            icon="user"
          />
          <com-item
            title="Keyboard support"
            description="Enter and Space trigger click when interactive"
            icon="settings"
          />
          <com-item
            title="aria-disabled"
            description="Applied when disabled is true"
            icon="x-circle"
            iconColor="muted"
          />
          <com-item
            title="aria-label"
            description="Set from title input for accessible name"
            icon="info"
          />
          <com-item
            title="Focus visible"
            description="Focus ring shown when interactive and focused via keyboard"
            icon="star"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Types -->
    <section>
      <com-item
        title="Types"
        description="TypeScript type definitions"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <int-code-block language="typescript" [code]="typesCode" />
    </section>
  `,
})
export class ItemApi {
  protected readonly importCode = `import {
  ComItem,
  ComItemLeading,
  ComItemTitle,
  ComItemSuffix,
  ComItemDescription,
  ComItemTrailing,
} from 'ngx-com/components/item';

// Optional: Import types
import type { ItemSize, ItemDensity } from 'ngx-com/components/item';`;

  protected readonly directivesCode = `<!-- Custom leading visual -->
<com-item title="Jane Doe">
  <ng-template comItemLeading>
    <com-avatar src="/photos/jane.jpg" name="Jane" size="sm" />
  </ng-template>
</com-item>

<!-- Rich title content -->
<com-item icon="link">
  <ng-template comItemTitle>
    <a href="/docs" class="hover:underline">Documentation</a>
  </ng-template>
</com-item>

<!-- Inline suffix -->
<com-item title="Datasource" icon="heart">
  <ng-template comItemSuffix>
    <span class="badge">Bluetooth</span>
  </ng-template>
</com-item>

<!-- Rich description -->
<com-item title="API Key" icon="key">
  <ng-template comItemDescription>
    <code>sk-abc...xyz</code> · Created 3 days ago
  </ng-template>
</com-item>

<!-- Trailing content -->
<com-item title="Settings" icon="settings" [interactive]="true">
  <ng-template comItemTrailing>
    <com-icon name="chevron-right" size="sm" />
  </ng-template>
</com-item>`;

  protected readonly typesCode = `// Size variants
type ItemSize = 'sm' | 'md' | 'lg';

// Density variants
type ItemDensity = 'compact' | 'default' | 'comfortable';

// Icon color (same as AvatarColor)
type AvatarColor = 'primary' | 'accent' | 'muted' | 'warn' | 'auto';`;
}
