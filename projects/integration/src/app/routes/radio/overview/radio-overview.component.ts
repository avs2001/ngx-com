import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-radio-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComRadio, ComRadioGroup, ComCard, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-start justify-center gap-12">
          <com-radio-group [(value)]="selectedFruit" aria-label="Select a fruit">
            <com-radio value="apple">Apple</com-radio>
            <com-radio value="banana">Banana</com-radio>
            <com-radio value="cherry">Cherry</com-radio>
          </com-radio-group>

          <com-radio-group [(value)]="selectedColor" variant="accent" aria-label="Select a color">
            <com-radio value="red">Red</com-radio>
            <com-radio value="green">Green</com-radio>
            <com-radio value="blue">Blue</com-radio>
          </com-radio-group>

          <com-radio-group [(value)]="selectedPriority" variant="warn" aria-label="Select priority">
            <com-radio value="low">Low</com-radio>
            <com-radio value="medium">Medium</com-radio>
            <com-radio value="high">High</com-radio>
          </com-radio-group>
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
          <h3 class="mb-2 font-semibold text-surface-900">3 Variants</h3>
          <p class="text-sm text-surface-600">
            Primary, accent, and warn variants with semantic color tokens.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">3 Sizes</h3>
          <p class="text-sm text-surface-600">
            Small, medium, and large sizes with proportional spacing and typography.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Roving Tabindex</h3>
          <p class="text-sm text-surface-600">
            Arrow key navigation between options with cyclic wrapping.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Reactive Forms</h3>
          <p class="text-sm text-surface-600">
            Full ControlValueAccessor support with NgControl injection pattern.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Orientation</h3>
          <p class="text-sm text-surface-600">
            Vertical or horizontal layout with appropriate arrow key behavior.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessible</h3>
          <p class="text-sm text-surface-600">
            Native radio with role="radiogroup" and proper ARIA attributes.
          </p>
        </com-card>
      </div>
    </section>

    <!-- Horizontal -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Horizontal Orientation</h2>
      <com-card variant="outlined" class="p-8">
        <com-radio-group [(value)]="selectedSize" orientation="horizontal" aria-label="Select size">
          <com-radio value="sm">Small</com-radio>
          <com-radio value="md">Medium</com-radio>
          <com-radio value="lg">Large</com-radio>
          <com-radio value="xl">Extra Large</com-radio>
        </com-radio-group>
      </com-card>
    </section>

    <!-- Native Input -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Why Native Input?</h2>
      <com-card variant="outlined" class="p-6">
        <p class="mb-4 text-surface-600">
          This radio uses a native <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">&lt;input type="radio"&gt;</code>
          wrapped in a label for several benefits:
        </p>
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <strong class="text-surface-900">Mutual exclusion:</strong> Native radios with same name automatically
            deselect siblings
          </li>
          <li>
            <strong class="text-surface-900">CSS-driven states:</strong> :checked pseudo-class enables pure CSS
            styling via peer selectors
          </li>
          <li>
            <strong class="text-surface-900">Screen reader support:</strong> Native semantics with role="radiogroup"
            container
          </li>
          <li>
            <strong class="text-surface-900">Click area:</strong> Wrapping label makes entire area clickable
          </li>
        </ul>
      </com-card>
    </section>
  `,
})
export class RadioOverview {
  protected readonly selectedFruit: WritableSignal<string | null> = signal('apple');
  protected readonly selectedColor: WritableSignal<string | null> = signal('green');
  protected readonly selectedPriority: WritableSignal<string | null> = signal(null);
  protected readonly selectedSize: WritableSignal<string | null> = signal('md');

  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';

@Component({
  selector: 'app-example',
  imports: [ComRadio, ComRadioGroup],
  template: \`
    <com-radio-group [(value)]="selected" aria-label="Select option">
      <com-radio value="option1">Option 1</com-radio>
      <com-radio value="option2">Option 2</com-radio>
      <com-radio value="option3">Option 3</com-radio>
    </com-radio-group>
  \`,
})
export class Example {
  selected = 'option1';
}`;
}
