import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-avatar-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCard, CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- ComAvatar -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComAvatar</h2>

      <h3 class="mb-3 text-lg font-medium text-surface-800">Selector</h3>
      <com-card variant="outlined" class="mb-6 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-avatar</code>
      </com-card>

      <h3 class="mb-3 text-lg font-medium text-surface-800">Inputs</h3>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">src</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Image URL for the avatar</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">alt</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Alt text for image; falls back to name</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">name</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Display name; used for initials and aria-label</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'md'</code></td>
              <td class="px-4 py-3 text-surface-600">Avatar size (20px to 96px)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary' | 'accent' | 'muted' | 'warn' | 'auto'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'auto'</code></td>
              <td class="px-4 py-3 text-surface-600">Color variant; 'auto' picks based on name</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">shape</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'circle' | 'rounded'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'circle'</code></td>
              <td class="px-4 py-3 text-surface-600">Avatar shape</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'soft' | 'filled' | 'outline'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'soft'</code></td>
              <td class="px-4 py-3 text-surface-600">Visual style variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">interactive</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Enable button behavior with hover/active states</td>
            </tr>
          </tbody>
        </table>
      </com-card>

      <h3 class="mb-3 text-lg font-medium text-surface-800">Outputs</h3>
      <com-card variant="outlined" class="mb-6 overflow-hidden">
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">imageLoaded</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">void</code></td>
              <td class="px-4 py-3 text-surface-600">Emits when the image loads successfully</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">imageError</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">void</code></td>
              <td class="px-4 py-3 text-surface-600">Emits when the image fails to load</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- ComAvatarGroup -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComAvatarGroup</h2>

      <h3 class="mb-3 text-lg font-medium text-surface-800">Selector</h3>
      <com-card variant="outlined" class="mb-6 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comAvatarGroup]</code>
        <p class="mt-3 text-surface-600">Attribute directive applied to a container element.</p>
      </com-card>

      <h3 class="mb-3 text-lg font-medium text-surface-800">Inputs</h3>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'md'</code></td>
              <td class="px-4 py-3 text-surface-600">Should match child avatar sizes for proper spacing</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">max</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">number</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">undefined</code></td>
              <td class="px-4 py-3 text-surface-600">Maximum visible avatars; shows "+N" for overflow</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">reverse</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">When true, last avatar is on top instead of first</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- ComAvatarCustom -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComAvatarCustom</h2>

      <h3 class="mb-3 text-lg font-medium text-surface-800">Selector</h3>
      <com-card variant="outlined" class="mb-6 p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">ng-template[comAvatarCustom]</code>
        <p class="mt-3 text-surface-600">Directive for custom avatar content templates.</p>
      </com-card>

      <h3 class="mb-3 text-lg font-medium text-surface-800">Template Context</h3>
      <com-card variant="outlined" class="mb-6 overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Property</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">$implicit</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string | undefined</code></td>
              <td class="px-4 py-3 text-surface-600">The name input value (use with let-name)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">initials</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600">Computed initials from name</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">AvatarSize</code></td>
              <td class="px-4 py-3 text-surface-600">Current size variant for adaptive content</td>
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
            <strong class="text-surface-900">role="img":</strong> Default role with aria-label from alt or name
          </li>
          <li>
            <strong class="text-surface-900">role="button":</strong> Applied when interactive is true, with tabindex="0"
          </li>
          <li>
            <strong class="text-surface-900">aria-hidden:</strong> Decorative elements (initials, icon, image) are hidden from screen readers
          </li>
          <li>
            <strong class="text-surface-900">sr-only text:</strong> Screen reader text always present with accessible name
          </li>
        </ul>
      </com-card>
    </section>

    <!-- Utilities -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Utilities</h2>
      <p class="mb-4 text-surface-600">
        Exported utility functions for advanced use cases:
      </p>
      <int-code-block language="typescript" [code]="utilitiesCode" />
    </section>

    <!-- Types -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
      <int-code-block language="typescript" [code]="typesCode" />
    </section>
  `,
})
export class AvatarApi {
  protected readonly importCode = `import {
  ComAvatar,
  ComAvatarGroup,
  ComAvatarCustom,
} from 'ngx-com/components/avatar';

// Optional: Import types and utilities
import type {
  AvatarSize,
  AvatarColor,
  AvatarShape,
  AvatarVariant,
  AvatarTemplateContext,
} from 'ngx-com/components/avatar';

import { getInitials } from 'ngx-com/components/avatar';`;

  protected readonly utilitiesCode = `import { getInitials, resolveAutoColor } from 'ngx-com/components/avatar';

// Generate initials from a name
getInitials('Jane Doe');       // 'JD'
getInitials('Jane');           // 'JA'
getInitials('Jane Marie Doe'); // 'JD' (first + last)

// Resolve auto color for a name
resolveAutoColor('auto', 'Jane Doe'); // 'primary' | 'accent' | 'warn'
resolveAutoColor('primary', 'Jane');  // 'primary' (unchanged)`;

  protected readonly typesCode = `// Size variants
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Color variants
type AvatarColor = 'primary' | 'accent' | 'muted' | 'warn' | 'auto';

// Shape variants
type AvatarShape = 'circle' | 'rounded';

// Visual style variants
type AvatarVariant = 'soft' | 'filled' | 'outline';

// Custom template context
interface AvatarTemplateContext {
  $implicit: string | undefined;
  initials: string;
  size: AvatarSize;
}`;
}
