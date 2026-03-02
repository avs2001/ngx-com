import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComBadge } from 'ngx-com/components/badge';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-badge-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComBadge, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Badge variants and styles in action"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <span comBadge>Primary</span>
          <span comBadge variant="accent">Accent</span>
          <span comBadge variant="warn">Warning</span>
          <span comBadge variant="success">Success</span>
          <span comBadge variant="muted">Muted</span>
          <span comBadge variant="outline">Outline</span>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the directive in your templates"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes comBadge powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="6 Variants"
            description="Primary, accent, warn, success, muted, and outline variants with semantic color tokens"
            icon="layers"
          />
          <com-item
            title="3 Sizes"
            description="Small, default, and large sizes with proportional spacing and typography"
            icon="maximize"
            iconColor="accent"
          />
          <com-item
            title="Pill Shape"
            description="Optional fully-rounded pill shape for a softer appearance"
            icon="circle"
          />
          <com-item
            title="Icon Support"
            description="SVG icons are automatically sized based on the badge size"
            icon="sparkles"
            iconColor="accent"
          />
          <com-item
            title="Link Support"
            description="Works on anchor elements with automatic hover states"
            icon="link"
          />
          <com-item
            title="Theme Aware"
            description="Uses semantic tokens for automatic dark mode and theme support"
            icon="sun-moon"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Directive vs Component -->
    <section>
      <com-item
        title="Why a Directive?"
        description="Benefits of the directive approach"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>Flexibility:</strong> Apply badge styling to any element
            (<code class="rounded bg-muted px-1.5 py-0.5 text-sm">span</code>,
            <code class="rounded bg-muted px-1.5 py-0.5 text-sm">a</code>,
            <code class="rounded bg-muted px-1.5 py-0.5 text-sm">button</code>, etc.)
          </li>
          <li>
            <strong>Lightweight:</strong> No extra DOM wrapper element needed
          </li>
          <li>
            <strong>Semantic HTML:</strong> Use the appropriate element for the context
            (links for navigation, spans for labels)
          </li>
        </ul>
      </com-card>
    </section>
  `,
})
export class BadgeOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComBadge } from 'ngx-com/components/badge';

@Component({
  selector: 'app-example',
  imports: [ComBadge],
  template: \`
    <span comBadge>Default</span>
    <span comBadge variant="success">Active</span>
    <span comBadge variant="warn" pill>3 Alerts</span>
    <a href="/notifications" comBadge variant="accent">View</a>
  \`,
})
export class Example {}`;
}
