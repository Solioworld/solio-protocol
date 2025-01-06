import { loadEnv } from 'vite';
import { defineProject, mergeConfig } from 'vitest/config';
import configShared from '../../vitest.shared';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      root: `${import.meta.dirname}/test`,
      globals: true,
      name: 'core:dom',
      environment: 'jsdom',
      env: loadEnv('', import.meta.dirname, ''),
      browser: {
        enabled: true,
        provider: 'preview',
        name: 'edge',
      },
      setupFiles: ['setup.ts'],
    },
  }),
);
