/**
 * Position direction for tooltip placement relative to the trigger.
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Color variant for tooltip styling.
 */
export type TooltipColor = 'default' | 'primary' | 'accent' | 'warn' | 'invert';

/**
 * Size variant for tooltip dimensions.
 */
export type TooltipSize = 'sm' | 'md' | 'lg';

/**
 * Touch gesture handling mode.
 * - 'auto': Long-press to show, tap elsewhere to hide
 * - 'on': Same as auto
 * - 'off': Touch does not trigger tooltip
 */
export type TooltipTouchGestures = 'auto' | 'on' | 'off';

/**
 * Context provided to custom tooltip templates.
 */
export interface TooltipTemplateContext {
  /** The text content passed to comTooltip input. */
  $implicit: string;
  /** Function to programmatically close the tooltip from inside the template. */
  hide: () => void;
}

/**
 * Which side of the trigger the tooltip is positioned on.
 * Used internally for arrow orientation.
 */
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
