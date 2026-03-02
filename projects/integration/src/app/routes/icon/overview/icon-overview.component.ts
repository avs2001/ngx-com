import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComIcon } from 'ngx-com/components/icon';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-icon-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComIcon, ComCard, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <com-icon name="star" />
          <com-icon name="heart" color="accent" />
          <com-icon name="check-circle" color="success" />
          <com-icon name="alert-triangle" color="warn" />
          <com-icon name="info" color="muted" />
          <com-icon name="x-circle" color="disabled" />
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <int-code-block language="typescript" [code]="basicUsageCode" />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">7 Color Variants</h3>
          <p class="text-sm text-surface-600">
            Current (inherit), primary, accent, warn, success, muted, and disabled with semantic tokens.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">6 Sizes</h3>
          <p class="text-sm text-surface-600">
            xs (12px), sm (16px), md (20px), lg (24px), xl (32px), and 2xl (40px).
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">1500+ Icons</h3>
          <p class="text-sm text-surface-600">
            Powered by Lucide — a beautiful, open-source icon library with consistent design.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Tree-Shakeable</h3>
          <p class="text-sm text-surface-600">
            Only bundle the icons you use via the provideComIcons() function.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessible</h3>
          <p class="text-sm text-surface-600">
            Decorative icons are hidden from screen readers; use ariaLabel for meaningful icons.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Theme Aware</h3>
          <p class="text-sm text-surface-600">
            Uses semantic color tokens for automatic dark mode and theme support.
          </p>
        </com-card>
      </div>
    </section>

    <!-- Color Inheritance -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Color Inheritance</h2>
      <com-card variant="outlined" class="p-6">
        <p class="mb-4 text-surface-600">
          By default, icons inherit the parent's text color via <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">currentColor</code>.
          This makes them perfect for inline use with text:
        </p>
        <div class="mb-4 flex flex-wrap items-center gap-6">
          <span class="flex items-center gap-1.5 text-primary">
            <com-icon name="star" size="sm" /> Primary text
          </span>
          <span class="flex items-center gap-1.5 text-accent">
            <com-icon name="heart" size="sm" /> Accent text
          </span>
          <span class="flex items-center gap-1.5 text-warn">
            <com-icon name="alert-triangle" size="sm" /> Warning text
          </span>
        </div>
        <int-code-block language="html" [code]="inheritanceCode" />
      </com-card>
    </section>
  `,
})
export class IconOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComIcon, provideComIcons } from 'ngx-com/components/icon';
import { Star, Heart, CheckCircle, AlertTriangle } from 'lucide-angular';

// Register icons in app.config.ts
export const appConfig = {
  providers: [
    provideComIcons({ Star, Heart, CheckCircle, AlertTriangle })
  ]
};

@Component({
  selector: 'app-example',
  imports: [ComIcon],
  template: \`
    <com-icon name="star" />
    <com-icon name="heart" color="accent" />
    <com-icon name="check-circle" color="success" size="sm" />
    <com-icon name="alert-triangle" color="warn" size="xl" />
  \`,
})
export class Example {}`;

  protected readonly inheritanceCode = `<span class="text-primary">
  <com-icon name="star" size="sm" /> Primary text
</span>
<span class="text-accent">
  <com-icon name="heart" size="sm" /> Accent text
</span>`;
}
