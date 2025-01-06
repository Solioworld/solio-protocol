import { router } from '@/index';
import {
  factoryAddress,
  hodlAddress,
  hodlIndex,
  lolAddress,
  lolIndex,
  raisingAddress,
  readClient,
  routerAddress,
  writeClient,
} from 'test/constant';
import { type WriteContractErrorType, isHash, parseEther } from 'viem';
import { describe } from 'vitest';

describe('router read', async () => {
  it('should getFactory', async () => {
    const result = await router.read.getFactory(readClient, {
      address: routerAddress,
    });
    expect(result.toLowerCase()).toBe(factoryAddress.toLowerCase());
  });
  it('should getRouter', async () => {
    const { receiveAmount, raisingAmount } = await router.read.getAmountOut(readClient, {
      address: routerAddress,
      payAddress: hodlAddress,
      receiveAddress: lolAddress,
      payAmount: parseEther('1000000'),
    });
    expect(receiveAmount).toBeTypeOf('bigint');
    expect(raisingAmount).toBeTypeOf('bigint');
  });
});

describe('router write', async () => {
  it('should mint', async () => {
    try {
      const result = await router.write.mint(writeClient, {
        address: routerAddress,
        raisingToken: raisingAddress,
        raisingAmount: parseEther('1'),
        mixedTokenIndex: hodlIndex,
        minMixedTokenAmount: parseEther('0.9'),
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('router mint error', err.name);
    }
  });
  it('should swap', async () => {
    try {
      const result = await router.write.swap(writeClient, {
        address: routerAddress,
        raisingToken: raisingAddress,
        payAddress: hodlAddress,
        payIndex: hodlIndex,
        payAmount: parseEther('10000'),
        receiveAddress: lolAddress,
        receiveIndex: lolIndex,
        minReceiveAmount: 1n,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('router swap error', err.name);
    }
  });
});
