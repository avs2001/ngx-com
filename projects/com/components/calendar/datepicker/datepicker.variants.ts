import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type {
  DatepickerSize,
  DatepickerVariant,
  DatepickerState,
} from './datepicker.types';

/**
 * CVA variants for the datepicker trigger input.
 * Uses semantic theme tokens for consistent cross-theme styling.
 *
 * @tokens `--color-input-background`, `--color-input-foreground`, `--color-input-border`,
 *         `--color-input-placeholder`, `--color-ring`, `--color-muted`, `--color-muted-hover`,
 *         `--color-warn`, `--color-success`, `--color-primary`, `--color-border`,
 *         `--color-disabled`, `--color-disabled-foreground`, `--radius-input`
 */
export const datepickerTriggerVariants: (props?: {
  variant?: DatepickerVariant;
  size?: DatepickerSize;
  state?: DatepickerState;
  open?: boolean;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-between',
    'w-full',
    'rounded-input',
    'border',
    'bg-input-background',
    'text-input-foreground',
    'ring-offset-background',
    'transition-colors',
    'duration-150',
    'placeholder:text-input-placeholder',
    'focus-within:outline-none',
    'focus-within:ring-2',
    'focus-within:ring-offset-2',
    'focus-within:ring-ring',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-input-border',
          'hover:border-border',
        ],
        outline: [
          'border-2',
          'border-input-border',
          'hover:border-foreground',
        ],
        ghost: [
          'border-transparent',
          'bg-transparent',
          'hover:bg-muted',
        ],
        filled: [
          'border-transparent',
          'bg-muted',
          'hover:bg-muted-hover',
        ],
      },
      size: {
        sm: ['h-8', 'px-2', 'text-xs', 'gap-1'],
        default: ['h-10', 'px-3', 'text-sm', 'gap-2'],
        lg: ['h-12', 'px-4', 'text-base', 'gap-3'],
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
      open: {
        true: ['ring-2', 'ring-ring', 'border-primary'],
        false: [],
      },
    },
    compoundVariants: [
      {
        open: true,
        variant: 'default',
        class: ['border-primary'],
      },
      {
        open: true,
        variant: 'outline',
        class: ['border-primary'],
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
      open: false,
    },
  }
);

export type DatepickerTriggerVariants = VariantProps<typeof datepickerTriggerVariants>;

/**
 * CVA variants for the disabled state of datepicker trigger.
 *
 * @tokens `--color-disabled`, `--color-disabled-foreground`
 */
export const datepickerDisabledVariants: () => string = cva([
  'cursor-not-allowed',
  'bg-disabled',
  'text-disabled-foreground',
  'hover:border-input-border',
  'pointer-events-none',
]);

export type DatepickerDisabledVariants = VariantProps<typeof datepickerDisabledVariants>;

/**
 * CVA variants for the datepicker input field.
 *
 * @tokens `--color-input-foreground`, `--color-input-placeholder`
 */
export const datepickerInputVariants: (props?: {
  size?: DatepickerSize;
}) => string = cva(
  [
    'flex-1',
    'bg-transparent',
    'outline-none',
    'placeholder:text-input-placeholder',
    'disabled:cursor-not-allowed',
    'min-w-0',
    'truncate',
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
  }
);

export type DatepickerInputVariants = VariantProps<typeof datepickerInputVariants>;

/**
 * CVA variants for the calendar icon button.
 *
 * @tokens `--color-ring`, `--color-muted-foreground`, `--radius-interactive-sm`
 */
export const datepickerIconVariants: (props?: {
  size?: DatepickerSize;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'shrink-0',
    'text-muted-foreground',
    'transition-colors',
    'hover:text-foreground',
    'focus:outline-none',
    'focus:ring-1',
    'focus:ring-ring',
    'rounded-interactive-sm',
  ],
  {
    variants: {
      size: {
        sm: ['h-4', 'w-4'],
        default: ['h-5', 'w-5'],
        lg: ['h-6', 'w-6'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DatepickerIconVariants = VariantProps<typeof datepickerIconVariants>;

/**
 * CVA variants for the clear button.
 *
 * @tokens `--color-ring`, `--color-muted-foreground`, `--color-foreground`, `--radius-interactive-sm`
 */
export const datepickerClearVariants: (props?: {
  size?: DatepickerSize;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-interactive-sm',
    'text-muted-foreground',
    'transition-colors',
    'hover:text-foreground',
    'focus:outline-none',
    'focus:ring-1',
    'focus:ring-ring',
    'shrink-0',
  ],
  {
    variants: {
      size: {
        sm: ['h-4', 'w-4'],
        default: ['h-5', 'w-5'],
        lg: ['h-6', 'w-6'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DatepickerClearVariants = VariantProps<typeof datepickerClearVariants>;

/**
 * CVA variants for the datepicker panel (overlay).
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border-subtle`, `--radius-overlay`
 */
export const datepickerPanelVariants: (props?: {
  size?: DatepickerSize;
}) => string = cva(
  [
    'z-50',
    'overflow-hidden',
    'rounded-overlay',
    'border',
    'border-border-subtle',
    'bg-popover',
    'text-popover-foreground',
    'shadow-lg',
    'outline-none',
  ],
  {
    variants: {
      size: {
        sm: ['p-2', 'text-xs'],
        default: ['p-3', 'text-sm'],
        lg: ['p-4', 'text-base'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DatepickerPanelVariants = VariantProps<typeof datepickerPanelVariants>;

/**
 * CVA variants for the footer section of the datepicker panel.
 *
 * @tokens `--color-border-subtle`
 */
export const datepickerFooterVariants: (props?: {
  size?: DatepickerSize;
}) => string = cva(
  [
    'flex',
    'items-center',
    'justify-between',
    'border-t',
    'border-border-subtle',
    'mt-3',
    'pt-3',
  ],
  {
    variants: {
      size: {
        sm: ['mt-2', 'pt-2', 'gap-1'],
        default: ['mt-3', 'pt-3', 'gap-2'],
        lg: ['mt-4', 'pt-4', 'gap-3'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DatepickerFooterVariants = VariantProps<typeof datepickerFooterVariants>;

/**
 * CVA variants for the footer buttons.
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`, `--radius-control-sm`
 */
export const datepickerFooterButtonVariants: (props?: {
  size?: DatepickerSize;
  variant?: 'primary' | 'secondary';
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-control-sm',
    'font-medium',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-ring',
    'focus:ring-offset-2',
  ],
  {
    variants: {
      size: {
        sm: ['h-7', 'px-2', 'text-xs'],
        default: ['h-8', 'px-3', 'text-sm'],
        lg: ['h-9', 'px-4', 'text-base'],
      },
      variant: {
        primary: [
          'bg-primary',
          'text-primary-foreground',
          'hover:bg-primary-hover',
        ],
        secondary: [
          'bg-muted',
          'text-muted-foreground',
          'hover:bg-muted-hover',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'secondary',
    },
  }
);

export type DatepickerFooterButtonVariants = VariantProps<typeof datepickerFooterButtonVariants>;

/**
 * CVA variants for the range separator.
 *
 * @tokens `--color-muted-foreground`
 */
export const datepickerRangeSeparatorVariants: (props?: {
  size?: DatepickerSize;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'text-muted-foreground',
    'shrink-0',
  ],
  {
    variants: {
      size: {
        sm: ['px-1', 'text-xs'],
        default: ['px-2', 'text-sm'],
        lg: ['px-3', 'text-base'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DatepickerRangeSeparatorVariants = VariantProps<typeof datepickerRangeSeparatorVariants>;
