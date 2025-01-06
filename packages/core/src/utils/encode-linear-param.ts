import type { EncodeLinearParam } from '@/types';
import { type Hash, encodeAbiParameters, parseEther } from 'viem';
import { formatSafeToString } from './format-safe-to-string';

/**
 * Encodes the parameters for a linear bonding curve.
 *
 * @param param - {@link EncodeLinearParam} An object containing the parameters `k` and `p` for the linear bonding curve.
 * @returns  A hash representing the encoded ABI parameters.
 * @example
 * const params = {
 *   k: 0.1,
 *   p: 10,
 * }
 * const res = encodeLinearParam(params)
 * console.log(res)
 */
export const encodeLinearParam = (param: EncodeLinearParam): Hash => {
  return encodeAbiParameters(
    [{ type: 'uint256' }, { type: 'uint256' }],
    [parseEther(formatSafeToString(param.k)), parseEther(formatSafeToString(param.p))],
  );
};
