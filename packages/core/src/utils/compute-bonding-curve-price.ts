import type { ComputeBondingCurveProps, EncodeExponentialParam, EncodeLinearParam } from '@/types';
import { computeExponentialPrice } from './compute-exponential-price';
import { computeLinearPrice } from './compute-linear-price';

/**
 * Computes the current price of a given bonding curve.
 *
 * @param props - {@link ComputeBondingCurveProps} An object containing the bonding curve type, its parameters, and the current `supply` of the token.
 * @returns The current price of the token.
 * @example
 * const params = {
 *   type: 'linear',
 *   param: {
 *     k: 0.1,
 *     p: 10,
 *   },
 *   supply: 10,
 * }
 * const res = computeBondingCurvePrice(params)
 * console.log(res)
 */
export const computeBondingCurvePrice = ({ type, param, supply }: ComputeBondingCurveProps) => {
  switch (type) {
    case 'exponential':
      return computeExponentialPrice({ ...(param as EncodeExponentialParam), supply });
    case 'linear':
      return computeLinearPrice({ ...(param as EncodeLinearParam), supply });
  }
};
