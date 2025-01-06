import { vi } from 'vitest';

vi.mock('../src/index.ts', () => {
  return { version: 'x.y.z' };
});
