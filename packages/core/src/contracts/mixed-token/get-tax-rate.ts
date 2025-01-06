import type { ReadClient } from '@/types';
import { formatTaxRate } from '@/utils';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenGetTaxRateProps = {
  address: Address;
};

/**
 * Reads the mint and burn tax rates of a mixed token.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link MixedTokenGetTaxRateProps} The properties to use.
 * @param props.address -  {@link Address} The address of the mixed token.
 * @returns The mint and burn tax rates, formatted as ratios.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const { mintTax, burnTax } = await mixedToken.read.getTaxRate(readClient, {
 *  address: '0x...', // mixed token address
 * });
 * console.log(mintTax, burnTax);
 */
export const getTaxRate = async (client: ReadClient, props: MixedTokenGetTaxRateProps) => {
  const { address } = props;
  const [mintTax, burnTax] = await readContract(client, {
    address,
    abi: mixedTokenAbi,
    functionName: 'getTaxRateOfProject',
  });
  return { mintTax: formatTaxRate(mintTax), burnTax: formatTaxRate(burnTax) };
};
