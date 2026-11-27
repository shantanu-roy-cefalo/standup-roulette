import { describe, expect, it } from 'vitest';
import { isUpsideDown, segmentAngles } from './wheel';

const FULL = 2 * Math.PI;

describe('segmentAngles', () => {
  it('gives one segment covering the full circle for 1 name', () => {
    const s = segmentAngles(1);
    expect(s).toHaveLength(1);
    expect(s[0].start).toBeCloseTo(0);
    expect(s[0].end).toBeCloseTo(FULL);
  });

  it('splits the circle in half for 2 names', () => {
    const s = segmentAngles(2);
    expect(s[0]).toEqual({ start: 0, end: Math.PI });
    expect(s[1].start).toBeCloseTo(Math.PI);
    expect(s[1].end).toBeCloseTo(FULL);
  });

  it('gives six equal 60 degree segments for 6 names', () => {
    const s = segmentAngles(6);
    expect(s).toHaveLength(6);
    for (const seg of s) expect(seg.end - seg.start).toBeCloseTo(FULL / 6);
  });

  it('has contiguous segments that add up to a full circle', () => {
    for (const n of [1, 2, 3, 6, 7, 12]) {
      const s = segmentAngles(n);
      expect(s[0].start).toBe(0);
      for (let i = 1; i < n; i++) expect(s[i].start).toBeCloseTo(s[i - 1].end);
      expect(s[n - 1].end).toBeCloseTo(FULL);
      const total = s.reduce((sum, seg) => sum + (seg.end - seg.start), 0);
      expect(total).toBeCloseTo(FULL);
    }
  });

  it('returns no segments for 0 names', () => {
    expect(segmentAngles(0)).toEqual([]);
  });
});

describe('isUpsideDown', () => {
  it('is false for angles on the right half and true on the left half', () => {
    expect(isUpsideDown(0)).toBe(false);
    expect(isUpsideDown(Math.PI / 4)).toBe(false);
    expect(isUpsideDown(Math.PI)).toBe(true);
    expect(isUpsideDown(-Math.PI)).toBe(true);
    expect(isUpsideDown(FULL + Math.PI)).toBe(true);
    expect(isUpsideDown(-Math.PI / 4)).toBe(false);
  });
});
