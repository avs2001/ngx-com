import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabNavBarComponent, TabLinkDirective } from 'ngx-com/components/tabs';
import { ComItem } from 'ngx-com/components/item';

@Component({
  selector: 'int-avatar-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TabNavBarComponent, TabLinkDirective, ComItem],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <com-item
        title="Avatar"
        description="Displays a user's profile image, initials, or a fallback icon with support for grouping and customization."
        icon="user"
        size="lg"
        class="mb-8"
      />

      <nav com-tab-nav-bar class="mb-8" aria-label="Avatar documentation tabs">
        <a comTabLink routerLink="overview" routerLinkActive>Overview</a>
        <a comTabLink routerLink="examples" routerLinkActive>Examples</a>
        <a comTabLink routerLink="api" routerLinkActive>API</a>
      </nav>

      <router-outlet />
    </div>
  `,
})
export class AvatarPage {}
