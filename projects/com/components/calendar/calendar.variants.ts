import { cva, type VariantProps } from 'class-variance-authority';

/**
 * CVA variants for the main calendar container.
 *
 * @tokens `--color-background`, `--color-border-subtle`
 */
export const calendarVariants: () => string = cva(
  [
    'com-calendar',
    'inline-block',
    'p-2',
    'bg-background',
    'rounded-lg',
    'shadow-sm',
    'border',
    'border-border-subtle',
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

export type CalendarVariants = Record<string, never>;

/**
 * CVA variants for the months container in month view.
 * Handles single vs dual-month layouts.
 */
export const monthsContainerVariants: (props?: { columns?: 1 | 2 }) => string = cva('', {
  variants: {
    columns: {
      1: '',
      2: 'flex gap-4',
    },
  },
  defaultVariants: {
    columns: 1,
  },
});

export type MonthsContainerVariants = VariantProps<typeof monthsContainerVariants>;
