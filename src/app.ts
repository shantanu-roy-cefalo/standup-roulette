import { drawWheel } from './draw';

export const APP_TITLE = 'Standup Roulette';
export const EMPTY_MESSAGE = 'Add some names to get started';
export const DEFAULT_NAMES = ['Ana', 'Ben', 'Chi', 'Dara', 'Eli', 'Fay'];

const WHEEL_SIZE = 400;

export function render(root: HTMLElement, names: string[] = DEFAULT_NAMES): void {
  const heading = document.createElement('h1');
  heading.textContent = APP_TITLE;

  if (names.length === 0) {
    const message = document.createElement('p');
    message.className = 'empty';
    message.textContent = EMPTY_MESSAGE;
    root.replaceChildren(heading, message);
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'wheel-wrap';
  wrap.style.cssText = `position:relative;width:${WHEEL_SIZE}px;max-width:100%;margin:0 auto;padding-top:28px;box-sizing:border-box`;

  const canvas = document.createElement('canvas');
  canvas.width = WHEEL_SIZE;
  canvas.height = WHEEL_SIZE;
  canvas.style.cssText = 'display:block;width:100%;height:auto';
  canvas.setAttribute('aria-label', `Wheel with ${names.length} names`);

  const pointer = document.createElement('div');
  pointer.className = 'pointer';
  pointer.setAttribute('aria-hidden', 'true');
  pointer.style.cssText =
    'position:absolute;top:0;left:50%;transform:translateX(-50%);width:0;height:0;' +
    'border-left:14px solid transparent;border-right:14px solid transparent;' +
    'border-top:28px solid #222';

  wrap.append(canvas, pointer);
  root.replaceChildren(heading, wrap);

  const ctx = canvas.getContext('2d');
  if (ctx) drawWheel(ctx, names, 0);
}
