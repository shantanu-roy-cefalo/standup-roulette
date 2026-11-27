export const APP_TITLE = 'Standup Roulette';

export function render(root: HTMLElement): void {
  const heading = document.createElement('h1');
  heading.textContent = APP_TITLE;
  root.replaceChildren(heading);
}
