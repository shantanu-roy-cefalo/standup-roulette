export interface Segment {
  start: number;
  end: number;
}

const FULL_CIRCLE = 2 * Math.PI;

/** Start and end angle (radians) of each of `count` equal segments, from 0 to 2π. */
export function segmentAngles(count: number): Segment[] {
  if (!Number.isInteger(count) || count < 1) return [];
  const size = FULL_CIRCLE / count;
  return Array.from({ length: count }, (_, i) => ({
    start: i * size,
    end: i === count - 1 ? FULL_CIRCLE : (i + 1) * size,
  }));
}

/** True when text drawn along this angle would read upside down (left half of the wheel). */
export function isUpsideDown(angle: number): boolean {
  const a = ((angle % FULL_CIRCLE) + FULL_CIRCLE) % FULL_CIRCLE;
  return a > Math.PI / 2 && a < (3 * Math.PI) / 2;
}

/** Angle of the top of the wheel, where the pointer is. */
export const TOP = -Math.PI / 2;

export interface SegmentLayout extends Segment {
  /** Middle angle of the segment. */
  mid: number;
  /** True when the label must be turned round to read left to right. */
  flip: boolean;
}

/**
 * Canvas angles of each segment for a given rotation. At rotation 0 the
 * pointer (top) is on the middle of segment 0.
 */
export function segmentLayout(count: number, rotation: number): SegmentLayout[] {
  const offset = rotation + TOP - Math.PI / Math.max(count, 1);
  return segmentAngles(count).map((seg) => {
    const start = seg.start + offset;
    const end = seg.end + offset;
    const mid = (start + end) / 2;
    return { start, end, mid, flip: isUpsideDown(mid) };
  });
}

/** Trim a name and cut it to `maxChars`, ending with an ellipsis when cut. */
export function fitName(name: string, maxChars: number): string {
  const text = name.trim();
  if (text.length <= maxChars) return text;
  return text.slice(0, Math.max(maxChars - 1, 0)) + '…';
}

const MAX_FONT_PX = 18;
const MIN_FONT_PX = 8;

/** Label font size that fits the narrowing segments as the count grows. */
export function fontSizeFor(count: number): number {
  const arc = FULL_CIRCLE / Math.max(count, 1); // angle of one segment
  return Math.max(MIN_FONT_PX, Math.min(MAX_FONT_PX, Math.round(arc * 40)));
}

/** Palette index for segment i; the last segment never matches segment 0 or its other neighbour. */
export function colorIndex(i: number, count: number, paletteSize: number): number {
  const index = i % paletteSize;
  if (count > 1 && i === count - 1 && index === 0 && paletteSize > 2) return 1;
  return index;
}
