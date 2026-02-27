// Public API for the dropdown component

// Main component
export { ComDropdown } from './dropdown.component';

// Supporting components
export { ComDropdownOption } from './dropdown-option.component';
export { ComDropdownPanel } from './dropdown-panel.component';
export { ComDropdownSearch } from './dropdown-search.component';
export { ComDropdownTag } from './dropdown-tag.component';
export { ComDropdownGroup } from './dropdown-group.component';

// Template directives
export { ComDropdownOptionTpl } from './directives/dropdown-option-tpl.directive';
export { ComDropdownSelectedTpl } from './directives/dropdown-selected-tpl.directive';
export { ComDropdownEmptyTpl } from './directives/dropdown-empty-tpl.directive';
export { ComDropdownGroupTpl } from './directives/dropdown-group-tpl.directive';
export { ComDropdownTagTpl } from './directives/dropdown-tag-tpl.directive';

// Models and types
export type {
  ComDropdownOptionContext,
  ComDropdownSelectedContext,
  ComDropdownEmptyContext,
  ComDropdownGroupContext,
  ComDropdownTagContext,
  ComDropdownGroup as ComDropdownGroupData,
  ComDropdownProcessedOption,
  ComDropdownPosition,
  ComDropdownPanelWidth,
  ComDropdownVariant,
  ComDropdownSize,
  ComDropdownState,
} from './dropdown.models';

export {
  defaultCompareWith,
  defaultDisplayWith,
  defaultFilterWith,
  generateDropdownId,
} from './dropdown.models';

// Variants (for advanced customization)
export {
  dropdownTriggerVariants,
  dropdownPanelVariants,
  dropdownOptionVariants,
  dropdownSearchVariants,
  dropdownTagVariants,
  dropdownTagRemoveVariants,
  dropdownGroupVariants,
  dropdownEmptyVariants,
  dropdownClearVariants,
  dropdownChevronVariants,
} from './dropdown.variants';

export type {
  DropdownVariant,
  DropdownSize,
  DropdownState,
  DropdownTriggerVariants,
  DropdownPanelVariants,
  DropdownOptionVariants,
  DropdownSearchVariants,
  DropdownTagVariants,
  DropdownTagRemoveVariants,
  DropdownGroupVariants,
  DropdownEmptyVariants,
  DropdownClearVariants,
  DropdownChevronVariants,
} from './dropdown.variants';
