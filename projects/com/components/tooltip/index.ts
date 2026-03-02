// Public API for the tooltip directive

// Main directive
export { ComTooltip } from './tooltip.directive';

// Types and interfaces
export type {
  TooltipPosition,
  TooltipColor,
  TooltipSize,
  TooltipTouchGestures,
  TooltipTemplateContext,
} from './tooltip.models';

// Variants (for advanced customization)
export { tooltipPanelVariants, tooltipArrowVariants } from './tooltip.variants';
