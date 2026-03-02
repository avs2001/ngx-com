import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import {
  PopoverTriggerDirective,
  PopoverCloseDirective,
} from 'ngx-com/components/popover';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-popover-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComButton, ComCard, ComItem, PopoverTriggerDirective, PopoverCloseDirective, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Interactive popovers with different positions and content"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="space-y-6 p-8">
        <!-- Basic popover -->
        <div class="flex flex-wrap gap-4">
          <button comButton [comPopoverTrigger]="basicContent">Click me</button>
          <ng-template #basicContent>
            <p class="text-sm text-popover-foreground">
              This is a basic popover with some helpful information.
            </p>
          </ng-template>

          <!-- Positioned above -->
          <button comButton variant="outline" [comPopoverTrigger]="aboveContent" popoverPosition="above">
            Opens Above
          </button>
          <ng-template #aboveContent>
            <p class="text-sm">This popover appears above the trigger.</p>
          </ng-template>

          <!-- No arrow -->
          <button
            comButton
            variant="ghost"
            [comPopoverTrigger]="noArrowContent"
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
          <p class="mb-3 text-sm font-medium text-muted-foreground">With close button</p>
          <button comButton color="accent" [comPopoverTrigger]="closeContent">
            Confirmation
          </button>
          <ng-template #closeContent>
            <div class="space-y-3">
              <p class="text-sm font-medium">Are you sure?</p>
              <p class="text-xs text-muted-foreground">This action cannot be undone.</p>
              <div class="flex justify-end gap-2">
                <button comButton variant="ghost" size="sm" comPopoverClose>Cancel</button>
                <button comButton size="sm" comPopoverClose>Confirm</button>
              </div>
            </div>
          </ng-template>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the popover directive"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <int-code-block language="typescript" [code]="basicUsageCode" />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes comPopover powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Smart Positioning"
            description="Automatically flips and repositions when hitting viewport edges using CDK Overlay"
            icon="move"
          />
          <com-item
            title="Template or Component"
            description="Render content from ng-template or pass a Component class directly"
            icon="layout"
            iconColor="accent"
          />
          <com-item
            title="Optional Arrow"
            description="Connecting arrow that tracks the popover position automatically"
            icon="chevron-up"
          />
          <com-item
            title="Focus Management"
            description="Optional focus trapping and automatic focus restoration on close"
            icon="focus"
            iconColor="accent"
          />
          <com-item
            title="Trigger Modes"
            description="Open on click, focus, or control programmatically with manual mode"
            icon="mouse-pointer-click"
          />
          <com-item
            title="Full Accessibility"
            description="ARIA attributes, keyboard navigation, and screen reader support"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- External Control Demo -->
    <section class="mb-12">
      <com-item
        title="External Control"
        description="Programmatic control with two-way binding"
        icon="settings"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="mb-4 flex items-center gap-4">
          <button
            comButton
            variant="outline"
            (click)="isControlledOpen.set(!isControlledOpen())"
          >
            Toggle Externally
          </button>
          <span class="text-sm text-muted-foreground">
            State: {{ isControlledOpen() ? 'Open' : 'Closed' }}
          </span>
        </div>
        <span
          class="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm"
          [comPopoverTrigger]="controlledContent"
          popoverTriggerOn="manual"
          [(popoverOpen)]="isControlledOpen"
        >
          Anchor element
        </span>
        <ng-template #controlledContent>
          <p class="text-sm">This popover is controlled externally.</p>
        </ng-template>
      </com-card>
    </section>

    <!-- Positions Demo -->
    <section>
      <com-item
        title="Positioning"
        description="Control position with popoverPosition and popoverAlignment inputs"
        icon="layout"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          @for (pos of positions; track pos) {
            <button
              comButton
              variant="outline"
              size="sm"
              [comPopoverTrigger]="posContent"
              [popoverPosition]="pos"
            >
              {{ pos }}
            </button>
            <ng-template #posContent>
              <p class="text-sm">Position: {{ pos }}</p>
            </ng-template>
          }
        </div>
      </com-card>
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
import { ComButton } from 'ngx-com/components/button';

@Component({
  selector: 'app-example',
  imports: [PopoverTriggerDirective, PopoverCloseDirective, ComButton],
  template: \`
    <button comButton [comPopoverTrigger]="helpContent">
      Help
    </button>

    <ng-template #helpContent>
      <p>This is helpful information.</p>
      <button comButton size="sm" comPopoverClose>Got it</button>
    </ng-template>
  \`,
})
export class Example {}`;
}
