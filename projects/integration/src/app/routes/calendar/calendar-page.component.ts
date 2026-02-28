import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-calendar-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Calendar</h1>
      <p class="mb-8 text-lg text-surface-600">
        A full-featured, accessible calendar component with multiple views, selection strategies, and date constraints.
      </p>

      <int-component-tabs componentName="Calendar" />

      <router-outlet />
    </div>
  `,
})
export class CalendarPage {}
