import type { FormatLinearParam, ParseLinearParam } from '@/types';
import { chain } from 'mathjs';

/**
 * Format FormatLinearParam into ParseLinearParam.
 *
 * @param {FormatLinearParam} param - {@link FormatLinearParam} Object containing `k`, `p`, and `finalSupply` as `BigNumber` numbers.
 * @returns {ParseLinearParam} - {@link ParseLinearParam} Object containing `initPrice`, `finalPrice` and `finalSupply` as numbers.
 * @example
 * import { parseEther } from 'viem';
 * import { formatLinearParam } from @solio/core;
 * const params = {
 *   k: parseEther('1'),
 *   p: parseEther('1'),
 *   finalSupply: parseEther('1'),
 * }
 * const res = formatLinearParam(params)
 * console.log(res)
 */
export const formatLinearParam = ({ k, p, finalSupply }: FormatLinearParam): ParseLinearParam => {
  const initPrice = p;
  const finalPrice = chain(k).multiply(finalSupply).add(initPrice).done(); // k * finalSupply + initPrice
  return {
    initPrice,
    finalPrice,
    finalSupply,
  };
};
