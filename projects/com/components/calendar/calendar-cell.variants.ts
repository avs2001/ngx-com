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
    'focus-visible:ring-blue-500',
  ],
  {
    variants: {
      view: {
        month: ['h-9', 'w-9', 'text-sm', 'rounded-full'],
        year: ['h-10', 'w-16', 'text-sm', 'rounded-lg'],
        'multi-year': ['h-10', 'w-14', 'text-sm', 'rounded-lg'],
      },
      state: {
        default: ['text-gray-900', 'hover:bg-gray-100', 'dark:text-gray-100', 'dark:hover:bg-gray-800'],
        today: [
          'text-blue-600',
          'font-semibold',
          'ring-1',
          'ring-blue-500',
          'hover:bg-blue-50',
          'dark:text-blue-400',
          'dark:ring-blue-400',
          'dark:hover:bg-blue-950',
        ],
        selected: [
          'bg-blue-600',
          'text-white',
          'font-semibold',
          'hover:bg-blue-700',
          'dark:bg-blue-500',
          'dark:hover:bg-blue-600',
        ],
        'range-start': [
          'bg-blue-600',
          'text-white',
          'font-semibold',
          'rounded-l-full',
          'rounded-r-none',
          'hover:bg-blue-700',
          'dark:bg-blue-500',
        ],
        'range-middle': [
          'bg-blue-100',
          'text-blue-900',
          'rounded-none',
          'hover:bg-blue-200',
          'dark:bg-blue-900',
          'dark:text-blue-100',
        ],
        'range-end': [
          'bg-blue-600',
          'text-white',
          'font-semibold',
          'rounded-r-full',
          'rounded-l-none',
          'hover:bg-blue-700',
          'dark:bg-blue-500',
        ],
        'preview-start': [
          'bg-blue-50',
          'text-blue-700',
          'rounded-l-full',
          'rounded-r-none',
          'ring-1',
          'ring-blue-300',
          'dark:bg-blue-950',
          'dark:text-blue-300',
        ],
        'preview-middle': [
          'bg-blue-50',
          'text-blue-700',
          'rounded-none',
          'dark:bg-blue-950',
          'dark:text-blue-300',
        ],
        'preview-end': [
          'bg-blue-50',
          'text-blue-700',
          'rounded-r-full',
          'rounded-l-none',
          'ring-1',
          'ring-blue-300',
          'dark:bg-blue-950',
          'dark:text-blue-300',
        ],
        disabled: ['text-gray-400', 'cursor-not-allowed', 'hover:bg-transparent', 'dark:text-gray-600'],
      },
      outside: {
        true: ['text-gray-400', 'dark:text-gray-600'],
        false: [],
      },
    },
    compoundVariants: [
      {
        state: 'disabled',
        outside: true,
        class: ['text-gray-300', 'dark:text-gray-700'],
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
        start: ['bg-blue-100', 'rounded-l-full', 'dark:bg-blue-900/50'],
        middle: ['bg-blue-100', 'dark:bg-blue-900/50'],
        end: ['bg-blue-100', 'rounded-r-full', 'dark:bg-blue-900/50'],
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
