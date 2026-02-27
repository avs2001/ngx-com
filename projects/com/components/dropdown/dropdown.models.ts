import { TemplateRef } from '@angular/core';

/**
 * Context provided to the custom option template.
 * @template T The type of the option value.
 */
export interface ComDropdownOptionContext<T> {
  /** The option value (available as implicit $implicit). */
  $implicit: T;
  /** The index of this option in the filtered list. */
  index: number;
  /** Whether this option is currently selected. */
  selected: boolean;
  /** Whether this option is currently active (focused via keyboard). */
  active: boolean;
  /** Whether this option is disabled. */
  disabled: boolean;
}

/**
 * Context provided to the custom selected value template.
 * @template T The type of the option value.
 */
export interface ComDropdownSelectedContext<T> {
  /** The selected value(s) (available as implicit $implicit). */
  $implicit: T | T[] | null;
  /** The placeholder text when no value is selected. */
  placeholder: string;
  /** Whether multiple selection is enabled. */
  multiple: boolean;
}

/**
 * Context provided to the custom empty state template.
 */
export interface ComDropdownEmptyContext {
  /** The current search query (available as implicit $implicit). */
  $implicit: string;
}

/**
 * Context provided to the custom group header template.
 */
export interface ComDropdownGroupContext {
  /** The group key/label (available as implicit $implicit). */
  $implicit: string;
  /** Whether the group is expanded. */
  expanded: boolean;
  /** The number of options in this group. */
  count: number;
}

/**
 * Context provided to the custom tag template (multi-select mode).
 * @template T The type of the option value.
 */
export interface ComDropdownTagContext<T> {
  /** The tag value (available as implicit $implicit). */
  $implicit: T;
  /** The index of this tag. */
  index: number;
  /** Function to remove this tag. */
  remove: () => void;
}

/**
 * Represents a grouped collection of options.
 * @template T The type of the option value.
 */
export interface ComDropdownGroup<T> {
  /** The group key/label. */
  key: string;
  /** The options belonging to this group. */
  options: T[];
  /** Whether the group is expanded (for collapsible groups). */
  expanded: boolean;
}

/**
 * Internal representation of a processed option.
 * @template T The type of the option value.
 */
export interface ComDropdownProcessedOption<T> {
  /** The original option value. */
  value: T;
  /** The display text for this option. */
  displayText: string;
  /** Whether this option is disabled. */
  disabled: boolean;
  /** The group this option belongs to (if grouped). */
  group?: string;
  /** Unique identifier for tracking. */
  id: string;
}

/**
 * Configuration for dropdown positioning.
 */
export interface ComDropdownPosition {
  /** The origin X position. */
  originX: 'start' | 'center' | 'end';
  /** The origin Y position. */
  originY: 'top' | 'center' | 'bottom';
  /** The overlay X position. */
  overlayX: 'start' | 'center' | 'end';
  /** The overlay Y position. */
  overlayY: 'top' | 'center' | 'bottom';
  /** Offset along the X axis. */
  offsetX?: number;
  /** Offset along the Y axis. */
  offsetY?: number;
}

/**
 * Panel width configuration.
 */
export type ComDropdownPanelWidth = 'trigger' | 'auto' | string;

/**
 * Variant types for the dropdown trigger.
 */
export type ComDropdownVariant = 'default' | 'outline' | 'ghost' | 'filled';

/**
 * Size types for the dropdown.
 */
export type ComDropdownSize = 'sm' | 'default' | 'lg';

/**
 * State types for the dropdown (validation states).
 */
export type ComDropdownState = 'default' | 'error' | 'success';

/**
 * Default compare function for primitive values.
 * @param a First value.
 * @param b Second value.
 * @returns Whether the values are equal.
 */
export function defaultCompareWith<T>(a: T, b: T): boolean {
  return a === b;
}

/**
 * Default display function for converting values to strings.
 * @param value The value to display.
 * @returns The string representation.
 */
export function defaultDisplayWith<T>(value: T): string {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
}

/**
 * Default filter function for search.
 * @param option The option to test.
 * @param query The search query.
 * @param displayWith The display function to get the searchable text.
 * @returns Whether the option matches the query.
 */
export function defaultFilterWith<T>(
  option: T,
  query: string,
  displayWith: (value: T) => string
): boolean {
  const text = displayWith(option).toLowerCase();
  return text.includes(query.toLowerCase());
}

/**
 * Template directive types for content projection.
 */
export interface ComDropdownTemplates<T> {
  /** Custom template for rendering options. */
  optionTemplate?: TemplateRef<ComDropdownOptionContext<T>>;
  /** Custom template for rendering the selected value. */
  selectedTemplate?: TemplateRef<ComDropdownSelectedContext<T>>;
  /** Custom template for the empty state. */
  emptyTemplate?: TemplateRef<ComDropdownEmptyContext>;
  /** Custom template for group headers. */
  groupTemplate?: TemplateRef<ComDropdownGroupContext>;
  /** Custom template for tags in multi-select mode. */
  tagTemplate?: TemplateRef<ComDropdownTagContext<T>>;
}

/**
 * Unique ID counter for generating option IDs.
 */
let uniqueIdCounter = 0;

/**
 * Generates a unique ID for dropdown options.
 * @param prefix Optional prefix for the ID.
 * @returns A unique ID string.
 */
export function generateDropdownId(prefix = 'com-dropdown'): string {
  return `${prefix}-${uniqueIdCounter++}`;
}
