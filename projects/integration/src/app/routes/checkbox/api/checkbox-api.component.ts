import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-checkbox-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- Selector -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Selector</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-checkbox</code>
        <p class="mt-3 text-surface-600">
          Element selector for the checkbox component.
        </p>
      </div>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comCheckbox</code>
        <p class="mt-3 text-surface-600">
          Template reference name for accessing the component instance.
        </p>
        <int-code-block class="mt-4" language="html" [code]="exportAsCode" />
      </div>
    </section>

    <!-- Inputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inputs</h2>
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'sm' | 'md' | 'lg'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Checkbox size variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary' | 'accent' | 'warn'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Color variant using semantic tokens</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">checked</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Whether the checkbox is checked (two-way bindable)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">indeterminate</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Indeterminate state (clears on user click)</td>
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
              <td class="px-4 py-3 text-surface-600">Whether the checkbox is disabled</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">value</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Optional value attribute for form submission</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">name</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Name attribute for the native input</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">id</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">auto</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Custom ID (auto-generated if not provided)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">aria-label</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">null</code>
              </td>
              <td class="px-4 py-3 text-surface-600">ARIA label when no visible label exists</td>
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
              <td class="px-4 py-3 text-surface-600">Additional CSS classes for the container</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Outputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Outputs</h2>
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
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">changed</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">CheckboxChange</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Emitted when checkbox state changes via user interaction</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">checkedChange</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Emitted for two-way binding with [(checked)]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Methods -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Methods</h2>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">toggle()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Toggles the checkbox state programmatically</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Properties -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Properties</h2>
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
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ngControl</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">NgControl | null</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Access to parent form control for validation state</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">inputId</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">Signal&lt;string&gt;</code>
              </td>
              <td class="px-4 py-3 text-surface-600">The computed input element ID</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The checkbox component requires the following semantic CSS custom properties:
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
              <td class="px-4 py-3 text-surface-600">Unchecked border</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-primary, --color-primary-foreground, --color-primary-hover</td>
              <td class="px-4 py-3 text-surface-600">Primary variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-accent, --color-accent-foreground, --color-accent-hover</td>
              <td class="px-4 py-3 text-surface-600">Accent variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-warn, --color-warn-foreground, --color-warn-hover</td>
              <td class="px-4 py-3 text-surface-600">Warn variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled, --color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-ring</td>
              <td class="px-4 py-3 text-surface-600">Focus ring outline</td>
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
        For advanced use cases, you can import and extend the CVA variants directly:
      </p>
      <int-code-block language="typescript" [code]="cvaCode" />
    </section>
  `,
})
export class CheckboxApi {
  protected readonly importCode = `import { ComCheckbox } from 'ngx-com/components/checkbox';

// Optional: Import types
import type { CheckboxChange, CheckboxSize, CheckboxVariant } from 'ngx-com/components/checkbox';`;

  protected readonly exportAsCode = `<com-checkbox #myCheckbox="comCheckbox">
  {{ myCheckbox.checked() ? 'Checked' : 'Unchecked' }}
</com-checkbox>

<button (click)="myCheckbox.toggle()">Toggle</button>`;

  protected readonly typesCode = `// Size type
type CheckboxSize = 'sm' | 'md' | 'lg';

// Variant type
type CheckboxVariant = 'primary' | 'accent' | 'warn';

// Change event
interface CheckboxChange {
  checked: boolean;
  source: ComCheckbox;
}`;

  protected readonly cvaCode = `import {
  checkboxBoxVariants,
  checkboxIconVariants,
  checkboxLabelVariants,
} from 'ngx-com/components/checkbox';

// Generate class strings programmatically
const boxClasses = checkboxBoxVariants({
  variant: 'accent',
  size: 'lg',
});

const iconClasses = checkboxIconVariants({ size: 'lg' });
const labelClasses = checkboxLabelVariants({ size: 'lg' });`;
}
