import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Reusable tab navigation component for component documentation pages.
 * Displays Overview, Examples, and API tabs with routerLinkActive for active state.
 */
@Component({
  selector: 'int-component-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="mb-8 border-b border-surface-200" [attr.aria-label]="componentName() + ' documentation tabs'">
      <ul class="flex gap-6">
        <li>
          <a
            routerLink="overview"
            routerLinkActive="border-primary-500 text-primary-600"
            [routerLinkActiveOptions]="{ exact: true }"
            class="inline-block border-b-2 border-transparent py-3 text-sm font-medium text-surface-600 transition hover:text-surface-900"
          >
            Overview
          </a>
        </li>
        <li>
          <a
            routerLink="examples"
            routerLinkActive="border-primary-500 text-primary-600"
            class="inline-block border-b-2 border-transparent py-3 text-sm font-medium text-surface-600 transition hover:text-surface-900"
          >
            Examples
          </a>
        </li>
        <li>
          <a
            routerLink="api"
            routerLinkActive="border-primary-500 text-primary-600"
            class="inline-block border-b-2 border-transparent py-3 text-sm font-medium text-surface-600 transition hover:text-surface-900"
          >
            API
          </a>
        </li>
      </ul>
    </nav>
  `,
})
export class ComponentTabs {
  /** Component name for aria-label */
  readonly componentName = input.required<string>();
}
