import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar';
import { Header } from './header';

@Component({
  selector: 'int-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Sidebar, Header],
  template: `
    <div class="flex h-dvh">
      <!-- Sidebar (desktop) -->
      <div class="hidden lg:block">
        <int-sidebar />
      </div>

      <!-- Mobile sidebar overlay -->
      @if (mobileMenuOpen()) {
        <div
          class="fixed inset-0 z-40 bg-surface-900/50 lg:hidden"
          (click)="mobileMenuOpen.set(false)"
        ></div>
        <div class="fixed inset-y-0 left-0 z-50 lg:hidden">
          <int-sidebar />
        </div>
      }

      <!-- Main content -->
      <div class="flex flex-1 flex-col overflow-hidden">
        <int-header (menuToggle)="mobileMenuOpen.set(!mobileMenuOpen())" />

        <main class="flex-1 overflow-y-auto bg-surface-50">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
})
export class Shell {
  protected readonly mobileMenuOpen = signal(false);
}
