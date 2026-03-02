import { cva, type VariantProps } from 'class-variance-authority';

export type IconColor = 'current' | 'primary' | 'accent' | 'warn' | 'success' | 'muted' | 'disabled';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const iconVariants: (props?: { color?: IconColor; size?: IconSize }) => string = cva(
  'inline-flex items-center justify-center shrink-0 align-middle',
  {
    variants: {
      color: {
        current: '',
        primary: 'text-primary',
        accent: 'text-accent',
        warn: 'text-warn',
        success: 'text-success',
        muted: 'text-muted-foreground',
        disabled: 'text-disabled-foreground',
      },
      size: {
        xs: 'size-icon-xs',
        sm: 'size-icon-sm',
        md: 'size-icon-md',
        lg: 'size-icon-lg',
        xl: 'size-icon-xl',
        '2xl': 'size-icon-2xl',
      },
    },
    defaultVariants: {
      color: 'current',
      size: 'lg',
    },
  }
);

/** Pixel values matching the CSS tokens — passed to Lucide's numeric [size] prop */
export const ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

export type IconVariants = VariantProps<typeof iconVariants>;
