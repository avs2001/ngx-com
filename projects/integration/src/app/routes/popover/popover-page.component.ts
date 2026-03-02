import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabNavBarComponent, TabLinkDirective } from 'ngx-com/components/tabs';
import { ComItem } from 'ngx-com/components/item';

@Component({
  selector: 'int-popover-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TabNavBarComponent, TabLinkDirective, ComItem],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <com-item
        title="Popover"
        description="A floating panel that appears on click or focus, anchored to a trigger element with smart positioning and optional arrow."
        icon="message-square"
        size="lg"
        class="mb-8"
      />

      <nav com-tab-nav-bar class="mb-8" aria-label="Popover documentation tabs">
        <a comTabLink routerLink="overview" routerLinkActive>Overview</a>
        <a comTabLink routerLink="examples" routerLinkActive>Examples</a>
        <a comTabLink routerLink="api" routerLinkActive>API</a>
      </nav>

      <router-outlet />
    </div>
  `,
})
export class PopoverPage {}
