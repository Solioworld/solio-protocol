import { defaultApproveAmount } from '@/constants';
import type { ReadClient } from '@/types';
import { isZeroAddress } from '@/utils';
import { type Address, erc20Abi } from 'viem';
import { readContract } from 'viem/actions';

export type ERC20GetAllowanceProps = {
  address: Address;
  spender: Address;
  account: Address;
};

/**
 * Get the allowance of a given account and spender.
 *
 * If the address is not the zero address, it calls the `allowance` function
 * of the specified ERC20 contract to get the allowance.
 * If the address is the zero address, it returns the default approve amount.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link ERC20GetAllowanceProps} The properties containing the address, spender, and account.
 * @returns The allowance as a bigint if the address is valid, otherwise the default approve amount.
 * @example
 * // for get erc20 token allowance
 * import { erc20 } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const allowance = await erc20.read.getAllowance(readClient, {
 *  address: '0x...', // ERC20 contract address
 *  spender: '0x...',
 *  account: '0x...'
 * });
 * console.log(allowance);
 */
export const getAllowance = async (client: ReadClient, props: ERC20GetAllowanceProps) => {
  const { address, spender, account } = props;
  if (!isZeroAddress(address)) {
    return await readContract(client, {
      address,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [account, spender],
    });
  }
  return defaultApproveAmount;
};
