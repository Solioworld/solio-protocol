import { formatSafeToString } from '@solio/core';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatNumberWithComma = (value: any) => {
  const numberValue = value.replace(/[^0-9.]/g, '');
  const parts = numberValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatInputNumber = (value: any = '0') => {
  const numberValue = value.toString().replace(/[^0-9.e\-+]/g, '') as string;
  const parts = numberValue.split('.');
  const num = parts.slice(0, 2).join('.');
  return `${num.includes('e') ? formatSafeToString(num) : num}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatNumberView = (value: any, decimal = 3, roundingFunction = Math.floor, truncate = false) => {
  let num = Number(value);
  let before = '';
  let unit = '';
  if (decimal < 0) throw new Error('decimal needs to be greater than 0');
  if (isNaN(num) || num === Number.POSITIVE_INFINITY) return '-';
  if (num === 0) return '0';
  if (num < 0) before += '-';
  num = Math.abs(num);
  if (num >= Number.MAX_VALUE) {
    before += '>';
    num = Number.MAX_VALUE;
  }
  if (num < Number.MIN_VALUE) {
    before += '<';
    num = Number.MIN_VALUE;
  }
  if (num >= Math.pow(10, 18)) {
    num = num / Math.pow(10, 18);
    unit = 'Qa';
  } else if (num >= Math.pow(10, 15)) {
    num = num / Math.pow(10, 15);
    unit = 'Q';
  } else if (num >= Math.pow(10, 12)) {
    num = num / Math.pow(10, 12);
    unit = 'T';
  } else if (num >= Math.pow(10, 9)) {
    num = num / Math.pow(10, 9);
    unit = 'B';
  } else if (num >= Math.pow(10, 6)) {
    num = num / Math.pow(10, 6);
    unit = 'M';
  } else if (num >= Math.pow(10, 4)) {
    num = num / Math.pow(10, 3);
    unit = 'K';
  }
  let str = formatSafeToString(num);
  if (str === '-') return '-';
  const minCropNum = Math.pow(10, -decimal);
  let [integerPart, decimalPart] = str.includes('.') ? str.split('.') : [str, ''];
  let zeroStr = '';
  if (decimalPart && num < minCropNum) {
    const zeroLen = decimalPart.replace(/[1-9][0-9]*$/g, '').length;
    decimalPart = decimalPart.replace(/00*/, '').substring(0, decimal).replace(/00/, '');
    zeroStr = zeroLen && zeroLen > 0 ? `0{${zeroLen}}` : '';
  } else {
    const noZeroIndex = Array.from(decimalPart).findIndex((a) => Number(a) > 0);
    const noZeroLen =
      noZeroIndex === -1 || (noZeroIndex === decimalPart.length - 1 && Number(decimalPart.replace(/0/g, '')) < 5)
        ? 0
        : noZeroIndex;
    const noZeroDecimal = noZeroLen + decimal;
    const maxCropNum = Math.pow(10, noZeroDecimal);
    const decimalNum = Number(`${integerPart}.${decimalPart.substring(0, noZeroDecimal + 1)}`);
    const roundedNum = roundingFunction(decimalNum * maxCropNum) / maxCropNum;
    str = formatSafeToString(roundedNum.toFixed(truncate ? decimal : noZeroDecimal));
    [integerPart, decimalPart] = str.includes('.') ? str.split('.') : [str, ''];
  }
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const viewNum = `${before}${integerPart}${decimalPart ? '.' : ''}${zeroStr}${decimalPart}`;
  return `${viewNum}${unit}`;
};
