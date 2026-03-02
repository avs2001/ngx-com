import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import {
  ComCollapsible,
  ComCollapsibleTrigger,
  ComCollapsibleContent,
  ComCollapsibleIconTpl,
} from 'ngx-com/components/collapsible';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-collapsible-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComCollapsible,
    ComCollapsibleTrigger,
    ComCollapsibleContent,
    ComCollapsibleIconTpl,
    ComCard,
    ComItem,
    ComButton,
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Collapsible variants and trigger styles"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="space-y-4 p-8">
        <!-- Card variant -->
        <div comCollapsible variant="card" [(open)]="cardOpen">
          <button comCollapsibleTrigger variant="ghost" size="default">
            Card Variant
          </button>
          <com-collapsible-content>
            <div class="border-t border-border p-4 text-foreground">
              This is a card-styled collapsible section. Click the trigger to toggle.
            </div>
          </com-collapsible-content>
        </div>

        <!-- Bordered variant -->
        <div comCollapsible variant="bordered">
          <button comCollapsibleTrigger variant="filled" size="default">
            Bordered Variant with Filled Trigger
          </button>
          <com-collapsible-content>
            <div class="border-t border-border p-4 text-foreground">
              This uses the bordered shell with a filled trigger style.
            </div>
          </com-collapsible-content>
        </div>

        <!-- Flush variant (FAQ style) -->
        <div comCollapsible variant="flush">
          <button comCollapsibleTrigger variant="header" size="lg">
            What is a Collapsible component?
          </button>
          <com-collapsible-content>
            <p class="pb-4 text-foreground">
              A Collapsible is an interactive container that can be expanded or collapsed to show or hide its content.
              It's commonly used for FAQs, settings panels, and progressive disclosure patterns.
            </p>
          </com-collapsible-content>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and compose collapsible components"
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
        description="What makes com-collapsible powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="5 Shell Variants"
            description="Card, bordered, flush, ghost, and unstyled variants for different use cases"
            icon="layers"
          />
          <com-item
            title="4 Trigger Variants"
            description="Ghost, filled, header, and unstyled trigger styles with 3 size options"
            icon="mouse-pointer-click"
            iconColor="accent"
          />
          <com-item
            title="CSS Grid Animation"
            description="Smooth height animation using CSS grid technique — no JavaScript measurement needed"
            icon="move"
          />
          <com-item
            title="Template Overrides"
            description="Override trigger layout, content chrome, or just the icon with template directives"
            icon="layout"
            iconColor="accent"
          />
          <com-item
            title="Lazy Content"
            description="Content can be lazily rendered on first expand for better performance"
            icon="zap"
          />
          <com-item
            title="Full Accessibility"
            description="WAI-ARIA disclosure pattern with proper roles, states, and keyboard support"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Two-way Binding Demo -->
    <section class="mb-12">
      <com-item
        title="External Control"
        description="Programmatic control via template reference or two-way binding"
        icon="settings"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="mb-4 flex gap-2">
          <button comButton size="sm" (click)="controlledSection.toggle()">
            Toggle Section
          </button>
          <button comButton variant="outline" color="muted" size="sm" (click)="controlledSection.expand()">
            Expand
          </button>
          <button comButton variant="outline" color="muted" size="sm" (click)="controlledSection.collapse()">
            Collapse
          </button>
          <span class="ml-4 flex items-center text-sm text-muted-foreground">
            State: {{ controlledSection.isOpen() ? 'Open' : 'Closed' }}
          </span>
        </div>
        <div comCollapsible variant="bordered" #controlledSection="comCollapsible">
          <button comCollapsibleTrigger>Externally Controlled Section</button>
          <com-collapsible-content>
            <div class="border-t border-border p-4 text-foreground">
              This section can be controlled via template reference or two-way binding.
            </div>
          </com-collapsible-content>
        </div>
      </com-card>
    </section>

    <!-- Custom Icon Demo -->
    <section>
      <com-item
        title="Custom Icon"
        description="Replace the default chevron with custom content"
        icon="sparkles"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div comCollapsible variant="card">
          <button comCollapsibleTrigger>
            Custom Toggle Icon
            <ng-template comCollapsibleIcon let-open="open">
              <span class="text-lg text-muted-foreground">{{ open ? '−' : '+' }}</span>
            </ng-template>
          </button>
          <com-collapsible-content>
            <div class="border-t border-border p-4 text-foreground">
              The default chevron icon is replaced with a plus/minus symbol.
            </div>
          </com-collapsible-content>
        </div>
      </com-card>
    </section>
  `,
})
export class CollapsibleOverview {
  protected readonly cardOpen = signal(false);

  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import {
  ComCollapsible,
  ComCollapsibleTrigger,
  ComCollapsibleContent,
} from 'ngx-com/components/collapsible';

@Component({
  selector: 'app-example',
  imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
  template: \`
    <div comCollapsible variant="card" [(open)]="isOpen">
      <button comCollapsibleTrigger>Click to expand</button>
      <com-collapsible-content>
        <div class="p-4">
          Content that can be shown or hidden.
        </div>
      </com-collapsible-content>
    </div>
  \`,
})
export class Example {
  isOpen = false;
}`;
}
