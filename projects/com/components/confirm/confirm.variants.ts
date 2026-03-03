import { cva } from 'class-variance-authority';

/**
 * CVA variants for the confirmation panel backdrop.
 *
 * @tokens `--color-background`
 */
export const confirmBackdropVariants: (props?: {
  visible?: boolean;
}) => string = cva(
  [
    'fixed',
    'inset-0',
    'z-50',
    'bg-background/80',
    'backdrop-blur-sm',
  ],
  {
    variants: {
      visible: {
        true: 'animate-in fade-in-0',
        false: 'animate-out fade-out-0',
      },
    },
    defaultVariants: {
      visible: true,
    },
  },
);

/**
 * CVA variants for the confirmation panel container.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-border`, `--shadow-lg`, `--radius-popover`
 */
export const confirmPanelVariants: (props?: {
  visible?: boolean;
}) => string = cva(
  [
    'com-confirm-panel',
    'fixed',
    'left-1/2',
    'top-1/2',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'z-50',
    'grid',
    'w-full',
    'max-w-lg',
    'gap-4',
    'border',
    'border-border',
    'bg-popover',
    'text-popover-foreground',
    'p-6',
    'shadow-lg',
    'rounded-popover',
    'outline-none',
  ],
  {
    variants: {
      visible: {
        true: 'animate-in fade-in-0 zoom-in-95',
        false: 'animate-out fade-out-0 zoom-out-95',
      },
    },
    defaultVariants: {
      visible: true,
    },
  },
);

/**
 * CVA variants for the confirmation panel title.
 *
 * @tokens `--color-foreground`
 */
export const confirmTitleVariants: () => string = cva([
  'text-lg',
  'font-semibold',
  'text-foreground',
  'leading-none',
  'tracking-tight',
]);

/**
 * CVA variants for the confirmation panel message.
 *
 * @tokens `--color-muted-foreground`
 */
export const confirmMessageVariants: () => string = cva([
  'text-sm',
  'text-muted-foreground',
]);

/**
 * CVA variants for the confirmation panel footer.
 */
export const confirmFooterVariants: () => string = cva([
  'flex',
  'flex-col-reverse',
  'sm:flex-row',
  'sm:justify-end',
  'sm:space-x-2',
]);
