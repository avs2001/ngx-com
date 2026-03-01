import { InjectionToken } from '@angular/core';
import type {
  FormFieldAppearance,
  FormFieldColor,
  FormFieldFloatLabel,
  FormFieldSubscriptSizing,
} from './form-field.variants';

// Re-export types for convenience
export type { FormFieldAppearance, FormFieldColor, FormFieldFloatLabel, FormFieldSubscriptSizing };

/**
 * Global configuration defaults for form fields.
 *
 * @example Set defaults in app config
 * ```ts
 * providers: [
 *   {
 *     provide: FORM_FIELD_DEFAULTS,
 *     useValue: {
 *       appearance: 'fill',
 *       floatLabel: 'always',
 *       color: 'primary',
 *     }
 *   }
 * ]
 * ```
 */
export interface FormFieldDefaults {
  appearance?: FormFieldAppearance;
  color?: FormFieldColor;
  floatLabel?: FormFieldFloatLabel;
  hideRequiredMarker?: boolean;
  subscriptSizing?: FormFieldSubscriptSizing;
}

export const FORM_FIELD_DEFAULTS: InjectionToken<FormFieldDefaults> = new InjectionToken<FormFieldDefaults>(
  'FORM_FIELD_DEFAULTS',
  {
    providedIn: 'root',
    factory: (): FormFieldDefaults => ({}),
  }
);
