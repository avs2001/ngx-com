import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { TimePickerSize, TimePickerVariant, TimePickerState } from './timepicker.types';

/**
 * CVA variants for the time picker container.
 *
 * @tokens `--color-input-background`, `--color-input-foreground`, `--color-input-border`,
 *         `--color-ring`, `--color-warn`, `--color-success`, `--radius-input`
 */
export const timepickerContainerVariants: (props?: {
  variant?: TimePickerVariant;
  size?: TimePickerSize;
  state?: TimePickerState;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'gap-1',
    'rounded-input',
    'transition-colors',
    'duration-150',
  ],
  {
    variants: {
      variant: {
        standalone: [
          'border',
          'border-input-border',
          'bg-input-background',
          'text-input-foreground',
          'ring-offset-background',
          'focus-within:outline-none',
          'focus-within:ring-2',
          'focus-within:ring-offset-2',
          'focus-within:ring-ring',
        ],
        embedded: [
          'border-transparent',
          'bg-transparent',
          'text-foreground',
        ],
      },
      size: {
        sm: ['h-8', 'px-2', 'text-xs', 'gap-0.5'],
        default: ['h-10', 'px-3', 'text-sm', 'gap-1'],
        lg: ['h-12', 'px-4', 'text-base', 'gap-1.5'],
      },
      state: {
        default: [],
        error: [
          'border-warn',
          'focus-within:ring-warn',
        ],
        success: [
          'border-success',
          'focus-within:ring-success',
        ],
      },
    },
    compoundVariants: [
      {
        variant: 'embedded',
        state: 'error',
        class: [],
      },
      {
        variant: 'embedded',
        state: 'success',
        class: [],
      },
    ],
    defaultVariants: {
      variant: 'standalone',
      size: 'default',
      state: 'default',
    },
  },
);

export type TimepickerContainerVariants = VariantProps<typeof timepickerContainerVariants>;

/**
 * CVA variants for the disabled state of time picker.
 *
 * @tokens `--color-disabled`, `--color-disabled-foreground`
 */
export const timepickerDisabledVariants: () => string = cva([
  'cursor-not-allowed',
  'bg-disabled',
  'text-disabled-foreground',
  'pointer-events-none',
]);

export type TimepickerDisabledVariants = VariantProps<typeof timepickerDisabledVariants>;

/**
 * CVA variants for each time segment input.
 *
 * @tokens `--color-primary-subtle`, `--color-primary-subtle-foreground`, `--radius-interactive-sm`
 */
export const timepickerSegmentVariants: (props?: {
  size?: TimePickerSize;
}) => string = cva(
  [
    'bg-transparent',
    'outline-none',
    'text-center',
    'font-mono',
    'tabular-nums',
    'select-all',
    'focus:bg-primary-subtle',
    'focus:text-primary-subtle-foreground',
    'focus:rounded-interactive-sm',
  ],
  {
    variants: {
      size: {
        sm: ['w-5', 'text-xs'],
        default: ['w-7', 'text-sm'],
        lg: ['w-9', 'text-base'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type TimepickerSegmentVariants = VariantProps<typeof timepickerSegmentVariants>;

/**
 * CVA variants for the colon separator.
 *
 * @tokens `--color-muted-foreground`
 */
export const timepickerSeparatorVariants: (props?: {
  size?: TimePickerSize;
}) => string = cva(
  [
    'text-muted-foreground',
    'select-none',
    'font-mono',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs'],
        default: ['text-sm'],
        lg: ['text-base'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type TimepickerSeparatorVariants = VariantProps<typeof timepickerSeparatorVariants>;

/**
 * CVA variants for the AM/PM toggle button.
 *
 * @tokens `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`, `--color-ring`,
 *         `--radius-control-sm`
 */
export const timepickerPeriodVariants: (props?: {
  size?: TimePickerSize;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-control-sm',
    'font-medium',
    'transition-colors',
    'select-none',
    'bg-muted',
    'text-muted-foreground',
    'hover:bg-muted-hover',
    'focus:outline-none',
    'focus:ring-1',
    'focus:ring-ring',
  ],
  {
    variants: {
      size: {
        sm: ['h-5', 'px-1', 'text-xs', 'ml-0.5'],
        default: ['h-6', 'px-1.5', 'text-xs', 'ml-1'],
        lg: ['h-7', 'px-2', 'text-sm', 'ml-1.5'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type TimepickerPeriodVariants = VariantProps<typeof timepickerPeriodVariants>;

/**
 * CVA variants for the time section divider in datepicker panel.
 *
 * @tokens `--color-border-subtle`
 */
export const timepickerSectionVariants: (props?: {
  size?: TimePickerSize;
}) => string = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'border-t',
    'border-border-subtle',
  ],
  {
    variants: {
      size: {
        sm: ['pt-2', 'mt-2'],
        default: ['pt-3', 'mt-3'],
        lg: ['pt-4', 'mt-4'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type TimepickerSectionVariants = VariantProps<typeof timepickerSectionVariants>;

/**
 * CVA variants for time labels in date range picker.
 *
 * @tokens `--color-muted-foreground`
 */
export const timepickerLabelVariants: (props?: {
  size?: TimePickerSize;
}) => string = cva(
  [
    'text-muted-foreground',
    'font-medium',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs'],
        default: ['text-xs'],
        lg: ['text-sm'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type TimepickerLabelVariants = VariantProps<typeof timepickerLabelVariants>;
