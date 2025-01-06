import type { BondingCurveChart, GenerateExponentialChartProps } from '@/types';
import { computeExponentialPrice } from './compute-exponential-price';
import { computeExponentialTvl } from './compute-exponential-tvl';

/**
 * Generates a chart for an exponential bonding curve.
 *
 * @param props - {@link GenerateExponentialChartProps} An object containing the parameters `a` and `b` for the exponential bonding curve, and the `supply` of the token.
 * @returns An array of points on the chart, each containing the `supply`, `price`, `tvl`, and `marketCap` of the token.
 * @example
 * const params = {
 *   a: 0.1,
 *   b: 10,
 *   supply: 100,
 * }
 * const res = generateExponentialChart(params)
 * console.log(res)
 */
export const generateExponentialChart = ({
  a,
  b,
  supply: _supply,
  start = 0,
  end = _supply,
  count = 500,
}: GenerateExponentialChartProps) => {
  if (a === undefined || b === undefined || _supply <= 0) {
    return [];
  }
  const data: BondingCurveChart = [];
  const step = (end - start) / count;
  for (let i = 0; i <= count; i++) {
    const supply = start > 0 ? start + step * i : step * i;
    const price = computeExponentialPrice({ a, b, supply });
    data.push({
      supply,
      price,
      tvl: computeExponentialTvl({ a, b, supply }),
      marketCap: supply * price, // supply * price
    });
  }
  return data;
};
