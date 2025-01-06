import { defaultRateMultiplier } from '@/constants';

/**
 * Format a tax rate from a `bigint` to a decimal number.
 * @param {bigint} taxRate - The tax rate to format.
 * @returns {number} - The formatted tax rate.
 * @example
 * const formatted = formatTaxRate(10000000000000000n);
 * console.log(formatted);
 */
export const formatTaxRate = (taxRate: bigint): number => {
  return Number(taxRate) / defaultRateMultiplier;
};
