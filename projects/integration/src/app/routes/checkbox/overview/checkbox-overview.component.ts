import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { ComCheckbox } from 'ngx-com/components/checkbox';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-checkbox-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCheckbox, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Checkbox variants and states in action"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-start justify-center gap-6">
          <com-checkbox>Default</com-checkbox>
          <com-checkbox variant="accent">Accent</com-checkbox>
          <com-checkbox variant="warn">Warning</com-checkbox>
          <com-checkbox [checked]="true">Checked</com-checkbox>
          <com-checkbox [disabled]="true">Disabled</com-checkbox>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the component in your templates"
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
        description="What makes com-checkbox powerful"
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
            title="Indeterminate State"
            description="Built-in indeterminate state for 'select all' patterns, clears on user click"
            icon="minus-square"
          />
          <com-item
            title="Reactive Forms"
            description="Full ControlValueAccessor support with NgControl injection pattern"
            icon="file-code"
            iconColor="accent"
          />
          <com-item
            title="Two-way Binding"
            description="Signal-based models for checked, indeterminate, and disabled states"
            icon="refresh-cw"
          />
          <com-item
            title="Accessible"
            description="Native checkbox with proper ARIA attributes and keyboard navigation"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Native Input -->
    <section>
      <com-item
        title="Why Native Input?"
        description="Benefits of using native checkbox elements"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>Keyboard handling:</strong> Space toggles without JavaScript
          </li>
          <li>
            <strong>CSS-driven states:</strong> :checked and :indeterminate pseudo-classes
            enable pure CSS styling via peer selectors
          </li>
          <li>
            <strong>Screen reader support:</strong> Native semantics without manual
            role/aria-checked attributes
          </li>
          <li>
            <strong>Click area:</strong> Wrapping label makes entire area clickable
          </li>
        </ul>
      </com-card>
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
