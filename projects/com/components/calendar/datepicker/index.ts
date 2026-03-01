/**
 * Datepicker components public API.
 */

// Types
export type {
  DateFormatPreset,
  DatepickerPanelWidth,
  DatepickerSize,
  DatepickerVariant,
  DatepickerState,
  DatepickerFooterConfig,
  DateRangeValue,
} from './datepicker.types';

export {
  createDateRangeValue,
  generateDatepickerId,
} from './datepicker.types';

// Variants
export {
  datepickerTriggerVariants,
  datepickerDisabledVariants,
  datepickerInputVariants,
  datepickerIconVariants,
  datepickerClearVariants,
  datepickerPanelVariants,
  datepickerFooterVariants,
  datepickerFooterButtonVariants,
  datepickerRangeSeparatorVariants,
} from './datepicker.variants';

export type {
  DatepickerTriggerVariants,
  DatepickerDisabledVariants,
  DatepickerInputVariants,
  DatepickerIconVariants,
  DatepickerClearVariants,
  DatepickerPanelVariants,
  DatepickerFooterVariants,
  DatepickerFooterButtonVariants,
  DatepickerRangeSeparatorVariants,
} from './datepicker.variants';

// Components
export { ComDatepicker } from './datepicker.component';
export { ComDateRangePicker } from './date-range-picker.component';
