/**
 * ngx-com/components/select
 * Select component public API
 */

// Types
export type { ComSelectSize, CompareFn, DisplayFn, SearchPredicateFn } from './select.types';
export { DEFAULT_SEARCH_DEBOUNCE } from './select.types';

// Template directives
export {
  ComSelectOptionTpl,
  ComSelectValueTpl,
  ComSelectPanelHeaderTpl,
  ComSelectPanelFooterTpl,
  ComSelectNoResultsTpl,
  ComSelectLoadingTpl,
} from './select.tokens';
export type {
  ComSelectOptionContext,
  ComSelectValueContext,
  ComSelectPanelHeaderContext,
  ComSelectPanelFooterContext,
  ComSelectNoResultsContext,
  ComSelectLoadingContext,
} from './select.tokens';

// Variants
export { triggerVariants, optionVariants, dialogVariants } from './select.variants';
export type { TriggerVariants, OptionVariants, DialogVariants } from './select.variants';

// Components
export { ComSelectOption } from './select-option';
export { ComSelect } from './select';
