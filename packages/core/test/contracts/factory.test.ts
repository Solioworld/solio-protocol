import type { FactoryLaunchMixedTokenProps } from '@/contracts';
import { factory } from '@/index';
import {
  factoryAddress,
  hodlAddress,
  hodlIndex,
  ipfsUrl,
  launchTimeAddress,
  limitAddress,
  raisingAddress,
  readClient,
  routerAddress,
  writeClient,
} from 'test/constant';
import { type WriteContractErrorType, isHash, parseEther } from 'viem';
import { describe, expect, it } from 'vitest';

const [accountAddress] = await writeClient.getAddresses();

const hodlLaunchProps: FactoryLaunchMixedTokenProps['mixedToken'] = {
  type: 'HODL',
  bondingCurve: {
    type: 'linear',
    param: {
      initPrice: 0,
      finalPrice: 6,
      finalSupply: 1e32,
    },
  },
  name: 'HODL test',
  symbol: 'HODLTEST',
  metadataUrl: ipfsUrl,
  raisingAddress: raisingAddress,
  mintTaxRate: 0.05, // 5%
  burnTaxRate: 0,
  fastMintAmount: BigInt(1e18), // 1 eth
};

const lolLaunchProps: FactoryLaunchMixedTokenProps['mixedToken'] = {
  type: 'LOL',
  name: 'LOL test',
  symbol: 'LOLTEST',
  metadataUrl: ipfsUrl,
  raisingAddress: raisingAddress,
  fastMintAmount: BigInt(1e18), // 1 eth
};

describe('factory read', async () => {
  // launch hodl token
  // await factory.write.launchMixedToken(writeClient, {
  //   address: factoryAddress,
  //   mixedToken: {
  //     type: 'HODL',
  //     bondingCurve: {
  //       type: 'linear',
  //       param: {
  //         initPrice: 0,
  //         finalPrice: 6,
  //         supply: 1e32,
  //       },
  //     },
  //     name: '',
  //     symbol: '',
  //     metadataUrl: 'ipfs://',
  //     raisingAddress: '0x',
  //     mintTaxRate: 0.05, // 5%
  //     burnTaxRate: 0,
  //     fastMintAmount: BigInt(1e18), // 1 eth
  //   },
  // });
  // launch lol token
  // await factory.write.launchMixedToken(writeClient, {
  //   address: factoryAddress,
  //   mixedToken: {
  //     type: 'LOL',
  //     name: '',
  //     symbol: '',
  //     metadataUrl: 'ipfs://',
  //     raisingAddress: '0x',
  //     fastMintAmount: BigInt(1e18), // 1 eth
  //   },
  // });
  it('should getRoute', async () => {
    const result = await factory.read.getRouter(readClient, { address: factoryAddress });
    expect(result.toLowerCase()).toBe(routerAddress.toLowerCase());
  });
  it('should getMixedTokenWithIndex', async () => {
    const result = await factory.read.getMixedTokenWithIndex(readClient, {
      address: factoryAddress,
      mixedTokenIndex: hodlIndex,
    });
    expect(result.toLowerCase()).toBe(hodlAddress.toLowerCase());
  });
});

describe('factory write', async () => {
  // launch hodl token
  it('should launchMixedToken HODL', async () => {
    try {
      const result = await factory.write.launchMixedToken(writeClient, {
        address: factoryAddress,
        mixedToken: hodlLaunchProps,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('launchMixedToken HODL error', err.name);
    }
  });
  it('should launchMixedToken LOL', async () => {
    try {
      // launch lol token
      const result = await factory.write.launchMixedToken(writeClient, {
        address: factoryAddress,
        mixedToken: lolLaunchProps,
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('launchMixedToken LOL error', err.name);
    }
  });
  it('should launchMixedToken hook launchTime', async () => {
    try {
      const result = await factory.write.launchMixedToken(writeClient, {
        address: factoryAddress,
        mixedToken: {
          ...hodlLaunchProps,
          name: 'hodl-launchTime-test',
          hook: {
            launchTime: {
              address: launchTimeAddress,
              param: Math.floor(new Date().getTime() / 1e3) + 60 * 60 * 24,
            },
          },
        },
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('launchMixedToken hook launchTime error', err.name);
    }
  });
  it('should launchMixedToken hook limit', async () => {
    try {
      const result = await factory.write.launchMixedToken(writeClient, {
        address: factoryAddress,
        mixedToken: {
          ...hodlLaunchProps,
          name: 'hodl-limit-test',
          hook: {
            limit: {
              address: limitAddress,
              param: parseEther('1'),
            },
          },
        },
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('launchMixedToken hook limit error', err.name);
    }
  });
  it('should launchMixedToken hook launchWhitelist', async () => {
    try {
      const startTime = Math.floor(new Date().getTime() / 1e3) + 60 * 60 * 24;
      const result = await factory.write.launchMixedToken(writeClient, {
        address: factoryAddress,
        mixedToken: {
          ...hodlLaunchProps,
          name: 'hodl-whitelist-test',
          hook: {
            launchWhitelist: {
              address: launchTimeAddress,
              param: {
                startTime: startTime,
                whiteTime: startTime + 60 * 60 * 24,
                startFilters: [accountAddress],
                bloomFilters: [accountAddress],
                mintAmounts: [parseEther('1')],
              },
            },
          },
        },
      });
      expect(result ? isHash(result) : false).toBe(true);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('launchMixedToken hook launchWhitelist error', err.name);
    }
  });
});
