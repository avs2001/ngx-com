import { cva } from 'class-variance-authority';

type ButtonType = 'navigation' | 'period';

/**
 * CVA variants for the calendar header container.
 */
export const calendarHeaderVariants: () => string = cva(
  [
    'flex',
    'items-center',
    'justify-between',
    'px-2',
    'py-1',
    'mb-2',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export type CalendarHeaderVariants = Record<string, never>;

/**
 * CVA variants for the calendar header buttons.
 */
export const calendarHeaderButtonVariants: (props?: { type?: ButtonType }) => string = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'select-none',
    'transition-colors',
    'duration-150',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-blue-500',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    variants: {
      type: {
        navigation: [
          'h-9',
          'w-9',
          'rounded-full',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-800',
        ],
        period: [
          'px-3',
          'py-1.5',
          'text-sm',
          'font-semibold',
          'rounded-lg',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-800',
        ],
      },
    },
    defaultVariants: {
      type: 'navigation',
    },
  }
);

export type CalendarHeaderButtonVariants = {
  type?: ButtonType;
};
