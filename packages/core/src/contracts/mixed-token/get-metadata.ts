import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenGetMetadataProps = {
  address: Address;
};

/**
 * Reads the metadata of a mixed token.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link MixedTokenGetMetadataProps} The properties to use.
 * @param props.address -  {@link Address} The address of the mixed token.
 * @returns The metadata string of the mixed token.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const metadataUrl = await mixedToken.read.getMetadata(readClient, {
 *  address: '0x...' // mixed token address
 * });
 * console.log(metadataUrl);
 */
export const getMetadata = async (client: ReadClient, props: MixedTokenGetMetadataProps) => {
  const { address } = props;
  return await readContract(client, {
    address,
    abi: mixedTokenAbi,
    functionName: 'getMetadata',
  });
};
