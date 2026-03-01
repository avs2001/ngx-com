import { cva } from 'class-variance-authority';

/** Radio size variants. */
export type RadioSize = 'sm' | 'md' | 'lg';

/** Radio color variants. */
export type RadioVariant = 'primary' | 'accent' | 'warn';

/** Radio group orientation. */
export type RadioOrientation = 'vertical' | 'horizontal';

/**
 * CVA variants for the visual radio circle.
 *
 * Uses `peer` selectors to style based on native input state:
 * - `peer-checked:` for checked state
 * - `peer-focus-visible:` for keyboard focus
 * - `peer-disabled:` for disabled state
 *
 * @tokens `--color-border`, `--color-primary`, `--color-primary-hover`,
 *         `--color-accent`, `--color-accent-hover`,
 *         `--color-warn`, `--color-warn-hover`,
 *         `--color-disabled`, `--color-ring`
 */
export const radioCircleVariants: (props?: {
  variant?: RadioVariant;
  size?: RadioSize;
}) => string = cva(
  [
    'com-radio__circle',
    'inline-flex shrink-0 items-center justify-center',
    'rounded-full border-2 border-border',
    'transition-colors duration-150',
    'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring',
    'peer-disabled:cursor-not-allowed peer-disabled:border-disabled peer-disabled:bg-disabled',
  ],
  {
    variants: {
      variant: {
        primary: [
          'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground',
          'group-hover:border-primary-hover',
          'peer-checked:group-hover:bg-primary-hover peer-checked:group-hover:border-primary-hover',
        ],
        accent: [
          'peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-foreground',
          'group-hover:border-accent-hover',
          'peer-checked:group-hover:bg-accent-hover peer-checked:group-hover:border-accent-hover',
        ],
        warn: [
          'peer-checked:border-warn peer-checked:bg-warn peer-checked:text-warn-foreground',
          'group-hover:border-warn-hover',
          'peer-checked:group-hover:bg-warn-hover peer-checked:group-hover:border-warn-hover',
        ],
      },
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/** Size-based classes for the inner dot indicator. */
export const RADIO_DOT_SIZES: Record<RadioSize, string> = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2.5',
};

/** Size-based classes for the label content. */
export const RADIO_LABEL_SIZES: Record<RadioSize, string> = {
  sm: 'text-sm ms-2',
  md: 'text-base ms-2.5',
  lg: 'text-lg ms-3',
};

/** Base classes for the radio group container. */
const RADIO_GROUP_BASE = 'com-radio-group__container flex';

/** Orientation-based classes for the radio group container. */
export const RADIO_GROUP_ORIENTATIONS: Record<RadioOrientation, string> = {
  vertical: `${RADIO_GROUP_BASE} flex-col gap-2`,
  horizontal: `${RADIO_GROUP_BASE} flex-row flex-wrap gap-4`,
};
