import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabNavBarComponent, TabLinkDirective } from 'ngx-com/components/tabs';

@Component({
  selector: 'int-tabs-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TabNavBarComponent, TabLinkDirective],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Tabs</h1>
      <p class="mb-8 text-lg text-surface-600">
        A composable tab system for organizing content into switchable panels with full
        accessibility support and lazy loading.
      </p>

      <nav com-tab-nav-bar class="mb-8" aria-label="Tabs documentation tabs">
        <a comTabLink routerLink="overview" routerLinkActive>Overview</a>
        <a comTabLink routerLink="examples" routerLinkActive>Examples</a>
        <a comTabLink routerLink="api" routerLinkActive>API</a>
      </nav>

      <router-outlet />
    </div>
  `,
})
export class TabsPage {}
