import type { TemplateRef } from '@angular/core';

/**
 * Color variant for the confirm button styling.
 */
export type ConfirmColor = 'primary' | 'warn';

/**
 * Context provided to custom confirmation templates.
 */
export interface ConfirmTemplateContext {
  /** The confirmation message. */
  $implicit: string;
  /** The dialog title, if provided. */
  title: string | undefined;
  /** Function to confirm the action. */
  confirm: () => void;
  /** Function to cancel the action. */
  cancel: () => void;
  /** Whether an async operation is in progress. */
  loading: boolean;
  /** Function to set the loading state. */
  setLoading: (value: boolean) => void;
}

/**
 * Internal configuration passed to the confirmation panel.
 * @internal
 */
export interface ConfirmPanelConfig {
  /** The confirmation message. */
  message: string;
  /** Optional dialog title. */
  title: string | undefined;
  /** Label for the confirm button. */
  confirmLabel: string;
  /** Label for the cancel button. */
  cancelLabel: string;
  /** Color variant for the confirm button. */
  confirmColor: ConfirmColor;
  /** Whether to show a backdrop behind the panel. */
  hasBackdrop: boolean;
  /** Custom template for the panel content. */
  customTemplate: TemplateRef<ConfirmTemplateContext> | undefined;
  /** Unique ID for the dialog title element. */
  titleId: string;
  /** Unique ID for the dialog description element. */
  descriptionId: string;
}
