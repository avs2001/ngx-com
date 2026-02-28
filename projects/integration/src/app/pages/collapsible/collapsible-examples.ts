import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import {
  ComCollapsible,
  ComCollapsibleTrigger,
  ComCollapsibleContent,
  ComCollapsibleTriggerTpl,
  ComCollapsibleContentTpl,
  ComCollapsibleIconTpl,
  ComCollapsibleLazy,
  type CollapsibleVariant,
  type CollapsibleTriggerVariant,
} from 'ngx-com/components/collapsible';
import { CodeBlock } from '../../shared/code-block';

@Component({
  selector: 'int-collapsible-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComCollapsible,
    ComCollapsibleTrigger,
    ComCollapsibleContent,
    ComCollapsibleTriggerTpl,
    ComCollapsibleContentTpl,
    ComCollapsibleIconTpl,
    ComCollapsibleLazy,
    CodeBlock,
    RouterLink,
    TitleCasePipe,
  ],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <ol class="flex items-center gap-2 text-surface-500">
          <li><a routerLink="/" class="hover:text-primary-600">Home</a></li>
          <li>/</li>
          <li><a routerLink="/components/collapsible" class="hover:text-primary-600">Collapsible</a></li>
          <li>/</li>
          <li><span class="text-surface-900">Examples</span></li>
        </ol>
      </nav>

      <h1 class="mb-4 text-4xl font-bold text-surface-900">Collapsible Examples</h1>
      <p class="mb-8 text-lg text-surface-600">
        Explore different collapsible configurations and use cases.
      </p>

      <!-- Quick nav -->
      <div class="mb-12 flex gap-4">
        <a
          routerLink="/components/collapsible"
          class="rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          Overview
        </a>
        <a
          routerLink="/components/collapsible/api"
          class="rounded-lg border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition hover:border-primary-300 hover:text-primary-600"
        >
          API Reference
        </a>
      </div>

      <!-- Shell Variants -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Shell Variants</h2>
        <p class="mb-4 text-surface-600">
          Five shell variants for different visual contexts. Each uses semantic color tokens.
        </p>
        <div class="space-y-4 rounded-xl border border-surface-200 bg-white p-8">
          @for (variant of shellVariants; track variant) {
            <div comCollapsible [variant]="variant">
              <button comCollapsibleTrigger>
                {{ variant | titlecase }} Variant
              </button>
              <com-collapsible-content>
                <div class="p-4 text-surface-600">
                  Content for the {{ variant }} variant. This variant uses the
                  <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">variant="{{ variant }}"</code> setting.
                </div>
              </com-collapsible-content>
            </div>
          }
        </div>
        <int-code-block class="mt-4" language="html" [code]="shellVariantsCode" />
      </section>

      <!-- Trigger Variants -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Trigger Variants</h2>
        <p class="mb-4 text-surface-600">
          Four trigger styles that can be combined with any shell variant.
        </p>
        <div class="space-y-4 rounded-xl border border-surface-200 bg-white p-8">
          @for (variant of triggerVariants; track variant) {
            <div comCollapsible variant="bordered">
              <button comCollapsibleTrigger [variant]="variant">
                {{ variant | titlecase }} Trigger
              </button>
              <com-collapsible-content>
                <div class="border-t border-border p-4 text-surface-600">
                  Trigger variant: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">variant="{{ variant }}"</code>
                </div>
              </com-collapsible-content>
            </div>
          }
        </div>
        <int-code-block class="mt-4" language="html" [code]="triggerVariantsCode" />
      </section>

      <!-- Sizes -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
        <p class="mb-4 text-surface-600">
          Three trigger sizes with proportional spacing and typography.
        </p>
        <div class="space-y-4 rounded-xl border border-surface-200 bg-white p-8">
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger size="sm">Small Trigger</button>
            <com-collapsible-content>
              <div class="border-t border-border p-3 text-sm text-surface-600">Small size content.</div>
            </com-collapsible-content>
          </div>
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger size="default">Default Trigger</button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">Default size content.</div>
            </com-collapsible-content>
          </div>
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger size="lg">Large Trigger</button>
            <com-collapsible-content>
              <div class="border-t border-border p-5 text-surface-600">Large size content.</div>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="sizesCode" />
      </section>

      <!-- FAQ Pattern -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">FAQ Pattern</h2>
        <p class="mb-4 text-surface-600">
          Use the flush variant with header trigger for a clean FAQ layout.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white">
          @for (faq of faqs; track faq.q) {
            <div comCollapsible variant="flush">
              <button comCollapsibleTrigger variant="header" size="lg">
                {{ faq.q }}
              </button>
              <com-collapsible-content>
                <p class="pb-4 pl-4 text-surface-600">{{ faq.a }}</p>
              </com-collapsible-content>
            </div>
          }
        </div>
        <int-code-block class="mt-4" language="html" [code]="faqCode" />
      </section>

      <!-- Custom Icon -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Icon</h2>
        <p class="mb-4 text-surface-600">
          Override the default chevron with a custom icon template.
        </p>
        <div class="space-y-4 rounded-xl border border-surface-200 bg-white p-8">
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger>
              Plus/Minus Icon
              <ng-template comCollapsibleIcon let-open="open">
                <span class="text-lg font-bold text-muted-foreground">{{ open ? '−' : '+' }}</span>
              </ng-template>
            </button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">
                Custom plus/minus icon instead of chevron.
              </div>
            </com-collapsible-content>
          </div>
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger>
              Arrow Icon
              <ng-template comCollapsibleIcon let-open="open">
                <span class="text-muted-foreground transition-transform duration-200" [class.rotate-90]="open">→</span>
              </ng-template>
            </button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">
                Custom arrow icon with rotation.
              </div>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="customIconCode" />
      </section>

      <!-- Custom Trigger Template -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Trigger Layout</h2>
        <p class="mb-4 text-surface-600">
          Override the entire trigger layout with a custom template while preserving ARIA and keyboard handling.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger>
              <ng-template comCollapsibleTriggerTpl let-open let-disabled="disabled">
                <div class="flex w-full items-center gap-3">
                  <span
                    class="h-2.5 w-2.5 rounded-full transition-colors"
                    [class.bg-success]="open"
                    [class.bg-muted]="!open"
                  ></span>
                  <div class="flex flex-col items-start">
                    <span class="font-medium text-foreground">Notification Settings</span>
                    <span class="text-xs text-muted-foreground">3 channels active</span>
                  </div>
                  <span class="ml-auto rounded bg-primary-subtle px-1.5 py-0.5 text-xs text-primary-subtle-foreground">
                    Pro
                  </span>
                  <svg
                    class="h-4 w-4 text-muted-foreground transition-transform duration-200"
                    [class.rotate-180]="open"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </ng-template>
            </button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">
                <p class="mb-3">Configure your notification preferences:</p>
                <ul class="list-inside list-disc space-y-1">
                  <li>Email notifications</li>
                  <li>Push notifications</li>
                  <li>SMS alerts</li>
                </ul>
              </div>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="customTriggerCode" />
      </section>

      <!-- Custom Content Chrome -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Content Chrome</h2>
        <p class="mb-4 text-surface-600">
          Add custom chrome (headers, footers, borders) around the content while keeping the animation.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger>Filter Options</button>
            <com-collapsible-content>
              <ng-template comCollapsibleContentTpl let-open="open">
                <div class="border-t border-border">
                  <div class="space-y-3 p-4">
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-surface-700">Show active items</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-surface-700">Include archived</span>
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="rounded" />
                      <span class="text-surface-700">Sort by date</span>
                    </label>
                  </div>
                  <div class="flex justify-end gap-2 border-t border-border-subtle bg-muted px-4 py-3">
                    <button class="text-sm text-muted-foreground hover:text-foreground">Reset</button>
                    <button class="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary-hover">
                      Apply
                    </button>
                  </div>
                </div>
              </ng-template>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="customContentCode" />
      </section>

      <!-- Lazy Content -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Lazy Content</h2>
        <p class="mb-4 text-surface-600">
          Defer rendering of heavy content until first expand. Content persists after collapse.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger>Performance Dashboard (Lazy)</button>
            <com-collapsible-content>
              <ng-template comCollapsibleLazy>
                <div class="border-t border-border p-4">
                  <p class="mb-3 text-surface-600">
                    This content was lazily rendered on first expand.
                    Timestamp: {{ lazyTimestamp }}
                  </p>
                  <div class="grid grid-cols-3 gap-4">
                    <div class="rounded-lg bg-success-subtle p-3 text-center">
                      <div class="text-2xl font-bold text-success-subtle-foreground">98%</div>
                      <div class="text-xs text-success-subtle-foreground">Uptime</div>
                    </div>
                    <div class="rounded-lg bg-primary-subtle p-3 text-center">
                      <div class="text-2xl font-bold text-primary-subtle-foreground">1.2s</div>
                      <div class="text-xs text-primary-subtle-foreground">Avg Load</div>
                    </div>
                    <div class="rounded-lg bg-accent-subtle p-3 text-center">
                      <div class="text-2xl font-bold text-accent-subtle-foreground">45k</div>
                      <div class="text-xs text-accent-subtle-foreground">Requests</div>
                    </div>
                  </div>
                </div>
              </ng-template>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="lazyCode" />
      </section>

      <!-- External Control -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">External Control</h2>
        <p class="mb-4 text-surface-600">
          Control the collapsible programmatically via template reference or two-way binding.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <button
              class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover"
              (click)="externalSection.toggle()"
            >
              Toggle
            </button>
            <button
              class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
              (click)="externalSection.expand()"
            >
              Expand
            </button>
            <button
              class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
              (click)="externalSection.collapse()"
            >
              Collapse
            </button>
            <span class="ml-4 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              State: {{ externalSection.isOpen() ? 'Open' : 'Closed' }}
            </span>
          </div>
          <div comCollapsible variant="bordered" #externalSection="comCollapsible">
            <button comCollapsibleTrigger variant="filled">Externally Controlled</button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">
                This section can be controlled via the buttons above or by clicking the trigger.
              </div>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="externalControlCode" />
      </section>

      <!-- Two-Way Binding -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Two-Way Binding</h2>
        <p class="mb-4 text-surface-600">
          Sync state with a signal using <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[(open)]</code>.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="mb-4 flex items-center gap-4">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                class="rounded"
                [checked]="boundOpen()"
                (change)="boundOpen.set(!boundOpen())"
              />
              <span class="text-surface-700">Section open</span>
            </label>
          </div>
          <div comCollapsible variant="card" [(open)]="boundOpen">
            <button comCollapsibleTrigger>Two-Way Bound Section</button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">
                The checkbox above stays in sync with this section's state.
              </div>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="typescript" [code]="twoWayBindingCode" />
      </section>

      <!-- Disabled State -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
        <p class="mb-4 text-surface-600">
          Prevent interaction with the disabled attribute.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div class="mb-4 flex items-center gap-4">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                class="rounded"
                [checked]="isDisabled()"
                (change)="isDisabled.set(!isDisabled())"
              />
              <span class="text-surface-700">Disabled</span>
            </label>
          </div>
          <div comCollapsible variant="card" [disabled]="isDisabled()">
            <button comCollapsibleTrigger>Toggle Disabled State Above</button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">
                This content is hidden when disabled is true.
              </div>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="disabledCode" />
      </section>

      <!-- Without Icon -->
      <section>
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Without Icon</h2>
        <p class="mb-4 text-surface-600">
          Hide the default icon with <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[showIcon]="false"</code>.
        </p>
        <div class="rounded-xl border border-surface-200 bg-white p-8">
          <div comCollapsible variant="card">
            <button comCollapsibleTrigger [showIcon]="false">
              Click to toggle (no icon)
            </button>
            <com-collapsible-content>
              <div class="border-t border-border p-4 text-surface-600">
                The trigger has no icon indicator.
              </div>
            </com-collapsible-content>
          </div>
        </div>
        <int-code-block class="mt-4" language="html" [code]="noIconCode" />
      </section>
    </div>
  `,
})
export class CollapsibleExamples {
  protected readonly shellVariants: CollapsibleVariant[] = ['card', 'bordered', 'flush', 'ghost'];
  protected readonly triggerVariants: CollapsibleTriggerVariant[] = ['ghost', 'filled', 'header'];

  protected readonly boundOpen = signal(false);
  protected readonly isDisabled = signal(false);

  protected readonly lazyTimestamp = new Date().toISOString();

  protected readonly faqs = [
    { q: 'What is a Collapsible component?', a: 'A Collapsible is an interactive container that can be expanded or collapsed to show or hide content. It implements the WAI-ARIA disclosure pattern for accessibility.' },
    { q: 'How does the animation work?', a: 'The animation uses CSS grid with grid-template-rows transitioning between 0fr and 1fr. This provides smooth height animation without JavaScript measurement.' },
    { q: 'Can I use multiple collapsibles independently?', a: 'Yes, each collapsible manages its own state independently. For accordion behavior (mutual exclusion), you would manage that in your application logic.' },
  ];

  protected readonly shellVariantsCode = `<div comCollapsible variant="card">...</div>
<div comCollapsible variant="bordered">...</div>
<div comCollapsible variant="flush">...</div>
<div comCollapsible variant="ghost">...</div>
<div comCollapsible variant="unstyled">...</div>`;

  protected readonly triggerVariantsCode = `<button comCollapsibleTrigger variant="ghost">Ghost</button>
<button comCollapsibleTrigger variant="filled">Filled</button>
<button comCollapsibleTrigger variant="header">Header</button>
<button comCollapsibleTrigger variant="unstyled">Unstyled</button>`;

  protected readonly sizesCode = `<button comCollapsibleTrigger size="sm">Small</button>
<button comCollapsibleTrigger size="default">Default</button>
<button comCollapsibleTrigger size="lg">Large</button>`;

  protected readonly faqCode = `<div comCollapsible variant="flush">
  <button comCollapsibleTrigger variant="header" size="lg">
    What is a Collapsible component?
  </button>
  <com-collapsible-content>
    <p class="pb-4 pl-4 text-muted-foreground">
      A Collapsible is an interactive container...
    </p>
  </com-collapsible-content>
</div>`;

  protected readonly customIconCode = `<button comCollapsibleTrigger>
  Toggle Section
  <ng-template comCollapsibleIcon let-open="open">
    <span class="text-lg">{{ open ? '−' : '+' }}</span>
  </ng-template>
</button>`;

  protected readonly customTriggerCode = `<button comCollapsibleTrigger>
  <ng-template comCollapsibleTriggerTpl let-open let-disabled="disabled">
    <div class="flex items-center gap-3 w-full">
      <span class="h-2.5 w-2.5 rounded-full"
            [class.bg-success]="open"
            [class.bg-muted]="!open"></span>
      <div class="flex flex-col items-start">
        <span class="font-medium">Notification Settings</span>
        <span class="text-xs text-muted-foreground">3 channels active</span>
      </div>
      <svg class="h-4 w-4 ml-auto transition-transform"
           [class.rotate-180]="open">
        <!-- chevron icon -->
      </svg>
    </div>
  </ng-template>
</button>`;

  protected readonly customContentCode = `<com-collapsible-content>
  <ng-template comCollapsibleContentTpl let-open="open">
    <div class="border-t border-border">
      <div class="p-4 space-y-3">
        <!-- Form controls -->
      </div>
      <div class="flex justify-end gap-2 px-4 py-3 border-t bg-muted">
        <button>Reset</button>
        <button>Apply</button>
      </div>
    </div>
  </ng-template>
</com-collapsible-content>`;

  protected readonly lazyCode = `<com-collapsible-content>
  <ng-template comCollapsibleLazy>
    <app-heavy-dashboard />
  </ng-template>
</com-collapsible-content>`;

  protected readonly externalControlCode = `<div comCollapsible #section="comCollapsible">
  <button comCollapsibleTrigger>Title</button>
  <com-collapsible-content>...</com-collapsible-content>
</div>

<button (click)="section.toggle()">Toggle</button>
<button (click)="section.expand()">Expand</button>
<button (click)="section.collapse()">Collapse</button>
<span>{{ section.isOpen() ? 'Open' : 'Closed' }}</span>`;

  protected readonly twoWayBindingCode = `import { signal } from '@angular/core';

export class Example {
  isOpen = signal(false);
}

// Template:
// <div comCollapsible [(open)]="isOpen">
//   ...
// </div>`;

  protected readonly disabledCode = `<div comCollapsible [disabled]="isLocked()">
  <button comCollapsibleTrigger>Locked Section</button>
  <com-collapsible-content>
    Cannot toggle when disabled.
  </com-collapsible-content>
</div>`;

  protected readonly noIconCode = `<button comCollapsibleTrigger [showIcon]="false">
  Click to toggle (no icon)
</button>`;
}
