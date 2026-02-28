import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-collapsible-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Collapsible</h1>
      <p class="mb-8 text-lg text-surface-600">
        An accessible expand/collapse container with smooth CSS animations and flexible customization.
      </p>

      <int-component-tabs componentName="Collapsible" />

      <router-outlet />
    </div>
  `,
})
export class CollapsiblePage {}
