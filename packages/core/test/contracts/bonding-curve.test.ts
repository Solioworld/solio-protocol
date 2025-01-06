import { bondingCurve } from '@/index';
import { exponentialAddress, linearAddress, readClient } from 'test/constant';
import { describe, expect, it } from 'vitest';

const exponentialProps = {
  address: exponentialAddress,
  type: 'exponential',
  param: {
    a: 0.01,
    b: 1000000,
  },
} as const;

const linearProps = {
  address: linearAddress,
  type: 'linear',
  param: {
    initPrice: 0.001,
    finalPrice: 1000,
    finalSupply: 1e32,
  },
  // param: {  // parseLinearParam()
  //   k: 0.00001,
  //   p: 0.001,
  // },
} as const;

describe('bonding curve read', () => {
  // get mint amount
  it('should getMintAmount exponential', async () => {
    const result = await bondingCurve.read.getMintAmount(readClient, { ...linearProps, raisingAmount: 100n });
    expect(result).toBeTypeOf('bigint');
  });
  it('should getMintAmount exponential ', async () => {
    const result = await bondingCurve.read.getMintAmount(readClient, { ...exponentialProps, raisingAmount: 100n });
    expect(result).toBeTypeOf('bigint');
  });

  // get burn amount
  it('should getMintAmount linear', async () => {
    const result = await bondingCurve.read.getBurnAmount(readClient, { ...linearProps, mixedTokenAmount: 100000n });
    expect(result).toBeTypeOf('bigint');
  });
  it('should getMintAmount exponential ', async () => {
    const result = await bondingCurve.read.getBurnAmount(readClient, { ...exponentialProps, mixedTokenAmount: 9999n });
    expect(result).toBeTypeOf('bigint');
  });
});
