import type { EncodeBondingCurveParam, ParseBondingCurveProps, ParseExponentialParam, ParseLinearParam } from '@/types';
import { parseExponentialParam } from './parse-exponential-param';
import { parseLinearParam } from './parse-linear-param';

/**
 * Parse bonding curve parameters.
 *
 * @param {ParseBondingCurveProps} props - {@link ParseBondingCurveProps} An object containing the bonding curve type and its parameters.
 * @returns {EncodeBondingCurveParam} - {@link EncodeBondingCurveParam} Encoded bonding curve parameters.
 * @example
 * const params = {
 *   type: 'linear',
 *   param: {
 *     initPrice: 10,
 *     finalPrice: 110,
 *     finalSupply: 100,
 *   },
 * }
 * const res = parseBondingCurveParam(params)
 * console.log(res)
 */
export const parseBondingCurveParam = ({ type, param }: ParseBondingCurveProps): EncodeBondingCurveParam => {
  let result: EncodeBondingCurveParam;
  switch (type) {
    case 'linear':
      result = parseLinearParam(param as ParseLinearParam);
      break;
    case 'exponential':
      result = parseExponentialParam(param as ParseExponentialParam);
      break;
  }
  return result;
};
