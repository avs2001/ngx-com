import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'forest';

export interface ThemeOption {
  id: Theme;
  name: string;
  icon: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'light', name: 'Light', icon: 'sun' },
  { id: 'dark', name: 'Dark', icon: 'moon' },
  { id: 'forest', name: 'Forest', icon: 'tree' },
];

const STORAGE_KEY = 'ngx-com-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly options = THEME_OPTIONS;

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.applyTheme(theme);
      this.persistTheme(theme);
    });
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && this.isValidTheme(stored)) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  private isValidTheme(value: string): value is Theme {
    return ['light', 'dark', 'forest'].includes(value);
  }

  private applyTheme(theme: Theme): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }

  private persistTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }
}
