import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  UiCard,
  UiCardHeader,
  UiCardTitle,
  UiCardSubtitle,
  UiCardContent,
  UiCardFooter,
  UiCardActions,
  UiCardMedia,
  UiCardAccent,
  UiCardBadge,
} from 'ngx-com/components/card';
import { UiButton } from 'ngx-com/components/button';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-card-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UiCard,
    UiCardHeader,
    UiCardTitle,
    UiCardSubtitle,
    UiCardContent,
    UiCardFooter,
    UiCardActions,
    UiCardMedia,
    UiCardAccent,
    UiCardBadge,
    UiButton,
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Basic Card -->
          <ui-card>
            <div uiCardHeader>
              <div>
                <h3 uiCardTitle>Project Alpha</h3>
                <p uiCardSubtitle>Last updated 2 hours ago</p>
              </div>
            </div>
            <div uiCardContent>
              <p>A next-generation platform for building scalable applications with modern tooling.</p>
            </div>
            <div uiCardActions>
              <button uiButton variant="ghost" size="sm">Cancel</button>
              <button uiButton size="sm">Save</button>
            </div>
          </ui-card>

          <!-- Card with Badge -->
          <ui-card>
            <span uiCardBadge color="accent">NEW</span>
            <img
              uiCardMedia
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
              alt="Code on screen"
            />
            <div uiCardHeader>
              <div>
                <h3 uiCardTitle>Featured Article</h3>
              </div>
            </div>
            <div uiCardContent>
              <p>Learn how to build modern Angular applications with signals and standalone components.</p>
            </div>
          </ui-card>

          <!-- Outlined Card with Accent -->
          <ui-card variant="outlined">
            <div uiCardAccent color="warn"></div>
            <div uiCardHeader>
              <div>
                <h3 uiCardTitle>Server Health</h3>
                <p uiCardSubtitle>Warning: High CPU usage</p>
              </div>
            </div>
            <div uiCardContent>
              <p>CPU at 92% for the last 15 minutes. Consider scaling up resources.</p>
            </div>
            <div uiCardFooter align="between">
              <span class="text-sm text-muted-foreground">Updated 3m ago</span>
              <button uiButton variant="link" size="sm">View Details</button>
            </div>
          </ui-card>

          <!-- Interactive Card -->
          <ui-card variant="filled" [interactive]="true">
            <div uiCardContent>
              <h3 uiCardTitle>Clickable Card</h3>
              <p class="mt-2">This entire card is interactive with hover and focus states.</p>
            </div>
          </ui-card>
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
            Elevated, outlined, filled, and ghost variants with semantic styling.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Composable Primitives</h3>
          <p class="text-sm text-surface-600">
            11 directives that can be mixed and matched freely for any layout.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Interactive Mode</h3>
          <p class="text-sm text-surface-600">
            Optional hover/focus states for clickable cards with proper accessibility.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Media Support</h3>
          <p class="text-sm text-surface-600">
            Full-bleed or inset media with automatic aspect ratio handling.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accent Strips</h3>
          <p class="text-sm text-surface-600">
            Top or left accent strips for status indication with 5 color options.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Badge Overlays</h3>
          <p class="text-sm text-surface-600">
            Positioned badges in any corner for labels, tags, or status indicators.
          </p>
        </div>
      </div>
    </section>

    <!-- Compound Component Pattern -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Compound Component Pattern</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <p class="mb-4 text-surface-600">
          The card system uses the compound component pattern — a family of related primitives that work
          together but are each independently useful:
        </p>
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">ui-card</code> —
            Container with surface, border, shadow, shape
          </li>
          <li>
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardHeader]</code> —
            Top section for title + actions row
          </li>
          <li>
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardContent]</code> —
            Main body with consistent padding
          </li>
          <li>
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardActions]</code> —
            Button row with alignment options
          </li>
          <li>
            <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardMedia]</code> —
            Image/video slot with positioning
          </li>
        </ul>
        <p class="mt-4 text-surface-600">
          Sub-parts are directives applied to native elements, preserving semantic HTML and full control
          over heading levels, attributes, and accessibility.
        </p>
      </div>
    </section>
  `,
})
export class CardOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import {
  UiCard,
  UiCardHeader,
  UiCardTitle,
  UiCardSubtitle,
  UiCardContent,
  UiCardActions,
} from 'ngx-com/components/card';
import { UiButton } from 'ngx-com/components/button';

@Component({
  selector: 'app-example',
  imports: [
    UiCard,
    UiCardHeader,
    UiCardTitle,
    UiCardSubtitle,
    UiCardContent,
    UiCardActions,
    UiButton,
  ],
  template: \`
    <ui-card>
      <div uiCardHeader>
        <div>
          <h3 uiCardTitle>Card Title</h3>
          <p uiCardSubtitle>Supporting text</p>
        </div>
      </div>
      <div uiCardContent>
        <p>Card body content goes here.</p>
      </div>
      <div uiCardActions>
        <button uiButton variant="ghost" size="sm">Cancel</button>
        <button uiButton size="sm">Confirm</button>
      </div>
    </ui-card>
  \`,
})
export class Example {}`;
}
