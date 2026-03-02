import { cva } from 'class-variance-authority';

/** Avatar size variants. */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Avatar color variants. */
export type AvatarColor = 'primary' | 'accent' | 'muted' | 'warn' | 'auto';

/** Avatar shape variants. */
export type AvatarShape = 'circle' | 'rounded';

/** Avatar variant types. */
export type AvatarVariant = 'soft' | 'filled' | 'outline';

/** Resolved color (excludes 'auto' which is computed at runtime). */
export type ResolvedAvatarColor = Exclude<AvatarColor, 'auto'>;

/** Colors available for auto-color generation. */
const AUTO_COLORS: readonly ResolvedAvatarColor[] = ['primary', 'accent', 'warn'] as const;

/**
 * Deterministically generates a color index from a name string.
 * The same name always produces the same color.
 */
export function nameToColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % AUTO_COLORS.length;
}

/**
 * Resolves an auto color to a concrete color based on the name.
 * Falls back to 'muted' when name is empty or undefined.
 */
export function resolveAutoColor(color: AvatarColor, name: string | undefined): ResolvedAvatarColor {
  if (color !== 'auto') {
    return color;
  }
  if (!name?.trim()) {
    return 'muted';
  }
  return AUTO_COLORS[nameToColorIndex(name)]!;
}

/**
 * Generates initials from a display name.
 *
 * @param name - The display name to extract initials from
 * @param maxLength - Maximum number of characters (default: 2)
 * @returns Uppercase initials, or empty string if name is empty
 *
 * @example
 * ```ts
 * getInitials('Jane Doe')       // 'JD'
 * getInitials('Jane')           // 'JA'
 * getInitials('Jane Marie Doe') // 'JD' (first + last)
 * getInitials('j')              // 'J'
 * getInitials('')               // ''
 * ```
 */
export function getInitials(name: string, maxLength: number = 2): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return '';
  }

  const words = trimmed.split(/\s+/);

  if (words.length === 1) {
    // Single word: take first N characters
    return words[0]!.slice(0, maxLength).toUpperCase();
  }

  // Multiple words: first char of first word + first char of last word
  const first = words[0]!.charAt(0);
  const last = words[words.length - 1]!.charAt(0);
  return (first + last).slice(0, maxLength).toUpperCase();
}

/**
 * CVA variants for the avatar container.
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-primary-subtle`, `--color-primary-subtle-foreground`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-subtle`, `--color-accent-subtle-foreground`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-subtle`, `--color-warn-subtle-foreground`,
 *         `--color-muted`, `--color-muted-foreground`,
 *         `--color-border`, `--color-background`, `--color-foreground`, `--color-ring`
 */
export const avatarVariants: (props?: {
  size?: AvatarSize;
  shape?: AvatarShape;
  interactive?: boolean;
}) => string = cva(
  [
    'com-avatar',
    'relative overflow-hidden inline-flex items-center justify-center',
    'shrink-0 select-none',
  ],
  {
    variants: {
      size: {
        xs: 'size-5',
        sm: 'size-7',
        md: 'size-9',
        lg: 'size-12',
        xl: 'size-16',
        '2xl': 'size-24',
      },
      shape: {
        circle: 'rounded-full',
        rounded: 'rounded-lg',
      },
      interactive: {
        true: [
          'cursor-pointer',
          'hover:ring-2 hover:ring-ring',
          'active:scale-95',
          'transition-all duration-150',
        ],
        false: 'cursor-default',
      },
    },
    compoundVariants: [
      // Smaller rounded corners for xs/sm sizes
      { shape: 'rounded', size: 'xs', class: 'rounded-md' },
      { shape: 'rounded', size: 'sm', class: 'rounded-md' },
    ],
    defaultVariants: {
      size: 'md',
      shape: 'circle',
      interactive: false,
    },
  }
);

/**
 * CVA variants for the avatar color/variant styling.
 * These are applied based on the resolved color and variant.
 */
export const avatarColorVariants: (props?: {
  variant?: AvatarVariant;
  color?: ResolvedAvatarColor;
}) => string = cva('', {
  variants: {
    variant: {
      soft: '',
      filled: '',
      outline: 'ring-2 ring-background bg-background text-foreground',
    },
    color: {
      primary: '',
      accent: '',
      muted: '',
      warn: '',
    },
  },
  compoundVariants: [
    // Soft variants
    { variant: 'soft', color: 'primary', class: 'bg-primary-subtle text-primary-subtle-foreground' },
    { variant: 'soft', color: 'accent', class: 'bg-accent-subtle text-accent-subtle-foreground' },
    { variant: 'soft', color: 'warn', class: 'bg-warn-subtle text-warn-subtle-foreground' },
    { variant: 'soft', color: 'muted', class: 'bg-muted text-muted-foreground' },

    // Filled variants
    { variant: 'filled', color: 'primary', class: 'bg-primary text-primary-foreground' },
    { variant: 'filled', color: 'accent', class: 'bg-accent text-accent-foreground' },
    { variant: 'filled', color: 'warn', class: 'bg-warn text-warn-foreground' },
    { variant: 'filled', color: 'muted', class: 'bg-muted-foreground text-muted' },
  ],
  defaultVariants: {
    variant: 'soft',
    color: 'primary',
  },
});

/** Font size classes for initials, keyed by avatar size. */
export const AVATAR_INITIALS_SIZES: Record<AvatarSize, string> = {
  xs: 'text-[0.5rem]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-xl',
  '2xl': 'text-3xl',
};


/** Ring width classes for outline variant, keyed by avatar size. */
export const AVATAR_OUTLINE_RING_SIZES: Record<AvatarSize, string> = {
  xs: 'ring-1',
  sm: 'ring-[1.5px]',
  md: 'ring-2',
  lg: 'ring-2',
  xl: 'ring-2',
  '2xl': 'ring-[3px]',
};
