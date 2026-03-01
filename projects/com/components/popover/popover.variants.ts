import { cva, type VariantProps } from 'class-variance-authority';

// ─── Type Definitions ───

export type PopoverPosition = 'above' | 'below' | 'left' | 'right' | 'auto';
export type PopoverAlignment = 'start' | 'center' | 'end';
export type PopoverTriggerOn = 'click' | 'focus' | 'manual';
export type PopoverVariant = 'default' | 'compact' | 'wide' | 'flush';
export type PopoverBackdrop = 'transparent' | 'dimmed' | 'none';
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';

// ─── Popover Panel Variants ───

/**
 * Popover panel styling variants.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`, `--shadow-lg`, `--radius-xl`, `--radius-lg`
 */
export const popoverPanelVariants: ReturnType<
  typeof cva<{ variant: Record<PopoverVariant, string> }>
> = cva(
  ['relative', 'bg-popover text-popover-foreground', 'border border-border', 'shadow-lg', 'overflow-hidden'],
  {
    variants: {
      variant: {
        default: 'rounded-xl p-4 min-w-48 max-w-sm',
        compact: 'rounded-lg p-2 min-w-32 max-w-xs',
        wide: 'rounded-xl p-5 min-w-64 max-w-lg',
        flush: 'rounded-xl p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type PopoverPanelVariants = VariantProps<typeof popoverPanelVariants>;

// ─── Popover Arrow Variants ───

/**
 * Popover arrow positioning variants.
 * The arrow is positioned on the edge of the popover pointing toward the trigger.
 *
 * @tokens `--color-popover`, `--color-border`
 */
export const popoverArrowVariants: ReturnType<
  typeof cva<{ side: Record<PopoverSide, string> }>
> = cva('absolute z-10 text-popover', {
  variants: {
    side: {
      top: 'left-1/2 top-full -translate-x-1/2 -translate-y-px rotate-180',
      bottom: 'left-1/2 bottom-full -translate-x-1/2 translate-y-px',
      left: 'top-1/2 right-0 -translate-y-1/2 translate-x-[11px] rotate-90',
      right: 'top-1/2 left-0 -translate-y-1/2 -translate-x-[11px] -rotate-90',
    },
  },
  defaultVariants: {
    side: 'bottom',
  },
});

export type PopoverArrowVariants = VariantProps<typeof popoverArrowVariants>;
