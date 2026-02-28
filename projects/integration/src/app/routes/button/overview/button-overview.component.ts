import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiButton } from 'ngx-com/components/button';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-button-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiButton, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button uiButton>Primary</button>
          <button uiButton color="accent">Accent</button>
          <button uiButton color="warn">Warn</button>
          <button uiButton color="muted">Muted</button>
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
          <h3 class="mb-2 font-semibold text-surface-900">4 Variants</h3>
          <p class="text-sm text-surface-600">
            Solid, outline, ghost, and link variants for different visual treatments.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">4 Colors</h3>
          <p class="text-sm text-surface-600">
            Primary, accent, warn, and muted colors using semantic tokens.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">4 Sizes</h3>
          <p class="text-sm text-surface-600">
            Small, medium, large, and icon sizes with proportional spacing.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Native Elements</h3>
          <p class="text-sm text-surface-600">
            Works on both button and anchor elements preserving native behavior.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Full Width</h3>
          <p class="text-sm text-surface-600">
            Optional full-width mode for block-level buttons.
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
          Button is implemented as a directive rather than a component for several reasons:
        </p>
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <strong class="text-surface-900">Native Control:</strong> Full control over native attributes
            (<code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">type="submit"</code>,
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">routerLink</code>,
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">download</code>, etc.)
          </li>
          <li>
            <strong class="text-surface-900">Accessibility:</strong> Native
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">&lt;button&gt;</code> and
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">&lt;a&gt;</code> elements have
            correct roles, keyboard handling, and focus behavior built-in
          </li>
          <li>
            <strong class="text-surface-900">No Wrapper:</strong> No extra DOM wrapper element needed
          </li>
          <li>
            <strong class="text-surface-900">Content Freedom:</strong> Put anything inside — text, icons, spinners — without projection APIs
          </li>
        </ul>
      </div>
    </section>
  `,
})
export class ButtonOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { UiButton } from 'ngx-com/components/button';

@Component({
  selector: 'app-example',
  imports: [UiButton],
  template: \`
    <button uiButton>Save</button>
    <button uiButton variant="outline" color="accent">Cancel</button>
    <button uiButton variant="ghost" color="warn">Delete</button>
    <a uiButton variant="link" routerLink="/docs">Documentation</a>
  \`,
})
export class Example {}`;
}
