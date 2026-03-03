// Public API for the confirm directive

// Main directive
export { ComConfirm } from './confirm.directive';

// Types and interfaces
export type { ConfirmTemplateContext, ConfirmColor } from './confirm.models';

// Variants (for advanced customization)
export {
  confirmPanelVariants,
  confirmBackdropVariants,
  confirmTitleVariants,
  confirmMessageVariants,
  confirmFooterVariants,
} from './confirm.variants';
