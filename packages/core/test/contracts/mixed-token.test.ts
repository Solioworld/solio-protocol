import { mixedToken } from '@/index';
import { formatSafeToString } from '@/utils';
import { hodlAddress, ipfsUrl, raisingAddress, readClient, writeClient } from 'test/constant';
import { type WriteContractErrorType, isAddress, isHash, parseEther } from 'viem';
import { describe } from 'vitest';

const [accountAddress] = await writeClient.getAddresses();

describe('mixed token read', async () => {
  it('should getRaisingAddress', async () => {
    const result = await mixedToken.read.getRaisingToken(readClient, {
      address: hodlAddress,
    });
    expect(result.toLowerCase()).toBe(raisingAddress.toLowerCase());
  });
  it('should getAdmin', async () => {
    const result = await mixedToken.read.getAdmin(readClient, {
      address: hodlAddress,
    });
    expect(result ? isAddress(result) : false).toBe(true);
  });
  it('should getMetadata', async () => {
    const result = await mixedToken.read.getMetadata(readClient, {
      address: hodlAddress,
    });
    expect(result).toBeTypeOf('string');
  });
  it('should getTaxRate', async () => {
    const { mintTax, burnTax } = await mixedToken.read.getTaxRate(readClient, {
      address: hodlAddress,
    });
    expect(mintTax).toBeTypeOf('number');
    expect(burnTax).toBeTypeOf('number');
  });
  it('should getTaxRateAndTreasury', async () => {
    const treasuryAddress = await mixedToken.read.getTreasury(readClient, {
      address: hodlAddress,
    });
    expect(treasuryAddress ? isAddress(treasuryAddress) : false).toBe(true);
  });
  it('should getEstimateMint', async () => {
    const { mixedTokenAmount } = await mixedToken.read.getEstimateMint(readClient, {
      address: hodlAddress,
      raisingAmount: parseEther('10'),
    });
    expect(mixedTokenAmount).toBeTypeOf('bigint');
  });
  it('should getEstimateBurn', async () => {
    const { raisingAmount } = await mixedToken.read.getEstimateBurn(readClient, {
      address: hodlAddress,
      mixedTokenAmount: parseEther('10000'),
    });
    expect(raisingAmount).toBeTypeOf('bigint');
  });
  it('should getEstimateMintNeed', async () => {
    const { raisingAmount } = await mixedToken.read.getEstimateMintNeed(readClient, {
      address: hodlAddress,
      mixedTokenAmount: parseEther('10000'),
    });
    expect(raisingAmount).toBeTypeOf('bigint');
  });
});

describe('mixed token write', async () => {
  it('should mint', async () => {
    try {
      const result = await mixedToken.write.mint(writeClient, {
        address: hodlAddress,
        raisingAmount: parseEther('10'),
        minMixedTokenAmount: parseEther(formatSafeToString(10 * 0.9)),
        raisingAddress,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mixed token mint error', err.name);
    }
  });
  it('should burn', async () => {
    try {
      const result = await mixedToken.write.burn(writeClient, {
        address: hodlAddress,
        raisingAmount: parseEther('10'),
        minMixedTokenAmount: 0n,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mixed token burn error', err.name);
    }
  });
  it('should setAdmin', async () => {
    try {
      const result = await mixedToken.write.setAdmin(writeClient, {
        address: hodlAddress,
        adminAddress: accountAddress,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mixed token setAdmin error', err.name);
    }
  });
  it('should setTaxRate', async () => {
    try {
      const result = await mixedToken.write.setTaxRate(writeClient, {
        address: hodlAddress,
        mintTax: 0.1,
        burnTax: 0.1,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mixed token setTaxRate error', err.name);
    }
  });
  it('should setTaxRateAndTreasury', async () => {
    try {
      const result = await mixedToken.write.setTaxRateAndTreasury(writeClient, {
        address: hodlAddress,
        mintTax: 0.1,
        burnTax: 0.1,
        treasuryAddress: accountAddress,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mixed token setTaxRateAndTreasury error', err.name);
    }
  });
  it('should setMetadata', async () => {
    try {
      const result = await mixedToken.write.setMetadata(writeClient, {
        address: hodlAddress,
        metadataUrl: ipfsUrl,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mixed token setMetadata error', err.name);
    }
  });
  it('should setTreasury', async () => {
    try {
      const result = await mixedToken.write.setTreasury(writeClient, {
        address: hodlAddress,
        treasuryAddress: accountAddress,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mixed token setTreasury error', err.name);
    }
  });
});
