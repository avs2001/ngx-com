// Public API for the paginator component

// Main component
export { ComPaginator } from './paginator.component';
export type { PageRangeItem } from './paginator.component';

// Models
export { defaultRangeLabel } from './paginator.models';
export type { PageEvent, RangeLabelFn } from './paginator.models';

// Variants
export {
  paginatorContainerVariants,
  paginatorButtonVariants,
  paginatorRangeLabelVariants,
  paginatorSelectVariants,
  paginatorPageButtonVariants,
  paginatorEllipsisVariants,
} from './paginator.variants';

export type {
  PaginatorSize,
  PaginatorLayout,
  PaginatorContainerVariants,
  PaginatorButtonVariants,
  PaginatorRangeLabelVariants,
  PaginatorSelectVariants,
  PaginatorPageButtonVariants,
  PaginatorEllipsisVariants,
} from './paginator.variants';
