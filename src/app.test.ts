import { describe, expect, it } from 'vitest';
import { DEFAULT_NAMES, EMPTY_MESSAGE, render } from './app';

describe('render', () => {
  it('puts the app title in a heading inside the root element', () => {
    const root = document.createElement('main');
    render(root);
    expect(root.querySelector('h1')?.textContent).toBe('Standup Roulette');
  });

  it('shows six default names, a canvas wheel and a pointer', () => {
    const root = document.createElement('main');
    render(root);
    expect(DEFAULT_NAMES).toHaveLength(6);
    expect(root.querySelector('canvas')).not.toBeNull();
    expect(root.querySelector('.pointer')).not.toBeNull();
    expect(root.textContent).not.toContain(EMPTY_MESSAGE);
  });

  it('shows the empty message in place of the wheel when there are no names', () => {
    const root = document.createElement('main');
    render(root, []);
    expect(root.textContent).toContain('Add some names to get started');
    expect(root.querySelector('canvas')).toBeNull();
    expect(root.querySelector('.pointer')).toBeNull();
  });
});
