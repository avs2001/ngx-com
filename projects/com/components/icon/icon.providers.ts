import { inject, InjectionToken } from '@angular/core';
import type { Provider } from '@angular/core';
import type { LucideIcons } from 'lucide-angular';
import { ComIconRegistry } from './icon.registry';

/**
 * Token injected by `ComIcon` to trigger icon registration factories.
 *
 * Each `provideComIcons()` call adds a `multi` provider whose factory
 * registers icons into the singleton `ComIconRegistry`. The token itself
 * is never read — its purpose is to force Angular's DI to run the factories.
 */
export const COM_ICON_REGISTRAR = new InjectionToken<void[]>('ComIconRegistrar');

/**
 * Provides Lucide icons for use with `com-icon`.
 *
 * Works at **all** injector levels: app root, lazy route, and component.
 * Icons are merged into the root-level `ComIconRegistry`, so multiple calls
 * accumulate rather than shadow.
 *
 * @example Root-level (app.config.ts)
 * ```ts
 * import { provideComIcons } from 'ngx-com/components/icon';
 * import { ChevronRight, Star, Check, AlertTriangle } from 'lucide-angular';
 *
 * export const appConfig = {
 *   providers: [
 *     provideComIcons({ ChevronRight, Star, Check, AlertTriangle })
 *   ]
 * };
 * ```
 *
 * @example Lazy route adds more icons without losing root icons
 * ```ts
 * // feature.routes.ts
 * export const routes: Routes = [{
 *   path: '',
 *   providers: [provideComIcons({ Settings, User })],
 *   component: FeatureComponent,
 * }];
 * ```
 *
 * @example Component-level registration for tree-shaking
 * ```ts
 * @Component({
 *   providers: [provideComIcons({ Trash2, Edit })],
 * })
 * ```
 */
export function provideComIcons(icons: LucideIcons): Provider {
  return {
    provide: COM_ICON_REGISTRAR,
    multi: true,
    useFactory: () => inject(ComIconRegistry).register(icons),
  };
}
