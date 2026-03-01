/** Auto-incrementing ID counter for unique radio IDs. */
let nextRadioId = 0;

/** Generates a unique radio ID. */
export function generateRadioId(): string {
  return `com-radio-${nextRadioId++}`;
}

/** Auto-incrementing ID counter for unique radio group IDs. */
let nextGroupId = 0;

/** Generates a unique radio group ID. */
export function generateRadioGroupId(): string {
  return `com-radio-group-${nextGroupId++}`;
}
