import type { BondingCurveProps, EncodeBondingCurveProps, ParseBondingCurveProps } from '@/types';
import type { Hash } from 'viem';
import { encodeBondingCurveProps } from './encode-bonding-curve-props';
import { parseBondingCurveParam } from './parse-bonding-curve-param';

/**
 * Encodes the parameters for a bonding curve.
 *
 * If the `initPrice` property is present in `props.param`, it is assumed to be a linear bonding curve and the parameters are parsed.
 *
 * @param props - {@link BondingCurveProps} An object containing the bonding curve type and its parameters.
 * @returns  A hash representing the encoded ABI parameters.
 * @example
 * const params = {
 *   type: 'linear',
 *   param: {
 *     initPrice: 10,
 *     finalPrice: 110,
 *     finalSupply: 100,
 *   },
 * }
 * const res = transformBondingCurveProps(params)
 * console.log(res)
 */
export const transformBondingCurveProps = (props: BondingCurveProps): Hash => {
  if (Object.prototype.hasOwnProperty.call(props.param, 'initPrice')) {
    props.param = parseBondingCurveParam(props as ParseBondingCurveProps);
  }
  return encodeBondingCurveProps(props as EncodeBondingCurveProps);
};
