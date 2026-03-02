import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-icon-api',
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
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">com-icon</code>
        <p class="mt-3 text-surface-600">
          Element selector for rendering Lucide icons with CVA-powered variants.
        </p>
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
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">name</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Lucide icon name in kebab-case (e.g., 'chevron-right')</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">img</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">LucideIconData</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Direct icon reference. Takes precedence over name.</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">color</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'current' | 'primary' | 'accent' | 'warn' | 'success' | 'muted' | 'disabled'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'current'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Semantic color variant using theme tokens</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">size</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'lg'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Icon size (xs=12px, sm=16px, md=20px, lg=24px, xl=32px, 2xl=40px)</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">strokeWidth</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">number</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">2</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Stroke width for the icon paths</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">absoluteStrokeWidth</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">When true, stroke width doesn't scale with icon size</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">ariaLabel</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Accessible label for meaningful icons. When set, removes aria-hidden.</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The icon component requires the following semantic CSS custom properties to be defined:
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
              <td class="px-4 py-3 text-surface-600">Muted color variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-disabled-foreground</td>
              <td class="px-4 py-3 text-surface-600">Disabled color variant</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--size-icon-xs, --size-icon-sm, --size-icon-md</td>
              <td class="px-4 py-3 text-surface-600">Small size variants (12px, 16px, 20px)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--size-icon-lg, --size-icon-xl, --size-icon-2xl</td>
              <td class="px-4 py-3 text-surface-600">Large size variants (24px, 32px, 40px)</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Provider Function -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Provider Function</h2>
      <p class="mb-4 text-surface-600">
        Register icons once in your application config using <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">provideComIcons()</code>:
      </p>
      <int-code-block language="typescript" [code]="providerCode" />
    </section>

    <!-- Types -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
      <int-code-block language="typescript" [code]="typesCode" />
    </section>

    <!-- Direct Icon Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Direct Icon Import</h2>
      <p class="mb-4 text-surface-600">
        For one-off icons or when you don't want to use the provider, import icons directly:
      </p>
      <int-code-block language="typescript" [code]="directImportCode" />
    </section>

    <!-- CVA Customization -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Advanced: CVA Customization</h2>
      <p class="mb-4 text-surface-600">
        For advanced use cases, import and use the CVA variants directly:
      </p>
      <int-code-block language="typescript" [code]="cvaCode" />
    </section>
  `,
})
export class IconApi {
  protected readonly importCode = `import { ComIcon, provideComIcons } from 'ngx-com/components/icon';

// Optional: Import types for TypeScript
import type { IconColor, IconSize, IconVariants } from 'ngx-com/components/icon';`;

  protected readonly providerCode = `// app.config.ts
import { provideComIcons } from 'ngx-com/components/icon';
import {
  Star,
  Heart,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Plus,
  Settings,
  Trash2,
} from 'lucide-angular';

export const appConfig = {
  providers: [
    provideComIcons({
      Star,
      Heart,
      CheckCircle,
      AlertTriangle,
      Info,
      XCircle,
      Plus,
      Settings,
      Trash2,
    })
  ]
};`;

  protected readonly typesCode = `// Color type
type IconColor = 'current' | 'primary' | 'accent' | 'warn' | 'success' | 'muted' | 'disabled';

// Size type
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Size to pixel mapping
const ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

// CVA variant props (from class-variance-authority)
type IconVariants = {
  color?: IconColor | null | undefined;
  size?: IconSize | null | undefined;
};`;

  protected readonly directImportCode = `import { Component } from '@angular/core';
import { ComIcon } from 'ngx-com/components/icon';
import { Star } from 'lucide-angular';

@Component({
  imports: [ComIcon],
  template: \`
    <!-- Use [img] instead of name -->
    <com-icon [img]="StarIcon" color="accent" size="xl" />
  \`,
})
export class Example {
  protected readonly StarIcon = Star;
}`;

  protected readonly cvaCode = `import { iconVariants, ICON_SIZE_PX } from 'ngx-com/components/icon';

// Generate class string programmatically
const classes = iconVariants({
  color: 'success',
  size: 'xl',
});
// => "inline-flex items-center justify-center shrink-0 align-middle text-success size-icon-xl"

// Get pixel size for custom use
const pixelSize = ICON_SIZE_PX['xl']; // 32

// Use with your own component
@Component({
  template: \`<div [class]="iconClasses()">Custom Icon Wrapper</div>\`,
})
export class CustomIconWrapper {
  color = input<IconColor>('primary');
  size = input<IconSize>('lg');

  iconClasses = computed(() =>
    iconVariants({ color: this.color(), size: this.size() })
  );
}`;
}
