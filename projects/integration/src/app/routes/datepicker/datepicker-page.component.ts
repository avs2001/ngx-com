import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentTabs } from '../../shared/component-tabs';

@Component({
  selector: 'int-datepicker-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ComponentTabs],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Datepicker</h1>
      <p class="mb-8 text-lg text-surface-600">
        Form-integrated date input with calendar popup, supporting single and range selection with full accessibility.
      </p>

      <int-component-tabs componentName="Datepicker" />

      <router-outlet />
    </div>
  `,
})
export class DatepickerPage {}
