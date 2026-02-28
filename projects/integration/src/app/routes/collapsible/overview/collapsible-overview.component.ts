import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="space-y-4 rounded-xl border border-surface-200 bg-white p-8">
        <!-- Card variant -->
        <div comCollapsible variant="card" [(open)]="cardOpen">
          <button comCollapsibleTrigger variant="ghost" size="default">
            Card Variant
          </button>
          <com-collapsible-content>
            <div class="border-t border-border p-4 text-surface-600">
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
            <div class="border-t border-border p-4 text-surface-600">
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
            <p class="pb-4 text-surface-600">
              A Collapsible is an interactive container that can be expanded or collapsed to show or hide its content.
              It's commonly used for FAQs, settings panels, and progressive disclosure patterns.
            </p>
          </com-collapsible-content>
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
          <h3 class="mb-2 font-semibold text-surface-900">5 Shell Variants</h3>
          <p class="text-sm text-surface-600">
            Card, bordered, flush, ghost, and unstyled variants for different use cases.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">4 Trigger Variants</h3>
          <p class="text-sm text-surface-600">
            Ghost, filled, header, and unstyled trigger styles with 3 size options.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">CSS Grid Animation</h3>
          <p class="text-sm text-surface-600">
            Smooth height animation using CSS grid technique — no JavaScript measurement needed.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Template Overrides</h3>
          <p class="text-sm text-surface-600">
            Override trigger layout, content chrome, or just the icon with template directives.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Lazy Content</h3>
          <p class="text-sm text-surface-600">
            Content can be lazily rendered on first expand for better performance.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Full Accessibility</h3>
          <p class="text-sm text-surface-600">
            WAI-ARIA disclosure pattern with proper roles, states, and keyboard support.
          </p>
        </div>
      </div>
    </section>

    <!-- Two-way Binding Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">External Control</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mb-4 flex gap-2">
          <button
            class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover"
            (click)="controlledSection.toggle()"
          >
            Toggle Section
          </button>
          <button
            class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
            (click)="controlledSection.expand()"
          >
            Expand
          </button>
          <button
            class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
            (click)="controlledSection.collapse()"
          >
            Collapse
          </button>
          <span class="ml-4 flex items-center text-sm text-surface-600">
            State: {{ controlledSection.isOpen() ? 'Open' : 'Closed' }}
          </span>
        </div>
        <div comCollapsible variant="bordered" #controlledSection="comCollapsible">
          <button comCollapsibleTrigger>Externally Controlled Section</button>
          <com-collapsible-content>
            <div class="border-t border-border p-4 text-surface-600">
              This section can be controlled via template reference or two-way binding.
            </div>
          </com-collapsible-content>
        </div>
      </div>
    </section>

    <!-- Custom Icon Demo -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Icon</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div comCollapsible variant="card">
          <button comCollapsibleTrigger>
            Custom Toggle Icon
            <ng-template comCollapsibleIcon let-open="open">
              <span class="text-lg text-muted-foreground">{{ open ? '−' : '+' }}</span>
            </ng-template>
          </button>
          <com-collapsible-content>
            <div class="border-t border-border p-4 text-surface-600">
              The default chevron icon is replaced with a plus/minus symbol.
            </div>
          </com-collapsible-content>
        </div>
      </div>
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
