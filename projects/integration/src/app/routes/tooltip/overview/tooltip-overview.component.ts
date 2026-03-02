import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComTooltip } from 'ngx-com/components/tooltip';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-tooltip-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComTooltip, ComButton, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Interactive tooltips with different positions and colors"
        icon="play"
        size="lg"
        class="mb-4"
      />
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
      <com-item
        title="Basic Usage"
        description="Import and apply the directive to elements"
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
        description="What makes comTooltip powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="5 Color Variants"
            description="Default (dark), primary, accent, warn, and invert variants for different contexts"
            icon="palette"
          />
          <com-item
            title="4 Positions"
            description="Top, bottom, left, and right with automatic viewport flipping"
            icon="move"
            iconColor="accent"
          />
          <com-item
            title="3 Sizes"
            description="Small, medium, and large sizes for different content needs"
            icon="maximize"
          />
          <com-item
            title="Custom Templates"
            description="Rich content support via ng-template for complex tooltips"
            icon="layout"
            iconColor="accent"
          />
          <com-item
            title="Accessible"
            description="Full keyboard support with focus triggers and Escape to dismiss"
            icon="accessibility"
          />
          <com-item
            title="Configurable Delays"
            description="Customizable show/hide delays to prevent flicker and improve UX"
            icon="clock"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- When to Use -->
    <section>
      <com-item
        title="When to Use"
        description="Guidelines for effective tooltip usage"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-4">
          <div>
            <h3 class="mb-2 font-semibold text-foreground">Use tooltips for:</h3>
            <ul class="list-inside list-disc space-y-1 text-foreground">
              <li>Supplementary information that isn't essential</li>
              <li>Icon-only buttons that need labels</li>
              <li>Abbreviations or technical terms</li>
              <li>Truncated text that needs full display</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-semibold text-foreground">Avoid tooltips for:</h3>
            <ul class="list-inside list-disc space-y-1 text-foreground">
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
