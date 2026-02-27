import { cva, type VariantProps } from 'class-variance-authority';
import type { ComSelectSize } from './select.types';

/** Trigger variant state */
type TriggerState = 'default' | 'focused' | 'open' | 'disabled' | 'invalid';

/** Option variant state */
type OptionState = 'default' | 'active' | 'selected' | 'disabled';

/**
 * CVA variants for the select trigger element.
 */
export const triggerVariants: (props?: { state?: TriggerState; size?: ComSelectSize }) => string =
  cva(
    'flex items-center gap-2 w-full rounded-md border bg-surface-50 text-surface-900 font-sans cursor-pointer transition-colors',
    {
      variants: {
        state: {
          default: 'border-surface-300 hover:border-surface-400',
          focused: 'border-primary-500 ring-2 ring-primary-500/20',
          open: 'border-primary-500 ring-2 ring-primary-500/20',
          disabled: 'bg-surface-100 text-surface-400 cursor-not-allowed',
          invalid: 'border-warn-500 hover:border-warn-600',
        },
        size: {
          sm: 'h-8 px-2.5 text-sm',
          md: 'h-10 px-3 text-base',
          lg: 'h-12 px-4 text-lg',
        },
      },
      defaultVariants: {
        state: 'default',
        size: 'md',
      },
    }
  );

export type TriggerVariants = VariantProps<typeof triggerVariants>;

/**
 * CVA variants for select option items.
 */
export const optionVariants: (props?: { state?: OptionState }) => string = cva(
  'flex items-center px-3 min-h-9 rounded-md cursor-pointer transition-colors truncate',
  {
    variants: {
      state: {
        default: 'text-surface-900 hover:bg-surface-100',
        active: 'bg-surface-100 ring-2 ring-primary-500 ring-offset-[-2px]',
        selected: 'bg-primary-50 text-primary-700 hover:bg-primary-100',
        disabled: 'text-surface-400 opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export type OptionVariants = VariantProps<typeof optionVariants>;

/**
 * CVA variants for the select dialog panel.
 */
export const dialogVariants: (props?: { size?: ComSelectSize }) => string = cva(
  'rounded-lg border border-surface-200 bg-surface-50 shadow-lg overflow-hidden p-1',
  {
    variants: {
      size: {
        sm: 'max-h-56',
        md: 'max-h-72',
        lg: 'max-h-96',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type DialogVariants = VariantProps<typeof dialogVariants>;
