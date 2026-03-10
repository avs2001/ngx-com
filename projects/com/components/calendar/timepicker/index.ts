/**
 * TimePicker component public API.
 */

// Types
export type {
  ComTimeValue,
  TimePickerSize,
  TimePickerVariant,
  TimePickerState,
  TimePeriod,
  TimeSegment,
} from './timepicker.types';

export {
  createTimeValue,
  compareTime,
  generateTimePickerId,
} from './timepicker.types';

// Variants
export {
  timepickerContainerVariants,
  timepickerDisabledVariants,
  timepickerSegmentVariants,
  timepickerSeparatorVariants,
  timepickerPeriodVariants,
  timepickerSectionVariants,
  timepickerLabelVariants,
} from './timepicker.variants';

export type {
  TimepickerContainerVariants,
  TimepickerDisabledVariants,
  TimepickerSegmentVariants,
  TimepickerSeparatorVariants,
  TimepickerPeriodVariants,
  TimepickerSectionVariants,
  TimepickerLabelVariants,
} from './timepicker.variants';

// Component
export { ComTimePicker } from './timepicker.component';
