import { format } from 'mathjs';

/**
 * Safely formats a number to a string, handling very large or very small numbers with exponents.
 * @param {any} value - The value to format.
 * @returns {`${number}` | string} - The formatted string.
 * @example
 * const num = 1.23e-45;
 * const formatted = formatSafeToString(num);
 * console.log(formatted);
 */
export const formatSafeToString = (value: any): `${number}` | string => {
  const num = Number(value);
  if (Number.isNaN(num) || num === 0 || Math.abs(num) < Number.MIN_VALUE || Math.abs(num) > Number.MAX_VALUE) return '0';
  return format(num, { notation: 'fixed' });
};
