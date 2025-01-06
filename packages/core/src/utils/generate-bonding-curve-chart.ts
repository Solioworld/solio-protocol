import type { EncodeExponentialParam, EncodeLinearParam, GenerateBondingCurveChartProps } from '@/types';
import { generateExponentialChart } from './generate-exponential-chart';
import { generateLinearChart } from './generate-linear-chart';

/**
 * Generates a chart of a given bonding curve type.
 *
 * @param props - {@link GenerateBondingCurveChartProps} An object containing the parameters for the bonding curve, including the type, current supply, start and end points, and the number of points to generate.
 * @returns A chart of the bonding curve, with the supply on the x-axis, the price on the y-axis, and the total value locked and market capitalization as additional data points.
 * @example
 * const params = {
 *   type: 'exponential',
 *   supply: 10,
 *   param: {
 *     a: 1,
 *     b: 2,
 *   },
 * }
 * const res = generateBondingCurveChart(params)
 * console.log(res)
 */
export const generateBondingCurveChart = ({
  type,
  supply,
  start = 0,
  end = supply,
  count = 500,
  param,
}: GenerateBondingCurveChartProps) => {
  switch (type) {
    case 'exponential':
      return generateExponentialChart({ ...(param as EncodeExponentialParam), supply, start, end, count });
    case 'linear':
      return generateLinearChart({ ...(param as EncodeLinearParam), supply, start, end, count });
  }
};
