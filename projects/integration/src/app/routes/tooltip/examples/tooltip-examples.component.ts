import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { ComTooltip } from 'ngx-com/components/tooltip';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-tooltip-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComTooltip, ComButton, ComCard, CodeBlock],
  template: `
    <!-- Positions -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Positions</h2>
      <p class="mb-4 text-surface-600">
        Four position options with automatic viewport flipping.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton variant="outline" comTooltip="Tooltip on top" comTooltipPosition="top">Top</button>
          <button comButton variant="outline" comTooltip="Tooltip on bottom" comTooltipPosition="bottom">Bottom</button>
          <button comButton variant="outline" comTooltip="Tooltip on left" comTooltipPosition="left">Left</button>
          <button comButton variant="outline" comTooltip="Tooltip on right" comTooltipPosition="right">Right</button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="positionsCode" />
    </section>

    <!-- Color Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Color Variants</h2>
      <p class="mb-4 text-surface-600">
        Five color variants for different semantic contexts.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton variant="outline" comTooltip="Default dark tooltip">Default</button>
          <button comButton variant="outline" comTooltip="Primary branded" comTooltipColor="primary">Primary</button>
          <button comButton variant="outline" comTooltip="Accent color" comTooltipColor="accent">Accent</button>
          <button comButton variant="outline" comTooltip="Warning message" comTooltipColor="warn">Warning</button>
          <button comButton variant="outline" comTooltip="Light inverted style" comTooltipColor="invert">Invert</button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Three size variants for different content lengths.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton variant="outline" comTooltip="Small tooltip" comTooltipSize="sm">Small</button>
          <button comButton variant="outline" comTooltip="Medium tooltip (default)">Medium</button>
          <button comButton variant="outline" comTooltip="Large tooltip for more content" comTooltipSize="lg">Large</button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- No Arrow -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Without Arrow</h2>
      <p class="mb-4 text-surface-600">
        Remove the arrow for a cleaner look.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton variant="outline" comTooltip="No arrow tooltip" [comTooltipHasArrow]="false">No Arrow</button>
          <button comButton variant="outline" comTooltip="Invert without arrow" comTooltipColor="invert" [comTooltipHasArrow]="false">Invert No Arrow</button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="noArrowCode" />
    </section>

    <!-- Delays -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Delays</h2>
      <p class="mb-4 text-surface-600">
        Configure show and hide delays for different use cases.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton variant="outline" comTooltip="Instant show" [comTooltipShowDelay]="0">Instant</button>
          <button comButton variant="outline" comTooltip="Slow show (500ms)" [comTooltipShowDelay]="500">Slow Show</button>
          <button comButton variant="outline" comTooltip="Slow hide (500ms)" [comTooltipHideDelay]="500">Slow Hide</button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="delaysCode" />
    </section>

    <!-- Custom Template -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Template</h2>
      <p class="mb-4 text-surface-600">
        Use ng-template for rich tooltip content.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            variant="outline"
            comTooltip="Keyboard shortcuts"
            [comTooltipTpl]="shortcutsTpl"
            comTooltipSize="lg"
          >
            Shortcuts
          </button>
        </div>

        <ng-template #shortcutsTpl>
          <div class="flex flex-col gap-1.5">
            <div class="text-xs font-semibold">Keyboard Shortcuts</div>
            <div class="flex justify-between gap-4 text-xs">
              <span class="opacity-75">Save</span>
              <kbd class="rounded bg-surface-700 px-1 font-mono text-xs">Ctrl+S</kbd>
            </div>
            <div class="flex justify-between gap-4 text-xs">
              <span class="opacity-75">Undo</span>
              <kbd class="rounded bg-surface-700 px-1 font-mono text-xs">Ctrl+Z</kbd>
            </div>
            <div class="flex justify-between gap-4 text-xs">
              <span class="opacity-75">Redo</span>
              <kbd class="rounded bg-surface-700 px-1 font-mono text-xs">Ctrl+Y</kbd>
            </div>
          </div>
        </ng-template>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="templateCode" />
    </section>

    <!-- Programmatic Control -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Programmatic Control</h2>
      <p class="mb-4 text-surface-600">
        Use template reference to show/hide programmatically.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <input
            #tooltipRef="comTooltip"
            type="text"
            placeholder="Type something..."
            class="rounded-md border border-input-border bg-input-background px-3 py-2 text-sm"
            comTooltip="This input has a tooltip"
            [comTooltipDisabled]="true"
          />
          <button comButton variant="outline" size="sm" (click)="tooltipRef.show()">Show</button>
          <button comButton variant="outline" size="sm" (click)="tooltipRef.hide()">Hide</button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="programmaticCode" />
    </section>

    <!-- Disabled -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
      <p class="mb-4 text-surface-600">
        Conditionally disable the tooltip.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button comButton variant="outline" comTooltip="This tooltip is disabled" [comTooltipDisabled]="true">
            Disabled Tooltip
          </button>
          <button comButton variant="outline" comTooltip="This tooltip is enabled" [comTooltipDisabled]="false">
            Enabled Tooltip
          </button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Use Cases -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Common Use Cases</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <!-- Icon button with label -->
          <button
            comButton
            variant="ghost"
            size="icon"
            comTooltip="Settings"
            aria-label="Settings"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>

          <!-- Warning indicator -->
          <span
            class="inline-flex items-center gap-1 text-warn-600"
            comTooltip="3 validation errors"
            comTooltipColor="warn"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            3 errors
          </span>

          <!-- Truncated text -->
          <span
            class="max-w-32 truncate"
            comTooltip="This is a very long text that gets truncated and needs a tooltip to show the full content"
            comTooltipSize="lg"
          >
            This is a very long text that gets truncated
          </span>

          <!-- Info icon -->
          <span
            class="inline-flex cursor-help items-center text-muted-foreground"
            comTooltip="Click to learn more about this feature"
            comTooltipColor="invert"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </span>
        </div>
      </com-card>
    </section>
  `,
})
export class TooltipExamples {
  protected readonly positionsCode = `<button comTooltip="Tooltip on top" comTooltipPosition="top">Top</button>
<button comTooltip="Tooltip on bottom" comTooltipPosition="bottom">Bottom</button>
<button comTooltip="Tooltip on left" comTooltipPosition="left">Left</button>
<button comTooltip="Tooltip on right" comTooltipPosition="right">Right</button>`;

