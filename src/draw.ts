import { isUpsideDown, segmentAngles } from './wheel';

export const PALETTE = ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#2a9d8f'];

/** Angle of the top of the wheel, where the pointer is. */
const TOP = -Math.PI / 2;

export function drawWheel(
  ctx: CanvasRenderingContext2D,
  names: string[],
  rotation: number,
): void {
  const { width, height } = ctx.canvas;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 4;
  ctx.clearRect(0, 0, width, height);

  // At rotation 0 the pointer is on the middle of segment 0.
  const offset = rotation + TOP - Math.PI / Math.max(names.length, 1);
  segmentAngles(names.length).forEach((seg, i) => {
    const start = seg.start + offset;
    const end = seg.end + offset;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = PALETTE[i % PALETTE.length];
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Name along the segment's middle radius, text reading outward.
    ctx.save();
    ctx.translate(cx, cy);
    const mid = (start + end) / 2;
    const flip = isUpsideDown(mid);
    ctx.rotate(flip ? mid + Math.PI : mid);
    ctx.textAlign = flip ? 'left' : 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(names[i], flip ? -(radius - 14) : radius - 14, 0, radius * 0.7);
    ctx.restore();
  });
}
