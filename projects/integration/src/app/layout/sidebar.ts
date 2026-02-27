import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
  expanded?: boolean;
}

@Component({
  selector: 'int-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="flex h-full w-64 flex-col border-r border-surface-200 bg-surface-50">
      <!-- Logo -->
      <div class="flex h-16 items-center gap-2 border-b border-surface-200 px-4">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
          <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span class="text-lg font-semibold text-surface-900">ngx-com</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-4">
        @for (section of navigation; track section.title) {
          <div class="mb-6">
            <h3 class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
              {{ section.title }}
            </h3>
            <ul class="space-y-1">
              @for (item of section.items; track item.path) {
                @if (item.children) {
                  <li>
                    <button
                      type="button"
                      class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-surface-700 transition hover:bg-surface-100"
                      [class.bg-surface-100]="isExpanded(item.path)"
                      (click)="toggleExpand(item.path)"
                    >
                      <span>{{ item.label }}</span>
                      <svg
                        class="h-4 w-4 transition-transform"
                        [class.rotate-90]="isExpanded(item.path)"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M9 6l6 6-6 6"/>
                      </svg>
                    </button>
                    @if (isExpanded(item.path)) {
                      <ul class="ml-4 mt-1 space-y-1 border-l border-surface-200 pl-3">
                        @for (child of item.children; track child.path) {
                          <li>
                            <a
                              [routerLink]="child.path"
                              routerLinkActive="bg-primary-100 text-primary-700 font-medium"
                              class="block rounded-lg px-3 py-1.5 text-sm text-surface-600 transition hover:bg-surface-100 hover:text-surface-900"
                            >
                              {{ child.label }}
                            </a>
                          </li>
                        }
                      </ul>
                    }
                  </li>
                } @else {
                  <li>
                    <a
                      [routerLink]="item.path"
                      routerLinkActive="bg-primary-100 text-primary-700 font-medium"
                      [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                      class="block rounded-lg px-3 py-2 text-sm text-surface-700 transition hover:bg-surface-100"
                    >
                      {{ item.label }}
                    </a>
                  </li>
                }
              }
            </ul>
          </div>
        }
      </nav>

      <!-- Footer -->
      <div class="border-t border-surface-200 p-4">
        <a
          href="https://github.com/avs2001/ngx-com"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-sm text-surface-600 transition hover:text-surface-900"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </aside>
  `,
  host: {
    class: 'block',
  },
})
export class Sidebar {
  private readonly router = inject(Router);
  private readonly expandedSections = signal<Set<string>>(new Set(['components']));

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
  );

  protected readonly navigation: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Overview', path: '/' },
        { label: 'Installation', path: '/getting-started/installation' },
        { label: 'Theming', path: '/getting-started/theming' },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          label: 'Calendar',
          path: 'components',
          children: [
            { label: 'Overview', path: '/components/calendar' },
            { label: 'Examples', path: '/components/calendar/examples' },
            { label: 'API', path: '/components/calendar/api' },
          ],
        },
      ],
    },
  ];

  protected isExpanded(path: string): boolean {
    return this.expandedSections().has(path);
  }

  protected toggleExpand(path: string): void {
    const current = this.expandedSections();
    const newSet = new Set(current);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    this.expandedSections.set(newSet);
  }
}
