import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComConfirm } from 'ngx-com/components/confirm';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-confirm-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComConfirm, ComButton, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Click the buttons to see confirmation dialogs"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <button
            comButton
            (comConfirm)="onAction($event)"
            confirmMessage="Are you sure you want to proceed?"
          >
            Confirm Action
          </button>
          <button
            comButton
            variant="outline"
            color="warn"
            (comConfirm)="onDelete($event)"
            confirmTitle="Delete Item"
            confirmMessage="This action cannot be undone."
            confirmLabel="Delete"
            confirmColor="warn"
          >
            Delete
          </button>
        </div>
        @if (lastResult !== null) {
          <p class="mt-4 text-center text-sm text-muted-foreground">
            Last result: {{ lastResult ? 'Confirmed' : 'Cancelled' }}
          </p>
        }
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and apply the directive to buttons"
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
        description="What makes comConfirm powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Output Gate Pattern"
            description="Intercepts clicks and emits true/false through its output"
            icon="git-branch"
          />
          <com-item
            title="Accessible Dialog"
            description="Uses role='alertdialog' with focus trap and keyboard support"
            icon="accessibility"
            iconColor="accent"
          />
          <com-item
            title="Custom Templates"
            description="Support for custom confirmation UI via ng-template"
            icon="layout"
          />
          <com-item
            title="Color Variants"
            description="Primary and warn colors for different action types"
            icon="palette"
            iconColor="accent"
          />
          <com-item
            title="Safe Defaults"
            description="Focus starts on cancel button to prevent accidental confirmation"
            icon="shield"
          />
          <com-item
            title="Navigation Aware"
            description="Emits false when navigating away from the component"
            icon="move"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- When to Use -->
    <section>
      <com-item
        title="When to Use"
        description="Guidelines for effective confirmation usage"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <div class="space-y-4">
          <div>
            <h3 class="mb-2 font-semibold text-foreground">Use confirmations for:</h3>
            <ul class="list-inside list-disc space-y-1 text-foreground">
              <li>Destructive actions (delete, remove, clear)</li>
              <li>Irreversible operations</li>
              <li>Actions with significant consequences</li>
              <li>Bulk operations affecting multiple items</li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-semibold text-foreground">Avoid confirmations for:</h3>
            <ul class="list-inside list-disc space-y-1 text-foreground">
              <li>Easily reversible actions (use undo instead)</li>
              <li>Frequent, low-risk operations</li>
              <li>Navigation or viewing actions</li>
              <li>When you can preview the change first</li>
            </ul>
          </div>
        </div>
      </com-card>
    </section>
  `,
})
export class ConfirmOverview {
  protected lastResult: boolean | null = null;

  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComConfirm } from 'ngx-com/components/confirm';

@Component({
  selector: 'app-example',
  imports: [ComConfirm],
  template: \`
    <button (comConfirm)="onDelete($event)" confirmMessage="Delete this item?">
      Delete
    </button>

    <button
      (comConfirm)="onClear($event)"
      confirmTitle="Clear All Data"
      confirmMessage="This will remove all items. Continue?"
      confirmLabel="Clear"
      confirmColor="warn"
    >
      Clear All
    </button>
  \`,
})
export class Example {
  onDelete(confirmed: boolean) {
    if (confirmed) {
      // Perform delete action
    }
  }

  onClear(confirmed: boolean) {
    if (confirmed) {
      // Clear all data
    }
  }
}`;

  protected onAction(confirmed: boolean): void {
    this.lastResult = confirmed;
  }

  protected onDelete(confirmed: boolean): void {
    this.lastResult = confirmed;
  }
}
