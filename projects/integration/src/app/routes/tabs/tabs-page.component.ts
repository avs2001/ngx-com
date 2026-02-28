import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-tabs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Tabs</h1>
      <p class="mb-8 text-lg text-surface-600">
        A composable tab system for organizing content into switchable panels with full
        accessibility support and lazy loading.
      </p>

      <int-component-tabs componentName="Tabs" />

      <router-outlet />
    </div>
  `,
})
export class TabsPage {}
