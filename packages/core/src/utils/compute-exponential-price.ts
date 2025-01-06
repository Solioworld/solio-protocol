import type { ComputeExponentialProps } from '@/types';
import { chain } from 'mathjs';

/**
 * Computes the price of an exponential bonding curve.
 *
 * @param props - {@link ComputeExponentialProps} An object containing the parameters `a` and `b` for the exponential bonding curve, and the `supply` of the token.
 * @returns The current price of the token.
 * @example
 * const params = {
 *   a: 0.1,
 *   b: 10,
 *   supply: 10,
 * }
 * const res = computeExponentialPrice(params)
 * console.log(res)
 */
export const computeExponentialPrice = ({ a, b, supply }: ComputeExponentialProps) => {
  if (a === undefined || b === undefined || supply <= 0) return 0;
  return chain(supply).divide(b).exp().multiply(a).done(); // a * Math.exp(supply / b)
};
