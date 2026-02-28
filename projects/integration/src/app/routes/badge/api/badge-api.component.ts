import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-badge-api',
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
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comBadge]</code>
        <p class="mt-3 text-surface-600">
          Attribute selector that can be applied to any element.
        </p>
      </div>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comBadge</code>
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
                <code class="text-xs">'primary' | 'accent' | 'warn' | 'success' | 'muted' | 'outline'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Visual variant using semantic color tokens</td>
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
              <td class="px-4 py-3 text-surface-600">Badge size with proportional spacing and typography</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">pill</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Fully rounded pill shape</td>
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
        The badge directive requires the following semantic CSS custom properties to be defined:
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
              <td class="px-4 py-3 text-surface-700">--color-success, --color-success-foreground, --color-success-hover</td>
              <td class="px-4 py-3 text-surface-600">Success variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted, --color-muted-foreground, --color-muted-hover</td>
              <td class="px-4 py-3 text-surface-600">Muted variant, outline hover</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-border, --color-foreground</td>
              <td class="px-4 py-3 text-surface-600">Outline variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--radius-pill</td>
              <td class="px-4 py-3 text-surface-600">Pill shape (9999px)</td>
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
        For advanced use cases, you can import and extend the CVA variants directly:
      </p>
      <int-code-block language="typescript" [code]="cvaCode" />
    </section>
  `,
})
export class BadgeApi {
  protected readonly importCode = `import { ComBadge } from 'ngx-com/components/badge';

// Optional: Import types for TypeScript
import type { BadgeVariant, BadgeSize, BadgeVariants } from 'ngx-com/components/badge';`;

  protected readonly exportAsCode = `<span comBadge #myBadge="comBadge">
  {{ myBadge.variant() }}
</span>`;

  protected readonly typesCode = `// Variant type
type BadgeVariant = 'primary' | 'accent' | 'warn' | 'success' | 'muted' | 'outline';

// Size type
type BadgeSize = 'sm' | 'default' | 'lg';

// CVA variant props (from class-variance-authority)
type BadgeVariants = {
  variant?: BadgeVariant | null | undefined;
  size?: BadgeSize | null | undefined;
  pill?: boolean | null | undefined;
};`;

  protected readonly cvaCode = `import { badgeVariants } from 'ngx-com/components/badge';

// Generate class string programmatically
const classes = badgeVariants({
  variant: 'success',
  size: 'lg',
  pill: true,
});
// => "com-badge inline-flex w-fit ... bg-success text-success-foreground ... rounded-pill"

// Use with your own component
@Component({
  template: \`<div [class]="badgeClasses()">Custom Badge</div>\`,
})
export class CustomBadge {
  variant = input<BadgeVariant>('primary');

  badgeClasses = computed(() =>
    badgeVariants({ variant: this.variant() })
  );
}`;
}
