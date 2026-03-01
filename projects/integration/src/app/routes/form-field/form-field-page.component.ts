import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-form-field-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Form Field</h1>
      <p class="mb-8 text-lg text-surface-600">
        A visual wrapper for form inputs providing floating labels, hints, errors, and prefix/suffix slots
        with automatic ARIA wiring.
      </p>

      <int-component-tabs componentName="Form Field" />

      <router-outlet />
    </div>
  `,
})
export class FormFieldPage {}
