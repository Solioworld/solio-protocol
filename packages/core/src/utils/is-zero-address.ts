import { type Address, zeroAddress } from 'viem';

/**
 * Checks if an address is zero.
 * @import { Address } from "viem";
 * @param {Address} address - The address to check.
 * @returns True if the address is zero, false otherwise.
 * @example
 * const isZero = isZeroAddress('0x0000000000000000000000000000000000000000');
 * console.log(isZero);
 */
export const isZeroAddress = (address: Address) => address === zeroAddress;
