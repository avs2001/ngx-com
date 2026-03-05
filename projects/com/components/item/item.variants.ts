import { cva, type VariantProps } from 'class-variance-authority';
import type { AvatarSize } from 'ngx-com/components/avatar';
import type { IconSize } from 'ngx-com/components/icon';

/** Item size variants. */
export type ItemSize = 'sm' | 'md' | 'lg';

/** Item density variants. */
export type ItemDensity = 'compact' | 'default' | 'comfortable';

/**
 * CVA variants for the item container (host element).
 *
 * @tokens `--color-primary-subtle`, `--color-muted`, `--color-muted-hover`, `--color-ring`, `--color-disabled-foreground`
 */
export const itemVariants: (props?: {
  size?: ItemSize;
  density?: ItemDensity;
  interactive?: boolean;
  active?: boolean;
  disabled?: boolean;
}) => string = cva(['com-item', 'flex w-full items-center'], {
  variants: {
    size: {
      sm: 'gap-2.5',
      md: 'gap-3',
      lg: 'gap-3.5',
    },
    density: {
      compact: 'py-1.5',
      default: 'py-2.5',
      comfortable: 'py-4',
    },
    interactive: {
      true: [
        'cursor-pointer',
        'rounded-lg',
        'px-3',
        'hover:bg-muted-hover',
        'active:bg-muted',
        'transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      ],
      false: 'cursor-default',
    },
    active: {
      true: 'bg-primary-subtle',
      false: '',
    },
    disabled: {
      true: 'text-disabled-foreground pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    density: 'default',
    interactive: false,
    active: false,
    disabled: false,
  },
});

/** Title classes keyed by item size. */
export const ITEM_TITLE_CLASSES: Record<ItemSize, string> = {
  sm: 'text-sm',
  md: 'text-sm font-medium',
  lg: 'text-xl font-semibold tracking-tight',
};

/** Description classes keyed by item size. */
export const ITEM_DESCRIPTION_CLASSES: Record<ItemSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

/** Avatar size mapping keyed by item size. */
export const ITEM_AVATAR_SIZES: Record<ItemSize, AvatarSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/** Icon size mapping keyed by item size (for icon inside avatar). */
export const ITEM_ICON_SIZES: Record<ItemSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export type ItemVariants = VariantProps<typeof itemVariants>;
