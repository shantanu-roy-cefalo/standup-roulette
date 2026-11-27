import { colorIndex, fitName, fontSizeFor, segmentLayout } from './wheel';

export const PALETTE = ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#2a9d8f'];

const RIM_GAP = 4;
const LABEL_INSET = 14;
const MAX_LABEL_CHARS = 14;

export function drawWheel(
  ctx: CanvasRenderingContext2D,
  names: string[],
  rotation: number,
): void {
  const { width, height } = ctx.canvas;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - RIM_GAP;
  ctx.clearRect(0, 0, width, height);

  segmentLayout(names.length, rotation).forEach((seg, i) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, seg.start, seg.end);
    ctx.closePath();
    ctx.fillStyle = PALETTE[colorIndex(i, names.length, PALETTE.length)];
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label along the segment's middle, reading outward (turned round on the left half).
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(seg.flip ? seg.mid + Math.PI : seg.mid);
    ctx.textAlign = seg.flip ? 'left' : 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSizeFor(names.length)}px sans-serif`;
    const x = radius - LABEL_INSET;
    ctx.fillText(fitName(names[i], MAX_LABEL_CHARS), seg.flip ? -x : x, 0);
    ctx.restore();
  });
}
