import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ThemeService, THEME_OPTIONS } from './theme.service';
import type { Theme } from './theme.service';

@Component({
  selector: 'int-theme-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      #trigger
      type="button"
      class="flex items-center gap-2 rounded-lg bg-surface-100 px-3 py-2 text-sm font-medium text-surface-700 transition hover:bg-surface-200"
      [attr.aria-expanded]="isOpen()"
      aria-haspopup="listbox"
      aria-label="Select theme"
      (click)="toggle()"
    >
      @switch (currentTheme()) {
        @case ('light') {
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        }
        @case ('dark') {
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        }
        @case ('forest') {
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L7 9h10L12 2zM5 16l7-7 7 7H5zM7 16v6M17 16v6M12 16v6"/>
          </svg>
        }
        @case ('ocean') {
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
          </svg>
        }
        @case ('candy') {
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="6"/>
            <path d="M12 14v8"/>
            <path d="M8 5c1-1 3-1 4 0s3 1 4 0"/>
            <path d="M8 8c1 1 3 1 4 0s3-1 4 0"/>
          </svg>
        }
      }
      <span class="hidden sm:inline">{{ currentOptionName() }}</span>
      <svg class="h-4 w-4 transition-transform" [class.rotate-180]="isOpen()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>

    @if (isOpen()) {
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-40"
        aria-hidden="true"
        (click)="close()"
      ></div>

      <!-- Dropdown menu - fixed positioned -->
      <div
        class="fixed z-50 w-36 animate-scale-in rounded-lg border border-surface-200 bg-surface-50 shadow-lg"
        [style.top.px]="dropdownPosition().top"
        [style.left.px]="dropdownPosition().left"
        role="listbox"
        aria-label="Theme options"
      >
        @for (option of options; track option.id) {
          <button
            type="button"
            role="option"
            [attr.aria-selected]="option.id === currentTheme()"
            class="flex w-full items-center gap-3 px-3 py-2 text-sm text-surface-700 transition first:rounded-t-lg last:rounded-b-lg hover:bg-surface-100"
            [class.bg-primary-100]="option.id === currentTheme()"
            [class.text-primary-700]="option.id === currentTheme()"
            (click)="selectTheme(option.id)"
          >
            @switch (option.id) {
              @case ('light') {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              }
              @case ('dark') {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              }
              @case ('forest') {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L7 9h10L12 2zM5 16l7-7 7 7H5zM7 16v6M17 16v6M12 16v6"/>
                </svg>
              }
              @case ('ocean') {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                  <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                  <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                </svg>
              }
              @case ('candy') {
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M12 14v8"/>
                  <path d="M8 5c1-1 3-1 4 0s3 1 4 0"/>
                  <path d="M8 8c1 1 3 1 4 0s3-1 4 0"/>
                </svg>
              }
            }
            {{ option.name }}
            @if (option.id === currentTheme()) {
              <svg class="ml-auto h-4 w-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            }
          </button>
        }
      </div>
    }
  `,
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class ThemeSwitcher {
  private readonly themeService = inject(ThemeService);
  private readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');

  readonly options = THEME_OPTIONS;
  readonly isOpen = signal(false);
  readonly currentTheme = this.themeService.theme;
  readonly currentOptionName = computed(() => {
    const option = this.options.find(o => o.id === this.currentTheme());
    return option?.name ?? 'Light';
  });

  readonly dropdownPosition = computed(() => {
    if (!this.isOpen()) {
      return { top: 0, left: 0 };
    }
    const trigger = this.triggerRef().nativeElement;
    const rect = trigger.getBoundingClientRect();
    const dropdownWidth = 144; // w-36 = 9rem = 144px
    return {
      top: rect.bottom + 8, // mt-2 = 0.5rem = 8px
      left: rect.right - dropdownWidth, // align right edge
    };
  });

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.close();
  }
}
