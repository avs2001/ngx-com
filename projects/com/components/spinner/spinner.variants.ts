import { cva } from 'class-variance-authority';

/** Spinner size variants. */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Spinner color variants. */
export type SpinnerColor = 'current' | 'primary' | 'accent' | 'warn' | 'success' | 'muted';

/** Label position relative to spinner. */
export type SpinnerLabelPosition = 'right' | 'bottom';

/**
 * CVA variants for the spinning circle element.
 *
 * Creates a circular track with a faded ring and a colored arc that rotates.
 * Uses `border` for the track and `border-t-*` for the spinning arc.
 *
 * @tokens `--color-primary`, `--color-accent`, `--color-warn`, `--color-success`, `--color-muted-foreground`
 */
export const spinnerVariants: (props?: {
  size?: SpinnerSize;
  color?: SpinnerColor;
}) => string = cva(
  [
    'com-spinner__circle',
    'inline-block shrink-0 rounded-full border-solid',
    'animate-[com-spin_0.6s_linear_infinite]',
  ],
  {
    variants: {
      size: {
        xs: 'size-3 border-[1.5px]',
        sm: 'size-4 border-2',
        md: 'size-5 border-2',
        lg: 'size-8 border-[2.5px]',
        xl: 'size-10 border-3',
      },
      color: {
        current: 'border-current/20 border-t-current',
        primary: 'border-primary/20 border-t-primary',
        accent: 'border-accent/20 border-t-accent',
        warn: 'border-warn/20 border-t-warn',
        success: 'border-success/20 border-t-success',
        muted: 'border-muted-foreground/20 border-t-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'current',
    },
  }
);

/**
 * CVA variants for the spinner container layout.
 *
 * Controls flex direction and gap based on label position.
 * Only applies when a visible label is present.
 *
 * @tokens none (layout only)
 */
export const spinnerContainerVariants: (props?: {
  labelPosition?: SpinnerLabelPosition;
}) => string = cva(
  ['inline-flex items-center justify-center'],
  {
    variants: {
      labelPosition: {
        right: 'flex-row gap-2',
        bottom: 'flex-col gap-1.5',
      },
    },
    defaultVariants: {
      labelPosition: 'right',
    },
  }
);

/** Label font size classes mapped to spinner size. */
export const SPINNER_LABEL_SIZES: Record<SpinnerSize, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-base',
};
