import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-checkbox-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Checkbox</h1>
      <p class="mb-8 text-lg text-surface-600">
        A production-grade checkbox component with full accessibility support, reactive forms integration,
        and indeterminate state.
      </p>

      <int-component-tabs componentName="Checkbox" />

      <router-outlet />
    </div>
  `,
})
export class CheckboxPage {}
