import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders } from '@angular/core';
import type { EnvironmentProviders } from '@angular/core';
import type { LucideIcons } from 'lucide-angular';
import { ComIconRegistry } from './icon.registry';

/**
 * Provides Lucide icons for use with `com-icon`.
 *
 * Icons are merged into a root-level registry, so multiple calls
 * (e.g. at root and in lazy routes) accumulate rather than shadow.
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
 */
export function provideComIcons(icons: LucideIcons): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => inject(ComIconRegistry).register(icons),
    },
  ]);
}
