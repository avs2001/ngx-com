// Public API for the card component system

// Main component
export { UiCard } from './card.component';

// Directives
export { UiCardHeader } from './card-header.directive';
export { UiCardTitle } from './card-title.directive';
export { UiCardSubtitle } from './card-subtitle.directive';
export { UiCardContent } from './card-content.directive';
export { UiCardFooter } from './card-footer.directive';
export { UiCardActions } from './card-actions.directive';
export { UiCardMedia } from './card-media.directive';
export { UiCardDivider } from './card-divider.directive';
export { UiCardAccent } from './card-accent.directive';
export { UiCardBadge } from './card-badge.directive';

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
