/**
 * ngx-com/components/select
 * Select component public API
 */

// Types
export type { ComSelectSize, CompareFn, DisplayFn, SearchPredicateFn } from './select.types';
export { DEFAULT_SEARCH_DEBOUNCE } from './select.types';

// Tokens
export {
  COM_SELECT_OPTION_TPL,
  COM_SELECT_VALUE_TPL,
} from './select.tokens';
export type { ComSelectOptionContext, ComSelectValueContext } from './select.tokens';

// Variants
export { triggerVariants, optionVariants, dialogVariants } from './select.variants';
export type { TriggerVariants, OptionVariants, DialogVariants } from './select.variants';

// Components
export { ComSelectOption } from './select-option';
export { ComSelect } from './select';
