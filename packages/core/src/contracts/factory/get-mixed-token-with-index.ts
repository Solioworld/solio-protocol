import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { factoryAbi } from './abi';

export type FactoryGetMixedTokenAddressWithIndexProps = {
  address: Address;
  mixedTokenIndex: bigint;
};

/**
 * Reads the mixed token address with index.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link FactoryGetMixedTokenAddressWithIndexProps} The properties to use.
 * @param props.address -  {@link Address} The address of the factory contract.
 * @param {bigint} props.mixedTokenIndex - The index of the mixed token to read.
 * @returns The mixed token address.
 * @example
 * // for reading the index 0 mixed token
 * import { factory } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const mixedTokenAddress = await factory.read.getMixedTokenWithIndex(readClient, {
 *  address: '0x...', // factory contract address
 *  mixedTokenIndex: 0n
 * });
 * console.log(mixedTokenAddress);
 */
export const getMixedTokenWithIndex = async (client: ReadClient, props: FactoryGetMixedTokenAddressWithIndexProps) => {
  const { address, mixedTokenIndex } = props;
  return await readContract(client, {
    address,
    abi: factoryAbi,
    functionName: 'getToken',
    args: [mixedTokenIndex],
  });
};
