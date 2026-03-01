import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-form-field-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- ComFormField -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComFormField</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <div class="mb-4">
          <span class="text-sm font-medium text-surface-500">Selector:</span>
          <code class="ml-2 rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-form-field</code>
        </div>
        <div>
          <span class="text-sm font-medium text-surface-500">Export As:</span>
          <code class="ml-2 rounded bg-surface-100 px-2 py-1 font-mono text-sm">comFormField</code>
        </div>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">appearance</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'outline' | 'fill'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'outline'</code></td>
              <td class="px-4 py-3 text-surface-600">Visual style of the field container</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary' | 'accent' | 'warn'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'primary'</code></td>
              <td class="px-4 py-3 text-surface-600">Theme color for focus state</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">floatLabel</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'auto' | 'always'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'auto'</code></td>
              <td class="px-4 py-3 text-surface-600">When to float the label</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">hideRequiredMarker</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">false</code></td>
              <td class="px-4 py-3 text-surface-600">Hide the asterisk on required fields</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">subscriptSizing</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'fixed' | 'dynamic'</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">'fixed'</code></td>
              <td class="px-4 py-3 text-surface-600">Whether subscript reserves space or collapses</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ComInput -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComInput</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <div class="mb-4">
          <span class="text-sm font-medium text-surface-500">Selector:</span>
          <code class="ml-2 rounded bg-surface-100 px-2 py-1 font-mono text-sm">input[comInput], textarea[comInput]</code>
        </div>
        <div>
          <span class="text-sm font-medium text-surface-500">Export As:</span>
          <code class="ml-2 rounded bg-surface-100 px-2 py-1 font-mono text-sm">comInput</code>
        </div>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-semibold text-surface-900">Inputs</h3>
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
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">id</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">string</code></td>
              <td class="px-4 py-3 text-surface-600">Custom ID (auto-generated if not provided)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">disabled</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600">Whether the input is disabled</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">required</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">boolean</code></td>
              <td class="px-4 py-3 text-surface-600">Whether the input is required</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">errorStateMatcher</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">ErrorStateMatcher</code></td>
              <td class="px-4 py-3 text-surface-600">Custom error state matching strategy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Supporting Directives -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Supporting Directives</h2>
      <div class="overflow-hidden rounded-lg border border-surface-200 bg-white">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Directive</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Selector</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ComLabel</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">[comLabel]</code></td>
              <td class="px-4 py-3 text-surface-600">Marks the label element for association with the input</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ComHint</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">[comHint]</code></td>
              <td class="px-4 py-3 text-surface-600">Hint text in subscript area. Use <code class="text-xs">align="end"</code> for right alignment.</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ComError</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">[comError]</code></td>
              <td class="px-4 py-3 text-surface-600">Error message. Use <code class="text-xs">match="errorKey"</code> for conditional display.</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ComPrefix</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">[comPrefix]</code></td>
              <td class="px-4 py-3 text-surface-600">Content slot before the input (icons, text)</td>
            </tr>
            <tr>
              <td class="px-4 py-3"><code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ComSuffix</code></td>
              <td class="px-4 py-3 text-surface-600"><code class="text-xs">[comSuffix]</code></td>
              <td class="px-4 py-3 text-surface-600">Content slot after the input (icons, buttons)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ErrorStateMatcher -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ErrorStateMatcher</h2>
      <p class="mb-4 text-surface-600">
        Injectable strategy that determines when to display errors. The default shows errors when the control
        is invalid AND (touched OR form submitted).
      </p>
      <int-code-block language="typescript" [code]="errorStateMatcherCode" />
    </section>

    <!-- FORM_FIELD_DEFAULTS -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">FORM_FIELD_DEFAULTS</h2>
      <p class="mb-4 text-surface-600">
        Injection token for global configuration defaults.
      </p>
      <int-code-block language="typescript" [code]="defaultsCode" />
    </section>

    <!-- FormFieldControl -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">FormFieldControl (Custom Controls)</h2>
      <p class="mb-4 text-surface-600">
        Abstract class that custom controls implement to work inside com-form-field.
      </p>
      <int-code-block language="typescript" [code]="formFieldControlCode" />
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The form field component requires the following semantic CSS custom properties:
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
              <td class="px-4 py-3 text-surface-700">--color-input-border</td>
              <td class="px-4 py-3 text-surface-600">Default border color</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-primary, --color-accent, --color-warn</td>
              <td class="px-4 py-3 text-surface-600">Focus state colors</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-ring</td>
              <td class="px-4 py-3 text-surface-600">Focus ring outline</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted, --color-muted-foreground</td>
              <td class="px-4 py-3 text-surface-600">Fill appearance, label, hints</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-warn</td>
              <td class="px-4 py-3 text-surface-600">Error state and error text</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled, --color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-background</td>
              <td class="px-4 py-3 text-surface-600">Floating label background (outline)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--radius-input</td>
              <td class="px-4 py-3 text-surface-600">Border radius</td>
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
export class FormFieldApi {
  protected readonly importCode = `import {
  ComFormField,
  ComInput,
  ComLabel,
  ComHint,
  ComError,
  ComPrefix,
  ComSuffix,
} from 'ngx-com/components/form-field';

// Optional: Import types and utilities
import type {
  FormFieldAppearance,
  FormFieldColor,
  FormFieldFloatLabel,
} from 'ngx-com/components/form-field';

import { ErrorStateMatcher, FORM_FIELD_DEFAULTS } from 'ngx-com/components/form-field';`;

