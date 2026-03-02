import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComCalendar, provideNativeDateAdapter } from 'ngx-com/components/calendar';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-calendar-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCalendar, ComCard, ComItem, CodeBlock],
  providers: [provideNativeDateAdapter()],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Interactive calendar with date selection"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-col items-center gap-6">
          <com-calendar
            [selected]="selectedDate()"
            (selectedChange)="onDateSelected($event)"
          />
          @if (selectedDate()) {
            <p class="text-muted-foreground">
              Selected: <span class="font-medium text-foreground">{{ formatDate(selectedDate()!) }}</span>
            </p>
          }
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
        description="What makes com-calendar powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Multiple Views"
            description="Month, year, and multi-year views with smooth transitions and keyboard navigation"
            icon="layout"
          />
          <com-item
            title="Selection Strategies"
            description="Built-in single, range, multi-select, and week selection modes via dependency injection"
            icon="check-square"
            iconColor="accent"
          />
          <com-item
            title="Date Constraints"
            description="Min/max dates, custom filter functions, and disabled date styling"
            icon="shield"
          />
          <com-item
            title="Accessibility"
            description="WCAG AA compliant with keyboard navigation, ARIA labels, and live announcements"
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
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">←</kbd> <kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">→</kbd></td>
              <td class="py-2">Move by day</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">↑</kbd> <kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Move by week</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Home</kbd></td>
              <td class="py-2">First day of month</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">End</kbd></td>
              <td class="py-2">Last day of month</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Page Up</kbd></td>
              <td class="py-2">Previous month</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Page Down</kbd></td>
              <td class="py-2">Next month</td>
            </tr>
            <tr>
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Enter</kbd> <kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="py-2">Select focused date</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>
  `,
})
export class CalendarOverview {
  protected readonly selectedDate = signal<Date | null>(null);

  protected readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { ComCalendar, provideNativeDateAdapter } from 'ngx-com/components/calendar';

@Component({
  selector: 'app-example',
  imports: [ComCalendar],
  providers: [provideNativeDateAdapter()],
  template: \`
    <com-calendar
      [selected]="selectedDate()"
      (selectedChange)="selectedDate.set($event)"
    />
  \`,
})
export class Example {
  selectedDate = signal<Date | null>(null);
}`;

  protected onDateSelected(date: Date): void {
    this.selectedDate.set(date);
  }

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
