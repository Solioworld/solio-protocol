import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenGetTreasuryProps = {
  address: Address;
};

/**
 * Reads the project treasury address of a mixed token.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link MixedTokenGetTreasuryProps} The properties to use.
 * @param props.address -  {@link Address} The address of the mixed token.
 * @returns The project treasury address.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const treasury = await mixedToken.read.getTreasury(readClient, {
 *  address: '0x...' // mixed token address
 * });
 */
export const getTreasury = async (client: ReadClient, props: MixedTokenGetTreasuryProps) => {
  const { address } = props;
  return await readContract(client, {
    address,
    abi: mixedTokenAbi,
    functionName: 'getProjectTreasury',
  });
};
