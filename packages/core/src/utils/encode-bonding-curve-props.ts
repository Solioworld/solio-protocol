import type { EncodeBondingCurveProps, EncodeExponentialParam, EncodeLinearParam } from '@/types';
import type { Hash } from 'viem';
import { encodeExponentialParam } from './encode-exponential-param';
import { encodeLinearParam } from './encode-linear-param';

/**
 * Encodes the parameters for a bonding curve.
 *
 * @param props - {@link EncodeBondingCurveProps} An object containing the bonding curve type and its parameters.
 * @returns  A hash representing the encoded ABI parameters.
 * @example
 * const params = {
 *   type: 'linear',
 *   param: {
 *     k: 0.1,
 *     p: 10,
 *   },
 * }
 * const res = encodeBondingCurveProps(params)
 * console.log(res)
 */
export const encodeBondingCurveProps = ({ type, param }: EncodeBondingCurveProps): Hash => {
  let result: Hash | undefined;
  switch (type) {
    case 'linear':
      result = encodeLinearParam(param as EncodeLinearParam);
      break;
    case 'exponential':
      result = encodeExponentialParam(param as EncodeExponentialParam);
      break;
  }
  return result;
};
