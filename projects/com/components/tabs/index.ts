// Public API for the tabs component

// Types
export type { TabChangeEvent } from './tab-group.component';

// Variants (for advanced customization)
export {
  tabItemVariants,
  tabHeaderVariants,
  tabScrollButtonVariants,
  tabCloseButtonVariants,
  tabPanelVariants,
} from './tabs.variants';
export type {
  TabVariant,
  TabSize,
  TabColor,
  TabAlignment,
  TabItemVariants,
  TabHeaderVariants,
  TabScrollButtonVariants,
  TabCloseButtonVariants,
  TabPanelVariants,
} from './tabs.variants';

// Template directives
export { TabLabelDirective } from './tab-label.directive';
export { TabContentDirective } from './tab-content.directive';

// Main components
export { TabGroupComponent } from './tab-group.component';
export { TabComponent } from './tab.component';
export { TabNavBarComponent } from './tab-nav-bar.component';
export { TabLinkDirective } from './tab-link.directive';
