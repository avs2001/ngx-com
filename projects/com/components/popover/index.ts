// Public API for the popover component

// Main directive
export { PopoverTriggerDirective } from './popover-trigger.directive';

// Supporting directives
export { PopoverCloseDirective } from './popover-close.directive';
export { PopoverTemplateDirective } from './popover-template.directive';

// Injection tokens and types
export { POPOVER_DATA, POPOVER_REF, type PopoverRef } from './popover-tokens';

// Position utilities
export { buildPopoverPositions, deriveSideFromPosition, deriveAlignmentFromPosition } from './popover-positions';

// Variants and types
export {
  popoverArrowVariants,
  popoverPanelVariants,
  type PopoverAlignment,
  type PopoverArrowVariants,
  type PopoverBackdrop,
  type PopoverPanelVariants,
  type PopoverPosition,
  type PopoverSide,
  type PopoverTriggerOn,
  type PopoverVariant,
} from './popover.variants';