  protected readonly colorsCode = `<button comTooltip="Default dark tooltip">Default</button>
<button comTooltip="Primary branded" comTooltipColor="primary">Primary</button>
<button comTooltip="Accent color" comTooltipColor="accent">Accent</button>
<button comTooltip="Warning message" comTooltipColor="warn">Warning</button>
<button comTooltip="Light inverted style" comTooltipColor="invert">Invert</button>`;

  protected readonly sizesCode = `<button comTooltip="Small tooltip" comTooltipSize="sm">Small</button>
<button comTooltip="Medium tooltip (default)">Medium</button>
<button comTooltip="Large tooltip" comTooltipSize="lg">Large</button>`;

  protected readonly noArrowCode = `<button comTooltip="No arrow tooltip" [comTooltipHasArrow]="false">
  No Arrow
</button>`;

  protected readonly delaysCode = `<button comTooltip="Instant show" [comTooltipShowDelay]="0">Instant</button>
<button comTooltip="Slow show (500ms)" [comTooltipShowDelay]="500">Slow Show</button>
<button comTooltip="Slow hide (500ms)" [comTooltipHideDelay]="500">Slow Hide</button>`;

  protected readonly templateCode = `<button
  comTooltip="Keyboard shortcuts"
  [comTooltipTpl]="shortcutsTpl"
  comTooltipSize="lg"
>
  Shortcuts
</button>

<ng-template #shortcutsTpl>
  <div class="flex flex-col gap-1.5">
    <div class="text-xs font-semibold">Keyboard Shortcuts</div>
    <div class="flex justify-between gap-4 text-xs">
      <span>Save</span>
      <kbd>Ctrl+S</kbd>
    </div>
  </div>
</ng-template>`;

  protected readonly programmaticCode = `<input
  #tooltipRef="comTooltip"
  comTooltip="This input has a tooltip"
  [comTooltipDisabled]="true"
/>
<button (click)="tooltipRef.show()">Show</button>
<button (click)="tooltipRef.hide()">Hide</button>`;

  protected readonly disabledCode = `<button comTooltip="This tooltip is disabled" [comTooltipDisabled]="true">
  Disabled Tooltip
</button>
<button comTooltip="This tooltip is enabled" [comTooltipDisabled]="false">
  Enabled Tooltip
</button>`;
}
