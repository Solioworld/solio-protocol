import type { ReadClient } from '@/types';
import { isZeroAddress } from '@/utils';
import { type Address, erc20Abi, zeroAddress } from 'viem';
import { getBalance, readContract } from 'viem/actions';

export type ERC20GetBalanceOfProps = {
  address?: Address;
  account: Address;
};

/**
 * Get balance of a given account.
 *
 * If address is provided, call `balanceOf` of the given erc20 contract.
 * If address is not provided, return the balance of the given account.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link ERC20GetBalanceOfProps} The properties to use.
 * @returns The balance of the given account.
 * @example
 * // for chain native token balance
 * import { erc20 } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const balance = await erc20.read.getBalanceOf(readClient, { account: '0x...' });
 * console.log(balance);
 * @example
 * // for erc20 token balance
 * import { erc20 } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const balance = await erc20.read.getBalanceOf(readClient, {
 *  address: '0x...', // ERC20 contract address
 *  account: '0x...'
 * });
 * console.log(balance);
 */
export const getBalanceOf = async (client: ReadClient, props: ERC20GetBalanceOfProps) => {
  const { address = zeroAddress, account } = props;
  if (!isZeroAddress(address)) {
    return await readContract(client, {
      address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [account],
    });
  }
  return await getBalance(client, { address: account });
};
