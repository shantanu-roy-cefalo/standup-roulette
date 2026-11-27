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
