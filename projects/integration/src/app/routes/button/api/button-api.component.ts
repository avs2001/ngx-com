import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-button-api',
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
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">button[uiButton], a[uiButton]</code>
        <p class="mt-3 text-surface-600">
          Attribute selector that applies to native button and anchor elements.
        </p>
      </div>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">uiButton</code>
        <p class="mt-3 text-surface-600">
          Template reference name for accessing the directive instance.
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">variant</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'solid' | 'outline' | 'ghost' | 'link'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'solid'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Visual treatment style</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary' | 'accent' | 'warn' | 'muted'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Color scheme using semantic tokens</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'sm' | 'md' | 'lg' | 'icon'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'md'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Button size with proportional spacing</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">fullWidth</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Stretch to full container width</td>
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
              <td class="px-4 py-3 text-surface-600">Disabled state for anchor elements</td>
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
              <td class="px-4 py-3 text-surface-600">Additional CSS classes merged via tailwind-merge</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The button directive requires the following semantic CSS custom properties to be defined:
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
              <td class="px-4 py-3 text-surface-700">--color-primary, --color-primary-foreground, --color-primary-hover, --color-primary-subtle</td>
              <td class="px-4 py-3 text-surface-600">Primary color variants</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-accent, --color-accent-foreground, --color-accent-hover, --color-accent-subtle</td>
              <td class="px-4 py-3 text-surface-600">Accent color variants</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-warn, --color-warn-foreground, --color-warn-hover, --color-warn-subtle</td>
              <td class="px-4 py-3 text-surface-600">Warn color variants</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted, --color-muted-foreground, --color-muted-hover</td>
              <td class="px-4 py-3 text-surface-600">Muted color variants</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled, --color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-border</td>
              <td class="px-4 py-3 text-surface-600">Outline muted variant border</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-ring</td>
              <td class="px-4 py-3 text-surface-600">Focus ring outline</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Variant Types -->
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
export class ButtonApi {
  protected readonly importCode = `import { UiButton } from 'ngx-com/components/button';

// Optional: Import types for TypeScript
import type { ButtonVariant, ButtonColor, ButtonSize, ButtonVariants } from 'ngx-com/components/button';`;

  protected readonly exportAsCode = `<button uiButton #myBtn="uiButton">
  Variant: {{ myBtn.variant() }}
</button>`;

  protected readonly typesCode = `// Variant type
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

// Color type
type ButtonColor = 'primary' | 'accent' | 'warn' | 'muted';

// Size type
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

// CVA variant props (from class-variance-authority)
type ButtonVariants = {
  variant?: ButtonVariant | null | undefined;
  color?: ButtonColor | null | undefined;
  size?: ButtonSize | null | undefined;
  fullWidth?: boolean | null | undefined;
};`;

  protected readonly cvaCode = `import { buttonVariants } from 'ngx-com/components/button';

// Generate class string programmatically
const classes = buttonVariants({
  variant: 'outline',
  color: 'accent',
  size: 'lg',
});
// => "inline-flex items-center justify-center ... border bg-transparent border-accent text-accent ..."

// Use with your own component
@Component({
  template: \`<div [class]="buttonClasses()">Custom Button</div>\`,
})
export class CustomButton {
  variant = input<ButtonVariant>('solid');
  color = input<ButtonColor>('primary');

  buttonClasses = computed(() =>
    buttonVariants({
      variant: this.variant(),
      color: this.color(),
    })
  );
}`;
}
