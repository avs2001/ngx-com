import { cva, type VariantProps } from 'class-variance-authority';

// ─── Type Definitions ───

export type MenuSize = 'sm' | 'md' | 'lg';
export type MenuVariant = 'default' | 'compact';
export type MenuPosition = 'above' | 'below' | 'left' | 'right';
export type MenuAlignment = 'start' | 'center' | 'end';

// ─── Menu Panel Variants ───

/**
 * Menu panel styling variants.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`, `--shadow-lg`
 */
export const menuPanelVariants: ReturnType<
  typeof cva<{ size: Record<MenuSize, string>; variant: Record<MenuVariant, string> }>
> = cva(
  [
    'bg-popover text-popover-foreground',
    'border border-border',
    'rounded-xl shadow-lg',
    'overflow-hidden',
    'py-1',
  ],
  {
    variants: {
      size: {
        sm: 'min-w-32',
        md: 'min-w-48',
        lg: 'min-w-64',
      },
      variant: {
        default: '',
        compact: 'py-0.5',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

export type MenuPanelVariants = VariantProps<typeof menuPanelVariants>;

// ─── Menu Item Variants ───

type BooleanVariant = Record<'true' | 'false', string>;

/**
 * Menu item styling variants (base for all item types).
 *
 * @tokens `--color-popover-foreground`, `--color-foreground`, `--color-muted`, `--color-warn`, `--color-warn-subtle`
 */
export const menuItemVariants: ReturnType<
  typeof cva<{
    size: Record<MenuSize, string>;
    focused: BooleanVariant;
    disabled: BooleanVariant;
    destructive: BooleanVariant;
  }>
> = cva(
  [
    'relative flex items-center w-full',
    'text-sm text-popover-foreground',
    'outline-none select-none',
    'transition-colors duration-75',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 py-1 gap-2',
        md: 'px-3 py-1.5 gap-2.5',
        lg: 'px-4 py-2 gap-3',
      },
      focused: {
        true: 'bg-muted text-foreground',
        false: '',
      },
      disabled: {
        true: 'bg-disabled text-disabled-foreground pointer-events-none',
        false: 'cursor-pointer',
      },
      destructive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { destructive: true, focused: true, class: 'bg-warn-subtle text-warn' },
      { destructive: true, focused: false, class: 'text-warn' },
    ],
    defaultVariants: {
      size: 'md',
      focused: false,
      disabled: false,
      destructive: false,
    },
  },
);

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;

// ─── Menu Label Variants ───

/**
 * Menu label (section header) styling variants.
 *
 * @tokens `--color-muted-foreground`
 */
export const menuLabelVariants: ReturnType<typeof cva<{ size: Record<MenuSize, string> }>> = cva(
  'text-muted-foreground font-medium select-none',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type MenuLabelVariants = VariantProps<typeof menuLabelVariants>;

// ─── Check/Radio Indicator Variants ───

/**
 * Check/radio indicator sizing variants.
 */
export const menuCheckIndicatorVariants: ReturnType<typeof cva<{ size: Record<MenuSize, string> }>> = cva(
  'inline-flex items-center justify-center shrink-0',
  {
    variants: {
      size: {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type MenuCheckIndicatorVariants = VariantProps<typeof menuCheckIndicatorVariants>;

// ─── Keyboard Shortcut Hint Variants ───

/**
 * Keyboard shortcut hint styling variants.
 *
 * @tokens `--color-muted-foreground`
 */
export const menuShortcutVariants: ReturnType<typeof cva<{ size: Record<MenuSize, string> }>> = cva(
  'ml-auto text-muted-foreground tracking-widest',
  {
    variants: {
      size: {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-xs',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type MenuShortcutVariants = VariantProps<typeof menuShortcutVariants>;
