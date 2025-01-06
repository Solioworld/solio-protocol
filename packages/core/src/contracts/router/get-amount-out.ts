import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { routerAbi } from './abi';

export type RouterGetAmountOutProps = {
  address: Address;
  payAddress: Address;
  receiveAddress: Address;
  payAmount: bigint;
};

/**
 * Calculates the output amount for a given input amount and token addresses using the router contract.
 *
 * @param client - The read client to use for the contract call.
 * @param props - An object containing the properties for the function.
 * @param props.address -  {@link Address} The address of the router contract.
 * @param props.payAddress - The address of the token being paid.
 * @param props.receiveAddress - The address of the token being received.
 * @param props.payAmount - The amount of the token being paid.
 * @returns A promise that resolves to an object containing the receive and raising amounts.
 * @example
 * import { router } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * })
 * const { receiveAmount, raisingAmount } = await router.read.getAmountOut(readClient, {
 *  address: '0x...', // router contract address
 *  payAddress: '0x...',
 *  receiveAddress: '0x...',
 *  payAmount: 100n
 * });
 * console.log(receiveAmount,raisingAmount);
 */
export const getAmountOut = async (client: ReadClient, props: RouterGetAmountOutProps) => {
  const { address, payAddress, receiveAddress, payAmount } = props;
  const [receiveAmount, raisingAmount] = await readContract(client, {
    address,
    abi: routerAbi,
    functionName: 'getAmountOut',
    args: [payAddress, receiveAddress, payAmount],
  });
  return {
    receiveAmount,
    raisingAmount,
  };
};
