import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

// read
export type MixedTokenGetRaisingTokenProps = {
  address: Address;
};

/**
 * Reads the raising token address of a mixed token.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link MixedTokenGetRaisingTokenProps} The properties to use.
 * @param props.address -  {@link Address} The address of the mixed token.
 * @returns The raising token address.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const raisingTokenAddress = await  mixedToken.read.getRaisingToken(readClient, {
 *  address: '0x...'  // mixed token address
 * });
 * console.log(raisingTokenAddress);
 */
export const getRaisingToken = async (client: ReadClient, props: MixedTokenGetRaisingTokenProps) => {
  const { address } = props;
  return await readContract(client, {
    address,
    abi: mixedTokenAbi,
    functionName: 'getRaisingToken',
  });
};
