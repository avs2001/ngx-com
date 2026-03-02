import { cva, type VariantProps } from 'class-variance-authority';

// ─── Types ───

export type SegmentedControlSize = 'sm' | 'md' | 'lg';
export type SegmentedControlColor = 'primary' | 'accent' | 'muted';
export type SegmentedControlVariant = 'filled' | 'outline';

// ─── Container Variants ───

/**
 * CVA variants for the segmented control container (track).
 * Controls overall sizing, padding, and track background.
 */
export const segmentedControlContainerVariants: (props?: {
  size?: SegmentedControlSize;
  fullWidth?: boolean;
}) => string = cva(
  [
    'inline-flex items-center',
    'rounded-pill',
    'bg-muted',
    'p-1',
    'transition-colors duration-150',
  ],
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        md: 'gap-1',
        lg: 'gap-1',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: false,
    },
  }
);

// ─── Segment Variants ───

/**
 * CVA variants for individual segment buttons.
 * Controls per-segment sizing, typography, and active/inactive color states.
 */
export const segmentedControlSegmentVariants: (props?: {
  size?: SegmentedControlSize;
  color?: SegmentedControlColor;
  variant?: SegmentedControlVariant;
  active?: boolean;
  fullWidth?: boolean;
}) => string = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-pill',
    'font-medium whitespace-nowrap select-none',
    'transition-colors duration-150',
    'cursor-pointer',
    'gap-1.5',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 px-3 text-sm',
        md: 'h-8 px-4 text-sm',
        lg: 'h-10 px-5 text-base',
      },
      color: {
        primary: '',
        accent: '',
        muted: '',
      },
      variant: {
        filled: '',
        outline: 'bg-transparent',
      },
      active: {
        true: '',
        false: 'text-foreground',
      },
      fullWidth: {
        true: 'flex-1',
        false: '',
      },
    },
    compoundVariants: [
      // ─── Filled + Active ───
      {
        variant: 'filled',
        color: 'primary',
        active: true,
        class: 'bg-primary text-primary-foreground shadow-sm',
      },
      {
        variant: 'filled',
        color: 'accent',
        active: true,
        class: 'bg-accent text-accent-foreground shadow-sm',
      },
      {
        variant: 'filled',
        color: 'muted',
        active: true,
        class: 'bg-background text-foreground shadow-sm',
      },

      // ─── Filled + Inactive (hover) ───
      {
        variant: 'filled',
        active: false,
        class: 'hover:bg-muted-hover',
      },

      // ─── Outline + Active ───
      {
        variant: 'outline',
        color: 'primary',
        active: true,
        class: 'ring-2 ring-primary text-primary',
      },
      {
        variant: 'outline',
        color: 'accent',
        active: true,
        class: 'ring-2 ring-accent text-accent',
      },
      {
        variant: 'outline',
        color: 'muted',
        active: true,
        class: 'ring-2 ring-border text-foreground',
      },

      // ─── Outline + Inactive (hover) ───
      {
        variant: 'outline',
        active: false,
        class: 'hover:bg-muted-hover',
      },
    ],
    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'filled',
      active: false,
      fullWidth: false,
    },
  }
);

// ─── Disabled Segment Classes ───

/**
 * Classes to apply when a segment is disabled.
 * Separate from CVA to avoid complex variant combinations.
 */
export const SEGMENT_DISABLED_CLASSES =
  'bg-disabled text-disabled-foreground cursor-not-allowed hover:bg-disabled';

// ─── Variant Types ───

export type SegmentedControlContainerVariants = VariantProps<typeof segmentedControlContainerVariants>;
export type SegmentedControlSegmentVariants = VariantProps<typeof segmentedControlSegmentVariants>;
