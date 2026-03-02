import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComSpinner } from 'ngx-com/components/spinner';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-spinner-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSpinner, ComButton, ComCard, CodeBlock],
  template: `
    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Five sizes from inline (xs) to page-level (xl). Border width scales proportionally.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <com-spinner size="xs" color="primary" />
            <span class="text-xs text-surface-500">xs (12px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner size="sm" color="primary" />
            <span class="text-xs text-surface-500">sm (16px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner size="md" color="primary" />
            <span class="text-xs text-surface-500">md (20px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner size="lg" color="primary" />
            <span class="text-xs text-surface-500">lg (32px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner size="xl" color="primary" />
            <span class="text-xs text-surface-500">xl (40px)</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Colors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Colors</h2>
      <p class="mb-4 text-surface-600">
        Six color variants. The <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">current</code> variant
        inherits from the parent's text color.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <com-spinner color="current" />
            <span class="text-xs text-surface-500">current</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner color="primary" />
            <span class="text-xs text-surface-500">primary</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner color="accent" />
            <span class="text-xs text-surface-500">accent</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner color="warn" />
            <span class="text-xs text-surface-500">warn</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner color="success" />
            <span class="text-xs text-surface-500">success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-spinner color="muted" />
            <span class="text-xs text-surface-500">muted</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- With Label -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">With Label</h2>
      <p class="mb-4 text-surface-600">
        Add a visible label with the <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">label</code> input.
        Position it to the right (default) or bottom.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-start justify-center gap-12">
          <com-spinner color="primary" label="Loading..." />
          <com-spinner color="primary" label="Processing..." labelPosition="bottom" />
          <com-spinner size="lg" color="accent" label="Preparing dashboard..." labelPosition="bottom" />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="labelCode" />
    </section>

    <!-- Inside Buttons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inside Buttons</h2>
      <p class="mb-4 text-surface-600">
        The spinner inherits the button's text color automatically. Use <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">size="xs"</code> for buttons.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton color="primary" [disabled]="saving()">
            @if (saving()) {
              <com-spinner size="xs" />
            }
            {{ saving() ? 'Saving...' : 'Save' }}
          </button>
          <button comButton color="accent" variant="outline" [disabled]="loading()">
            @if (loading()) {
              <com-spinner size="xs" />
            }
            {{ loading() ? 'Loading...' : 'Load Data' }}
          </button>
          <button comButton color="warn" [disabled]="deleting()">
            @if (deleting()) {
              <com-spinner size="xs" />
            }
            {{ deleting() ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
        <div class="mt-6 flex justify-center gap-4">
          <button comButton variant="outline" size="sm" (click)="toggleSaving()">
            Toggle Save
          </button>
          <button comButton variant="outline" size="sm" (click)="toggleLoading()">
            Toggle Load
          </button>
          <button comButton variant="outline" size="sm" (click)="toggleDeleting()">
            Toggle Delete
          </button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="buttonCode" />
    </section>

    <!-- Inline with Text -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inline with Text</h2>
      <p class="mb-4 text-surface-600">
        The spinner flows inline with text. Use xs or sm sizes for inline contexts.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="space-y-4 text-surface-600">
          <p>
            <com-spinner size="xs" /> Checking availability...
          </p>
          <p class="text-lg">
            <com-spinner size="sm" color="primary" /> Syncing your data with the server
          </p>
          <p class="text-sm text-muted-foreground">
            <com-spinner size="xs" color="muted" /> Last updated 2 minutes ago
          </p>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="inlineCode" />
    </section>

    <!-- Centered in Container -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Centered in Container</h2>
      <p class="mb-4 text-surface-600">
        Use larger sizes for card or page-level loading states.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex h-48 items-center justify-center rounded-lg border border-dashed border-surface-300 bg-surface-50">
          <com-spinner size="lg" color="primary" label="Loading content..." labelPosition="bottom" />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="centeredCode" />
    </section>

    <!-- Current Color Inheritance -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Color Inheritance</h2>
      <p class="mb-4 text-surface-600">
        The default <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">current</code> color inherits from
        the parent's text color, making it adaptable to any context.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex items-center gap-2 text-primary">
            <com-spinner size="sm" /> Primary text context
          </div>
          <div class="flex items-center gap-2 text-accent">
            <com-spinner size="sm" /> Accent text context
          </div>
          <div class="flex items-center gap-2 text-warn">
            <com-spinner size="sm" /> Warning text context
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="inheritCode" />
    </section>
  `,
})
export class SpinnerExamples {
  protected readonly saving = signal(false);
  protected readonly loading = signal(false);
  protected readonly deleting = signal(false);

  protected toggleSaving(): void {
    this.saving.update(v => !v);
  }

  protected toggleLoading(): void {
    this.loading.update(v => !v);
  }

  protected toggleDeleting(): void {
    this.deleting.update(v => !v);
  }

  protected readonly sizesCode = `<com-spinner size="xs" />
<com-spinner size="sm" />
<com-spinner size="md" />  <!-- default -->
<com-spinner size="lg" />
<com-spinner size="xl" />`;

  protected readonly colorsCode = `<com-spinner color="current" />  <!-- default, inherits text color -->
<com-spinner color="primary" />
<com-spinner color="accent" />
<com-spinner color="warn" />
<com-spinner color="success" />
<com-spinner color="muted" />`;

  protected readonly labelCode = `<!-- Label on right (default) -->
<com-spinner label="Loading..." />

<!-- Label on bottom -->
<com-spinner label="Processing..." labelPosition="bottom" />

<!-- Larger with bottom label -->
<com-spinner size="lg" label="Preparing dashboard..." labelPosition="bottom" />`;

  protected readonly buttonCode = `<button comButton [disabled]="saving()">
  @if (saving()) {
    <com-spinner size="xs" />
  }
  {{ saving() ? 'Saving...' : 'Save' }}
</button>`;

  protected readonly inlineCode = `<p>
  <com-spinner size="xs" /> Checking availability...
</p>

<p class="text-lg">
  <com-spinner size="sm" color="primary" /> Syncing your data
</p>`;

  protected readonly centeredCode = `<div class="flex h-48 items-center justify-center">
  <com-spinner
    size="lg"
    color="primary"
    label="Loading content..."
    labelPosition="bottom"
  />
</div>`;

  protected readonly inheritCode = `<!-- Spinner inherits text color from parent -->
<div class="text-primary">
  <com-spinner size="sm" /> Primary text context
</div>

<div class="text-accent">
  <com-spinner size="sm" /> Accent text context
</div>`;
}
