import { describe, expect, it, vi } from 'vitest';
import { drawWheel, PALETTE } from './draw';

function mockCtx() {
  const fills: string[] = [];
  const texts: string[] = [];
  const ctx = {
    canvas: { width: 400, height: 400 },
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    arc: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(function (this: { fillStyle: string }) {
      fills.push(this.fillStyle);
    }),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    fillText: vi.fn((t: string) => texts.push(t)),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    font: '',
    textAlign: '',
    textBaseline: '',
  };
  return { ctx: ctx as unknown as CanvasRenderingContext2D, fills, texts, raw: ctx };
}

describe('drawWheel', () => {
  it('draws one segment and one label per name, using the palette', () => {
    const { ctx, fills, texts, raw } = mockCtx();
    drawWheel(ctx, ['Ana', 'Ben', 'Chi', 'Dara', 'Eli', 'Fay'], 0);
    expect(raw.arc).toHaveBeenCalledTimes(6);
    expect(texts).toEqual(['Ana', 'Ben', 'Chi', 'Dara', 'Eli', 'Fay']);
    expect(fills).toEqual(PALETTE);
  });

  it('truncates a very long name instead of squashing it', () => {
    const { ctx, texts } = mockCtx();
    drawWheel(ctx, ['A'.repeat(60)], 0);
    expect(texts[0].length).toBeLessThan(60);
    expect(texts[0].endsWith('…')).toBe(true);
  });

  it('draws nothing for an empty list', () => {
    const { ctx, texts } = mockCtx();
    drawWheel(ctx, [], 0);
    expect(texts).toEqual([]);
  });
});
