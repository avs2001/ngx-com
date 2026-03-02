import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-datepicker-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComDatepicker, ComCard, ComItem, CodeBlock, FormsModule],
  providers: [provideNativeDateAdapter()],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Date input with calendar popup"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <div class="flex flex-col items-start gap-4">
        <com-datepicker
          [(ngModel)]="selectedDate"
          placeholder="Select a date..."
          [showClearButton]="true"
        />
        @if (selectedDate()) {
          <p class="text-muted-foreground">
            Selected: <span class="font-medium text-foreground">{{ formatDate(selectedDate()!) }}</span>
          </p>
        }
      </div>
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
        description="What makes com-datepicker powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Form Integration"
            description="Full ControlValueAccessor support for Reactive Forms and Template-driven Forms with validation"
            icon="file-code"
          />
          <com-item
            title="Manual Input"
            description="Type dates directly or use the calendar popup. Supports multiple date format presets"
            icon="keyboard"
            iconColor="accent"
          />
          <com-item
            title="Date Constraints"
            description="Min/max dates, custom filter functions, and built-in validation for invalid dates"
            icon="shield"
          />
          <com-item
            title="Accessibility"
            description="WCAG AA compliant with keyboard navigation, focus trapping, and live announcements"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Accessibility -->
    <section>
      <com-item
        title="Keyboard Navigation"
        description="Full keyboard support for accessible interaction"
        icon="keyboard"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border text-left">
              <th class="pb-2 font-medium text-muted-foreground">Key</th>
              <th class="pb-2 font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody class="text-foreground">
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Open calendar popup</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Escape</kbd></td>
              <td class="py-2">Close calendar popup</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Enter</kbd></td>
              <td class="py-2">Open popup or commit typed date</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">←</kbd> <kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">→</kbd></td>
              <td class="py-2">Navigate by day in calendar</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">↑</kbd> <kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Navigate by week in calendar</td>
            </tr>
            <tr>
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="py-2">Select focused date</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>
  `,
})
export class DatepickerOverview {
  protected readonly selectedDate = signal<Date | null>(null);

  protected readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComDatepicker, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  selector: 'app-example',
  imports: [ComDatepicker, FormsModule],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-datepicker
      [(ngModel)]="selectedDate"
      placeholder="Select a date..."
      [showClearButton]="true"
    />
  \`,
})
export class Example {
  selectedDate = signal<Date | null>(null);
}`;

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
