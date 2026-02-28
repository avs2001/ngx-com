import { cva, type VariantProps } from 'class-variance-authority';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonColor = 'primary' | 'accent' | 'warn' | 'muted';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export const buttonVariants: (props?: {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
}) => string = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium whitespace-nowrap select-none',
    'transition-colors duration-150',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground',
    'aria-disabled:pointer-events-none aria-disabled:bg-disabled aria-disabled:text-disabled-foreground',
  ],
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-transparent',
        ghost: 'bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline',
      },
      color: {
        primary: '',
        accent: '',
        warn: '',
        muted: '',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
        md: 'h-10 px-4 text-sm rounded-lg gap-2',
        lg: 'h-12 px-6 text-base rounded-lg gap-2.5',
        icon: 'h-10 w-10 rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // Solid variants
      { variant: 'solid', color: 'primary', class: 'bg-primary text-primary-foreground hover:bg-primary-hover' },
      { variant: 'solid', color: 'accent', class: 'bg-accent text-accent-foreground hover:bg-accent-hover' },
      { variant: 'solid', color: 'warn', class: 'bg-warn text-warn-foreground hover:bg-warn-hover' },
      { variant: 'solid', color: 'muted', class: 'bg-muted text-muted-foreground hover:bg-muted-hover' },

      // Outline variants
      { variant: 'outline', color: 'primary', class: 'border-primary text-primary hover:bg-primary-subtle' },
      { variant: 'outline', color: 'accent', class: 'border-accent text-accent hover:bg-accent-subtle' },
      { variant: 'outline', color: 'warn', class: 'border-warn text-warn hover:bg-warn-subtle' },
      { variant: 'outline', color: 'muted', class: 'border-border text-muted-foreground hover:bg-muted' },

      // Ghost variants
      { variant: 'ghost', color: 'primary', class: 'text-primary hover:bg-primary-subtle' },
      { variant: 'ghost', color: 'accent', class: 'text-accent hover:bg-accent-subtle' },
      { variant: 'ghost', color: 'warn', class: 'text-warn hover:bg-warn-subtle' },
      { variant: 'ghost', color: 'muted', class: 'text-muted-foreground hover:bg-muted' },

      // Link variants
      { variant: 'link', color: 'primary', class: 'text-primary' },
      { variant: 'link', color: 'accent', class: 'text-accent' },
      { variant: 'link', color: 'warn', class: 'text-warn' },
      { variant: 'link', color: 'muted', class: 'text-muted-foreground' },

      // Link size override — remove height/padding constraints
      { variant: 'link', size: 'sm', class: 'h-auto px-0' },
      { variant: 'link', size: 'md', class: 'h-auto px-0' },
      { variant: 'link', size: 'lg', class: 'h-auto px-0' },
      { variant: 'link', size: 'icon', class: 'h-auto w-auto px-0' },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
