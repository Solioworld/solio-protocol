import { defaultTransactionTimeout } from '@/constants';
import type { WriteClient, WriteContractBaseProps } from '@/types';
import type { Address } from 'viem';
import { getBlock, writeContract } from 'viem/actions';
import { erc20 } from '../erc20';
import { routerAbi } from './abi';

export type RouterSwapProps = WriteContractBaseProps & {
  address: Address;
  raisingToken: Address;
  payAddress: Address;
  payIndex: bigint;
  payAmount: bigint;
  receiveAddress: Address;
  receiveIndex: bigint;
  minReceiveAmount: bigint;
  timeout?: bigint;
};

/**
 * Swaps a token for another token using the router contract.
 *
 * @param client - The write client to use for the contract call.
 * @param props - An object containing the properties for the function.
 * @param props.address -  {@link Address} The address of the router contract.
 * @param props.raisingToken - The address of the token being raised.
 * @param props.payAddress - The address of the token being paid.
 * @param props.payIndex - The index of the token being paid.
 * @param props.payAmount - The amount of the token being paid.
 * @param props.receiveAddress - The address of the token being received.
 * @param props.receiveIndex - The index of the token being received.
 * @param props.minReceiveAmount - The minimum amount of the token to receive.
 * @param props.timeout - The timeout for the swap process. Defaults to 30 minutes.
 * @param props.account - The Ethereum address to use for signing the transaction. Defaults to the first account in the write client.
 * @param props.gas - The gas limit for the transaction. Defaults to 2000000.
 * @param props.gasPrice - The gas price for the transaction. Defaults to 20000000000.
 * @param props.nonce - The nonce for the transaction. Defaults to the current nonce of the account.
 * @returns A promise that resolves to the result of the write contract.
 * @example
 * import { router } from '@solio/core';
 * import { createWalletClient, custom } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const writeClient = createWalletClient({
 *  chain: sepolia,
 *  transport: custom(window.ethereum),
 * });
 * const hash = await  router.write.swap(writeClient, {
 *  address: '0x...', // Router contract address
 *  raisingToken: '0x...',
 *  payAddress: '0x...',
 *  payIndex: 0n,
 *  payAmount: 100n,
 *  receiveAddress: '0x...',
 *  receiveIndex: 0n,
 *  minReceiveAmount: 100n
 *});
 */
export const swap = async (client: WriteClient, props: RouterSwapProps) => {
  const {
    address,
    raisingToken,
    payAddress,
    payIndex,
    payAmount,
    receiveAddress,
    receiveIndex,
    minReceiveAmount,
    timeout = defaultTransactionTimeout,
    ...base
  } = props;
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  const [, { timestamp }] = await Promise.all([
    erc20.write.checkAndApprove(client, { address: raisingToken, spender: receiveAddress, amount: payAmount, account }),
    getBlock(client, { blockTag: 'latest' }),
  ]);
  return await writeContract(client, {
    ...base,
    address,
    abi: routerAbi,
    functionName: 'swap',
    account,
    args: [payIndex, receiveIndex, payAmount, minReceiveAmount, account, timestamp + timeout],
  });
};
