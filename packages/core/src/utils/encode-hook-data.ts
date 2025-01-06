import { defaultHooksEncode } from '@/constants';
import type { HookConf, HookLaunchTimeParam, HookLaunchWhitelistParam, HookLimitParam, HookParam, HookType } from '@/types';
import { encodeAbiParameters, parseAbiParameters } from 'viem';

/**
 * Encodes the parameters for a given hook type.
 *
 * @param type - {@link HookType} The type of the hook.
 * @param conf - {@link HookConf<HookParam>} An object containing the hook address and its parameters.
 * @returns  A hash representing the encoded ABI parameters.
 * @example
 * const params = {
 *   type: 'launchTime',
 *   param: 10,
 * }
 * const res = encodeHookData(params)
 * console.log(res)
 */
export const encodeHookData = (type: HookType, conf: HookConf<HookParam>) => {
  let encode: string;
  let params = [];
  switch (type) {
    case 'launchTime':
      encode = conf.encode ?? defaultHooksEncode.launchTime;
      params = [BigInt((conf as HookConf<HookLaunchTimeParam>).param)];
      break;
    case 'limit':
      encode = conf.encode ?? defaultHooksEncode.limit;
      params = [(conf as HookConf<HookLimitParam>).param];
      break;
    case 'launchWhitelist': {
      encode = conf.encode ?? defaultHooksEncode.launchWhitelist;
      const param = (conf as HookConf<HookLaunchWhitelistParam>).param;
      params = [BigInt(param.startTime), BigInt(param.whiteTime), param.startFilters, param.bloomFilters, param.mintAmounts];
      break;
    }
  }
  return encodeAbiParameters(parseAbiParameters(encode.replace(/^\(|\)$/g, '')), params);
};
