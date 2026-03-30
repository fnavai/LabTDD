import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
});
