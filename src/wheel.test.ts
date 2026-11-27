import { describe, expect, it } from 'vitest';
import { colorIndex, fitName, fontSizeFor, isUpsideDown, segmentAngles, segmentLayout } from './wheel';

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

describe('segmentLayout', () => {
  it('puts the pointer (top) on the middle of segment 0 at rotation 0', () => {
    const TOP = -Math.PI / 2;
    const [first] = segmentLayout(6, 0);
    expect(first.mid).toBeCloseTo(TOP);
    expect(first.end - first.start).toBeCloseTo(FULL / 6);
  });

  it('shifts every segment by the rotation', () => {
    const a = segmentLayout(6, 0);
    const b = segmentLayout(6, 1);
    a.forEach((seg, i) => expect(b[i].mid - seg.mid).toBeCloseTo(1));
  });

  it('flips the text of segments on the left half', () => {
    const layout = segmentLayout(6, 0);
    expect(layout[0].flip).toBe(false); // top
    expect(layout[1].flip).toBe(false); // upper right
    expect(layout[4].flip).toBe(true); // left
  });
});

describe('fitName', () => {
  it('keeps short names unchanged', () => {
    expect(fitName('Ana', 10)).toBe('Ana');
  });
  it('truncates long names with an ellipsis within the limit', () => {
    const out = fitName('Bartholomew Alexander', 8);
    expect(out).toHaveLength(8);
    expect(out.endsWith('…')).toBe(true);
  });
  it('trims whitespace', () => {
    expect(fitName('  Ana ', 10)).toBe('Ana');
  });
});

describe('fontSizeFor', () => {
  it('shrinks as segments get narrower and never goes below a minimum', () => {
    expect(fontSizeFor(6)).toBeGreaterThan(fontSizeFor(24));
    expect(fontSizeFor(500)).toBeGreaterThanOrEqual(8);
    expect(fontSizeFor(1)).toBeLessThanOrEqual(18);
  });
});

describe('colorIndex', () => {
  it('never gives the last segment the same colour as its neighbours', () => {
    for (let n = 2; n <= 20; n++) {
      const idx = Array.from({ length: n }, (_, i) => colorIndex(i, n, 6));
      for (let i = 0; i < n; i++) {
        expect(idx[i]).not.toBe(idx[(i + 1) % n]);
      }
    }
  });
});
