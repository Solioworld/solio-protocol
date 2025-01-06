import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { routerAbi } from './abi';

export type RouterGetFactoryProps = {
  address: Address;
};

/**
 * Fetches the factory address from the router contract.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link RouterGetFactoryProps} The properties for the function.
 * @param props.address -  {@link Address} The address of the router contract.
 * @returns A promise that resolves to the factory address.
 * @example
 * import { router } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * })
 * const factoryAddress = await router.read.getFactory(readClient, {
 *  address: '0x...' // router contract address
 * });
 * console.log(factoryAddress);
 */
export const getFactory = async (client: ReadClient, props: RouterGetFactoryProps) => {
  const { address } = props;
  return await readContract(client, {
    address,
    abi: routerAbi,
    functionName: 'factory',
  });
};
