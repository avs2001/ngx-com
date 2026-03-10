/**
 * Types and interfaces for the TimePicker component.
 */

/** Value type for the standalone time picker */
export interface ComTimeValue {
  /** Hours (0-23, always stored in 24h format internally) */
  hours: number;
  /** Minutes (0-59) */
  minutes: number;
  /** Seconds (0-59) */
  seconds: number;
}

/** Creates a ComTimeValue */
export function createTimeValue(
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
): ComTimeValue {
  return { hours, minutes, seconds };
}

/**
 * Compares two ComTimeValue objects.
 * @returns negative if a < b, 0 if equal, positive if a > b
 */
export function compareTime(a: ComTimeValue, b: ComTimeValue): number {
  const diff = a.hours * 3600 + a.minutes * 60 + a.seconds - (b.hours * 3600 + b.minutes * 60 + b.seconds);
  return diff;
}

/** Generates a unique ID for time picker instances */
let timePickerIdCounter = 0;
export function generateTimePickerId(): string {
  return `com-time-picker-${timePickerIdCounter++}`;
}

/** Size variants for time picker */
export type TimePickerSize = 'sm' | 'default' | 'lg';

/** Visual variant */
export type TimePickerVariant = 'standalone' | 'embedded';

/** Validation state */
export type TimePickerState = 'default' | 'error' | 'success';

/** Period for 12-hour format */
export type TimePeriod = 'AM' | 'PM';

/** Segment type */
export type TimeSegment = 'hours' | 'minutes' | 'seconds';
