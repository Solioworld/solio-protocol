import type { ComputeLinearProps } from '@/types';
import { computeLinearPrice } from './compute-linear-price';

/**
 * Computes the total value locked of a linear bonding curve.
 *
 * @param props - {@link ComputeLinearProps} An object containing the parameters `k` and `p` for the linear bonding curve, and the `supply` of the token.
 * @returns The total value locked in the bonding curve.
 * @example
 * const params = {
 *   k: 0.1,
 *   p: 10,
 *   supply: 10,
 * }
 * const res = computeLinearTvl(params)
 * console.log(res)
 */
export const computeLinearTvl = ({ k, p, supply }: ComputeLinearProps) => {
  if (k === undefined || p === undefined || supply <= 0) return 0;
  return ((p + computeLinearPrice({ k, p, supply })) * supply) / 2;
};
