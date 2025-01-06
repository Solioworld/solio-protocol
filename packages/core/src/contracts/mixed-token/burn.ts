import type { WriteClient, WriteContractBaseProps } from '@/types';
import type { Address } from 'viem';
import { writeContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenBurnProps = WriteContractBaseProps & {
  address: Address;
  raisingAmount: bigint;
  minMixedTokenAmount: bigint;
};

/**
 * Burns mixed tokens by returning a specified amount of native tokens.
 *
 * @param client - {@link WriteClient } The write client to use.
 * @param props - {@link MixedTokenBurnProps} The properties to use for burning.
 * @param props.address -  {@link Address} The address of the mixed token contract.
 * @param props.raisingAmount - The amount of native tokens to be returned.
 * @param props.minMixedTokenAmount - The minimum amount of mixed tokens that need to be burned.
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
 * const hash = await mixedToken.write.burn(writeClient, {
 *  address: '0x...', // mixed token contract address
 *  raisingAmount: 1n,
 *  minMixedTokenAmount: 1n
 * });
 * console.log(hash);
 */
export const burn = async (client: WriteClient, props: MixedTokenBurnProps) => {
  const { address, raisingAmount, minMixedTokenAmount, ...base } = props;
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  return await writeContract(client, {
    ...base,
    address,
    account,
    abi: mixedTokenAbi,
    functionName: 'burn',
    args: [account, raisingAmount, minMixedTokenAmount],
  });
};
