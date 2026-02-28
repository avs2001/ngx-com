import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Shell variant type for the collapsible container.
 */
export type CollapsibleVariant = 'card' | 'bordered' | 'flush' | 'ghost' | 'unstyled';

/**
 * CVA variants for the collapsible shell (root directive).
 *
 * @tokens `--color-border`, `--color-background`, `--color-foreground`, `--shadow-xs`
 */
export const collapsibleVariants: (props?: {
  variant?: CollapsibleVariant;
}) => string = cva(
  // Base — structural only
  'com-collapsible block',
  {
    variants: {
      variant: {
        card: 'rounded-md border border-border bg-background text-foreground shadow-xs',
        bordered: 'rounded-md border border-border',
        flush: 'border-b border-border',
        ghost: '',
        unstyled: '',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

export type CollapsibleVariants = VariantProps<typeof collapsibleVariants>;
