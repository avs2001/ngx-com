import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-spinner-api',
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
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-spinner</code>
        <p class="mt-3 text-surface-600">
          Element selector for the spinner component.
        </p>
      </com-card>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comSpinner</code>
        <p class="mt-3 text-surface-600">
          Template reference name for accessing the component instance.
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'xs' | 'sm' | 'md' | 'lg' | 'xl'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Spinner size (12px to 40px)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'current' | 'primary' | 'accent' | 'warn' | 'success' | 'muted'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'current'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Spinner color; 'current' inherits from parent text color</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">label</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string | undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Optional visible loading text; sr-only "Loading" when omitted</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">labelPosition</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'right' | 'bottom'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'right'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Label position relative to spinner</td>
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
            <strong class="text-surface-900">role="status":</strong> Host element has role="status" for screen reader announcements
          </li>
          <li>
            <strong class="text-surface-900">aria-hidden="true":</strong> The spinning visual element is hidden from screen readers
          </li>
          <li>
            <strong class="text-surface-900">sr-only fallback:</strong> When no label is provided, "Loading" is rendered as screen-reader-only text
          </li>
          <li>
            <strong class="text-surface-900">Visible label:</strong> When label is provided, it serves as both visible and accessible text
          </li>
        </ul>
      </com-card>
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The spinner component requires the following semantic CSS custom properties:
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
              <td class="px-4 py-3 text-surface-700">--color-primary</td>
              <td class="px-4 py-3 text-surface-600">Primary color variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-accent</td>
              <td class="px-4 py-3 text-surface-600">Accent color variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-warn</td>
              <td class="px-4 py-3 text-surface-600">Warn color variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-success</td>
              <td class="px-4 py-3 text-surface-600">Success color variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted-foreground</td>
              <td class="px-4 py-3 text-surface-600">Muted color variant, label text</td>
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
export class SpinnerApi {
  protected readonly importCode = `import { ComSpinner } from 'ngx-com/components/spinner';

// Optional: Import types for TypeScript
import type {
  SpinnerSize,
  SpinnerColor,
  SpinnerLabelPosition,
} from 'ngx-com/components/spinner';`;

  protected readonly exportAsCode = `<com-spinner #mySpinner="comSpinner" />
<!-- Access: mySpinner.size(), mySpinner.color(), etc. -->`;

  protected readonly typesCode = `// Size variants
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Color variants
type SpinnerColor = 'current' | 'primary' | 'accent' | 'warn' | 'success' | 'muted';

// Label position
type SpinnerLabelPosition = 'right' | 'bottom';`;

  protected readonly cvaCode = `import {
  spinnerVariants,
  spinnerContainerVariants,
  SPINNER_LABEL_SIZES,
} from 'ngx-com/components/spinner';

// Generate spinner circle classes
const circleClasses = spinnerVariants({
  size: 'lg',
  color: 'primary',
});
// => "com-spinner__circle inline-block shrink-0 ... size-8 border-[2.5px] border-primary/20 border-t-primary"

// Generate container classes (for layout with label)
const containerClasses = spinnerContainerVariants({
  labelPosition: 'bottom',
});
// => "inline-flex items-center justify-center flex-col gap-1.5"

// Get label size class for a spinner size
const labelClass = SPINNER_LABEL_SIZES['lg'];
// => "text-sm"`;
}
