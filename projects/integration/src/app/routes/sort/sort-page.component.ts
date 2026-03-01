import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-sort-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Sort</h1>
      <p class="mb-8 text-lg text-surface-600">
        A directive system for sortable columns in tables, lists, or any container with clickable
        headers. Supports three-state cycling, customizable sort order, and full accessibility.
      </p>

      <int-component-tabs componentName="Sort" />

      <router-outlet />
    </div>
  `,
})
export class SortPage {}
