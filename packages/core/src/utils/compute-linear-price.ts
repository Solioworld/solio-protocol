import type { ComputeLinearProps } from '@/types';

/**
 * Computes the price of a linear bonding curve.
 *
 * @param props - {@link ComputeLinearProps} An object containing the parameters `k` and `p` for the linear bonding curve, and the `supply` of the token.
 * @returns The current price of the token.
 * @example
 * const params = {
 *   k: 0.1,
 *   p: 10,
 *   supply: 10,
 * }
 * const res = computeLinearPrice(params)
 * console.log(res)
 */
export const computeLinearPrice = ({ k, p, supply }: ComputeLinearProps) => {
  if (k === undefined || p === undefined || supply <= 0) return 0;
  return k * supply + p;
};
