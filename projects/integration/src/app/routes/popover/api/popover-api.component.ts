import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'int-popover-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">PopoverTriggerDirective</h2>
      <p class="mb-4 text-surface-600">
        Main directive applied to the trigger element. Manages the entire popover lifecycle.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">Selector</h3>
      <code class="rounded bg-muted px-2 py-1 text-sm">[uiPopoverTrigger]</code>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">Inputs</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium">Input</th>
              <th class="px-4 py-3 font-medium">Type</th>
              <th class="px-4 py-3 font-medium">Default</th>
              <th class="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">uiPopoverTrigger</td>
              <td class="px-4 py-3 text-surface-600">TemplateRef | Type</td>
              <td class="px-4 py-3 text-surface-500">required</td>
              <td class="px-4 py-3">Content to render — template or component class</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverPosition</td>
              <td class="px-4 py-3 text-surface-600">'above' | 'below' | 'left' | 'right' | 'auto'</td>
              <td class="px-4 py-3 text-surface-500">'auto'</td>
              <td class="px-4 py-3">Preferred placement direction</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverAlignment</td>
              <td class="px-4 py-3 text-surface-600">'start' | 'center' | 'end'</td>
              <td class="px-4 py-3 text-surface-500">'center'</td>
              <td class="px-4 py-3">Alignment along the cross-axis</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverTriggerOn</td>
              <td class="px-4 py-3 text-surface-600">'click' | 'focus' | 'manual'</td>
              <td class="px-4 py-3 text-surface-500">'click'</td>
              <td class="px-4 py-3">What interaction opens the popover</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverOffset</td>
              <td class="px-4 py-3 text-surface-600">number</td>
              <td class="px-4 py-3 text-surface-500">8</td>
              <td class="px-4 py-3">Gap in px between trigger and popover</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverShowArrow</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3 text-surface-500">true</td>
              <td class="px-4 py-3">Whether to show the connecting arrow</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverVariant</td>
              <td class="px-4 py-3 text-surface-600">'default' | 'compact' | 'wide' | 'flush'</td>
              <td class="px-4 py-3 text-surface-500">'default'</td>
              <td class="px-4 py-3">Size/padding preset</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverBackdrop</td>
              <td class="px-4 py-3 text-surface-600">'transparent' | 'dimmed' | 'none'</td>
              <td class="px-4 py-3 text-surface-500">'transparent'</td>
              <td class="px-4 py-3">Backdrop behavior</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverCloseOnOutside</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3 text-surface-500">true</td>
              <td class="px-4 py-3">Close when clicking outside</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverCloseOnEscape</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3 text-surface-500">true</td>
              <td class="px-4 py-3">Close on Escape key</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverCloseOnScroll</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3 text-surface-500">false</td>
              <td class="px-4 py-3">Close when ancestor container scrolls</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverDisabled</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3 text-surface-500">false</td>
              <td class="px-4 py-3">Prevents opening</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverOpen</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3 text-surface-500">false</td>
              <td class="px-4 py-3">Two-way bindable open state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverData</td>
              <td class="px-4 py-3 text-surface-600">any</td>
              <td class="px-4 py-3 text-surface-500">undefined</td>
              <td class="px-4 py-3">Data passed to content</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverPanelClass</td>
              <td class="px-4 py-3 text-surface-600">string | string[]</td>
              <td class="px-4 py-3 text-surface-500">''</td>
              <td class="px-4 py-3">Custom CSS class on the panel</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverTrapFocus</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3 text-surface-500">false</td>
              <td class="px-4 py-3">Trap focus inside popover</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverAriaLabel</td>
              <td class="px-4 py-3 text-surface-600">string</td>
              <td class="px-4 py-3 text-surface-500">undefined</td>
              <td class="px-4 py-3">Accessibility label for the dialog</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">Outputs</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium">Output</th>
              <th class="px-4 py-3 font-medium">Type</th>
              <th class="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverOpenChange</td>
              <td class="px-4 py-3 text-surface-600">boolean</td>
              <td class="px-4 py-3">From the model — open/close state changed</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverOpened</td>
              <td class="px-4 py-3 text-surface-600">void</td>
              <td class="px-4 py-3">Emitted after popover opens</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">popoverClosed</td>
              <td class="px-4 py-3 text-surface-600">void</td>
              <td class="px-4 py-3">Emitted after popover closes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">Methods</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium">Method</th>
              <th class="px-4 py-3 font-medium">Returns</th>
              <th class="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">open()</td>
              <td class="px-4 py-3 text-surface-600">void</td>
              <td class="px-4 py-3">Programmatically open the popover</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">close()</td>
              <td class="px-4 py-3 text-surface-600">void</td>
              <td class="px-4 py-3">Programmatically close the popover</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">toggle()</td>
              <td class="px-4 py-3 text-surface-600">void</td>
              <td class="px-4 py-3">Toggle open/close state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">reposition()</td>
              <td class="px-4 py-3 text-surface-600">void</td>
              <td class="px-4 py-3">Force recalculation of position</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">PopoverCloseDirective</h2>
      <p class="mb-4 text-surface-600">
        Convenience directive to close the parent popover when clicked.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">Selector</h3>
      <code class="rounded bg-muted px-2 py-1 text-sm">[uiPopoverClose]</code>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">Inputs</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium">Input</th>
              <th class="px-4 py-3 font-medium">Type</th>
              <th class="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">uiPopoverClose</td>
              <td class="px-4 py-3 text-surface-600">any</td>
              <td class="px-4 py-3">Optional result value (not currently emitted)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Injection Tokens</h2>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">POPOVER_DATA</h3>
      <p class="mb-4 text-surface-600">
        Inject this token to access the data passed via
        <code class="rounded bg-muted px-1 text-sm">popoverData</code> input.
      </p>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-800">POPOVER_REF</h3>
      <p class="mb-4 text-surface-600">
        Inject this token to get a reference to the popover trigger for programmatic control.
        Provides <code class="rounded bg-muted px-1 text-sm">open()</code>,
        <code class="rounded bg-muted px-1 text-sm">close()</code>,
        <code class="rounded bg-muted px-1 text-sm">toggle()</code>, and
        <code class="rounded bg-muted px-1 text-sm">reposition()</code> methods.
      </p>
    </section>

    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Template Context</h2>
      <p class="mb-4 text-surface-600">
        When using a template, the following context is available:
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium">Property</th>
              <th class="px-4 py-3 font-medium">Type</th>
              <th class="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">$implicit</td>
              <td class="px-4 py-3 text-surface-600">any</td>
              <td class="px-4 py-3">The popoverData value</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">close</td>
              <td class="px-4 py-3 text-surface-600">() => void</td>
              <td class="px-4 py-3">Function to close the popover</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class PopoverApi {}
