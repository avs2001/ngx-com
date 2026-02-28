import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variant type for badge appearance.
 */
export type BadgeVariant = 'primary' | 'accent' | 'warn' | 'success' | 'muted' | 'outline';

/**
 * Size type for badge.
 */
export type BadgeSize = 'sm' | 'default' | 'lg';

/**
 * CVA variants for the badge directive.
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-hover`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-hover`,
 *         `--color-success`, `--color-success-foreground`, `--color-success-hover`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-border`, `--color-foreground`, `--radius-pill`
 */
export const badgeVariants: (props?: {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
}) => string = cva(
  [
    'com-badge',
    'inline-flex w-fit shrink-0 items-center justify-center gap-1',
    'overflow-hidden whitespace-nowrap',
    'text-xs font-medium',
    'border transition-colors',
    '[&>svg]:pointer-events-none [&>svg]:size-3',
  ],
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary-hover',
        accent:
          'border-transparent bg-accent text-accent-foreground [a&]:hover:bg-accent-hover',
        warn:
          'border-transparent bg-warn text-warn-foreground [a&]:hover:bg-warn-hover',
        success:
          'border-transparent bg-success text-success-foreground [a&]:hover:bg-success-hover',
        muted:
          'border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted-hover',
        outline:
          'border-border bg-transparent text-foreground [a&]:hover:bg-muted',
      },
      size: {
        sm: 'px-1.5 py-px text-[10px] rounded-sm gap-0.5 [&>svg]:size-2.5',
        default: 'px-2 py-0.5 text-xs rounded-md gap-1 [&>svg]:size-3',
        lg: 'px-2.5 py-1 text-sm rounded-md gap-1.5 [&>svg]:size-3.5',
      },
      pill: {
        true: 'rounded-pill',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      pill: false,
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
