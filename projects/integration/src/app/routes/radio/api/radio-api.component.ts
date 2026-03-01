import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';

@Component({
  selector: 'int-radio-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCard],
  template: `
    <!-- ComRadioGroup -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComRadioGroup</h2>
      <p class="mb-4 text-surface-600">
        Container component that manages a set of radio buttons with mutual exclusion.
      </p>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Selector</h3>
      <com-card variant="outlined" class="mb-6 p-4">
        <code class="text-sm">com-radio-group</code>
      </com-card>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Inputs</h3>
      <com-card variant="outlined" class="mb-6 overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="p-3 text-left font-semibold">Name</th>
              <th class="p-3 text-left font-semibold">Type</th>
              <th class="p-3 text-left font-semibold">Default</th>
              <th class="p-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="p-3"><code>value</code></td>
              <td class="p-3"><code>string | null</code></td>
              <td class="p-3"><code>null</code></td>
              <td class="p-3">Two-way bindable selected value</td>
            </tr>
            <tr>
              <td class="p-3"><code>name</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3">auto-generated</td>
              <td class="p-3">Shared name for all child radios</td>
            </tr>
            <tr>
              <td class="p-3"><code>disabled</code></td>
              <td class="p-3"><code>boolean</code></td>
              <td class="p-3"><code>false</code></td>
              <td class="p-3">Disables all child radios</td>
            </tr>
            <tr>
              <td class="p-3"><code>required</code></td>
              <td class="p-3"><code>boolean</code></td>
              <td class="p-3"><code>false</code></td>
              <td class="p-3">Marks the group as required</td>
            </tr>
            <tr>
              <td class="p-3"><code>orientation</code></td>
              <td class="p-3"><code>'vertical' | 'horizontal'</code></td>
              <td class="p-3"><code>'vertical'</code></td>
              <td class="p-3">Layout direction for child radios</td>
            </tr>
            <tr>
              <td class="p-3"><code>size</code></td>
              <td class="p-3"><code>'sm' | 'md' | 'lg'</code></td>
              <td class="p-3"><code>'md'</code></td>
              <td class="p-3">Size applied to all child radios</td>
            </tr>
            <tr>
              <td class="p-3"><code>variant</code></td>
              <td class="p-3"><code>'primary' | 'accent' | 'warn'</code></td>
              <td class="p-3"><code>'primary'</code></td>
              <td class="p-3">Color variant for all child radios</td>
            </tr>
            <tr>
              <td class="p-3"><code>error</code></td>
              <td class="p-3"><code>boolean</code></td>
              <td class="p-3"><code>false</code></td>
              <td class="p-3">Error state for validation</td>
            </tr>
            <tr>
              <td class="p-3"><code>errorMessage</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3"><code>''</code></td>
              <td class="p-3">Error message displayed when error is true</td>
            </tr>
            <tr>
              <td class="p-3"><code>aria-label</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3"><code>null</code></td>
              <td class="p-3">Accessible label for the group</td>
            </tr>
            <tr>
              <td class="p-3"><code>aria-labelledby</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3"><code>null</code></td>
              <td class="p-3">ID of element labeling this group</td>
            </tr>
            <tr>
              <td class="p-3"><code>aria-describedby</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3"><code>null</code></td>
              <td class="p-3">ID of element describing this group</td>
            </tr>
          </tbody>
        </table>
      </com-card>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Outputs</h3>
      <com-card variant="outlined" class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="p-3 text-left font-semibold">Name</th>
              <th class="p-3 text-left font-semibold">Type</th>
              <th class="p-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="p-3"><code>valueChange</code></td>
              <td class="p-3"><code>RadioGroupChange</code></td>
              <td class="p-3">Emitted when the selected value changes</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- ComRadio -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComRadio</h2>
      <p class="mb-4 text-surface-600">
        Individual radio option that must be used within a ComRadioGroup.
      </p>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Selector</h3>
      <com-card variant="outlined" class="mb-6 p-4">
        <code class="text-sm">com-radio</code>
      </com-card>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Inputs</h3>
      <com-card variant="outlined" class="mb-6 overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="p-3 text-left font-semibold">Name</th>
              <th class="p-3 text-left font-semibold">Type</th>
              <th class="p-3 text-left font-semibold">Default</th>
              <th class="p-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="p-3"><code>value</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3">required</td>
              <td class="p-3">The value of this radio option</td>
            </tr>
            <tr>
              <td class="p-3"><code>disabled</code></td>
              <td class="p-3"><code>boolean</code></td>
              <td class="p-3"><code>false</code></td>
              <td class="p-3">Disables this specific radio</td>
            </tr>
            <tr>
              <td class="p-3"><code>size</code></td>
              <td class="p-3"><code>'sm' | 'md' | 'lg'</code></td>
              <td class="p-3">inherited</td>
              <td class="p-3">Overrides group size for this radio</td>
            </tr>
            <tr>
              <td class="p-3"><code>variant</code></td>
              <td class="p-3"><code>'primary' | 'accent' | 'warn'</code></td>
              <td class="p-3">inherited</td>
              <td class="p-3">Overrides group variant for this radio</td>
            </tr>
            <tr>
              <td class="p-3"><code>id</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3">auto-generated</td>
              <td class="p-3">Custom ID for the input element</td>
            </tr>
            <tr>
              <td class="p-3"><code>aria-label</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3"><code>null</code></td>
              <td class="p-3">Accessible label for this option</td>
            </tr>
            <tr>
              <td class="p-3"><code>aria-labelledby</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3"><code>null</code></td>
              <td class="p-3">ID of element labeling this radio</td>
            </tr>
            <tr>
              <td class="p-3"><code>aria-describedby</code></td>
              <td class="p-3"><code>string</code></td>
              <td class="p-3"><code>null</code></td>
              <td class="p-3">ID of element describing this radio</td>
            </tr>
          </tbody>
        </table>
      </com-card>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Outputs</h3>
      <com-card variant="outlined" class="mb-6 overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="p-3 text-left font-semibold">Name</th>
              <th class="p-3 text-left font-semibold">Type</th>
              <th class="p-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="p-3"><code>changed</code></td>
              <td class="p-3"><code>RadioChange</code></td>
              <td class="p-3">Emitted when this radio is selected</td>
            </tr>
          </tbody>
        </table>
      </com-card>

      <h3 class="mb-3 text-lg font-semibold text-surface-900">Methods</h3>
      <com-card variant="outlined" class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="p-3 text-left font-semibold">Name</th>
              <th class="p-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="p-3"><code>focus()</code></td>
              <td class="p-3">Programmatically focuses this radio's input</td>
            </tr>
            <tr>
              <td class="p-3"><code>select()</code></td>
              <td class="p-3">Programmatically selects this radio</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Keyboard Navigation -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Keyboard Navigation</h2>
      <com-card variant="outlined" class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="p-3 text-left font-semibold">Key</th>
              <th class="p-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="p-3"><kbd class="rounded border bg-surface-100 px-1.5 py-0.5">Tab</kbd></td>
              <td class="p-3">Enter/exit the radio group (lands on selected or first item)</td>
            </tr>
            <tr>
              <td class="p-3"><kbd class="rounded border bg-surface-100 px-1.5 py-0.5">Arrow Down</kbd> / <kbd class="rounded border bg-surface-100 px-1.5 py-0.5">Arrow Right</kbd></td>
              <td class="p-3">Move to and select next option (wraps to first)</td>
            </tr>
            <tr>
              <td class="p-3"><kbd class="rounded border bg-surface-100 px-1.5 py-0.5">Arrow Up</kbd> / <kbd class="rounded border bg-surface-100 px-1.5 py-0.5">Arrow Left</kbd></td>
              <td class="p-3">Move to and select previous option (wraps to last)</td>
            </tr>
            <tr>
              <td class="p-3"><kbd class="rounded border bg-surface-100 px-1.5 py-0.5">Space</kbd></td>
              <td class="p-3">Select the focused option</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>
  `,
})
export class RadioApi {}
