import { defaultRateMultiplier } from '@/constants';

/**
 * Parse a tax rate from a number to a bigint.
 *
 * @param {number} taxRate - The tax rate to parse.
 * @returns {bigint} The parsed tax rate.
 *
 * @example
 * const parsed = parseTaxRate(0.01);
 * console.log(res)
 */
export const parseTaxRate = (taxRate: number): bigint => {
  return BigInt(Math.floor(taxRate * defaultRateMultiplier));
};
