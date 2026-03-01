// Public API for the form-field component

// Main component
export { ComFormField } from './form-field.component';

// Directives
export { ComInput } from './input.directive';
export { ComLabel } from './label.directive';
export { ComHint, type HintAlign } from './hint.directive';
export { ComError } from './error.directive';
export { ComPrefix } from './prefix.directive';
export { ComSuffix } from './suffix.directive';

// Abstract class for custom controls
export { FormFieldControl } from './form-field-control';

// Error state matching
export { ErrorStateMatcher } from './error-state-matcher';

// Configuration
export {
  FORM_FIELD_DEFAULTS,
  type FormFieldDefaults,
  type FormFieldAppearance,
  type FormFieldColor,
  type FormFieldFloatLabel,
  type FormFieldSubscriptSizing,
} from './form-field-defaults';

// Variants (for advanced customization)
export {
  formFieldVariants,
  formFieldContainerVariants,
  formFieldLabelVariants,
  inputVariants,
  formFieldSubscriptVariants,
  hintVariants,
  errorVariants,
  prefixVariants,
  suffixVariants,
  type FormFieldVariants,
  type FormFieldContainerVariants,
  type FormFieldLabelVariants,
  type InputVariants,
  type FormFieldSubscriptVariants,
} from './form-field.variants';
