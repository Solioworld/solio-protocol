import type { EncodeExponentialParam, ParseExponentialParam } from '@/types';
import { chain } from 'mathjs';

/**
 * Parse exponential bonding curve parameters.
 *
 * @param {ParseExponentialParam} param - {@link ParseExponentialParam} Exponential bonding curve parameters.
 * @returns {EncodeExponentialParam} - {@link EncodeExponentialParam} Encoded exponential bonding curve parameters.
 */
export const parseExponentialParam = ({
  initPrice,
  aValue,
  finalPrice,
  finalSupply,
  finalTVL,
}: ParseExponentialParam): EncodeExponentialParam => {
  let b = 0;
  let a = 0;
  if (finalTVL) {
    // tvl first
    b = chain(finalTVL).divide(finalPrice).done(); // finalTVL / finalPrice
    a = chain(finalPrice).divide(chain(finalSupply).divide(b).exp().done()).done(); // finalPrice/EXP(finalSupply/b)
  } else if (initPrice) {
    a = initPrice; // initPrice
    if (aValue) {
      b = chain(aValue).divide(initPrice).done(); // aValue / initPrice
    } else {
      b = chain(finalSupply).divide(chain(finalPrice).divide(initPrice).log().done()).done(); // finalSupply / log(finalPrice / initPrice)
    }
  }
  return { a, b };
};
