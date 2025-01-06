import type { ComputeExponentialProps } from '@/types';
import { computeExponentialPrice } from './compute-exponential-price';

/**
 * Computes the total value locked of an exponential bonding curve.
 *
 * @param props - {@link ComputeExponentialProps} An object containing the parameters `a` and `b` for the exponential bonding curve, and the `supply` of the token.
 * @returns The total value locked in the bonding curve.
 * @example
 * const params = {
 *   a: 0.1,
 *   b: 10,
 *   supply: 10,
 * }
 * const res = computeExponentialTvl(params)
 * console.log(res)
 */
export const computeExponentialTvl = ({ a, b, supply }: ComputeExponentialProps) => {
  if (a === undefined || b === undefined || supply <= 0) return 0;
  return b * computeExponentialPrice({ a, b, supply }) - a * b;
};
