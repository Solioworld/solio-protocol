import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenGetAdminProps = {
  address: Address;
};

/**
 * Reads the project admin address of a mixed token.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link MixedTokenGetAdminProps} The properties to use.
 * @param props.address -  {@link Address} The address of the mixed token.
 * @returns The project admin address.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const adminAddress = await mixedToken.read.getAdmin(readClient, {
 *  address: '0x...' // mixed token address
 * });
 * console.log(adminAddress);
 */
export const getAdmin = async (client: ReadClient, props: MixedTokenGetAdminProps) => {
  const { address } = props;
  return await readContract(client, {
    address,
    abi: mixedTokenAbi,
    functionName: 'getProjectAdmin',
  });
};
