import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'int-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <!-- Hero -->
      <div class="mb-16 text-center">
        <h1 class="mb-4 text-5xl font-bold text-surface-900">ngx-com</h1>
        <p class="mx-auto max-w-2xl text-xl text-surface-600">
          A modern Angular component library built with signals, Tailwind CSS, and accessibility-first design.
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <a
            routerLink="/getting-started/installation"
            class="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition hover:bg-primary-600"
          >
            Get Started
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            routerLink="/components/calendar"
            class="inline-flex items-center gap-2 rounded-lg border border-surface-300 bg-white px-6 py-3 font-medium text-surface-700 transition hover:bg-surface-50"
          >
            Browse Components
          </a>
        </div>
      </div>

      <!-- Features -->
      <div class="mb-16 grid gap-8 md:grid-cols-3">
        <div class="rounded-xl border border-surface-200 bg-white p-6">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <svg class="h-6 w-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-surface-900">Signal-Based</h3>
          <p class="text-surface-600">
            Built with Angular's latest signal primitives for reactive, performant state management.
          </p>
        </div>

        <div class="rounded-xl border border-surface-200 bg-white p-6">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
            <svg class="h-6 w-6 text-accent-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-surface-900">Accessible</h3>
          <p class="text-surface-600">
            WCAG AA compliant with full keyboard navigation and screen reader support.
          </p>
        </div>

        <div class="rounded-xl border border-surface-200 bg-white p-6">
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-warn-100">
            <svg class="h-6 w-6 text-warn-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 3v18M3 12h18"/>
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-surface-900">Composable</h3>
          <p class="text-surface-600">
            Flexible architecture with dependency injection for custom behaviors and adapters.
          </p>
        </div>
      </div>

      <!-- Components Preview -->
      <div>
        <h2 class="mb-6 text-2xl font-semibold text-surface-900">Components</h2>
        <div class="grid gap-4">
          <a
            routerLink="/components/calendar"
            class="group flex items-center gap-4 rounded-xl border border-surface-200 bg-white p-6 transition hover:border-primary-300 hover:shadow-md"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-100 transition group-hover:bg-primary-200">
              <svg class="h-7 w-7 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-surface-900">Calendar</h3>
              <p class="text-surface-600">
                Full-featured calendar with multiple views, selection strategies, and date constraints.
              </p>
            </div>
            <svg class="h-5 w-5 text-surface-400 transition group-hover:translate-x-1 group-hover:text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
})
export class Home {}
