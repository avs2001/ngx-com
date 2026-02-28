import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block';

@Component({
  selector: 'int-collapsible-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock, RouterLink],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <ol class="flex items-center gap-2 text-surface-500">
          <li><a routerLink="/" class="hover:text-primary-600">Home</a></li>
          <li>/</li>
          <li><a routerLink="/components/collapsible" class="hover:text-primary-600">Collapsible</a></li>
          <li>/</li>
          <li><span class="text-surface-900">API</span></li>
        </ol>
      </nav>

      <h1 class="mb-4 text-4xl font-bold text-surface-900">Collapsible API</h1>
      <p class="mb-8 text-lg text-surface-600">
        Complete API reference for the Collapsible component.
      </p>

      <!-- Quick nav -->
      <div class="mb-12 flex gap-4">
        <a
          routerLink="/components/collapsible"
          class="rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          Overview
        </a>
        <a
          routerLink="/components/collapsible/examples"
          class="rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          Examples
        </a>
      </div>

      <!-- Import -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
        <int-code-block language="typescript" [code]="importCode" />
      </section>

      <!-- ComCollapsible -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComCollapsible</h2>
        <p class="mb-4 text-surface-600">
          Root directive that manages state and provides the shell styling.
        </p>

        <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comCollapsible]</code>
        </div>

        <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Export As</h3>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comCollapsible</code>
          <int-code-block class="mt-4" language="html" [code]="exportAsCode" />
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
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">open</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">model&lt;boolean&gt;</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">false</code>
                </td>
                <td class="px-4 py-3 text-surface-600">Two-way bound open state</td>
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
                <td class="px-4 py-3 text-surface-600">Prevents state changes</td>
              </tr>
              <tr>
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">'card' | 'bordered' | 'flush' | 'ghost' | 'unstyled'</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">'ghost'</code>
                </td>
                <td class="px-4 py-3 text-surface-600">Shell preset variant</td>
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
                <td class="px-4 py-3 text-surface-600">Additional CSS classes (merged via tailwind-merge)</td>
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
                <td class="px-4 py-3"><code class="text-xs">toggle()</code></td>
                <td class="px-4 py-3 text-surface-600"><code class="text-xs">void</code></td>
                <td class="px-4 py-3 text-surface-600">Toggles the open state</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-xs">expand()</code></td>
                <td class="px-4 py-3 text-surface-600"><code class="text-xs">void</code></td>
                <td class="px-4 py-3 text-surface-600">Sets open to true</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-xs">collapse()</code></td>
                <td class="px-4 py-3 text-surface-600"><code class="text-xs">void</code></td>
                <td class="px-4 py-3 text-surface-600">Sets open to false</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-xs">isOpen()</code></td>
                <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
                <td class="px-4 py-3 text-surface-600">Returns current open state</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-xs">isDisabled()</code></td>
                <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
                <td class="px-4 py-3 text-surface-600">Returns current disabled state</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ComCollapsibleTrigger -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComCollapsibleTrigger</h2>
        <p class="mb-4 text-surface-600">
          Trigger component that handles toggle interaction, ARIA attributes, and keyboard support.
        </p>

        <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comCollapsibleTrigger]</code>
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
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">'ghost' | 'filled' | 'header' | 'unstyled'</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">'ghost'</code>
                </td>
                <td class="px-4 py-3 text-surface-600">Trigger style variant</td>
              </tr>
              <tr>
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">'sm' | 'default' | 'lg'</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">'default'</code>
                </td>
                <td class="px-4 py-3 text-surface-600">Trigger size</td>
              </tr>
              <tr>
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">showIcon</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">boolean</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">true</code>
                </td>
                <td class="px-4 py-3 text-surface-600">Show/hide the toggle icon</td>
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
                <td class="px-4 py-3 text-surface-600">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">ARIA Attributes (auto-applied)</h3>
        <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 bg-surface-50 text-left">
                <th class="px-4 py-3 font-semibold text-surface-900">Attribute</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Value</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100 font-mono text-xs">
              <tr>
                <td class="px-4 py-3">aria-expanded</td>
                <td class="px-4 py-3 text-surface-600">Bound to open state</td>
              </tr>
              <tr>
                <td class="px-4 py-3">aria-controls</td>
                <td class="px-4 py-3 text-surface-600">Content panel ID</td>
              </tr>
              <tr>
                <td class="px-4 py-3">aria-disabled</td>
                <td class="px-4 py-3 text-surface-600">Bound to disabled state</td>
              </tr>
              <tr>
                <td class="px-4 py-3">data-state</td>
                <td class="px-4 py-3 text-surface-600">'open' | 'closed'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ComCollapsibleContent -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComCollapsibleContent</h2>
        <p class="mb-4 text-surface-600">
          Animated content panel using CSS grid for smooth height transitions.
        </p>

        <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-collapsible-content</code>
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
                <td class="px-4 py-3">
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">duration</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">number</code>
                </td>
                <td class="px-4 py-3 text-surface-600">
                  <code class="text-xs">200</code>
                </td>
                <td class="px-4 py-3 text-surface-600">Transition duration in milliseconds</td>
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
                <td class="px-4 py-3 text-surface-600">Classes for the inner wrapper</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">ARIA Attributes (auto-applied)</h3>
        <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 bg-surface-50 text-left">
                <th class="px-4 py-3 font-semibold text-surface-900">Attribute</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Value</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100 font-mono text-xs">
              <tr>
                <td class="px-4 py-3">role</td>
                <td class="px-4 py-3 text-surface-600">region</td>
              </tr>
              <tr>
                <td class="px-4 py-3">aria-labelledby</td>
                <td class="px-4 py-3 text-surface-600">Trigger element ID</td>
              </tr>
              <tr>
                <td class="px-4 py-3">inert</td>
                <td class="px-4 py-3 text-surface-600">Present when closed (blocks focus/interaction)</td>
              </tr>
              <tr>
                <td class="px-4 py-3">data-state</td>
                <td class="px-4 py-3 text-surface-600">'open' | 'closed'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Template Directives -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Template Directives</h2>
        <p class="mb-4 text-surface-600">
          Override specific parts of the component with custom templates.
        </p>

        <div class="space-y-6">
          <!-- ComCollapsibleTriggerTpl -->
          <div class="rounded-lg border border-surface-200 bg-white p-6">
            <h3 class="mb-2 font-semibold text-surface-900">ComCollapsibleTriggerTpl</h3>
            <p class="mb-3 text-surface-600">
              Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ng-template[comCollapsibleTriggerTpl]</code>
            </p>
            <p class="mb-3 text-surface-600">Override the entire trigger layout.</p>
            <h4 class="mb-2 text-sm font-medium text-surface-900">Context</h4>
            <int-code-block language="typescript" [code]="triggerTplContext" />
          </div>

          <!-- ComCollapsibleContentTpl -->
          <div class="rounded-lg border border-surface-200 bg-white p-6">
            <h3 class="mb-2 font-semibold text-surface-900">ComCollapsibleContentTpl</h3>
            <p class="mb-3 text-surface-600">
              Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ng-template[comCollapsibleContentTpl]</code>
            </p>
            <p class="mb-3 text-surface-600">Add custom chrome around the content.</p>
            <h4 class="mb-2 text-sm font-medium text-surface-900">Context</h4>
            <int-code-block language="typescript" [code]="contentTplContext" />
          </div>

          <!-- ComCollapsibleIconTpl -->
          <div class="rounded-lg border border-surface-200 bg-white p-6">
            <h3 class="mb-2 font-semibold text-surface-900">ComCollapsibleIconTpl</h3>
            <p class="mb-3 text-surface-600">
              Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ng-template[comCollapsibleIcon]</code>
            </p>
            <p class="mb-3 text-surface-600">Replace just the toggle icon.</p>
            <h4 class="mb-2 text-sm font-medium text-surface-900">Context</h4>
            <int-code-block language="typescript" [code]="iconTplContext" />
          </div>

          <!-- ComCollapsibleLazy -->
          <div class="rounded-lg border border-surface-200 bg-white p-6">
            <h3 class="mb-2 font-semibold text-surface-900">ComCollapsibleLazy</h3>
            <p class="mb-3 text-surface-600">
              Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ng-template[comCollapsibleLazy]</code>
            </p>
            <p class="text-surface-600">Defer content rendering until first expand.</p>
          </div>
        </div>
      </section>

      <!-- CSS Tokens -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
        <p class="mb-4 text-surface-600">
          The collapsible component uses these semantic CSS custom properties:
        </p>
        <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 bg-surface-50 text-left">
                <th class="px-4 py-3 font-semibold text-surface-900">Token</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Used By</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100 font-mono text-xs">
              <tr>
                <td class="px-4 py-3 text-surface-700">--color-border</td>
                <td class="px-4 py-3 text-surface-600">Card, bordered, flush variants</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-surface-700">--color-background, --color-foreground</td>
                <td class="px-4 py-3 text-surface-600">Card variant</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-surface-700">--color-muted, --color-muted-foreground, --color-muted-hover</td>
                <td class="px-4 py-3 text-surface-600">Trigger variants (ghost, filled)</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-surface-700">--color-ring</td>
                <td class="px-4 py-3 text-surface-600">Focus ring</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-surface-700">--color-disabled-foreground</td>
                <td class="px-4 py-3 text-surface-600">Disabled state</td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-surface-700">--shadow-xs</td>
                <td class="px-4 py-3 text-surface-600">Card variant</td>
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

      <!-- CVA Customization -->
      <section>
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Advanced: CVA Customization</h2>
        <p class="mb-4 text-surface-600">
          Import and use CVA variants directly for custom implementations:
        </p>
        <int-code-block language="typescript" [code]="cvaCode" />
      </section>
    </div>
  `,
})
export class CollapsibleApi {
  protected readonly importCode = `import {
  ComCollapsible,
  ComCollapsibleTrigger,
  ComCollapsibleContent,
} from 'ngx-com/components/collapsible';

