import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComSpinner } from 'ngx-com/components/spinner';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-spinner-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSpinner, ComCard, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <com-spinner />
          <com-spinner color="primary" />
          <com-spinner color="accent" />
          <com-spinner color="warn" />
          <com-spinner color="success" />
          <com-spinner color="muted" />
        </div>
      </com-card>
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
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">CSS-Only Animation</h3>
          <p class="text-sm text-surface-600">
            Pure CSS animation at 0.6s for a snappy, responsive feel. No JavaScript or Angular animations module needed.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Inherits Color</h3>
          <p class="text-sm text-surface-600">
            Default <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">current</code> color inherits from parent text color, perfect for buttons.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">5 Sizes</h3>
          <p class="text-sm text-surface-600">
            From xs (12px) for inline use to xl (40px) for page-level loading states.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">6 Colors</h3>
          <p class="text-sm text-surface-600">
            Current, primary, accent, warn, success, and muted variants using semantic tokens.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Optional Label</h3>
          <p class="text-sm text-surface-600">
            Add visible loading text with configurable position (right or bottom).
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessible</h3>
          <p class="text-sm text-surface-600">
            Uses <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">role="status"</code> with sr-only fallback text for screen readers.
          </p>
        </com-card>
      </div>
    </section>

    <!-- Why Component -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Design Decisions</h2>
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <strong class="text-surface-900">0.6s animation:</strong> Intentionally faster than the typical 1s spin
            to feel snappy and responsive rather than sluggish.
          </li>
          <li>
            <strong class="text-surface-900">Border-based:</strong> Uses border with opacity for the track ring
            and border-t for the spinning arc. Simple, performant, theme-aware.
          </li>
          <li>
            <strong class="text-surface-900">Minimal template:</strong> Just two spans - the spinning circle
            and the label. No extra wrappers or complexity.
          </li>
          <li>
            <strong class="text-surface-900">currentColor default:</strong> Automatically matches surrounding
            text color, making it work out of the box in buttons and inline text.
          </li>
        </ul>
      </com-card>
    </section>
  `,
})
export class SpinnerOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComSpinner } from 'ngx-com/components/spinner';

@Component({
  selector: 'app-example',
  imports: [ComSpinner],
  template: \`
    <!-- Simplest usage -->
    <com-spinner />

    <!-- With color -->
    <com-spinner color="primary" />

    <!-- With label -->
    <com-spinner label="Loading..." />

    <!-- Inside a button -->
    <button [disabled]="loading">
      @if (loading) {
        <com-spinner size="xs" />
      }
      Save
    </button>
  \`,
})
export class Example {
  loading = false;
}`;
}
