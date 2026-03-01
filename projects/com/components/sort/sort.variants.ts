import { cva } from 'class-variance-authority';

// ─── Type Exports ───

/** Sort direction — three states */
export type SortDirection = 'asc' | 'desc' | undefined;

/** Configures the three-state sort cycle */
export type SortCycle = SortDirection[];

/** Emitted when sort state changes */
export interface SortEvent {
  /** The active column id, or undefined if unsorted */
  active: string | undefined;
  /** The sort direction */
  direction: SortDirection;
}

// ─── Sort Header Variants ───

/**
 * @tokens `--color-foreground`, `--color-muted-foreground`
 */
export const sortHeaderVariants: (props?: {
  sortable?: boolean;
  active?: boolean;
  disabled?: boolean;
}) => string = cva(
  ['inline-flex items-center gap-1.5', 'select-none', 'transition-colors duration-150'],
  {
    variants: {
      sortable: {
        true: 'cursor-pointer hover:text-foreground',
        false: 'cursor-default',
      },
      active: {
        true: 'text-foreground',
        false: 'text-muted-foreground',
      },
      disabled: {
        true: 'text-disabled-foreground cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      sortable: true,
      active: false,
      disabled: false,
    },
  }
);

// ─── Sort Icon Variants ───

/**
 * @tokens `--color-foreground`, `--color-muted-foreground`
 */
export const sortIconVariants: (props?: {
  size?: 'sm' | 'md' | 'lg';
  state?: 'asc' | 'desc' | 'unsorted' | 'hidden';
}) => string = cva(
  ['inline-flex items-center justify-center', 'shrink-0', 'transition-all duration-200 ease-out'],
  {
    variants: {
      size: {
        sm: 'size-3',
        md: 'size-3.5',
        lg: 'size-4',
      },
      state: {
        asc: 'opacity-100 rotate-0',
        desc: 'opacity-100 rotate-180',
        unsorted: 'opacity-40 rotate-0',
        hidden: 'opacity-0 scale-75',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'hidden',
    },
  }
);
