// Public API for the collapsible component

// Types
export type {
  ComCollapsibleTriggerContext,
  ComCollapsibleContentContext,
  ComCollapsibleIconContext,
} from './collapsible.models';

// Variants
export { collapsibleVariants } from './collapsible.variants';
export type { CollapsibleVariant, CollapsibleVariants } from './collapsible.variants';

export { collapsibleTriggerVariants } from './collapsible-trigger.variants';
export type {
  CollapsibleTriggerVariant,
  CollapsibleTriggerSize,
  CollapsibleTriggerVariants,
} from './collapsible-trigger.variants';

// Template directives
export { ComCollapsibleTriggerTpl } from './directives/collapsible-trigger-tpl.directive';
export { ComCollapsibleContentTpl } from './directives/collapsible-content-tpl.directive';
export { ComCollapsibleIconTpl } from './directives/collapsible-icon-tpl.directive';
export { ComCollapsibleLazy } from './directives/collapsible-lazy.directive';

// Main components
export { ComCollapsible } from './collapsible.directive';
export { ComCollapsibleTrigger } from './collapsible-trigger.component';
export { ComCollapsibleContent } from './collapsible-content.component';
