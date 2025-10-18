import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
    ],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/**/index.ts'],
    },
  },
})
