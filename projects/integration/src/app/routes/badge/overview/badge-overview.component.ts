import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComBadge } from 'ngx-com/components/badge';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-badge-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComBadge, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <span comBadge>Primary</span>
          <span comBadge variant="accent">Accent</span>
          <span comBadge variant="warn">Warning</span>
          <span comBadge variant="success">Success</span>
          <span comBadge variant="muted">Muted</span>
          <span comBadge variant="outline">Outline</span>
        </div>
      </div>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">6 Variants</h3>
          <p class="text-sm text-surface-600">
            Primary, accent, warn, success, muted, and outline variants with semantic color tokens.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">3 Sizes</h3>
          <p class="text-sm text-surface-600">
            Small, default, and large sizes with proportional spacing and typography.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Pill Shape</h3>
          <p class="text-sm text-surface-600">
            Optional fully-rounded pill shape for a softer appearance.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Icon Support</h3>
          <p class="text-sm text-surface-600">
            SVG icons are automatically sized based on the badge size.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Link Support</h3>
          <p class="text-sm text-surface-600">
            Works on anchor elements with automatic hover states.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Theme Aware</h3>
          <p class="text-sm text-surface-600">
            Uses semantic tokens for automatic dark mode and theme support.
          </p>
        </div>
      </div>
    </section>

    <!-- Directive vs Component -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Why a Directive?</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <p class="mb-4 text-surface-600">
          Badge is implemented as a directive rather than a component for several reasons:
        </p>
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <strong class="text-surface-900">Flexibility:</strong> Apply badge styling to any element
            (<code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">span</code>,
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">a</code>,
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">button</code>, etc.)
          </li>
          <li>
            <strong class="text-surface-900">Lightweight:</strong> No extra DOM wrapper element needed
          </li>
          <li>
            <strong class="text-surface-900">Semantic HTML:</strong> Use the appropriate element for the context
            (links for navigation, spans for labels)
          </li>
        </ul>
      </div>
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
