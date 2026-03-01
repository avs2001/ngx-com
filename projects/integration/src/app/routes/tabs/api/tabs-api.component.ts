import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-tabs-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- TabGroupComponent -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">TabGroupComponent</h2>
      <p class="mb-4 text-surface-600">
        The main orchestrator component for content tabs.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
      <div class="rounded-lg border border-surface-200 bg-white p-4">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-tab-group</code>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'underline' | 'pill' | 'outline' | 'solid'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'underline'</code></td>
              <td class="px-4 py-3 text-surface-600">Visual treatment of tab buttons</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'sm' | 'md' | 'lg'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'md'</code></td>
              <td class="px-4 py-3 text-surface-600">Tab button padding and font size</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary' | 'accent' | 'muted'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary'</code></td>
              <td class="px-4 py-3 text-surface-600">Active tab color</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">alignment</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'start' | 'center' | 'end' | 'stretch'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'start'</code></td>
              <td class="px-4 py-3 text-surface-600">Tab alignment within the header</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">selectedIndex</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">model&lt;number&gt;</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">0</code></td>
              <td class="px-4 py-3 text-surface-600">Two-way bindable selected tab index</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">animationEnabled</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">true</code></td>
              <td class="px-4 py-3 text-surface-600">Enable/disable panel transition</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">preserveContent</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Keep inactive tab DOM alive</td>
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
              <td class="px-4 py-3"><code class="text-xs">selectedIndexChange</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">number</code></td>
              <td class="px-4 py-3 text-surface-600">Emitted when selectedIndex changes</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="text-xs">selectedTabChange</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">TabChangeEvent</code></td>
              <td class="px-4 py-3 text-surface-600">Emits index and tab reference</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="text-xs">focusChange</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">number</code></td>
              <td class="px-4 py-3 text-surface-600">Emits focused tab index (keyboard nav)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- TabComponent -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">TabComponent</h2>
      <p class="mb-4 text-surface-600">
        Individual tab definition component. Holds label and content template.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
      <div class="rounded-lg border border-surface-200 bg-white p-4">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-tab</code>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">label</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">''</code></td>
              <td class="px-4 py-3 text-surface-600">Plain text label (ignored if [comTabLabel] is used)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">disabled</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Prevents selection</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">closable</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Shows a close button</td>
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
              <td class="px-4 py-3"><code class="text-xs">closed</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">void</code></td>
              <td class="px-4 py-3 text-surface-600">Emitted when close button is clicked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- TabNavBarComponent -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">TabNavBarComponent</h2>
      <p class="mb-4 text-surface-600">
        Route-driven tab bar. Content is handled by router-outlet.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
      <div class="rounded-lg border border-surface-200 bg-white p-4">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-tab-nav-bar</code> or
        <code class="ml-2 rounded bg-surface-100 px-2 py-1 font-mono text-sm">nav[com-tab-nav-bar]</code>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'underline' | 'pill' | 'outline' | 'solid'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'underline'</code></td>
              <td class="px-4 py-3 text-surface-600">Visual treatment of tab links</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'sm' | 'md' | 'lg'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'md'</code></td>
              <td class="px-4 py-3 text-surface-600">Tab link padding and font size</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary' | 'accent' | 'muted'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary'</code></td>
              <td class="px-4 py-3 text-surface-600">Active tab link color</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">alignment</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'start' | 'center' | 'end' | 'stretch'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'start'</code></td>
              <td class="px-4 py-3 text-surface-600">Tab link alignment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- TabLinkDirective -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">TabLinkDirective</h2>
      <p class="mb-4 text-surface-600">
        Applied to anchor or button elements inside com-tab-nav-bar.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Selector</h3>
      <div class="rounded-lg border border-surface-200 bg-white p-4">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">a[comTabLink]</code> or
        <code class="ml-2 rounded bg-surface-100 px-2 py-1 font-mono text-sm">button[comTabLink]</code>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">active</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Manual active state control</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">disabled</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Prevents interaction</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Template Directives -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Template Directives</h2>
      <p class="mb-4 text-surface-600">
        Customize tab labels and content rendering behavior.
      </p>

      <div class="space-y-6">
        <div class="rounded-lg border border-surface-200 bg-white p-6">
          <h3 class="mb-2 font-semibold text-surface-900">TabLabelDirective</h3>
          <p class="mb-3 text-surface-600">
            Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ng-template[comTabLabel]</code>
          </p>
          <p class="text-surface-600">Provide a custom label template with icons, badges, etc.</p>
        </div>

        <div class="rounded-lg border border-surface-200 bg-white p-6">
          <h3 class="mb-2 font-semibold text-surface-900">TabContentDirective</h3>
          <p class="mb-3 text-surface-600">
            Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ng-template[comTabContent]</code>
          </p>
          <p class="text-surface-600">Mark content for lazy rendering. Only instantiated when tab is first activated.</p>
        </div>
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
        The tabs component follows the WAI-ARIA Tabs pattern.
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
              <td class="px-4 py-3">Tab header</td>
              <td class="px-4 py-3 text-surface-600">role</td>
              <td class="px-4 py-3 text-surface-600">"tablist"</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Tab button</td>
              <td class="px-4 py-3 text-surface-600">role</td>
              <td class="px-4 py-3 text-surface-600">"tab"</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Tab button</td>
              <td class="px-4 py-3 text-surface-600">aria-selected</td>
              <td class="px-4 py-3 text-surface-600">"true" | "false"</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Tab button</td>
              <td class="px-4 py-3 text-surface-600">aria-controls</td>
              <td class="px-4 py-3 text-surface-600">Panel ID</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Tab panel</td>
              <td class="px-4 py-3 text-surface-600">role</td>
              <td class="px-4 py-3 text-surface-600">"tabpanel"</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Tab panel</td>
              <td class="px-4 py-3 text-surface-600">aria-labelledby</td>
              <td class="px-4 py-3 text-surface-600">Tab button ID</td>
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
              <td class="px-4 py-3"><kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">←</kbd> / <kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">→</kbd></td>
              <td class="px-4 py-3 text-surface-600">Move focus between tabs (wraps)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">Home</kbd></td>
              <td class="px-4 py-3 text-surface-600">Focus first enabled tab</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">End</kbd></td>
              <td class="px-4 py-3 text-surface-600">Focus last enabled tab</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">Enter</kbd> / <kbd class="rounded bg-surface-200 px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="px-4 py-3 text-surface-600">Select the focused tab</td>
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
              <td class="px-4 py-3 text-surface-700">--color-primary, --color-primary-foreground</td>
              <td class="px-4 py-3 text-surface-600">Primary color active state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-accent, --color-accent-foreground</td>
              <td class="px-4 py-3 text-surface-600">Accent color active state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted, --color-muted-foreground</td>
              <td class="px-4 py-3 text-surface-600">Muted/inactive styles</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-border</td>
              <td class="px-4 py-3 text-surface-600">Underline variant border</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-ring</td>
              <td class="px-4 py-3 text-surface-600">Focus ring</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled, --color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled state</td>
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
export class TabsApi {
  protected readonly importCode = `import {
  TabGroupComponent,
  TabComponent,
  TabLabelDirective,
  TabContentDirective,
} from 'ngx-com/components/tabs';

// For nav tabs (router-driven):
import {
  TabNavBarComponent,
  TabLinkDirective,
} from 'ngx-com/components/tabs';

// Optional: Types
import type {
  TabVariant,
  TabSize,
  TabColor,
  TabAlignment,
  TabChangeEvent,
} from 'ngx-com/components/tabs';`;

  protected readonly typesCode = `// Tab variant
type TabVariant = 'underline' | 'pill' | 'outline' | 'solid';

// Tab size
type TabSize = 'sm' | 'md' | 'lg';

// Tab color
type TabColor = 'primary' | 'accent' | 'muted';

// Tab alignment
type TabAlignment = 'start' | 'center' | 'end' | 'stretch';

// Tab change event
interface TabChangeEvent {
  index: number;
  tab: TabComponent;
}`;

  protected readonly cvaCode = `import {
  tabItemVariants,
  tabHeaderVariants,
} from 'ngx-com/components/tabs';

// Generate tab button classes
const tabClasses = tabItemVariants({
  variant: 'pill',
  size: 'md',
  color: 'primary',
  active: true,
});
// => "relative inline-flex items-center... bg-primary text-primary-foreground"

// Generate header classes
const headerClasses = tabHeaderVariants({
  alignment: 'center',
  variant: 'pill',
});
// => "relative flex justify-center gap-1 p-1 bg-muted rounded-lg"`;
}
