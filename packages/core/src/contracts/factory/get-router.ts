import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { factoryAbi } from './abi';

export type FactoryGetRouteProps = {
  address: Address;
};

/**
 * Fetches the route address from the factory contract.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link FactoryGetRouteProps} The properties for the function.
 * @param props.address -  {@link Address} The address of the factory contract.
 * @returns A promise that resolves to the route address.
 * @example
 * // for reading the router address
 * import { factory } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const routeAddress = await getRouter(readClient, {
 *  address: '0x...' // factory contract address
 * });
 * console.log(routeAddress);
 */
export const getRouter = async (client: ReadClient, props: FactoryGetRouteProps) => {
  const { address } = props;
  return await readContract(client, {
    address,
    abi: factoryAbi,
    functionName: 'getRoute',
  });
};
