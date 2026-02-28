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
 * Uses semantic theme tokens for consistent cross-theme styling.
 *
 * @tokens `--color-input-background`, `--color-input-foreground`, `--color-input-border`,
 *         `--color-input-placeholder`, `--color-ring`, `--color-muted`, `--color-muted-hover`,
 *         `--color-warn`, `--color-success`, `--color-primary`, `--color-border`
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
    'bg-input-background',
    'text-input-foreground',
    'ring-offset-background',
    'transition-colors',
    'duration-150',
    'placeholder:text-input-placeholder',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-ring',
    'disabled:cursor-not-allowed',
    'disabled:bg-disabled',
    'disabled:text-disabled-foreground',
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
          'focus:ring-warn',
        ],
        success: [
          'border-success',
          'focus:ring-success',
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

export type DropdownTriggerVariants = VariantProps<typeof dropdownTriggerVariants>;

/**
 * CVA variants for the dropdown panel (overlay).
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border-subtle`
 */
export const dropdownPanelVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'z-50',
    'overflow-hidden',
    'rounded-md',
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
 *
 * @tokens `--color-popover-foreground`, `--color-muted`, `--color-primary-subtle`,
 *         `--color-primary-subtle-foreground`, `--color-disabled-foreground`
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
          'text-popover-foreground',
          'hover:bg-muted',
        ],
        active: [
          'bg-muted',
          'text-popover-foreground',
        ],
        selected: [
          'bg-primary-subtle',
          'text-primary-subtle-foreground',
        ],
        'selected-active': [
          'bg-primary-subtle',
          'text-primary-subtle-foreground',
          'brightness-95',
        ],
        disabled: [
          'cursor-not-allowed',
          'text-disabled-foreground',
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
 *
 * @tokens `--color-border-subtle`, `--color-input-placeholder`, `--color-disabled-foreground`
 */
export const dropdownSearchVariants: (props?: {
  size?: DropdownSize;
}) => string = cva(
  [
    'flex',
    'h-10',
    'w-full',
    'border-b',
    'border-border-subtle',
    'bg-transparent',
    'px-3',
    'py-2',
    'text-sm',
    'placeholder:text-input-placeholder',
    'outline-none',
    'disabled:cursor-not-allowed',
    'disabled:text-disabled-foreground',
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
 *
 * @tokens `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-primary-subtle`, `--color-primary-subtle-foreground`
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
          'bg-muted',
          'text-muted-foreground',
          'hover:bg-muted-hover',
        ],
        primary: [
          'bg-primary-subtle',
          'text-primary-subtle-foreground',
          'hover:brightness-95',
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
 *
 * @tokens `--color-ring`
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
    'focus:ring-ring',
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
 *
 * @tokens `--color-muted`, `--color-muted-foreground`
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
    'text-muted-foreground',
    'bg-muted',
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
 *
 * @tokens `--color-muted-foreground`
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
    'text-muted-foreground',
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
 *
 * @tokens `--color-muted-foreground`
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
    'text-muted-foreground',
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
 *
 * @tokens `--color-ring`
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
    'focus:ring-ring',
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
