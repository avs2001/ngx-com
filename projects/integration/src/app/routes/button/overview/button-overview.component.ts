import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-button-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComButton, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Interactive button variants and colors"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton>Primary</button>
          <button comButton color="accent">Accent</button>
          <button comButton color="warn">Warn</button>
          <button comButton color="muted">Muted</button>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the directive in your templates"
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
        description="What makes comButton powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="4 Variants"
            description="Solid, outline, ghost, and link variants for different visual treatments"
            icon="layers"
          />
          <com-item
            title="4 Colors"
            description="Primary, accent, warn, and muted colors using semantic tokens"
            icon="palette"
            iconColor="accent"
          />
          <com-item
            title="4 Sizes"
            description="Small, medium, large, and icon sizes with proportional spacing"
            icon="maximize"
          />
          <com-item
            title="Native Elements"
            description="Works on both button and anchor elements preserving native behavior"
            icon="box"
          />
          <com-item
            title="Full Width"
            description="Optional full-width mode for block-level buttons"
            icon="move-horizontal"
          />
          <com-item
            title="Theme Aware"
            description="Uses semantic tokens for automatic dark mode and theme support"
            icon="sun-moon"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Directive vs Component -->
    <section>
      <com-item
        title="Why a Directive?"
        description="Benefits of the directive approach"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>Native Control:</strong> Full control over native attributes
            (<code class="rounded bg-muted px-1.5 py-0.5 text-sm">type="submit"</code>,
            <code class="rounded bg-muted px-1.5 py-0.5 text-sm">routerLink</code>,
            <code class="rounded bg-muted px-1.5 py-0.5 text-sm">download</code>, etc.)
          </li>
          <li>
            <strong>Accessibility:</strong> Native
            <code class="rounded bg-muted px-1.5 py-0.5 text-sm">&lt;button&gt;</code> and
            <code class="rounded bg-muted px-1.5 py-0.5 text-sm">&lt;a&gt;</code> elements have
            correct roles, keyboard handling, and focus behavior built-in
          </li>
          <li>
            <strong>No Wrapper:</strong> No extra DOM wrapper element needed
          </li>
          <li>
            <strong>Content Freedom:</strong> Put anything inside — text, icons, spinners — without projection APIs
          </li>
        </ul>
      </com-card>
    </section>
  `,
})
export class ButtonOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';

@Component({
  selector: 'app-example',
  imports: [ComButton],
  template: \`
    <button comButton>Save</button>
    <button comButton variant="outline" color="accent">Cancel</button>
    <button comButton variant="ghost" color="warn">Delete</button>
    <a comButton variant="link" routerLink="/docs">Documentation</a>
  \`,
})
export class Example {}`;
}
