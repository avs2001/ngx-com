import { cva, type VariantProps } from 'class-variance-authority';

// ─── Types ───

export type PaginatorSize = 'sm' | 'md';
export type PaginatorLayout = 'compact' | 'spread';

// ─── Container Variants ───

/**
 * CVA variants for the paginator container.
 * Controls overall layout and spacing.
 */
export const paginatorContainerVariants: (props?: {
  size?: PaginatorSize;
  layout?: PaginatorLayout;
}) => string = cva(
  [
    'flex items-center',
    'text-foreground',
    'select-none',
  ],
  {
    variants: {
      size: {
        sm: 'gap-3 text-xs',
        md: 'gap-4 text-sm',
      },
      layout: {
        compact: 'justify-end',
        spread: 'justify-between',
      },
    },
    defaultVariants: {
      size: 'md',
      layout: 'compact',
    },
  }
);

// ─── Button Variants ───

/**
 * CVA variants for paginator navigation buttons.
 * Controls button sizing, borders, and interactive states.
 */
export const paginatorButtonVariants: (props?: {
  size?: PaginatorSize;
}) => string = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-control',
    'border border-border',
    'bg-transparent',
    'transition-colors duration-150',
    'cursor-pointer',
    'hover:bg-muted hover:text-muted-foreground',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 w-7',
        md: 'h-9 w-9',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Range Label Variants ───

/**
 * CVA variants for the range label text.
 * Controls typography and color.
 */
export const paginatorRangeLabelVariants: (props?: {
  size?: PaginatorSize;
}) => string = cva(
  [
    'text-muted-foreground',
    'whitespace-nowrap',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Page Size Selector Variants ───

/**
 * CVA variants for the page size select element.
 * Controls sizing and styling of the native select.
 */
export const paginatorSelectVariants: (props?: {
  size?: PaginatorSize;
}) => string = cva(
  [
    'appearance-none',
    'rounded-control',
    'border border-border',
    'bg-transparent',
    'text-foreground',
    'cursor-pointer',
    'transition-colors duration-150',
    'hover:bg-muted',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled',
    'pr-6', // Space for custom dropdown arrow
  ],
  {
    variants: {
      size: {
        sm: 'h-7 px-2 text-xs',
        md: 'h-9 px-3 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Variant Types ───

// ─── Page Button Variants ───

/**
 * CVA variants for numbered page buttons.
 * Controls button sizing, active state, and interactive states.
 */
export const paginatorPageButtonVariants: (props?: {
  size?: PaginatorSize;
  active?: boolean;
}) => string = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-control',
    'font-medium',
    'transition-colors duration-150',
    'cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 min-w-7 px-1.5 text-xs',
        md: 'h-9 min-w-9 px-2 text-sm',
      },
      active: {
        true: 'bg-primary text-primary-foreground',
        false: 'bg-transparent text-foreground hover:bg-muted hover:text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      active: false,
    },
  }
);

// ─── Ellipsis Variants ───

/**
 * CVA variants for the ellipsis indicator.
 * Controls sizing and styling of the "..." text.
 */
export const paginatorEllipsisVariants: (props?: {
  size?: PaginatorSize;
}) => string = cva(
  [
    'inline-flex items-center justify-center',
    'text-muted-foreground',
    'select-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 w-7 text-xs',
        md: 'h-9 w-9 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Variant Types ───

export type PaginatorContainerVariants = VariantProps<typeof paginatorContainerVariants>;
export type PaginatorButtonVariants = VariantProps<typeof paginatorButtonVariants>;
export type PaginatorRangeLabelVariants = VariantProps<typeof paginatorRangeLabelVariants>;
export type PaginatorSelectVariants = VariantProps<typeof paginatorSelectVariants>;
export type PaginatorPageButtonVariants = VariantProps<typeof paginatorPageButtonVariants>;
export type PaginatorEllipsisVariants = VariantProps<typeof paginatorEllipsisVariants>;