// Optional: Template directives
import {
  ComCollapsibleTriggerTpl,
  ComCollapsibleContentTpl,
  ComCollapsibleIconTpl,
  ComCollapsibleLazy,
} from 'ngx-com/components/collapsible';

// Optional: Types
import type {
  CollapsibleVariant,
  CollapsibleTriggerVariant,
  CollapsibleTriggerSize,
} from 'ngx-com/components/collapsible';`;

  protected readonly exportAsCode = `<div comCollapsible #section="comCollapsible">
  ...
</div>

<button (click)="section.toggle()">Toggle</button>
<span>{{ section.isOpen() ? 'Open' : 'Closed' }}</span>`;

  protected readonly triggerTplContext = `interface ComCollapsibleTriggerContext {
  $implicit: boolean;   // open state
  open: boolean;        // open state
  disabled: boolean;    // disabled state
  toggle: () => void;   // toggle function
}

// Usage:
// <ng-template comCollapsibleTriggerTpl let-open let-toggle="toggle">
//   <span>{{ open ? 'Close' : 'Open' }}</span>
// </ng-template>`;

  protected readonly contentTplContext = `interface ComCollapsibleContentContext {
  $implicit: boolean;   // open state
  open: boolean;        // open state
}

// Usage:
// <ng-template comCollapsibleContentTpl let-open="open">
//   <div [class.is-open]="open">...</div>
// </ng-template>`;

  protected readonly iconTplContext = `interface ComCollapsibleIconContext {
  $implicit: boolean;   // open state
  open: boolean;        // open state
}

// Usage:
// <ng-template comCollapsibleIcon let-open="open">
//   <span>{{ open ? '▲' : '▼' }}</span>
// </ng-template>`;

  protected readonly typesCode = `// Shell variant
type CollapsibleVariant = 'card' | 'bordered' | 'flush' | 'ghost' | 'unstyled';

// Trigger variant
type CollapsibleTriggerVariant = 'ghost' | 'filled' | 'header' | 'unstyled';

// Trigger size
type CollapsibleTriggerSize = 'sm' | 'default' | 'lg';

// CVA variant props
type CollapsibleVariants = VariantProps<typeof collapsibleVariants>;
type CollapsibleTriggerVariants = VariantProps<typeof collapsibleTriggerVariants>;`;

  protected readonly cvaCode = `import {
  collapsibleVariants,
  collapsibleTriggerVariants,
} from 'ngx-com/components/collapsible';

// Generate shell classes
const shellClasses = collapsibleVariants({ variant: 'card' });
// => "com-collapsible block rounded-md border border-border bg-background..."

// Generate trigger classes
const triggerClasses = collapsibleTriggerVariants({
  variant: 'filled',
  size: 'lg',
});
// => "com-collapsible-trigger flex w-full... bg-muted text-muted-foreground..."`;
}
