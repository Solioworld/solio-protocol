import type { FormatBondingCurveProps, FormatExponentialParam, FormatLinearParam, ParseBondingCurveParam } from '@/types';
import { formatExponentialParam } from './format-exponential-param';
import { formatLinearParam } from './format-linear-param';

/**
 * Format BondingCurveProps into ParseBondingCurveParam.
 *
 * @param {FormatBondingCurveProps} props - {@link FormatBondingCurveProps} BondingCurveProps
 * @returns {ParseBondingCurveParam} - {@link ParseBondingCurveParam} Formatted ParseBondingCurveParam
 * @example
 * const params = {
 *   type: 'linear',
 *   param: {
 *     k: parseEther('1'),
 *     p: parseEther('1'),
 *     finalSupply: parseEther('1'),
 *   },
 * }
 * const res = formatBondingCurveProps(params)
 * console.log(res)
 }
 */
export const formatBondingCurveProps = ({ type, param }: FormatBondingCurveProps): ParseBondingCurveParam => {
  let result: ParseBondingCurveParam;
  switch (type) {
    case 'linear':
      result = formatLinearParam(param as FormatLinearParam);
      break;
    case 'exponential':
      result = formatExponentialParam(param as FormatExponentialParam);
      break;
  }
  return result;
};
