import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/standup-roulette/',
  test: {
    environment: 'jsdom',
  },
});
