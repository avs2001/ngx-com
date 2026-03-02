import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComSpinner } from 'ngx-com/components/spinner';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-spinner-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSpinner, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Spinner colors and variants in action"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <com-spinner />
          <com-spinner color="primary" />
          <com-spinner color="accent" />
          <com-spinner color="warn" />
          <com-spinner color="success" />
          <com-spinner color="muted" />
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
        description="What makes com-spinner powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="CSS-Only Animation"
            description="Pure CSS animation at 0.6s for a snappy, responsive feel. No JavaScript needed"
            icon="zap"
          />
          <com-item
            title="Inherits Color"
            description="Default 'current' color inherits from parent text color, perfect for buttons"
            icon="palette"
            iconColor="accent"
          />
          <com-item
            title="5 Sizes"
            description="From xs (12px) for inline use to xl (40px) for page-level loading states"
            icon="maximize"
          />
          <com-item
            title="6 Colors"
            description="Current, primary, accent, warn, success, and muted variants using semantic tokens"
            icon="layers"
            iconColor="accent"
          />
          <com-item
            title="Optional Label"
            description="Add visible loading text with configurable position (right or bottom)"
            icon="type"
          />
          <com-item
            title="Accessible"
            description="Uses role='status' with sr-only fallback text for screen readers"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Design Decisions -->
    <section>
      <com-item
        title="Design Decisions"
        description="Why com-spinner is built this way"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>0.6s animation:</strong> Intentionally faster than the typical 1s spin
            to feel snappy and responsive rather than sluggish.
          </li>
          <li>
            <strong>Border-based:</strong> Uses border with opacity for the track ring
            and border-t for the spinning arc. Simple, performant, theme-aware.
          </li>
          <li>
            <strong>Minimal template:</strong> Just two spans - the spinning circle
            and the label. No extra wrappers or complexity.
          </li>
          <li>
            <strong>currentColor default:</strong> Automatically matches surrounding
            text color, making it work out of the box in buttons and inline text.
          </li>
        </ul>
      </com-card>
    </section>
  `,
})
export class SpinnerOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComSpinner } from 'ngx-com/components/spinner';

@Component({
  selector: 'app-example',
  imports: [ComSpinner],
  template: \`
    <!-- Simplest usage -->
    <com-spinner />

    <!-- With color -->
    <com-spinner color="primary" />

    <!-- With label -->
    <com-spinner label="Loading..." />

    <!-- Inside a button -->
    <button [disabled]="loading">
      @if (loading) {
        <com-spinner size="xs" />
      }
      Save
    </button>
  \`,
})
export class Example {
  loading = false;
}`;
}
