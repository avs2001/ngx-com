import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

export type FormFieldAppearance = 'fill' | 'outline';
export type FormFieldColor = 'primary' | 'accent' | 'warn';
export type FormFieldFloatLabel = 'auto' | 'always';
export type FormFieldSubscriptSizing = 'fixed' | 'dynamic';

/**
 * CVA variants for the form field wrapper.
 *
 * @tokens `--color-foreground`
 */
export const formFieldVariants: (props?: {
  disabled?: boolean | null | undefined;
}) => string = cva(
  ['com-form-field', 'relative block w-full', 'text-foreground'],
  {
    variants: {
      disabled: {
        true: 'pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export type FormFieldVariants = VariantProps<typeof formFieldVariants>;

/**
 * CVA variants for the input container (the bordered/filled area).
 *
 * @tokens `--color-input-border`, `--color-input-background`, `--color-primary`,
 *         `--color-accent`, `--color-warn`, `--color-ring`, `--color-muted`,
 *         `--color-disabled`, `--radius-input`
 */
export const formFieldContainerVariants: (props?: {
  appearance?: FormFieldAppearance | null | undefined;
  color?: FormFieldColor | null | undefined;
  focused?: boolean | null | undefined;
  error?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
}) => string = cva(
  [
    'com-form-field__container',
    'relative flex items-center',
    'w-full min-h-11',
    'transition-all duration-150',
    'rounded-input',
  ],
  {
    variants: {
      appearance: {
        outline: [
          'border border-input-border',
          'bg-transparent',
          'mt-2.5', // Reserve space for floating label to prevent height jump
        ],
        fill: [
          'rounded-b-none',
          'bg-muted',
          'border-b-2 border-input-border',
        ],
      },
      color: {
        primary: '',
        accent: '',
        warn: '',
      },
      focused: {
        true: '',
        false: '',
      },
      error: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'bg-disabled border-disabled',
        false: '',
      },
    },
    compoundVariants: [
      // Outline + focused (no error)
      { appearance: 'outline', focused: true, error: false, class: 'border-primary ring-1 ring-primary' },
      { appearance: 'outline', focused: true, error: false, color: 'accent', class: 'border-accent ring-accent' },
      { appearance: 'outline', focused: true, error: false, color: 'warn', class: 'border-warn ring-warn' },
      // Outline + error
      { appearance: 'outline', error: true, class: 'border-warn ring-1 ring-warn' },
      // Fill + focused (no error)
      { appearance: 'fill', focused: true, error: false, class: 'border-b-primary' },
      { appearance: 'fill', focused: true, error: false, color: 'accent', class: 'border-b-accent' },
      { appearance: 'fill', focused: true, error: false, color: 'warn', class: 'border-b-warn' },
      // Fill + error
      { appearance: 'fill', error: true, class: 'border-b-warn' },
    ],
    defaultVariants: {
      appearance: 'outline',
      color: 'primary',
      focused: false,
      error: false,
      disabled: false,
    },
  }
);

export type FormFieldContainerVariants = VariantProps<typeof formFieldContainerVariants>;

/**
 * CVA variants for the floating label.
 *
 * @tokens `--color-muted-foreground`, `--color-primary`, `--color-accent`,
 *         `--color-warn`, `--color-background`
 */
export const formFieldLabelVariants: (props?: {
  appearance?: FormFieldAppearance | null | undefined;
  floating?: boolean | null | undefined;
  color?: FormFieldColor | null | undefined;
  error?: boolean | null | undefined;
  focused?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
}) => string = cva(
  [
    'com-form-field__label',
    'pointer-events-none',
    'text-muted-foreground text-sm',
    'origin-top-left',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      appearance: {
        outline: '',
        fill: '',
      },
      floating: {
        // Floating: absolute positioning at container border
        true: 'absolute',
        // Not floating: relative positioning in flex flow (after prefix)
        false: 'relative flex-shrink-0 pl-3',
      },
      color: {
        primary: '',
        accent: '',
        warn: '',
      },
      error: {
        true: 'text-warn',
        false: '',
      },
      focused: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'text-disabled-foreground',
        false: '',
      },
    },
    compoundVariants: [
      // Outline floating (label above border with notch effect)
      {
        appearance: 'outline',
        floating: true,
        class: 'left-2 -top-2.5 scale-75 bg-background px-1',
      },
      // Fill floating
      {
        appearance: 'fill',
        floating: true,
        class: 'left-3 top-1 scale-75 text-xs',
      },
      // Focused + floating colors (no error)
      { floating: true, focused: true, error: false, color: 'primary', class: 'text-primary' },
      { floating: true, focused: true, error: false, color: 'accent', class: 'text-accent' },
      { floating: true, focused: true, error: false, color: 'warn', class: 'text-warn' },
      // Error overrides
      { floating: true, error: true, class: 'text-warn' },
    ],
    defaultVariants: {
      appearance: 'outline',
      floating: false,
      color: 'primary',
      error: false,
      focused: false,
      disabled: false,
    },
  }
);

export type FormFieldLabelVariants = VariantProps<typeof formFieldLabelVariants>;

/**
 * CVA variants for the subscript area (hints/errors).
 *
 * @tokens (inherits from children)
 */
export const formFieldSubscriptVariants: (props?: {
  sizing?: FormFieldSubscriptSizing | null | undefined;
}) => string = cva(
  ['com-form-field__subscript', 'text-xs mt-1 px-3'],
  {
    variants: {
      sizing: {
        fixed: 'min-h-5',
        dynamic: 'min-h-0',
      },
    },
    defaultVariants: {
      sizing: 'fixed',
    },
  }
);

export type FormFieldSubscriptVariants = VariantProps<typeof formFieldSubscriptVariants>;

/**
 * CVA variants for hint text.
 *
 * @tokens `--color-muted-foreground`
 */
export const hintVariants: () => string = cva(['com-form-field__hint', 'text-muted-foreground text-xs']);

/**
 * CVA variants for error messages.
 *
 * @tokens `--color-warn`
 */
export const errorVariants: () => string = cva(['com-form-field__error', 'text-warn text-xs']);

/**
 * CVA variants for prefix slot.
 *
 * @tokens `--color-muted-foreground`
 */
export const prefixVariants: () => string = cva([
  'com-form-field__prefix',
  'flex items-center text-muted-foreground pl-3',
]);

/**
 * CVA variants for suffix slot.
 *
 * @tokens `--color-muted-foreground`
 */
export const suffixVariants: () => string = cva([
  'com-form-field__suffix',
  'flex items-center text-muted-foreground pr-3',
]);
