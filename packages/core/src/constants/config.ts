import type { BondingCurveProps } from '@/types';

// default rate multiplier
export const defaultRateMultiplier = 1e4;

// default token decimals
export const defaultTokenDecimals = 18;

// default approve value
export const defaultApproveAmount = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

// default mint|burn|swap timeout
export const defaultTransactionTimeout = BigInt(3 * 60);

// default hooks encode
export const defaultHooksEncode = {
  launchTime: '(uint256)',
  limit: '(uint256)',
  launchWhitelist: '(uint256,uint256,address[], uint256[][], uint256[])',
};

// default lol ratio
export const defaultLOLRatio = 90;
// default lol max supply
export const defaultLOLMaxSupply = (1e8 * defaultLOLRatio) / 100;
// default lol parameters
export const defaultLOLParameter = {
  bondingCurve: {
    type: 'exponential',
    param: {
      initPrice: 0.0000198888,
      aValue: 31906964 * 0.0000198888,
    },
  } as BondingCurveProps,
  maxSupply: defaultLOLMaxSupply,
  mintTaxRate: 0.01,
  burnTaxRate: 0.01,
};
