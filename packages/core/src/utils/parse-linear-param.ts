import type { EncodeLinearParam, ParseLinearParam } from '@/types';
import { chain } from 'mathjs';

/**
 * Parse linear bonding curve parameters.
 *
 * @param {ParseLinearParam} param - {@link ParseLinearParam}  Linear bonding curve parameters.
 * @returns {EncodeLinearParam} - {@link EncodeLinearParam} Encoded linear bonding curve parameters.
 * @example
 * const params = {
 *   initPrice: 10,
 *   finalPrice: 110,
 *   finalSupply: 100,
 * }
 * const res = parseLinearParam(params)
 * console.log(res)
 */
export const parseLinearParam = ({ initPrice, finalPrice, finalSupply, finalTVL }: ParseLinearParam): EncodeLinearParam => {
  const p = initPrice;
  let k = 0;
  if (finalTVL) {
    // tvl first
    k = chain(finalTVL)
      .subtract(chain(initPrice).multiply(finalSupply).done())
      .multiply(2)
      .divide(finalSupply)
      .divide(finalSupply)
      .done(); // (finalTVL-initPrice*finalSupply)*2/finalSupply/finalSupply
  } else {
    k = chain(finalPrice).subtract(initPrice).divide(finalSupply).done(); // (finalPrice - initPrice) / finalSupply
  }
  return { k, p };
};
