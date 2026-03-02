import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComIcon } from 'ngx-com/components/icon';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-icon-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComIcon, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Icon colors and variants in action"
        icon="play"
        size="lg"
        class="mb-4"
      />
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
      <com-item
        title="Basic Usage"
        description="Import and register icons in your application"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <int-code-block language="typescript" [code]="basicUsageCode" />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes com-icon powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="7 Color Variants"
            description="Current (inherit), primary, accent, warn, success, muted, and disabled with semantic tokens"
            icon="palette"
          />
          <com-item
            title="6 Sizes"
            description="xs (12px), sm (16px), md (20px), lg (24px), xl (32px), and 2xl (40px)"
            icon="maximize"
            iconColor="accent"
          />
          <com-item
            title="1500+ Icons"
            description="Powered by Lucide — a beautiful, open-source icon library with consistent design"
            icon="sparkles"
            iconColor="accent"
          />
          <com-item
            title="Tree-Shakeable"
            description="Only bundle the icons you use via the provideComIcons() function"
            icon="tree-deciduous"
          />
          <com-item
            title="Accessible"
            description="Decorative icons are hidden from screen readers; use ariaLabel for meaningful icons"
            icon="accessibility"
          />
          <com-item
            title="Theme Aware"
            description="Uses semantic color tokens for automatic dark mode and theme support"
            icon="sun-moon"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Color Inheritance -->
    <section>
      <com-item
        title="Color Inheritance"
        description="How icons inherit text color from parents"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <p class="mb-4 text-foreground">
          By default, icons inherit the parent's text color via <code class="rounded bg-muted px-1.5 py-0.5 text-sm">currentColor</code>.
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
