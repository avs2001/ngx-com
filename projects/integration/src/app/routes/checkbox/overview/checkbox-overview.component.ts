import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCheckbox } from 'ngx-com/components/checkbox';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-checkbox-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCheckbox, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <com-checkbox>Default</com-checkbox>
          <com-checkbox variant="accent">Accent</com-checkbox>
          <com-checkbox variant="warn">Warning</com-checkbox>
          <com-checkbox [checked]="true">Checked</com-checkbox>
          <com-checkbox [disabled]="true">Disabled</com-checkbox>
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
          <h3 class="mb-2 font-semibold text-surface-900">3 Variants</h3>
          <p class="text-sm text-surface-600">
            Primary, accent, and warn variants with semantic color tokens.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">3 Sizes</h3>
          <p class="text-sm text-surface-600">
            Small, medium, and large sizes with proportional spacing and typography.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Indeterminate State</h3>
          <p class="text-sm text-surface-600">
            Built-in indeterminate state for "select all" patterns, clears on user click.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Reactive Forms</h3>
          <p class="text-sm text-surface-600">
            Full ControlValueAccessor support with NgControl injection pattern.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Two-way Binding</h3>
          <p class="text-sm text-surface-600">
            Signal-based models for checked, indeterminate, and disabled states.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessible</h3>
          <p class="text-sm text-surface-600">
            Native checkbox with proper ARIA attributes and keyboard navigation.
          </p>
        </div>
      </div>
    </section>

    <!-- Native Input -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Why Native Input?</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <p class="mb-4 text-surface-600">
          This checkbox uses a native <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">&lt;input type="checkbox"&gt;</code>
          wrapped in a label for several benefits:
        </p>
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <strong class="text-surface-900">Keyboard handling:</strong> Space toggles without JavaScript
          </li>
          <li>
            <strong class="text-surface-900">CSS-driven states:</strong> :checked and :indeterminate pseudo-classes
            enable pure CSS styling via peer selectors
          </li>
          <li>
            <strong class="text-surface-900">Screen reader support:</strong> Native semantics without manual
            role/aria-checked attributes
          </li>
          <li>
            <strong class="text-surface-900">Click area:</strong> Wrapping label makes entire area clickable
          </li>
        </ul>
      </div>
    </section>
  `,
})
export class CheckboxOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComCheckbox } from 'ngx-com/components/checkbox';

@Component({
  selector: 'app-example',
  imports: [ComCheckbox],
  template: \`
    <com-checkbox [(checked)]="isActive">Enable feature</com-checkbox>
    <com-checkbox variant="accent" size="lg">Large accent</com-checkbox>
    <com-checkbox formControlName="terms">I accept the terms</com-checkbox>
  \`,
})
export class Example {
  isActive = false;
}`;
}
