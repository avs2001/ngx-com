import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

/**
 * Variant type for dropdown trigger appearance.
 */
export type DropdownVariant = 'default' | 'outline' | 'ghost' | 'filled';

/**
 * Size type for dropdown components.
 */
export type DropdownSize = 'sm' | 'default' | 'lg';

/**
 * State type for validation states.
 */
export type DropdownState = 'default' | 'error' | 'success';

/**
 * Option state for styling.
 */
type OptionState = 'default' | 'active' | 'selected' | 'selected-active' | 'disabled';

/**
 * Tag variant type.
 */
type TagVariant = 'default' | 'primary';

/**
 * CVA variants for the dropdown trigger button.
 * Uses Tailwind 4 theme tokens for consistent theming.
 */
export const dropdownTriggerVariants: (props?: {
  variant?: DropdownVariant;
  size?: DropdownSize;
  state?: DropdownState;
  open?: boolean;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-between',
    'w-full',
    'rounded-md',
    'border',
    'bg-surface-50',
    'text-surface-900',
    'ring-offset-surface-50',
    'transition-colors',
    'duration-150',
    'placeholder:text-surface-400',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-primary-500',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'dark:bg-surface-900',
    'dark:text-surface-100',
    'dark:ring-offset-surface-900',
    'dark:placeholder:text-surface-500',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-surface-300',
          'hover:border-surface-400',
          'dark:border-surface-600',
          'dark:hover:border-surface-500',
        ],
        outline: [
          'border-2',
          'border-surface-300',
          'hover:border-surface-900',
          'dark:border-surface-600',
          'dark:hover:border-surface-100',
        ],
        ghost: [
          'border-transparent',
          'bg-transparent',
          'hover:bg-surface-100',
          'dark:hover:bg-surface-800',
        ],
        filled: [
          'border-transparent',
          'bg-surface-100',
          'hover:bg-surface-200',
          'dark:bg-surface-800',
          'dark:hover:bg-surface-700',
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
          'border-warn-500',
          'focus:ring-warn-500',
          'dark:border-warn-400',
          'dark:focus:ring-warn-400',
        ],
        success: [
          'border-success-500',
          'focus:ring-success-500',
          'dark:border-success-400',
          'dark:focus:ring-success-400',
        ],
      },
      open: {
        true: ['ring-2', 'ring-primary-500', 'border-primary-500'],
        false: [],
      },
    },
    compoundVariants: [
      {
        open: true,
        variant: 'default',
        class: ['border-primary-500', 'dark:border-primary-400'],
      },
      {
        open: true,
        variant: 'outline',
        class: ['border-primary-500', 'dark:border-primary-400'],
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

export type DropdownTriggerVariants = VariantProps<typeof dropdownTriggerVariants>;

/**
 * CVA variants for the dropdown panel (overlay).
 */
export const dropdownPanelVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'z-50',
    'overflow-hidden',
    'rounded-md',
    'border',
    'border-surface-200',
    'bg-surface-50',
    'text-surface-900',
    'shadow-lg',
    'outline-none',
    'dark:border-surface-700',
    'dark:bg-surface-900',
    'dark:text-surface-100',
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

export type DropdownPanelVariants = VariantProps<typeof dropdownPanelVariants>;

/**
 * CVA variants for individual dropdown options.
 */
export const dropdownOptionVariants: (props?: {
  size?: DropdownSize;
  state?: OptionState;
}) => string = cva(
  [
    'relative',
    'flex',
    'w-full',
    'cursor-pointer',
    'select-none',
    'items-center',
    'outline-none',
    'transition-colors',
    'duration-100',
  ],
  {
    variants: {
      size: {
        sm: ['px-2', 'py-1.5', 'text-xs'],
        default: ['px-3', 'py-2', 'text-sm'],
        lg: ['px-4', 'py-3', 'text-base'],
      },
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
          'bg-primary-100',
          'text-primary-900',
          'dark:bg-primary-900',
          'dark:text-primary-100',
        ],
        'selected-active': [
          'bg-primary-200',
          'text-primary-900',
          'dark:bg-primary-800',
          'dark:text-primary-100',
        ],
        disabled: [
          'cursor-not-allowed',
          'opacity-50',
          'text-surface-400',
          'hover:bg-transparent',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  }
);

export type DropdownOptionVariants = VariantProps<typeof dropdownOptionVariants>;

/**
 * CVA variants for the search input.
 */
export const dropdownSearchVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'flex',
    'h-10',
    'w-full',
    'border-b',
    'border-surface-200',
    'bg-transparent',
    'px-3',
    'py-2',
    'text-sm',
    'placeholder:text-surface-400',
    'outline-none',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'dark:border-surface-700',
    'dark:placeholder:text-surface-500',
  ],
  {
    variants: {
      size: {
        sm: ['h-8', 'px-2', 'text-xs'],
        default: ['h-10', 'px-3', 'text-sm'],
        lg: ['h-12', 'px-4', 'text-base'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DropdownSearchVariants = VariantProps<typeof dropdownSearchVariants>;

/**
 * CVA variants for multi-select tags.
 */
export const dropdownTagVariants: (props?: {
  size?: DropdownSize;
  variant?: TagVariant;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'gap-1',
    'rounded',
    'font-medium',
    'transition-colors',
    'duration-100',
  ],
  {
    variants: {
      size: {
        sm: ['h-5', 'px-1.5', 'text-xs'],
        default: ['h-6', 'px-2', 'text-xs'],
        lg: ['h-7', 'px-2.5', 'text-sm'],
      },
      variant: {
        default: [
          'bg-surface-200',
          'text-surface-700',
          'hover:bg-surface-300',
          'dark:bg-surface-700',
          'dark:text-surface-200',
          'dark:hover:bg-surface-600',
        ],
        primary: [
          'bg-primary-100',
          'text-primary-700',
          'hover:bg-primary-200',
          'dark:bg-primary-900',
          'dark:text-primary-200',
          'dark:hover:bg-primary-800',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
  }
);

export type DropdownTagVariants = VariantProps<typeof dropdownTagVariants>;

/**
 * CVA variants for the tag remove button.
 */
export const dropdownTagRemoveVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-sm',
    'opacity-70',
    'transition-opacity',
    'hover:opacity-100',
    'focus:outline-none',
    'focus:ring-1',
    'focus:ring-primary-500',
  ],
  {
    variants: {
      size: {
        sm: ['h-3', 'w-3'],
        default: ['h-3.5', 'w-3.5'],
        lg: ['h-4', 'w-4'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DropdownTagRemoveVariants = VariantProps<typeof dropdownTagRemoveVariants>;

/**
 * CVA variants for the overflow badge (+N indicator).
 */
export const dropdownOverflowBadgeVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded',
    'font-medium',
    'text-surface-600',
    'bg-surface-200',
    'dark:text-surface-400',
    'dark:bg-surface-700',
  ],
  {
    variants: {
      size: {
        sm: ['h-5', 'px-1.5', 'text-xs'],
        default: ['h-6', 'px-2', 'text-xs'],
        lg: ['h-7', 'px-2.5', 'text-sm'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DropdownOverflowBadgeVariants = VariantProps<typeof dropdownOverflowBadgeVariants>;

/**
 * CVA variants for group headers.
 */
export const dropdownGroupVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'flex',
    'items-center',
    'px-3',
    'py-2',
    'text-xs',
    'font-semibold',
    'uppercase',
    'tracking-wider',
    'text-surface-500',
    'dark:text-surface-400',
  ],
  {
    variants: {
      size: {
        sm: ['px-2', 'py-1.5'],
        default: ['px-3', 'py-2'],
        lg: ['px-4', 'py-2.5'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DropdownGroupVariants = VariantProps<typeof dropdownGroupVariants>;

/**
 * CVA variants for the empty state.
 */
export const dropdownEmptyVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'px-3',
    'py-6',
    'text-surface-500',
    'dark:text-surface-400',
  ],
  {
    variants: {
      size: {
        sm: ['px-2', 'py-4', 'text-xs'],
        default: ['px-3', 'py-6', 'text-sm'],
        lg: ['px-4', 'py-8', 'text-base'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type DropdownEmptyVariants = VariantProps<typeof dropdownEmptyVariants>;

/**
 * CVA variants for the clear button.
 */
export const dropdownClearVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-sm',
    'opacity-50',
    'transition-opacity',
    'hover:opacity-100',
    'focus:outline-none',
    'focus:ring-1',
    'focus:ring-primary-500',
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

export type DropdownClearVariants = VariantProps<typeof dropdownClearVariants>;

/**
 * CVA variants for the chevron icon.
 */
export const dropdownChevronVariants: (props?: {
  size?: DropdownSize;
  open?: boolean;
}) => string = cva(
  [
    'shrink-0',
    'opacity-50',
    'transition-transform',
    'duration-200',
  ],
  {
    variants: {
      size: {
        sm: ['h-3', 'w-3'],
        default: ['h-4', 'w-4'],
        lg: ['h-5', 'w-5'],
      },
      open: {
        true: ['rotate-180'],
        false: ['rotate-0'],
      },
    },
    defaultVariants: {
      size: 'default',
      open: false,
    },
  }
);

export type DropdownChevronVariants = VariantProps<typeof dropdownChevronVariants>;
