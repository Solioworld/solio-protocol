import { beforeAll } from 'vitest';
import { writeClient } from './constant';

beforeAll(async () => {
  await writeClient.requestAddresses();
});
