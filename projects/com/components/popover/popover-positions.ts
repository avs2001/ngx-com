import type { ConnectedPosition, ConnectionPositionPair } from '@angular/cdk/overlay';
import type { PopoverAlignment, PopoverPosition, PopoverSide } from './popover.variants';

/**
 * Build an ordered list of position pairs for the CDK overlay.
 * The first position is the preferred position; remaining positions are fallbacks.
 *
 * @param position - Preferred position direction ('above', 'below', 'left', 'right', 'auto')
 * @param alignment - Alignment along the cross-axis ('start', 'center', 'end')
 * @param offset - Gap in pixels between trigger and popover edge (default: 8)
 * @returns Array of ConnectedPosition for FlexibleConnectedPositionStrategy
 */
export function buildPopoverPositions(
  position: PopoverPosition,
  alignment: PopoverAlignment,
  offset = 8,
): ConnectedPosition[] {
  const allPositions = buildAllPositions(offset);

  if (position === 'auto') {
    // For auto, try below first, then above, then right, then left
    return [
      ...getPositionsForDirection('below', alignment, allPositions),
      ...getPositionsForDirection('above', alignment, allPositions),
      ...getPositionsForDirection('right', alignment, allPositions),
      ...getPositionsForDirection('left', alignment, allPositions),
    ];
  }

  // Start with preferred direction, then add fallbacks
  const preferred = getPositionsForDirection(position, alignment, allPositions);
  const fallbacks = ['below', 'above', 'left', 'right']
    .filter((dir) => dir !== position)
    .flatMap((dir) => getPositionsForDirection(dir as PopoverPosition, alignment, allPositions));

  return [...preferred, ...fallbacks];
}

/**
 * Build all 12 position combinations (4 directions × 3 alignments).
 */
function buildAllPositions(offset: number): Map<string, ConnectedPosition> {
  const positions = new Map<string, ConnectedPosition>();

  // Below positions
  positions.set('below-start', {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: offset,
  });
  positions.set('below-center', {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: offset,
  });
  positions.set('below-end', {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: offset,
  });

  // Above positions
  positions.set('above-start', {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -offset,
  });
  positions.set('above-center', {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -offset,
  });
  positions.set('above-end', {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -offset,
  });

  // Left positions
  positions.set('left-start', {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -offset,
  });
  positions.set('left-center', {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -offset,
  });
  positions.set('left-end', {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetX: -offset,
  });

  // Right positions
  positions.set('right-start', {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: offset,
  });
  positions.set('right-center', {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: offset,
  });
  positions.set('right-end', {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetX: offset,
  });

  return positions;
}

/**
 * Get positions for a specific direction, ordered by alignment preference.
 */
function getPositionsForDirection(
  direction: PopoverPosition,
  alignment: PopoverAlignment,
  allPositions: Map<string, ConnectedPosition>,
): ConnectedPosition[] {
  if (direction === 'auto') {
    return [];
  }

  // Order alignments with preferred first
  const alignmentOrder: Record<PopoverAlignment, PopoverAlignment[]> = {
    start: ['start', 'center', 'end'],
    center: ['center', 'start', 'end'],
    end: ['end', 'center', 'start'],
  };

  return alignmentOrder[alignment]
    .map((align) => allPositions.get(`${direction}-${align}`))
    .filter((pos): pos is ConnectedPosition => pos !== undefined);
}

/**
 * Derive which side of the trigger the popover is on from a connection pair.
 * Used to position the arrow correctly.
 *
 * The returned side indicates where the popover sits relative to the trigger:
 * - 'bottom': popover is below trigger, arrow at top pointing up
 * - 'top': popover is above trigger, arrow at bottom pointing down
 * - 'right': popover is right of trigger, arrow at left pointing left
 * - 'left': popover is left of trigger, arrow at right pointing right
 */
export function deriveSideFromPosition(pair: ConnectionPositionPair): PopoverSide {
  const originX = pair.originX as string;
  const originY = pair.originY as string;
  const overlayX = pair.overlayX as string;
  const overlayY = pair.overlayY as string;

  if (originY === 'bottom' && overlayY === 'top') return 'bottom';
  if (originY === 'top' && overlayY === 'bottom') return 'top';
  if (originX === 'end' && overlayX === 'start') return 'right';
  if (originX === 'start' && overlayX === 'end') return 'left';

  return 'bottom';
}

/**
 * Derive alignment from a connection pair.
 */
export function deriveAlignmentFromPosition(pair: ConnectionPositionPair): PopoverAlignment {
  const originX = pair.originX as string;
  const originY = pair.originY as string;
  const overlayX = pair.overlayX as string;
  const overlayY = pair.overlayY as string;

  // For vertical positioning (above/below), check X alignment
  if (originY === 'bottom' || originY === 'top') {
    if (originX === 'start' && overlayX === 'start') return 'start';
    if (originX === 'end' && overlayX === 'end') return 'end';
    return 'center';
  }

  // For horizontal positioning (left/right), check Y alignment
  if (originY === 'top' && overlayY === 'top') return 'start';
  if (originY === 'bottom' && overlayY === 'bottom') return 'end';
  return 'center';
}
