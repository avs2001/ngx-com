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
 * Uses semantic theme tokens for consistent cross-theme styling.
 *
 * @tokens `--color-ring`, `--color-foreground`, `--color-muted`,
 *         `--color-primary`, `--color-primary-foreground`, `--color-primary-hover`,
 *         `--color-primary-subtle`, `--color-primary-subtle-foreground`,
 *         `--color-disabled-foreground`
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
    'focus-visible:ring-ring',
  ],
  {
    variants: {
      view: {
        month: ['h-9', 'w-9', 'text-sm', 'rounded-full'],
        year: ['h-10', 'w-16', 'text-sm', 'rounded-lg'],
        'multi-year': ['h-10', 'w-14', 'text-sm', 'rounded-lg'],
      },
      state: {
        default: ['text-foreground', 'hover:bg-muted'],
        today: [
          'text-primary',
          'font-semibold',
          'ring-1',
          'ring-ring',
          'hover:bg-primary-subtle',
        ],
        selected: [
          'bg-primary',
          'text-primary-foreground',
          'font-semibold',
          'hover:bg-primary-hover',
        ],
        'range-start': [
          'bg-primary',
          'text-primary-foreground',
          'font-semibold',
          'rounded-l-full',
          'rounded-r-none',
          'hover:bg-primary-hover',
        ],
        'range-middle': [
          'bg-primary-subtle',
          'text-primary-subtle-foreground',
          'rounded-none',
          'hover:brightness-95',
        ],
        'range-end': [
          'bg-primary',
          'text-primary-foreground',
          'font-semibold',
          'rounded-r-full',
          'rounded-l-none',
          'hover:bg-primary-hover',
        ],
        'preview-start': [
          'bg-primary-subtle',
          'text-primary-subtle-foreground',
          'rounded-l-full',
          'rounded-r-none',
          'ring-1',
          'ring-ring',
          'opacity-70',
        ],
        'preview-middle': [
          'bg-primary-subtle',
          'text-primary-subtle-foreground',
          'rounded-none',
          'opacity-70',
        ],
        'preview-end': [
          'bg-primary-subtle',
          'text-primary-subtle-foreground',
          'rounded-r-full',
          'rounded-l-none',
          'ring-1',
          'ring-ring',
          'opacity-70',
        ],
        disabled: ['text-disabled-foreground', 'cursor-not-allowed', 'hover:bg-transparent'],
      },
      outside: {
        true: ['text-muted-foreground'],
        false: [],
      },
    },
    compoundVariants: [
      {
        state: 'disabled',
        outside: true,
        class: ['text-disabled-foreground', 'opacity-50'],
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
 *
 * @tokens `--color-primary-subtle`
 */
export const calendarCellWrapperVariants: (props?: { range?: WrapperRange | undefined }) => string = cva(
  ['relative', 'flex', 'items-center', 'justify-center'],
  {
    variants: {
      range: {
        none: [],
        start: ['bg-primary-subtle', 'rounded-l-full'],
        middle: ['bg-primary-subtle'],
        end: ['bg-primary-subtle', 'rounded-r-full'],
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
