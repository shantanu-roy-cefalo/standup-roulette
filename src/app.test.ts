import { describe, expect, it } from 'vitest';
import { render } from './app';

describe('render', () => {
  it('puts the app title in a heading inside the root element', () => {
    const root = document.createElement('main');
    render(root);
    expect(root.querySelector('h1')?.textContent).toBe('Standup Roulette');
  });
});
