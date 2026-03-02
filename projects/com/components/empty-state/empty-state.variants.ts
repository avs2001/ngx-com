import { cva } from 'class-variance-authority';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateAlign = 'start' | 'center';
export type EmptyStateOrientation = 'vertical' | 'horizontal';

/**
 * CVA variants for the empty state container.
 *
 * @tokens `--color-foreground`, `--color-muted`, `--color-muted-foreground`
 */
export const emptyStateVariants: (props?: {
  size?: EmptyStateSize;
  align?: EmptyStateAlign;
  orientation?: EmptyStateOrientation;
}) => string = cva('flex', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    align: {
      center: 'items-center text-center',
      start: 'items-start text-left',
    },
    size: {
      sm: 'gap-2 py-4',
      md: 'gap-3 py-6',
      lg: 'gap-4 py-10',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', align: 'center', class: 'justify-center' },
    { orientation: 'horizontal', align: 'start', class: 'justify-start' },
  ],
  defaultVariants: {
    size: 'md',
    align: 'center',
    orientation: 'vertical',
  },
});

/**
 * CVA variants for the empty state icon container.
 *
 * @tokens `--color-muted`, `--color-muted-foreground`
 */
export const emptyStateIconVariants: (props?: { size?: EmptyStateSize }) => string = cva(
  'flex items-center justify-center shrink-0 bg-muted text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'size-10 rounded-lg',
        md: 'size-14 rounded-xl',
        lg: 'size-20 rounded-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * CVA variants for the empty state title.
 *
 * @tokens `--color-foreground`
 */
export const emptyStateTitleVariants: (props?: { size?: EmptyStateSize }) => string = cva(
  'font-heading tracking-tight text-foreground',
  {
    variants: {
      size: {
        sm: 'text-sm font-medium',
        md: 'text-base font-semibold',
        lg: 'text-lg font-semibold',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * CVA variants for the empty state description.
 *
 * @tokens `--color-muted-foreground`
 */
export const emptyStateDescriptionVariants: (props?: { size?: EmptyStateSize }) => string = cva(
  'text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs max-w-[200px]',
        md: 'text-sm max-w-xs',
        lg: 'text-base max-w-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * CVA variants for the empty state actions container.
 */
export const emptyStateActionsVariants: (props?: { size?: EmptyStateSize }) => string = cva(
  'flex flex-wrap items-center justify-center',
  {
    variants: {
      size: {
        sm: 'gap-2 pt-1',
        md: 'gap-2.5 pt-2',
        lg: 'gap-3 pt-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
