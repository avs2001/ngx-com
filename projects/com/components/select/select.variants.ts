import { cva } from 'class-variance-authority';

type TriggerVariant = 'default' | 'ghost' | 'bordered';
type TriggerState = 'default' | 'focused' | 'disabled' | 'error';
type TriggerSize = 'sm' | 'md' | 'lg';
type OptionState = 'default' | 'active' | 'selected' | 'disabled';
type PanelSize = 'sm' | 'md' | 'lg';

/**
 * CVA variants for the select trigger button.
 */
export const selectTriggerVariants: (props?: {
  variant?: TriggerVariant;
  state?: TriggerState;
  size?: TriggerSize;
}) => string = cva(
  [
    'relative',
    'inline-flex',
    'items-center',
    'justify-between',
    'w-full',
    'cursor-pointer',
    'select-none',
    'rounded-lg',
    'border',
    'text-left',
    'transition-colors',
    'duration-150',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-primary-500',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-white',
          'border-surface-300',
          'hover:border-surface-400',
          'dark:bg-surface-900',
          'dark:border-surface-700',
          'dark:hover:border-surface-600',
        ],
        ghost: [
          'bg-transparent',
          'border-transparent',
          'hover:bg-surface-100',
          'dark:hover:bg-surface-800',
        ],
        bordered: [
          'bg-transparent',
          'border-surface-300',
          'hover:border-primary-500',
          'dark:border-surface-600',
          'dark:hover:border-primary-400',
        ],
      },
      state: {
        default: ['text-surface-900', 'dark:text-surface-100'],
        focused: [
          'border-primary-500',
          'ring-2',
          'ring-primary-500',
          'ring-offset-2',
          'dark:border-primary-400',
          'dark:ring-primary-400',
        ],
        disabled: [
          'cursor-not-allowed',
          'opacity-50',
          'pointer-events-none',
          'bg-surface-100',
          'dark:bg-surface-800',
        ],
        error: [
          'border-warn-500',
          'focus-visible:ring-warn-500',
          'dark:border-warn-400',
          'dark:focus-visible:ring-warn-400',
        ],
      },
      size: {
        sm: ['h-8', 'px-2.5', 'py-1', 'text-sm', 'gap-1.5'],
        md: ['h-9', 'px-3', 'py-1.5', 'text-sm', 'gap-2'],
        lg: ['h-10', 'px-3.5', 'py-2', 'text-base', 'gap-2.5'],
      },
    },
    compoundVariants: [
      {
        state: 'disabled',
        variant: 'default',
        class: ['bg-surface-100', 'border-surface-200', 'dark:bg-surface-800', 'dark:border-surface-700'],
      },
    ],
    defaultVariants: {
      variant: 'default',
      state: 'default',
      size: 'md',
    },
  }
);

export type SelectTriggerVariants = {
  variant?: TriggerVariant;
  state?: TriggerState;
  size?: TriggerSize;
};

/**
 * CVA variants for the select panel/dropdown.
 */
export const selectPanelVariants: (props?: { size?: PanelSize }) => string = cva(
  [
    'rounded-lg',
    'border',
    'border-surface-200',
    'bg-white',
    'shadow-lg',
    'outline-none',
    'overflow-hidden',
    'dark:bg-surface-900',
    'dark:border-surface-700',
    // Animation
    'animate-in',
    'fade-in-0',
    'zoom-in-95',
    'duration-150',
  ],
  {
    variants: {
      size: {
        sm: ['text-sm'],
        md: ['text-sm'],
        lg: ['text-base'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type SelectPanelVariants = {
  size?: PanelSize;
};

/**
 * CVA variants for individual select options.
 */
export const selectOptionVariants: (props?: {
  state?: OptionState;
  size?: PanelSize;
}) => string = cva(
  [
    'relative',
    'flex',
    'items-center',
    'w-full',
    'cursor-pointer',
    'select-none',
    'transition-colors',
    'duration-100',
    'outline-none',
  ],
  {
    variants: {
      state: {
        default: [
          'text-surface-900',
          'hover:bg-surface-100',
          'dark:text-surface-100',
          'dark:hover:bg-surface-800',
        ],
        active: [
          'bg-surface-100',
          'text-surface-900',
          'dark:bg-surface-800',
          'dark:text-surface-100',
        ],
        selected: [
          'bg-primary-50',
          'text-primary-900',
          'font-medium',
          'dark:bg-primary-950',
          'dark:text-primary-100',
        ],
        disabled: [
          'text-surface-400',
          'cursor-not-allowed',
          'pointer-events-none',
          'dark:text-surface-600',
        ],
      },
      size: {
        sm: ['px-2.5', 'py-1.5', 'text-sm'],
        md: ['px-3', 'py-2', 'text-sm'],
        lg: ['px-3.5', 'py-2.5', 'text-base'],
      },
    },
    compoundVariants: [
      {
        state: 'active',
        class: ['bg-surface-100', 'dark:bg-surface-800'],
      },
      {
        state: 'selected',
        class: ['bg-primary-50', 'dark:bg-primary-950'],
      },
    ],
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  }
);

export type SelectOptionVariants = {
  state?: OptionState;
  size?: PanelSize;
};
