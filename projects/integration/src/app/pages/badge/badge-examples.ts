import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComBadge, type BadgeVariant } from 'ngx-com/components/badge';
import { CodeBlock } from '../../shared/code-block';

type Status = 'active' | 'pending' | 'error' | 'inactive';

@Component({
  selector: 'int-badge-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComBadge, CodeBlock, RouterLink],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <ol class="flex items-center gap-2 text-surface-500">
          <li><a routerLink="/" class="hover:text-primary-600">Home</a></li>
          <li>/</li>
          <li><a routerLink="/components/badge" class="hover:text-primary-600">Badge</a></li>
          <li>/</li>
          <li><span class="text-surface-900">Examples</span></li>
        </ol>
      </nav>

      <h1 class="mb-4 text-4xl font-bold text-surface-900">Badge Examples</h1>
      <p class="mb-8 text-lg text-surface-600">
        Explore different badge configurations and use cases.
      </p>

      <!-- Quick nav -->
      <div class="mb-12 flex gap-4">
        <a
          routerLink="/components/badge"
          class="rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          Overview
        </a>
        <a
          routerLink="/components/badge/api"
          class="rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          API Reference
        </a>
      </div>

      <!-- Variants -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
        <p class="mb-4 text-surface-600">
          Six semantic variants for different use cases. Each uses proper foreground/background token pairings.
        </p>
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
        <int-code-block class="mt-4" language="html" [code]="variantsCode" />
      </section>

      <!-- Sizes -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
        <p class="mb-4 text-surface-600">
          Three sizes with proportional spacing, typography, and icon sizing.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <span comBadge size="sm">Small</span>
            <span comBadge>Default</span>
            <span comBadge size="lg">Large</span>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="sizesCode" />
      </section>

      <!-- Pill Shape -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Pill Shape</h2>
        <p class="mb-4 text-surface-600">
          Add the <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">pill</code> attribute for fully rounded corners.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <span comBadge pill>New</span>
            <span comBadge variant="success" pill>Online</span>
            <span comBadge variant="warn" pill>3</span>
            <span comBadge variant="accent" pill>Beta</span>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="pillCode" />
      </section>

      <!-- With Icons -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">With Icons</h2>
        <p class="mb-4 text-surface-600">
          SVG icons inside badges are automatically sized based on the badge size.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <span comBadge variant="success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Active
            </span>
            <span comBadge variant="warn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Warning
            </span>
            <span comBadge variant="muted">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Info
            </span>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="iconsCode" />
      </section>

      <!-- As Links -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">As Links</h2>
        <p class="mb-4 text-surface-600">
          When applied to anchor elements, hover styles are automatically activated.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a href="#" comBadge>View All</a>
            <a href="#" comBadge variant="accent">3 New</a>
            <a href="#" comBadge variant="warn">5 Alerts</a>
            <a href="#" comBadge variant="outline">v2.1.0</a>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="linksCode" />
      </section>

      <!-- Dynamic Variant -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Dynamic Variant</h2>
        <p class="mb-4 text-surface-600">
          Bind the variant dynamically based on application state.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col items-center gap-6">
            <div class="flex gap-2">
              @for (s of statuses; track s) {
                <button
                  type="button"
                  class="rounded-lg border px-3 py-1.5 text-sm transition"
                  [class.border-primary-500]="status() === s"
                  [class.bg-primary-50]="status() === s"
                  [class.text-primary-700]="status() === s"
                  [class.border-surface-200]="status() !== s"
                  [class.text-surface-700]="status() !== s"
                  [class.hover:border-surface-300]="status() !== s"
                  (click)="status.set(s)"
                >
                  {{ s }}
                </button>
              }
            </div>
            <span comBadge [variant]="statusVariant()">{{ status() }}</span>
          </div>
        </div>
        <int-code-block class="mt-4" language="typescript" [code]="dynamicCode" />
      </section>

      <!-- Custom Classes -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Classes</h2>
        <p class="mb-4 text-surface-600">
          Override or extend styling with the <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">class</code> attribute.
          Classes are merged intelligently using tailwind-merge.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <span comBadge class="uppercase tracking-wider">Uppercase</span>
            <span comBadge variant="accent" class="shadow-md">Shadow</span>
            <span comBadge variant="success" class="ring-2 ring-success ring-offset-2">Ring</span>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="customClassesCode" />
      </section>

      <!-- Use Cases -->
      <section>
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Common Use Cases</h2>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="space-y-6">
            <!-- Status indicator -->
            <div class="flex items-center justify-between border-b border-surface-100 pb-4">
              <div>
                <h3 class="font-medium text-surface-900">Server Status</h3>
                <p class="text-sm text-surface-500">Production environment</p>
              </div>
              <span comBadge variant="success" pill>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Healthy
              </span>
            </div>

            <!-- Version tag -->
            <div class="flex items-center justify-between border-b border-surface-100 pb-4">
              <div>
                <h3 class="font-medium text-surface-900">ngx-com</h3>
                <p class="text-sm text-surface-500">Angular component library</p>
              </div>
              <span comBadge variant="outline">v0.0.1</span>
            </div>

            <!-- Notification count -->
            <div class="flex items-center justify-between border-b border-surface-100 pb-4">
              <div>
                <h3 class="font-medium text-surface-900">Notifications</h3>
                <p class="text-sm text-surface-500">Unread messages</p>
              </div>
              <span comBadge variant="warn" pill>12</span>
            </div>

            <!-- Feature label -->
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-surface-900">New Feature</h3>
                <p class="text-sm text-surface-500">Just released</p>
              </div>
              <span comBadge variant="accent" pill>Beta</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class BadgeExamples {
  protected readonly statuses: Status[] = ['active', 'pending', 'error', 'inactive'];
  protected readonly status = signal<Status>('active');

  protected readonly statusVariant = computed((): BadgeVariant => {
    switch (this.status()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'accent';
      case 'error':
        return 'warn';
      default:
        return 'muted';
    }
  });

  protected readonly variantsCode = `<span comBadge>Primary</span>
<span comBadge variant="accent">Accent</span>
<span comBadge variant="warn">Warning</span>
<span comBadge variant="success">Success</span>
<span comBadge variant="muted">Muted</span>
<span comBadge variant="outline">Outline</span>`;

  protected readonly sizesCode = `<span comBadge size="sm">Small</span>
<span comBadge>Default</span>
<span comBadge size="lg">Large</span>`;

  protected readonly pillCode = `<span comBadge pill>New</span>
<span comBadge variant="success" pill>Online</span>
<span comBadge variant="warn" pill>3</span>
<span comBadge variant="accent" pill>Beta</span>`;

  protected readonly iconsCode = `<span comBadge variant="success">
  <svg><!-- check icon --></svg>
  Active
</span>
<span comBadge variant="warn">
  <svg><!-- warning icon --></svg>
  Warning
</span>`;

  protected readonly linksCode = `<a href="/all" comBadge>View All</a>
<a href="/new" comBadge variant="accent">3 New</a>
<a href="/alerts" comBadge variant="warn">5 Alerts</a>
<a href="/changelog" comBadge variant="outline">v2.1.0</a>`;

  protected readonly dynamicCode = `import { Component, computed, signal } from '@angular/core';
import { ComBadge, BadgeVariant } from 'ngx-com/components/badge';

type Status = 'active' | 'pending' | 'error' | 'inactive';

@Component({
  imports: [ComBadge],
  template: \`
    <span comBadge [variant]="statusVariant()">
      {{ status() }}
    </span>
  \`,
})
export class Example {
  status = signal<Status>('active');

  statusVariant = computed((): BadgeVariant => {
    switch (this.status()) {
      case 'active': return 'success';
      case 'pending': return 'accent';
      case 'error': return 'warn';
      default: return 'muted';
    }
  });
}`;

  protected readonly customClassesCode = `<span comBadge class="uppercase tracking-wider">Uppercase</span>
<span comBadge variant="accent" class="shadow-md">Shadow</span>
<span comBadge variant="success" class="ring-2 ring-success ring-offset-2">Ring</span>`;
}
