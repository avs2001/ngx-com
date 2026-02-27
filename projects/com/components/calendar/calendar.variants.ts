import { cva } from 'class-variance-authority';

/**
 * CVA variants for the main calendar container.
 */
export const calendarVariants: () => string = cva(
  [
    'com-calendar',
    'inline-block',
    'p-2',
    'bg-white',
    'dark:bg-gray-900',
    'rounded-lg',
    'shadow-sm',
    'border',
    'border-gray-200',
    'dark:border-gray-700',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export type CalendarVariants = Record<string, never>;
