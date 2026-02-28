import { cva } from 'class-variance-authority';

/** Checkbox size variants. */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/** Checkbox color variants. */
export type CheckboxVariant = 'primary' | 'accent' | 'warn';

/**
 * CVA variants for the visual checkbox box.
 *
 * Uses `peer` selectors to style based on native input state:
 * - `peer-checked:` for checked state
 * - `peer-indeterminate:` for indeterminate state
 * - `peer-focus-visible:` for keyboard focus
 * - `peer-disabled:` for disabled state
 *
 * @tokens `--color-border`, `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-hover`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-hover`,
 *         `--color-disabled`, `--color-disabled-foreground`, `--color-ring`
 */
export const checkboxBoxVariants: (props?: {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
}) => string = cva(
  [
    'com-checkbox__box',
    'inline-flex shrink-0 items-center justify-center',
    'rounded-sm border-2 border-border',
    'transition-colors duration-150',
    'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring',
    'peer-disabled:cursor-not-allowed peer-disabled:border-disabled peer-disabled:bg-disabled peer-disabled:text-disabled-foreground',
  ],
  {
    variants: {
      variant: {
        primary: [
          'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground',
          'peer-indeterminate:border-primary peer-indeterminate:bg-primary peer-indeterminate:text-primary-foreground',
          'group-hover:border-primary-hover',
          'peer-checked:group-hover:bg-primary-hover peer-checked:group-hover:border-primary-hover',
          'peer-indeterminate:group-hover:bg-primary-hover peer-indeterminate:group-hover:border-primary-hover',
        ],
        accent: [
          'peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-foreground',
          'peer-indeterminate:border-accent peer-indeterminate:bg-accent peer-indeterminate:text-accent-foreground',
          'group-hover:border-accent-hover',
          'peer-checked:group-hover:bg-accent-hover peer-checked:group-hover:border-accent-hover',
          'peer-indeterminate:group-hover:bg-accent-hover peer-indeterminate:group-hover:border-accent-hover',
        ],
        warn: [
          'peer-checked:border-warn peer-checked:bg-warn peer-checked:text-warn-foreground',
          'peer-indeterminate:border-warn peer-indeterminate:bg-warn peer-indeterminate:text-warn-foreground',
          'group-hover:border-warn-hover',
          'peer-checked:group-hover:bg-warn-hover peer-checked:group-hover:border-warn-hover',
          'peer-indeterminate:group-hover:bg-warn-hover peer-indeterminate:group-hover:border-warn-hover',
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

/** CVA variants for the checkmark SVG icon. */
export const checkboxIconVariants: (props?: {
  size?: CheckboxSize;
}) => string = cva(
  [
    'com-checkbox__icon',
    'pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'size-3',
        md: 'size-3.5',
        lg: 'size-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/** CVA variants for the label content. */
export const checkboxLabelVariants: (props?: {
  size?: CheckboxSize;
}) => string = cva(
  [
    'com-checkbox__label',
    'select-none',
    'peer-disabled:cursor-not-allowed peer-disabled:text-disabled-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm ml-2',
        md: 'text-base ml-2.5',
        lg: 'text-lg ml-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
