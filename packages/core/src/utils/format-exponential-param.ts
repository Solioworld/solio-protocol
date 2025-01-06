import type { FormatExponentialParam, ParseExponentialParam } from '@/types';
import { chain } from 'mathjs';

/**
 * Format FormatExponentialParam into ParseExponentialParam.
 *
 * @param {FormatExponentialParam} param - {@link FormatExponentialParam} Object containing `a` and `b` as `BigNumber` numbers.
 * @returns {ParseExponentialParam} - {@link ParseExponentialParam} Object containing `initPrice` and `aValue` as numbers.
 * @example
 * import { parseEther } from 'viem';
 * import { formatExponentialParam } from @solio/core;
 * const params = {
 *   a: parseEther('1'),
 *   b: parseEther('1'),
 * }
 * const res = formatExponentialParam(params)
 * console.log(res)
 */
export const formatExponentialParam = ({ a, b, finalSupply }: FormatExponentialParam): ParseExponentialParam => {
  const initPrice = a;
  const _supply = finalSupply ? finalSupply : undefined;
  const aValue = finalSupply ? undefined : chain(initPrice).multiply(b).done(); // b * initPrice
  const finalPrice = _supply ? chain(_supply).divide(b).exp().multiply(initPrice).done() : undefined; // initPrice * Math.exp(_supply / b)
  return {
    initPrice,
    aValue,
    finalSupply: _supply,
    finalPrice,
  } as ParseExponentialParam;
};
