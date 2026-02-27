import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

type CellView = 'month' | 'year' | 'multi-year';
type CellState =
  | 'default'
  | 'today'
  | 'selected'
  | 'range-start'
  | 'range-middle'
  | 'range-end'
  | 'preview-start'
  | 'preview-middle'
  | 'preview-end'
  | 'disabled';
type WrapperRange = 'none' | 'start' | 'middle' | 'end' | 'single';

/**
 * CVA variants for calendar cell styling.
 * Uses Tailwind CSS v4 classes for consistent, accessible styling.
 */
export const calendarCellVariants: (props?: {
  view?: CellView;
  state?: CellState;
  outside?: boolean;
}) => string = cva(
  // Base styles applied to all cells
  [
    'relative',
    'flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'select-none',
    'transition-colors',
    'duration-150',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-primary-500',
  ],
  {
    variants: {
      view: {
        month: ['h-9', 'w-9', 'text-sm', 'rounded-full'],
        year: ['h-10', 'w-16', 'text-sm', 'rounded-lg'],
        'multi-year': ['h-10', 'w-14', 'text-sm', 'rounded-lg'],
      },
      state: {
        default: ['text-surface-900', 'hover:bg-surface-100', 'dark:text-surface-100', 'dark:hover:bg-surface-800'],
        today: [
          'text-primary-600',
          'font-semibold',
          'ring-1',
          'ring-primary-500',
          'hover:bg-primary-50',
          'dark:text-primary-400',
          'dark:ring-primary-400',
          'dark:hover:bg-primary-950',
        ],
        selected: [
          'bg-primary-600',
          'text-white',
          'font-semibold',
          'hover:bg-primary-700',
          'dark:bg-primary-500',
          'dark:hover:bg-primary-600',
        ],
        'range-start': [
          'bg-primary-600',
          'text-white',
          'font-semibold',
          'rounded-l-full',
          'rounded-r-none',
          'hover:bg-primary-700',
          'dark:bg-primary-500',
        ],
        'range-middle': [
          'bg-primary-100',
          'text-primary-900',
          'rounded-none',
          'hover:bg-primary-200',
          'dark:bg-primary-900',
          'dark:text-primary-100',
        ],
        'range-end': [
          'bg-primary-600',
          'text-white',
          'font-semibold',
          'rounded-r-full',
          'rounded-l-none',
          'hover:bg-primary-700',
          'dark:bg-primary-500',
        ],
        'preview-start': [
          'bg-primary-50',
          'text-primary-700',
          'rounded-l-full',
          'rounded-r-none',
          'ring-1',
          'ring-primary-300',
          'dark:bg-primary-950',
          'dark:text-primary-300',
        ],
        'preview-middle': [
          'bg-primary-50',
          'text-primary-700',
          'rounded-none',
          'dark:bg-primary-950',
          'dark:text-primary-300',
        ],
        'preview-end': [
          'bg-primary-50',
          'text-primary-700',
          'rounded-r-full',
          'rounded-l-none',
          'ring-1',
          'ring-primary-300',
          'dark:bg-primary-950',
          'dark:text-primary-300',
        ],
        disabled: ['text-surface-400', 'cursor-not-allowed', 'hover:bg-transparent', 'dark:text-surface-600'],
      },
      outside: {
        true: ['text-surface-400', 'dark:text-surface-600'],
        false: [],
      },
    },
    compoundVariants: [
      {
        state: 'disabled',
        outside: true,
        class: ['text-surface-300', 'dark:text-surface-700'],
      },
      {
        state: 'selected',
        class: ['ring-0'],
      },
    ],
    defaultVariants: {
      view: 'month',
      state: 'default',
      outside: false,
    },
  }
);

export type CalendarCellVariants = {
  view?: CellView;
  state?: CellState;
  outside?: boolean;
};

/**
 * CVA variants for the calendar cell wrapper (used for range backgrounds)
 */
export const calendarCellWrapperVariants: (props?: { range?: WrapperRange | undefined }) => string = cva(
  ['relative', 'flex', 'items-center', 'justify-center'],
  {
    variants: {
      range: {
        none: [],
        start: ['bg-primary-100', 'rounded-l-full', 'dark:bg-primary-900/50'],
        middle: ['bg-primary-100', 'dark:bg-primary-900/50'],
        end: ['bg-primary-100', 'rounded-r-full', 'dark:bg-primary-900/50'],
        single: [],
      },
    },
    defaultVariants: {
      range: 'none',
    },
  }
);

export type CalendarCellWrapperVariants = {
  range?: WrapperRange | undefined;
};
