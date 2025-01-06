import { defaultTransactionTimeout } from '@/constants';
import type { WriteClient, WriteContractBaseProps } from '@/types';
import { isZeroAddress } from '@/utils';
import type { Address } from 'viem';
import { getBlock, writeContract } from 'viem/actions';
import { erc20 } from '../erc20';
import { routerAbi } from './abi';

export type RouterMintProps = WriteContractBaseProps & {
  address: Address;
  raisingToken: Address;
  raisingAmount: bigint;
  mixedTokenIndex: bigint;
  minMixedTokenAmount: bigint;
  timeout?: bigint;
};

/**
 * Mints a mixed token using the router contract.
 *
 * @param client - The write client to use for the contract call.
 * @param props - An object containing the properties for the function.
 * @param props.address -  {@link Address} The address of the router contract.
 * @param props.raisingToken - The address of the token being raised.
 * @param props.raisingAmount - The amount of the token being raised.
 * @param props.mixedTokenIndex - The index of the mixed token in the router contract.
 * @param props.minMixedTokenAmount - The minimum amount of the mixed token to mint.
 * @param props.timeout - The timeout for the minting process. Defaults to 30 minutes.
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
 * const hash = await router.write.mint(writeClient, {
 *  address: '0x...', // Router contract address
 *  raisingToken: '0x...',
 *  raisingAmount: 100n,
 *  mixedTokenIndex: 0n,
 *  minMixedTokenAmount: 100n
 * });
 * console.log(hash);
 */
export const mint = async (client: WriteClient, props: RouterMintProps) => {
  const {
    address,
    raisingToken,
    raisingAmount,
    mixedTokenIndex,
    minMixedTokenAmount,
    timeout = defaultTransactionTimeout,
    ...base
  } = props;
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  await erc20.write.checkAndApprove(client, { address: raisingToken, spender: address, amount: raisingAmount, account });
  const { timestamp } = await getBlock(client, { blockTag: 'latest' });
  return await writeContract(client, {
    ...base,
    address,
    abi: routerAbi,
    functionName: 'mint',
    account,
    args: [mixedTokenIndex, raisingAmount, minMixedTokenAmount, account, timestamp + timeout],
    value: isZeroAddress(raisingToken) ? raisingAmount : BigInt(0),
  });
};
