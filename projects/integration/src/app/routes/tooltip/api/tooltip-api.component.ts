import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-tooltip-api',
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
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comTooltip]</code>
        <p class="mt-3 text-surface-600">
          Attribute selector applied to the trigger element.
        </p>
      </com-card>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comTooltip</code>
        <p class="mt-3 text-surface-600">
          Template reference name for programmatic show/hide control.
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltip</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">required</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Text content for the tooltip</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipTpl</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">TemplateRef&lt;TooltipTemplateContext&gt;</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">null</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Custom template for rich content (takes precedence over text)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipPosition</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'top' | 'bottom' | 'left' | 'right'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'top'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Preferred position direction</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipColor</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'default' | 'primary' | 'accent' | 'warn' | 'invert'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'default'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Color variant for the tooltip panel</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipSize</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'sm' | 'md' | 'lg'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Size variant affecting padding and max-width</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipShowDelay</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">number</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">200</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Delay in ms before showing (0 for focus)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipHideDelay</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">number</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">100</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Delay in ms before hiding</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipDisabled</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Disable the tooltip entirely</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipHasArrow</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">true</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Show the arrow/caret pointing to trigger</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipTouchGestures</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'auto' | 'on' | 'off'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'auto'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Touch device handling mode</td>
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipShown</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">void</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Emitted when tooltip becomes visible</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comTooltipHidden</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">void</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Emitted when tooltip is fully hidden</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Methods -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Methods</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">show()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Programmatically show the tooltip (ignores disabled state)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">hide()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Programmatically hide the tooltip</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Template Context -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Template Context</h2>
      <p class="mb-4 text-surface-600">
        When using <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">comTooltipTpl</code>, the template receives:
      </p>
      <int-code-block language="typescript" [code]="templateContextCode" />
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The tooltip requires the following CSS custom properties:
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
              <td class="px-4 py-3 text-surface-700">--color-surface-900, --color-surface-50</td>
              <td class="px-4 py-3 text-surface-600">Default (dark) variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-primary, --color-primary-foreground</td>
              <td class="px-4 py-3 text-surface-600">Primary variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-accent, --color-accent-foreground</td>
              <td class="px-4 py-3 text-surface-600">Accent variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-warn, --color-warn-foreground</td>
              <td class="px-4 py-3 text-surface-600">Warn variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-popover, --color-popover-foreground, --color-border</td>
              <td class="px-4 py-3 text-surface-600">Invert variant</td>
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
export class TooltipApi {
  protected readonly importCode = `import { ComTooltip } from 'ngx-com/components/tooltip';

// Optional: Import types for TypeScript
import type {
  TooltipPosition,
  TooltipColor,
  TooltipSize,
  TooltipTemplateContext,
} from 'ngx-com/components/tooltip';`;

  protected readonly exportAsCode = `<button
  #tooltipRef="comTooltip"
  comTooltip="My tooltip"
  [comTooltipDisabled]="true"
>
  Hover me
</button>

<button (click)="tooltipRef.show()">Show</button>
<button (click)="tooltipRef.hide()">Hide</button>`;

  protected readonly templateContextCode = `interface TooltipTemplateContext {
  /** The text content passed to comTooltip input */
  $implicit: string;
  /** Function to programmatically close the tooltip */
  hide: () => void;
}

// Usage in template
<ng-template #myTpl let-text let-hide="hide">
  <p>{{ text }}</p>
  <button (click)="hide()">Close</button>
</ng-template>`;

  protected readonly typesCode = `// Position type
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

// Color variant type
type TooltipColor = 'default' | 'primary' | 'accent' | 'warn' | 'invert';

// Size variant type
type TooltipSize = 'sm' | 'md' | 'lg';

// Touch gesture handling
type TooltipTouchGestures = 'auto' | 'on' | 'off';

// Template context interface
interface TooltipTemplateContext {
  $implicit: string;
  hide: () => void;
}`;

  protected readonly cvaCode = `import {
  tooltipPanelVariants,
  tooltipArrowVariants,
} from 'ngx-com/components/tooltip';

// Generate class string for panel
const panelClasses = tooltipPanelVariants({
  color: 'warn',
  size: 'lg',
});

// Generate class string for arrow
const arrowClasses = tooltipArrowVariants({
  color: 'warn',
  side: 'top',
});`;
}
