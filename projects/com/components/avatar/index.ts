// Public API for the avatar component

// Main component
export { ComAvatar } from './avatar.component';

// Directives
export { ComAvatarCustom } from './avatar-custom.directive';
export type { AvatarTemplateContext } from './avatar-custom.directive';

export { ComAvatarGroup } from './avatar-group.directive';

// Variants and utilities (public API only)
export { avatarVariants, avatarColorVariants, getInitials } from './avatar.variants';

export type {
  AvatarSize,
  AvatarColor,
  AvatarShape,
  AvatarVariant,
  ResolvedAvatarColor,
} from './avatar.variants';
