import { cva, type VariantProps } from 'class-variance-authority';
import type { TooltipColor, TooltipSize, TooltipSide } from './tooltip.models';

/**
 * CVA variants for the tooltip panel wrapper.
 *
 * @tokens `--color-surface-900`, `--color-surface-50`, `--color-primary`, `--color-primary-foreground`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-warn`, `--color-warn-foreground`,
 *         `--color-popover`, `--color-popover-foreground`, `--color-border`
 */
export const tooltipPanelVariants: (props?: {
  color?: TooltipColor;
  size?: TooltipSize;
}) => string = cva(
  [
    'com-tooltip-panel',
    'z-50',
    'pointer-events-auto',
    'select-none',
    'leading-normal',
  ],
  {
    variants: {
      color: {
        default: 'bg-surface-900 text-surface-50',
        primary: 'bg-primary text-primary-foreground',
        accent: 'bg-accent text-accent-foreground',
        warn: 'bg-warn text-warn-foreground',
        invert: 'bg-popover text-popover-foreground border border-border shadow-md',
      },
      size: {
        sm: 'px-2 py-1 text-xs max-w-48 rounded-md',
        md: 'px-3 py-1.5 text-sm max-w-64 rounded-lg',
        lg: 'px-4 py-2.5 text-sm max-w-80 rounded-xl',
      },
    },
    defaultVariants: {
      color: 'default',
      size: 'md',
    },
  },
);

export type TooltipPanelVariants = VariantProps<typeof tooltipPanelVariants>;

/**
 * CVA variants for the tooltip arrow element.
 * The arrow points toward the trigger element.
 *
 * @tokens `--color-surface-900`, `--color-primary`, `--color-accent`, `--color-warn`,
 *         `--color-popover`, `--color-border`
 */
export const tooltipArrowVariants: (props?: {
  color?: TooltipColor;
  side?: TooltipSide;
}) => string = cva('absolute size-2 rotate-45', {
  variants: {
    color: {
      default: 'bg-surface-900',
      primary: 'bg-primary',
      accent: 'bg-accent',
      warn: 'bg-warn',
      invert: 'bg-popover border-l border-t border-border',
    },
    side: {
      // Arrow points DOWN (tooltip is above trigger)
      top: 'left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2',
      // Arrow points UP (tooltip is below trigger)
      bottom: 'left-1/2 -translate-x-1/2 top-0 -translate-y-1/2',
      // Arrow points RIGHT (tooltip is left of trigger)
      left: 'top-1/2 -translate-y-1/2 right-0 translate-x-1/2',
      // Arrow points LEFT (tooltip is right of trigger)
      right: 'top-1/2 -translate-y-1/2 left-0 -translate-x-1/2',
    },
  },
  compoundVariants: [
    // Invert arrow needs different rotation for border visibility
    { color: 'invert', side: 'top', class: 'rotate-[225deg]' },
    { color: 'invert', side: 'bottom', class: 'rotate-45' },
    { color: 'invert', side: 'left', class: 'rotate-[135deg]' },
    { color: 'invert', side: 'right', class: '-rotate-45' },
  ],
  defaultVariants: {
    color: 'default',
    side: 'top',
  },
});

export type TooltipArrowVariants = VariantProps<typeof tooltipArrowVariants>;
