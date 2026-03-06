import { Injectable } from '@angular/core';
import type { LucideIconData, LucideIcons } from 'lucide-angular';

/**
 * Singleton registry for Lucide icons used by `com-icon`.
 *
 * Unlike lucide-angular's `LUCIDE_ICONS` token (which gets shadowed by child injectors),
 * this registry lives at root and merges all icons registered via `provideComIcons()`.
 */
@Injectable({ providedIn: 'root' })
export class ComIconRegistry {
  private readonly icons: LucideIcons = {};

  /** Merges the given icons into the registry. */
  register(icons: LucideIcons): void {
    Object.assign(this.icons, icons);
  }

  /** Returns the icon data for the given PascalCase name, or `null` if not registered. */
  get(name: string): LucideIconData | null {
    return (this.icons[name] as LucideIconData) ?? null;
  }
}
