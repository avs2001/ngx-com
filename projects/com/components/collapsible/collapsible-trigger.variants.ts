import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Trigger variant type for the collapsible trigger.
 */
export type CollapsibleTriggerVariant = 'ghost' | 'filled' | 'header' | 'unstyled';

/**
 * Trigger size type.
 */
export type CollapsibleTriggerSize = 'sm' | 'default' | 'lg';

/**
 * CVA variants for the collapsible trigger directive.
 *
 * @tokens `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-ring`, `--color-disabled-foreground`
 */
export const collapsibleTriggerVariants: (props?: {
  variant?: CollapsibleTriggerVariant;
  size?: CollapsibleTriggerSize;
}) => string = cva(
  [
    'com-collapsible-trigger',
    'flex w-full items-center justify-between',
    'cursor-pointer select-none',
    'text-sm font-medium',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:text-disabled-foreground',
    '[&>svg]:transition-transform [&>svg]:duration-200',
    '[&>svg.com-collapsible-icon]:data-[state=open]:rotate-180',
  ].join(' '),
  {
    variants: {
      variant: {
        ghost: 'rounded-md text-foreground hover:bg-muted hover:text-muted-foreground',
        filled: 'rounded-md bg-muted text-muted-foreground hover:bg-muted-hover',
        header: 'text-foreground hover:text-muted-foreground',
        unstyled: '',
      },
      size: {
        sm: 'px-2 py-1 text-xs gap-1',
        default: 'px-3 py-2 text-sm gap-2',
        lg: 'px-4 py-3 text-base gap-3',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  }
);

export type CollapsibleTriggerVariants = VariantProps<typeof collapsibleTriggerVariants>;
