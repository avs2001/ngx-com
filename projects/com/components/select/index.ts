/**
 * ngx-com/components/select
 * Select component public API
 */

// Types
export type {
  SelectOptionState,
  SelectTriggerState,
  SelectSize,
  SelectVariant,
  CompareFn,
  RegisteredOption,
} from './select.types';

export { defaultCompareFn } from './select.types';

// Tokens
export { SELECT_PARENT } from './select.tokens';
export type { SelectParent } from './select.tokens';

// Variants
export { selectTriggerVariants, selectPanelVariants, selectOptionVariants } from './select.variants';
export type {
  SelectTriggerVariants,
  SelectPanelVariants,
  SelectOptionVariants,
} from './select.variants';

// Components
export { ComSelect } from './select';
export { ComSelectOption } from './select-option';
