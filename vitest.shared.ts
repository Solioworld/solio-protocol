import { defineConfig, type Plugin } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths';
import { loadEnv } from 'vite';

export default defineConfig({
  plugins: [tsconfigPaths()] as Plugin[],
  test: {
    globals: true,
    name: 'core:dom',
    environment: 'jsdom',
    env: loadEnv('', import.meta.dirname, ''),
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
})
