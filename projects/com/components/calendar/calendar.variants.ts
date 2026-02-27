import { cva } from 'class-variance-authority';

/**
 * CVA variants for the main calendar container.
 */
export const calendarVariants: () => string = cva(
  [
    'com-calendar',
    'inline-block',
    'p-2',
    'bg-surface-50',
    'dark:bg-surface-950',
    'rounded-lg',
    'shadow-sm',
    'border',
    'border-surface-200',
    'dark:border-surface-700',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export type CalendarVariants = Record<string, never>;
