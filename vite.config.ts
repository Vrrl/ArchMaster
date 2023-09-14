import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {},
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@infra': path.resolve(__dirname, './src/infra'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@test': path.resolve(__dirname, './test'),
    },
  },
});
