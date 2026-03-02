import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-radio-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComRadio, ComRadioGroup, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Radio groups with different variants and colors"
        icon="play"
        size="lg"
        class="mb-4"
      />
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
      <com-item
        title="Basic Usage"
        description="Import and use radio components in your templates"
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
        description="What makes com-radio powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="3 Variants"
            description="Primary, accent, and warn variants with semantic color tokens"
            icon="layers"
          />
          <com-item
            title="3 Sizes"
            description="Small, medium, and large sizes with proportional spacing and typography"
            icon="maximize"
            iconColor="accent"
          />
          <com-item
            title="Roving Tabindex"
            description="Arrow key navigation between options with cyclic wrapping"
            icon="keyboard"
          />
          <com-item
            title="Reactive Forms"
            description="Full ControlValueAccessor support with NgControl injection pattern"
            icon="file-code"
            iconColor="accent"
          />
          <com-item
            title="Orientation"
            description="Vertical or horizontal layout with appropriate arrow key behavior"
            icon="move"
          />
          <com-item
            title="Accessible"
            description="Native radio with role='radiogroup' and proper ARIA attributes"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Horizontal -->
    <section class="mb-12">
      <com-item
        title="Horizontal Orientation"
        description="Inline layout for compact spaces"
        icon="layout"
        size="lg"
        class="mb-4"
      />
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
      <com-item
        title="Why Native Input?"
        description="Benefits of using native radio elements"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>Mutual exclusion:</strong> Native radios with same name automatically
            deselect siblings
          </li>
          <li>
            <strong>CSS-driven states:</strong> :checked pseudo-class enables pure CSS
            styling via peer selectors
          </li>
          <li>
            <strong>Screen reader support:</strong> Native semantics with role="radiogroup"
            container
          </li>
          <li>
            <strong>Click area:</strong> Wrapping label makes entire area clickable
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
