import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-popover-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Popover</h1>
      <p class="mb-8 text-lg text-surface-600">
        A floating panel that appears on click or focus, anchored to a trigger element with smart
        positioning and optional arrow.
      </p>

      <int-component-tabs componentName="Popover" />

      <router-outlet />
    </div>
  `,
})
export class PopoverPage {}