  protected readonly errorStateMatcherCode = `import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from 'ngx-com/components/form-field';

// Custom matcher: show errors immediately as user types
@Injectable()
export class EagerErrorStateMatcher extends ErrorStateMatcher {
  override isErrorState(control, form) {
    return !!(control?.invalid && control.dirty);
  }
}

// Provide globally
providers: [{ provide: ErrorStateMatcher, useClass: EagerErrorStateMatcher }]

// Or per-field
<input comInput [errorStateMatcher]="eagerMatcher" />`;

  protected readonly defaultsCode = `import { FORM_FIELD_DEFAULTS } from 'ngx-com/components/form-field';

// Set global defaults in app config
providers: [
  {
    provide: FORM_FIELD_DEFAULTS,
    useValue: {
      appearance: 'fill',
      floatLabel: 'always',
      color: 'primary',
      hideRequiredMarker: false,
      subscriptSizing: 'fixed',
    }
  }
]`;

  protected readonly formFieldControlCode = `import { FormFieldControl } from 'ngx-com/components/form-field';

// Custom control (e.g., phone input, color picker)
@Directive({
  selector: 'my-phone-input',
  providers: [{ provide: FormFieldControl, useExisting: MyPhoneInput }],
})
export class MyPhoneInput extends FormFieldControl<string> {
  // Implement required abstract members:
  readonly ngControl: NgControl | null;
  readonly focused: Signal<boolean>;
  readonly shouldLabelFloat: Signal<boolean>;
  readonly required: Signal<boolean>;
  readonly disabled: Signal<boolean>;
  readonly errorState: Signal<boolean>;
  readonly id: Signal<string>;

  onContainerClick(event: MouseEvent): void {
    // Focus the input when container is clicked
  }
}`;

  protected readonly typesCode = `// Appearance
type FormFieldAppearance = 'fill' | 'outline';

// Color
type FormFieldColor = 'primary' | 'accent' | 'warn';

// Float label behavior
type FormFieldFloatLabel = 'auto' | 'always';

// Subscript sizing
type FormFieldSubscriptSizing = 'fixed' | 'dynamic';

// Hint alignment
type HintAlign = 'start' | 'end';

// Global defaults interface
interface FormFieldDefaults {
  appearance?: FormFieldAppearance;
  color?: FormFieldColor;
  floatLabel?: FormFieldFloatLabel;
  hideRequiredMarker?: boolean;
  subscriptSizing?: FormFieldSubscriptSizing;
}`;

  protected readonly cvaCode = `import {
  formFieldVariants,
  formFieldContainerVariants,
  formFieldLabelVariants,
  inputVariants,
} from 'ngx-com/components/form-field';

// Generate class strings programmatically
const containerClasses = formFieldContainerVariants({
  appearance: 'outline',
  color: 'primary',
  focused: true,
  error: false,
});

const labelClasses = formFieldLabelVariants({
  appearance: 'outline',
  floating: true,
  focused: true,
});`;
}
