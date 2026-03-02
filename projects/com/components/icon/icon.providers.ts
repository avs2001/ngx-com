import type { Provider } from '@angular/core';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import type { LucideIcons } from 'lucide-angular';

/**
 * Provides Lucide icons for use with `com-icon`.
 *
 * Register icons in your application config to use them by name:
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { provideComIcons } from 'ngx-com/components/icon';
 * import { ChevronRight, Star, Check, AlertTriangle } from 'lucide-angular';
 *
 * export const appConfig = {
 *   providers: [
 *     provideComIcons({ ChevronRight, Star, Check, AlertTriangle })
 *   ]
 * };
 * ```
 */
export function provideComIcons(icons: LucideIcons): Provider {
  return { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) };
}
