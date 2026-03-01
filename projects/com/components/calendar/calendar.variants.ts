import { cva, type VariantProps } from 'class-variance-authority';

/**
 * CVA variants for the main calendar container.
 *
 * @tokens `--color-background`, `--color-border-subtle`, `--radius-calendar`
 */
export const calendarVariants: (props?: { bordered?: boolean }) => string = cva(
  [
    'com-calendar',
    'inline-block',
    'p-2',
    'bg-background',
  ],
  {
    variants: {
      bordered: {
        true: ['rounded-calendar', 'shadow-sm', 'border', 'border-border-subtle'],
        false: [],
      },
    },
    defaultVariants: {
      bordered: true,
    },
  }
);

export type CalendarVariants = VariantProps<typeof calendarVariants>;

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
