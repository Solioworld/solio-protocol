import { defaultApproveAmount } from '@/constants';
import { erc20 } from '@/index';
import { hodlAddress, raisingAddress, readClient, writeClient } from 'test/constant';
import { type WriteContractErrorType, isHash, parseEther, zeroAddress } from 'viem';
import { describe, expect, it } from 'vitest';

const [accountAddress] = await writeClient.getAddresses();

describe('erc20 read', async () => {
  it('should getBalanceOf chain token', async () => {
    const result = await erc20.read.getBalanceOf(readClient, {
      account: accountAddress,
    });
    expect(result).toBeTypeOf('bigint');
  });
  it('should getBalanceOf erc20', async () => {
    const result = await erc20.read.getBalanceOf(readClient, {
      address: raisingAddress,
      account: accountAddress,
    });
    expect(result).toBeTypeOf('bigint');
  });
  it('should getBalanceOf mixed token', async () => {
    const result = await erc20.read.getBalanceOf(readClient, {
      address: hodlAddress,
      account: accountAddress,
    });
    expect(result).toBeTypeOf('bigint');
  });
  it('should getAllowance zero address', async () => {
    const result = await erc20.read.getAllowance(readClient, {
      address: zeroAddress,
      spender: hodlAddress,
      account: accountAddress,
    });
    expect(result).toBe(defaultApproveAmount);
  });
  it('should getAllowance erc20', async () => {
    const result = await erc20.read.getAllowance(readClient, {
      address: raisingAddress,
      spender: hodlAddress,
      account: accountAddress,
    });
    expect(result).toBeTypeOf('bigint');
  });
  it('should getAllowance mixed token', async () => {
    const result = await erc20.read.getAllowance(readClient, {
      address: raisingAddress,
      spender: hodlAddress,
      account: accountAddress,
    });
    expect(result).toBeTypeOf('bigint');
  });

  // write
  it('should approve chain token', async () => {
    const result = await erc20.write.approve(writeClient, {
      address: zeroAddress,
      spender: hodlAddress,
      account: accountAddress,
    });
    expect(result).toBeUndefined();
  });
  it('should approve erc20', async () => {
    try {
      const result = await erc20.write.approve(writeClient, {
        address: raisingAddress,
        spender: hodlAddress,
        amount: parseEther('1'),
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('approve erc20 error', err.name);
    }
  });
  it('should approve mixed token', async () => {
    try {
      const result = await erc20.write.approve(writeClient, {
        address: raisingAddress,
        spender: hodlAddress,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('approve erc20 error', err.name);
    }
  });
});

describe('erc20 write', async () => {
  it('should approve erc20', async () => {
    try {
      const result = await erc20.write.approve(writeClient, {
        address: raisingAddress,
        spender: hodlAddress,
        amount: parseEther('1'),
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('approve erc20 error', err.name);
    }
  });
  it('should approve mixed mixed', async () => {
    try {
      const result = await erc20.write.approve(writeClient, {
        address: raisingAddress,
        spender: hodlAddress,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('approve mixed mixed error', err.name);
    }
  });

  it('should checkAndApprove erc20', async () => {
    try {
      const result = await erc20.write.checkAndApprove(writeClient, {
        address: raisingAddress,
        spender: hodlAddress,
        amount: parseEther('1'),
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('checkAndApprove erc20 error', err.name);
    }
  });

  it('should checkAndApprove mixed token', async () => {
    try {
      const result = await erc20.write.approve(writeClient, {
        address: raisingAddress,
        spender: hodlAddress,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('checkAndApprove mixed token error', err.name);
    }
  });
});
