import type { Address } from 'viem';
import type { BondingCurveProps } from './bonding-curve';
import type { HookConf, HookLaunchTimeParam, HookLaunchWhitelistParam, HookLimitParam } from './hook';

export type MixedTokenType = 'LOL' | 'ERC20' | 'ERC20WithSupply';
export type EncodeMixedTokenType = 'HODL' | 'LOL';
export type MetadataUrl = 'ipfs://' | string;
export type MixedTokenBaseParam = {
  type: EncodeMixedTokenType;
  name: string;
  symbol: string;
  metadataUrl: MetadataUrl;
  raisingAddress: Address;
  adminAddress?: Address;
  treasuryAddress?: Address;
  hook?: {
    launchTime?: HookConf<HookLaunchTimeParam>;
    limit?: HookConf<HookLimitParam>;
    launchWhitelist?: HookConf<HookLaunchWhitelistParam>;
  };
  fastMintAmount?: bigint; // mintAmount = fastMintAmount * (1 - mintTaxRate - factoryTaxRate)
};
export type MixedTokenHODLParam = MixedTokenBaseParam & {
  type: 'HODL';
  bondingCurve: BondingCurveProps;
  mintTaxRate: number; // 5% = 0.05
  burnTaxRate: number; // 5% = 0.05
  maxSupply?: bigint;
};
export type MixedTokenLOLParam = MixedTokenBaseParam & {
  type: 'LOL';
  bondingCurve?: BondingCurveProps;
  mintTaxRate?: number; // 5% = 0.05
  burnTaxRate?: number; // 5% = 0.05
  maxSupply?: bigint;
};
export type MixedTokenParam = MixedTokenHODLParam | MixedTokenLOLParam;
