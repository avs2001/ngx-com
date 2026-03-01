import { cva, type VariantProps } from 'class-variance-authority';

// ─── Type Exports ───

export type TabVariant = 'underline' | 'pill' | 'outline' | 'solid';
export type TabSize = 'sm' | 'md' | 'lg';
export type TabColor = 'primary' | 'accent' | 'muted';
export type TabAlignment = 'start' | 'center' | 'end' | 'stretch';

// ─── Tab Button / Link ───

export const tabItemVariants: (props?: {
  variant?: TabVariant;
  size?: TabSize;
  color?: TabColor;
  active?: boolean;
}) => string = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    'whitespace-nowrap font-medium select-none',
    'transition-colors duration-150',
    'disabled:bg-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed disabled:pointer-events-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  ],
  {
    variants: {
      variant: {
        underline: 'bg-transparent border-b-2 border-transparent rounded-none',
        pill: 'rounded-pill',
        outline: 'border border-transparent rounded-tab',
        solid: 'rounded-tab',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-5 text-base gap-2.5',
      },
      color: {
        primary: '',
        accent: '',
        muted: '',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // ─── Underline ───
      // Active
      {
        variant: 'underline',
        color: 'primary',
        active: true,
        class: 'border-b-primary text-primary',
      },
      {
        variant: 'underline',
        color: 'accent',
        active: true,
        class: 'border-b-accent text-accent',
      },
      {
        variant: 'underline',
        color: 'muted',
        active: true,
        class: 'border-b-foreground text-foreground',
      },
      // Inactive
      {
        variant: 'underline',
        active: false,
        class: 'text-muted-foreground hover:text-foreground hover:border-b-border',
      },

      // ─── Pill ───
      {
        variant: 'pill',
        color: 'primary',
        active: true,
        class: 'bg-primary text-primary-foreground',
      },
      {
        variant: 'pill',
        color: 'accent',
        active: true,
        class: 'bg-accent text-accent-foreground',
      },
      {
        variant: 'pill',
        color: 'muted',
        active: true,
        class: 'bg-muted text-foreground',
      },
      {
        variant: 'pill',
        active: false,
        class: 'text-muted-foreground hover:text-foreground hover:bg-muted',
      },

      // ─── Outline ───
      {
        variant: 'outline',
        color: 'primary',
        active: true,
        class: 'border-primary text-primary bg-primary-subtle',
      },
      {
        variant: 'outline',
        color: 'accent',
        active: true,
        class: 'border-accent text-accent bg-accent-subtle',
      },
      {
        variant: 'outline',
        color: 'muted',
        active: true,
        class: 'border-border text-foreground bg-muted',
      },
      {
        variant: 'outline',
        active: false,
        class: 'text-muted-foreground hover:text-foreground hover:border-border',
      },

      // ─── Solid ───
      {
        variant: 'solid',
        color: 'primary',
        active: true,
        class: 'bg-primary text-primary-foreground shadow-sm',
      },
      {
        variant: 'solid',
        color: 'accent',
        active: true,
        class: 'bg-accent text-accent-foreground shadow-sm',
      },
      {
        variant: 'solid',
        color: 'muted',
        active: true,
        class: 'bg-muted text-foreground shadow-sm',
      },
      {
        variant: 'solid',
        active: false,
        class: 'text-muted-foreground hover:text-foreground hover:bg-muted',
      },
    ],
    defaultVariants: {
      variant: 'underline',
      size: 'md',
      color: 'primary',
      active: false,
    },
  }
);

export type TabItemVariants = VariantProps<typeof tabItemVariants>;

// ─── Tab Header / Nav Bar Container ───

export const tabHeaderVariants: (props?: {
  alignment?: TabAlignment;
  variant?: TabVariant;
}) => string = cva('relative flex', {
  variants: {
    alignment: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      stretch: '[&>*]:flex-1',
    },
    variant: {
      underline: 'border-b border-border',
      pill: 'gap-1 p-1 bg-muted rounded-tab-list',
      outline: 'gap-1',
      solid: 'gap-1 p-1 bg-muted rounded-tab-list',
    },
  },
  defaultVariants: {
    alignment: 'start',
    variant: 'underline',
  },
});

export type TabHeaderVariants = VariantProps<typeof tabHeaderVariants>;

// ─── Scroll Button ───

export const tabScrollButtonVariants: (props?: {
  direction?: 'left' | 'right';
  variant?: TabVariant;
}) => string = cva(
  [
    'absolute top-0 z-10 flex items-center justify-center',
    'h-full w-8',
    'text-muted-foreground hover:text-foreground',
    'transition-opacity duration-150',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      direction: {
        left: 'left-0 bg-gradient-to-r from-background to-transparent',
        right: 'right-0 bg-gradient-to-l from-background to-transparent',
      },
      variant: {
        underline: '',
        pill: 'from-muted',
        outline: '',
        solid: 'from-muted',
      },
    },
    defaultVariants: {
      direction: 'left',
      variant: 'underline',
    },
  }
);

export type TabScrollButtonVariants = VariantProps<typeof tabScrollButtonVariants>;

// ─── Close Button on Closable Tabs ───

export const tabCloseButtonVariants: (props?: {
  size?: TabSize;
}) => string = cva(
  [
    'inline-flex items-center justify-center rounded-interactive-sm',
    'text-current opacity-60 hover:opacity-100',
    'transition-opacity duration-100',
    'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring',
  ],
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export type TabCloseButtonVariants = VariantProps<typeof tabCloseButtonVariants>;

// ─── Tab Panel Container ───

export const tabPanelVariants: (props?: {
  animated?: boolean;
}) => string = cva('focus-visible:outline-none', {
  variants: {
    animated: {
      true: 'animate-fade-in',
      false: '',
    },
  },
  defaultVariants: {
    animated: true,
  },
});

export type TabPanelVariants = VariantProps<typeof tabPanelVariants>;
