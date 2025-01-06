import type { WriteClient, WriteContractBaseProps } from '@/types';
import type { Address } from 'viem';
import { writeContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenSetAdminProps = WriteContractBaseProps & {
  address: Address;
  adminAddress: Address;
};

/**
 * Sets the project admin of a mixed token contract.
 *
 * @param client - {@link WriteClient } The write client to use.
 * @param props - {@link MixedTokenSetAdminProps} The properties to use for setting the admin.
 * @param props.address -  {@link Address} The address of the mixed token contract.
 * @param props.adminAddress - The address of the new admin.
 * @param props.account - The Ethereum address to use for signing the transaction. Defaults to the first account in the write client.
 * @param props.gas - The gas limit for the transaction. Defaults to 2000000.
 * @param props.gasPrice - The gas price for the transaction. Defaults to 20000000000.
 * @param props.nonce - The nonce for the transaction. Defaults to the current nonce of the account.
 * @returns A promise that resolves to the result of the write contract.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createWalletClient, custom } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const writeClient = createWalletClient({
 *  chain: sepolia,
 *  transport: custom(window.ethereum),
 * });
 * const hash = await mixedToken.write.setAdmin(writeClient, {
 *  address: '0x...', // mixed token contract address
 *  adminAddress: '0x...'
 * });
 * console.log(hash);
 */
export const setAdmin = async (client: WriteClient, props: MixedTokenSetAdminProps) => {
  const { address, adminAddress, ...base } = props;
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  return await writeContract(client, {
    ...base,
    account,
    address,
    abi: mixedTokenAbi,
    functionName: 'setProjectAdmin',
    args: [adminAddress],
  });
};
