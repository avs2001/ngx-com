import { cva, type VariantProps } from 'class-variance-authority';

// Card container types
export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// Card footer / actions alignment
export type CardAlign = 'start' | 'end' | 'center' | 'between';

// Card actions direction
export type CardActionsDirection = 'row' | 'column';

// Card media position
export type CardMediaPosition = 'top' | 'bottom' | 'inset';

// Card accent types
export type CardAccentColor = 'primary' | 'accent' | 'warn' | 'success' | 'muted';
export type CardAccentPosition = 'top' | 'left';

// Card badge types
export type CardBadgeColor = 'primary' | 'accent' | 'warn' | 'success' | 'muted';
export type CardBadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * CVA variants for the card container.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-muted`, `--color-muted-hover`,
 *         `--color-foreground`, `--color-border`, `--color-primary`, `--color-ring`
 */
export const cardVariants: (props?: {
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  interactive?: boolean;
}) => string = cva('relative flex flex-col overflow-hidden', {
  variants: {
    variant: {
      elevated: 'bg-popover text-popover-foreground shadow-md',
      outlined: 'bg-popover text-popover-foreground border border-border',
      filled: 'bg-muted text-foreground',
      ghost: 'bg-transparent text-foreground',
    },
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    interactive: {
      true: 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      false: '',
    },
  },
  compoundVariants: [
    { interactive: true, variant: 'elevated', class: 'hover:shadow-lg active:shadow-sm transition-shadow duration-150' },
    { interactive: true, variant: 'outlined', class: 'hover:border-primary hover:shadow-sm transition-all duration-150' },
    { interactive: true, variant: 'filled', class: 'hover:bg-muted-hover transition-colors duration-150' },
    { interactive: true, variant: 'ghost', class: 'hover:bg-muted transition-colors duration-150' },
  ],
  defaultVariants: {
    variant: 'elevated',
    padding: 'none',
    radius: 'lg',
    interactive: false,
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;

/**
 * CVA variants for card footer alignment.
 */
export const cardFooterVariants: (props?: {
  align?: CardAlign;
}) => string = cva('flex items-center gap-2 px-5 pt-0 pb-5', {
  variants: {
    align: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    align: 'end',
  },
});

export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;

/**
 * CVA variants for card actions.
 */
export const cardActionsVariants: (props?: {
  align?: CardAlign;
  direction?: CardActionsDirection;
}) => string = cva('flex gap-2 px-5 py-3', {
  variants: {
    align: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
    },
    direction: {
      row: 'flex-row items-center',
      column: 'flex-col items-stretch',
    },
  },
  defaultVariants: {
    align: 'end',
    direction: 'row',
  },
});

export type CardActionsVariants = VariantProps<typeof cardActionsVariants>;

/**
 * CVA variants for card media positioning.
 */
export const cardMediaVariants: (props?: {
  position?: CardMediaPosition;
}) => string = cva('block w-full overflow-hidden object-cover', {
  variants: {
    position: {
      top: '',
      bottom: '',
      inset: 'mx-5 mt-5 rounded-md',
    },
  },
  defaultVariants: {
    position: 'top',
  },
});

export type CardMediaVariants = VariantProps<typeof cardMediaVariants>;

/**
 * CVA variants for card accent strip.
 *
 * @tokens `--color-primary`, `--color-accent`, `--color-warn`, `--color-success`, `--color-muted`
 */
export const cardAccentVariants: (props?: {
  color?: CardAccentColor;
  position?: CardAccentPosition;
}) => string = cva('block shrink-0', {
  variants: {
    color: {
      primary: 'bg-primary',
      accent: 'bg-accent',
      warn: 'bg-warn',
      success: 'bg-success',
      muted: 'bg-muted',
    },
    position: {
      top: 'h-1 w-full',
      left: 'w-1 h-full absolute left-0 top-0',
    },
  },
  defaultVariants: {
    color: 'primary',
    position: 'top',
  },
});

export type CardAccentVariants = VariantProps<typeof cardAccentVariants>;

/**
 * CVA variants for card badge overlay.
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-accent`, `--color-accent-foreground`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-success`, `--color-success-foreground`,
 *         `--color-muted`, `--color-muted-foreground`, `--radius-pill`
 */
export const cardBadgeVariants: (props?: {
  position?: CardBadgePosition;
  color?: CardBadgeColor;
}) => string = cva(
  'absolute z-10 inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      position: {
        'top-left': 'top-3 left-3',
        'top-right': 'top-3 right-3',
        'bottom-left': 'bottom-3 left-3',
        'bottom-right': 'bottom-3 right-3',
      },
      color: {
        primary: 'bg-primary text-primary-foreground',
        accent: 'bg-accent text-accent-foreground',
        warn: 'bg-warn text-warn-foreground',
        success: 'bg-success text-success-foreground',
        muted: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      position: 'top-right',
      color: 'primary',
    },
  }
);

export type CardBadgeVariants = VariantProps<typeof cardBadgeVariants>;
