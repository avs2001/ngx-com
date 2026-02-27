import { InjectionToken, type TemplateRef } from '@angular/core';

/** Context for custom option template */
export interface ComSelectOptionContext<T> {
  $implicit: T;
  label: string;
  selected: boolean;
  active: boolean;
}

/** Context for custom value display template */
export interface ComSelectValueContext<T> {
  $implicit: T | null;
  placeholder: string;
}

/** Token for option template directive */
export const COM_SELECT_OPTION_TPL: InjectionToken<TemplateRef<ComSelectOptionContext<unknown>>> =
  new InjectionToken<TemplateRef<ComSelectOptionContext<unknown>>>('COM_SELECT_OPTION_TPL');

/** Token for value display template directive */
export const COM_SELECT_VALUE_TPL: InjectionToken<TemplateRef<ComSelectValueContext<unknown>>> =
  new InjectionToken<TemplateRef<ComSelectValueContext<unknown>>>('COM_SELECT_VALUE_TPL');
