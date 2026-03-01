// Public API for the radio component

// Main components
export { ComRadio } from './radio.component';
export { ComRadioGroup, COM_RADIO_GROUP } from './radio-group.component';

// Types
export type { RadioChange } from './radio.component';
export type { RadioGroupChange, ComRadioGroupContext, RadioItem } from './radio-group.component';

// Variants (for advanced customization)
export {
  radioCircleVariants,
  RADIO_GROUP_ORIENTATIONS,
  RADIO_DOT_SIZES,
  RADIO_LABEL_SIZES,
} from './radio.variants';

export type { RadioSize, RadioVariant, RadioOrientation } from './radio.variants';
