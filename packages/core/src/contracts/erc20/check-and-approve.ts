import { defaultApproveAmount } from '@/constants';
import type { WriteClient, WriteContractBaseProps } from '@/types';
import type { Address } from 'viem';
import { approve } from './approve';
import { getAllowance } from './get-allowance';

// read

// write

export type ERC20CheckAndApproveProps = WriteContractBaseProps & {
  address: Address;
  spender: Address;
  amount?: bigint;
};

/**
 * Checks if the current allowance for a given spender is less than the specified amount
 * and approves the spender to transfer the specified amount of tokens from the given account
 * if necessary.
 *
 * If the address is not the zero address and the existing allowance is less than the required amount,
 * it calls the `approve` function of the specified ERC20 contract to approve the given amount.
 * If the address is the zero address or the existing allowance is sufficient, it does nothing and returns undefined.
 *
 * @param client - {@link WriteClient } The write client to use.
 * @param props - {@link ERC20CheckAndApproveProps} The properties containing the address, spender, amount, and account.
 * @param props.address -  {@link Address} The address of the ERC20 contract.
 * @param props.spender - The address of the spender.
 * @param props.amount - The amount to approve. Defaults to the default approve amount.
 * @param props.account - The Ethereum address to use for signing the transaction. Defaults to the first account in the write client.
 * @param props.gas - The gas limit for the transaction. Defaults to 2000000.
 * @param props.gasPrice - The gas price for the transaction. Defaults to 20000000000.
 * @param props.nonce - The nonce for the transaction. Defaults to the current nonce of the account.
 * @returns The result of the approve call if approval is necessary, otherwise undefined.
 * @example
 * // for default amount
 * import { erc20 } from '@solio/core';
 * import { createWalletClient, custom } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const writeClient = createWalletClient({
 *  chain: sepolia,
 *  transport: custom(window.ethereum),
 * });
 * const hash = await checkAndApprove(writeClient, {
 *  address: '0x...', // ERC20 contract address
 *  spender: '0x...'
 * });
 * console.log(hash);
 * @example
 * // for custom amount (100wei)
 * import { erc20 } from '@solio/core';
 * import { createWalletClient, custom } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const writeClient = createWalletClient({
 *  chain: sepolia,
 *  transport: custom(window.ethereum),
 * });
 * const hash = await checkAndApprove(writeClient, {
 *  address: '0x...', // ERC20 contract address
 *  spender: '0x...',
 *  amount: 100n // 100 wei
 *  });
 * console.log(hash);
 */
export const checkAndApprove = async (client: WriteClient, props: ERC20CheckAndApproveProps) => {
  const { address, spender, amount = defaultApproveAmount, ...base } = props;
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  const approveAmount = await getAllowance(client, { address, spender, account });
  if (approveAmount < amount) {
    return await approve(client, { ...base, address, account, spender, amount });
  }
  return undefined;
};
