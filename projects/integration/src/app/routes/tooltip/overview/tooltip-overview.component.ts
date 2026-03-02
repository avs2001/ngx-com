import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComTooltip } from 'ngx-com/components/tooltip';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-tooltip-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComTooltip, ComButton, ComCard, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <button comButton comTooltip="Save your changes">Save</button>
          <button comButton variant="outline" comTooltip="Edit this item" comTooltipPosition="right">Edit</button>
          <button comButton variant="ghost" comTooltip="Delete permanently" comTooltipColor="warn">Delete</button>
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
          <h3 class="mb-2 font-semibold text-surface-900">5 Color Variants</h3>
          <p class="text-sm text-surface-600">
            Default (dark), primary, accent, warn, and invert variants for different contexts.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">4 Positions</h3>
          <p class="text-sm text-surface-600">
            Top, bottom, left, and right with automatic viewport flipping.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">3 Sizes</h3>
          <p class="text-sm text-surface-600">
            Small, medium, and large sizes for different content needs.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Custom Templates</h3>
          <p class="text-sm text-surface-600">
            Rich content support via ng-template for complex tooltips.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessible</h3>
          <p class="text-sm text-surface-600">
            Full keyboard support with focus triggers and Escape to dismiss.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Configurable Delays</h3>
          <p class="text-sm text-surface-600">
            Customizable show/hide delays to prevent flicker and improve UX.
          </p>
        </com-card>
      </div>
    </section>

    <!-- When to Use -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">When to Use</h2>
      <com-card variant="outlined" class="p-6">
        <div class="space-y-4">
          <div>
            <h3 class="mb-2 font-semibold text-surface-900">Use tooltips for:</h3>
            <ul class="list-inside list-disc space-y-1 text-surface-600">
              <li>Supplementary information that isn't essential</li>
              <li>Icon-only buttons that need labels</li>
              <li>Abbreviations or technical terms</li>
              <li>Truncated text that needs full display</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-semibold text-surface-900">Avoid tooltips for:</h3>
            <ul class="list-inside list-disc space-y-1 text-surface-600">
              <li>Critical information users must see</li>
              <li>Interactive content (use Popover instead)</li>
              <li>Long-form content or instructions</li>
              <li>Mobile-primary interfaces (touch is unreliable)</li>
            </ul>
          </div>
        </div>
      </com-card>
    </section>
  `,
})
export class TooltipOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComTooltip } from 'ngx-com/components/tooltip';

@Component({
  selector: 'app-example',
  imports: [ComTooltip],
  template: \`
    <button comTooltip="Save your changes">Save</button>
    <button comTooltip="Settings" comTooltipPosition="right">
      <svg><!-- settings icon --></svg>
    </button>
    <span comTooltip="Required field" comTooltipColor="warn">*</span>
  \`,
})
export class Example {}`;
}
