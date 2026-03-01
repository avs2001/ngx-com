import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UiButton } from 'ngx-com/components/button';
import {
  PopoverTriggerDirective,
  PopoverCloseDirective,
} from 'ngx-com/components/popover';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-popover-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiButton, PopoverTriggerDirective, PopoverCloseDirective, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="space-y-6 rounded-xl border border-surface-200 bg-white p-8">
        <!-- Basic popover -->
        <div class="flex flex-wrap gap-4">
          <button uiButton [uiPopoverTrigger]="basicContent">Click me</button>
          <ng-template #basicContent>
            <p class="text-sm text-popover-foreground">
              This is a basic popover with some helpful information.
            </p>
          </ng-template>

          <!-- Positioned above -->
          <button uiButton variant="outline" [uiPopoverTrigger]="aboveContent" popoverPosition="above">
            Opens Above
          </button>
          <ng-template #aboveContent>
            <p class="text-sm">This popover appears above the trigger.</p>
          </ng-template>

          <!-- No arrow -->
          <button
            uiButton
            variant="ghost"
            [uiPopoverTrigger]="noArrowContent"
            [popoverShowArrow]="false"
          >
            No Arrow
          </button>
          <ng-template #noArrowContent>
            <p class="text-sm">A popover without the arrow indicator.</p>
          </ng-template>
        </div>

        <!-- With close button -->
        <div>
          <p class="mb-3 text-sm font-medium text-surface-600">With close button</p>
          <button uiButton color="accent" [uiPopoverTrigger]="closeContent">
            Confirmation
          </button>
          <ng-template #closeContent>
            <div class="space-y-3">
              <p class="text-sm font-medium">Are you sure?</p>
              <p class="text-xs text-muted-foreground">This action cannot be undone.</p>
              <div class="flex justify-end gap-2">
                <button uiButton variant="ghost" size="sm" uiPopoverClose>Cancel</button>
                <button uiButton size="sm" uiPopoverClose>Confirm</button>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <int-code-block language="typescript" [code]="basicUsageCode" />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Smart Positioning</h3>
          <p class="text-sm text-surface-600">
            Automatically flips and repositions when hitting viewport edges using CDK Overlay.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Template or Component</h3>
          <p class="text-sm text-surface-600">
            Render content from ng-template or pass a Component class directly.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Optional Arrow</h3>
          <p class="text-sm text-surface-600">
            Connecting arrow that tracks the popover position automatically.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Focus Management</h3>
          <p class="text-sm text-surface-600">
            Optional focus trapping and automatic focus restoration on close.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Trigger Modes</h3>
          <p class="text-sm text-surface-600">
            Open on click, focus, or control programmatically with manual mode.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Full Accessibility</h3>
          <p class="text-sm text-surface-600">
            ARIA attributes, keyboard navigation, and screen reader support.
          </p>
        </div>
      </div>
    </section>

    <!-- External Control Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">External Control</h2>
      <p class="mb-4 text-surface-600">
        Use two-way binding with [(popoverOpen)] for programmatic control.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mb-4 flex items-center gap-4">
          <button
            uiButton
            variant="outline"
            (click)="isControlledOpen.set(!isControlledOpen())"
          >
            Toggle Externally
          </button>
          <span class="text-sm text-surface-600">
            State: {{ isControlledOpen() ? 'Open' : 'Closed' }}
          </span>
        </div>
        <span
          class="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm"
          [uiPopoverTrigger]="controlledContent"
          popoverTriggerOn="manual"
          [(popoverOpen)]="isControlledOpen"
        >
          Anchor element
        </span>
        <ng-template #controlledContent>
          <p class="text-sm">This popover is controlled externally.</p>
        </ng-template>
      </div>
    </section>

    <!-- Positions Demo -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Positioning</h2>
      <p class="mb-4 text-surface-600">
        Control position with the popoverPosition and popoverAlignment inputs.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          @for (pos of positions; track pos) {
            <button
              uiButton
              variant="outline"
              size="sm"
              [uiPopoverTrigger]="posContent"
              [popoverPosition]="pos"
            >
              {{ pos }}
            </button>
            <ng-template #posContent>
              <p class="text-sm">Position: {{ pos }}</p>
            </ng-template>
          }
        </div>
      </div>
    </section>
  `,
})
export class PopoverOverview {
  protected readonly isControlledOpen = signal(false);
  protected readonly positions = ['auto', 'above', 'below', 'left', 'right'] as const;

  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import {
  PopoverTriggerDirective,
  PopoverCloseDirective,
} from 'ngx-com/components/popover';
import { UiButton } from 'ngx-com/components/button';

@Component({
  selector: 'app-example',
  imports: [PopoverTriggerDirective, PopoverCloseDirective, UiButton],
  template: \`
    <button uiButton [uiPopoverTrigger]="helpContent">
      Help
    </button>

    <ng-template #helpContent>
      <p>This is helpful information.</p>
      <button uiButton size="sm" uiPopoverClose>Got it</button>
    </ng-template>
  \`,
})
export class Example {}`;
}
