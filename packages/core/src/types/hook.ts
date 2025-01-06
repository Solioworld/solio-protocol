import type { Address } from 'viem';

// hook
export type HookType = 'launchTime' | 'limit' | 'launchWhitelist';
export type HookLaunchTimeParam = number; // second
export type HookLimitParam = bigint; // wei
export type HookLaunchWhitelistParam = {
  startTime: number; // second
  whiteTime: number; // second
  startFilters: Address[];
  bloomFilters: Address[];
  mintAmounts: bigint[]; // wei
};

export type HookParam = HookLaunchTimeParam | HookLimitParam | HookLaunchWhitelistParam;

export type HookConf<T extends HookParam = HookParam> = {
  address: Address;
  param: T;
  encode?: string;
};
