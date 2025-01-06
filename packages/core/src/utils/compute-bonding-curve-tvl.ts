import type { ComputeBondingCurveProps, EncodeExponentialParam, EncodeLinearParam } from '@/types';
import { computeExponentialTvl } from './compute-exponential-tvl';
import { computeLinearTvl } from './compute-linear-tvl';

/**
 * Computes the total value locked of a bonding curve.
 *
 * @param props - {@link ComputeBondingCurveProps} An object containing the bonding curve type, its parameters, and the current `supply` of the token.
 * @returns The total value locked in the bonding curve.
 * @example
 * const params = {
 *   type: 'linear',
 *   param: {
 *     k: 0.1,
 *     p: 10,
 *   },
 *   supply: 10,
 * }
 * const res = computeBondingCurveTvl(params)
 * console.log(res)
 */
export const computeBondingCurveTvl = ({ type, param, supply }: ComputeBondingCurveProps) => {
  switch (type) {
    case 'exponential':
      return computeExponentialTvl({ ...(param as EncodeExponentialParam), supply });
    case 'linear':
      return computeLinearTvl({ ...(param as EncodeLinearParam), supply });
  }
};
