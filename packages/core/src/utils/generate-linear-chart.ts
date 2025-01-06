import type { BondingCurveChart, GenerateLinearChartProps } from '@/types';
import { computeLinearPrice } from './compute-linear-price';
import { computeLinearTvl } from './compute-linear-tvl';

/**
 * Generates a linear bonding curve chart.
 *
 * @param props - {@link GenerateLinearChartProps} An object containing the parameters `k` and `p` for the linear bonding curve, and the current `supply` of the token.
 * @returns A chart of the linear bonding curve, with the supply on the x-axis, the price on the y-axis, and the total value locked and market capitalization as additional data points.
 * @example
 * const params = {
 *   k: 0.1,
 *   p: 10,
 *   supply: 10,
 * }
 * const res = generateLinearChart(params)
 * console.log(res)
 */
export const generateLinearChart = ({
  k,
  p,
  supply: _supply,
  start = 0,
  end = _supply,
  count = 500,
}: GenerateLinearChartProps) => {
  if ((k === undefined && k < 0) || _supply <= 0) {
    return [];
  }
  const data: BondingCurveChart = [];
  const step = (end - start) / count;
  for (let i = 0; i <= count; i++) {
    const supply = start > 0 ? start + step * i : step * i;
    const price = computeLinearPrice({ k, p, supply });
    const tvl = computeLinearTvl({ k, p, supply });
    data.push({
      supply,
      price,
      tvl,
      marketCap: supply * price,
    });
  }
  return data;
};
