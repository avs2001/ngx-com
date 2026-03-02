// Public API for the item component

// Main component
export { ComItem } from './item.component';

// Directives
export {
  ComItemLeading,
  ComItemTitle,
  ComItemSuffix,
  ComItemDescription,
  ComItemTrailing,
} from './item.directives';

// Variants and utilities
export {
  itemVariants,
  ITEM_TITLE_CLASSES,
  ITEM_DESCRIPTION_CLASSES,
  ITEM_AVATAR_SIZES,
  ITEM_ICON_SIZES,
} from './item.variants';

export type {
  ItemSize,
  ItemDensity,
  ItemVariants,
} from './item.variants';
