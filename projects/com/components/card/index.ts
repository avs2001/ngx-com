// Public API for the card component system

// Main component
export { ComCard } from './card.component';

// Directives
export { ComCardHeader } from './card-header.directive';
export { ComCardTitle } from './card-title.directive';
export { ComCardSubtitle } from './card-subtitle.directive';
export { ComCardContent } from './card-content.directive';
export { ComCardFooter } from './card-footer.directive';
export { ComCardActions } from './card-actions.directive';
export { ComCardMedia } from './card-media.directive';
export { ComCardDivider } from './card-divider.directive';
export { ComCardAccent } from './card-accent.directive';
export { ComCardBadge } from './card-badge.directive';

// Variants (for advanced customization)
export {
  cardVariants,
  cardFooterVariants,
  cardActionsVariants,
  cardMediaVariants,
  cardAccentVariants,
  cardBadgeVariants,
} from './card.variants';

export type {
  CardVariant,
  CardPadding,
  CardRadius,
  CardAlign,
  CardActionsDirection,
  CardMediaPosition,
  CardAccentColor,
  CardAccentPosition,
  CardBadgeColor,
  CardBadgePosition,
  CardVariants,
  CardFooterVariants,
  CardActionsVariants,
  CardMediaVariants,
  CardAccentVariants,
  CardBadgeVariants,
} from './card.variants';
