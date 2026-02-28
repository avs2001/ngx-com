import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-dropdown-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Dropdown</h1>
      <p class="mb-8 text-lg text-surface-600">
        A flexible, accessible dropdown/select component with search, multi-select, grouping, and custom templates.
      </p>

      <int-component-tabs componentName="Dropdown" />

      <router-outlet />
    </div>
  `,
})
export class DropdownPage {}
