// Public API for the segmented-control component

// Main component
export { ComSegmentedControl } from './segmented-control.component';
export type { SegmentOption } from './segmented-control.component';

// Directive
export { ComSegmentDef } from './segment-def.directive';
export type { SegmentTemplateContext } from './segment-def.directive';

// Variants
export {
  segmentedControlContainerVariants,
  segmentedControlSegmentVariants,
  SEGMENT_DISABLED_CLASSES,
} from './segmented-control.variants';

export type {
  SegmentedControlSize,
  SegmentedControlColor,
  SegmentedControlVariant,
  SegmentedControlContainerVariants,
  SegmentedControlSegmentVariants,
} from './segmented-control.variants';
