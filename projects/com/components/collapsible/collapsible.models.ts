/**
 * Context provided to the trigger template.
 */
export interface ComCollapsibleTriggerContext {
  /** Current open state (alias for $implicit). */
  $implicit: boolean;
  /** Current open state. */
  open: boolean;
  /** Whether the collapsible is disabled. */
  disabled: boolean;
  /** Function to toggle the collapsible. */
  toggle: () => void;
}

/**
 * Context provided to the content template.
 */
export interface ComCollapsibleContentContext {
  /** Current open state (alias for $implicit). */
  $implicit: boolean;
  /** Current open state. */
  open: boolean;
}

/**
 * Context provided to the icon template.
 */
export interface ComCollapsibleIconContext {
  /** Current open state (alias for $implicit). */
  $implicit: boolean;
  /** Current open state. */
  open: boolean;
}
