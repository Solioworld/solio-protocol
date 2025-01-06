import type { EncodeExponentialParam } from '@/types';
import { type Hash, encodeAbiParameters, parseEther } from 'viem';
import { formatSafeToString } from './format-safe-to-string';

/**
 * Encodes the parameters for an exponential bonding curve.
 *
 * @param param - {@link EncodeExponentialParam} An object containing the parameters `a` and `b` for the exponential bonding curve.
 * @returns  A hash representing the encoded ABI parameters.
 * @example
 * const params = {
 *   a: 0.1,
 *   b: 10,
 * }
 * const res = encodeExponentialParam(params)
 * console.log(res)
 */
export const encodeExponentialParam = (param: EncodeExponentialParam): Hash => {
  return encodeAbiParameters(
    [{ type: 'uint256' }, { type: 'uint256' }],
    [parseEther(formatSafeToString(param.a)), parseEther(formatSafeToString(param.b))],
  );
};
