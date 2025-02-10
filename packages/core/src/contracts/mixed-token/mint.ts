import type { WriteClient, WriteContractBaseProps } from '@/types';
import { isZeroAddress } from '@/utils';
import type { Address } from 'viem';
import { writeContract } from 'viem/actions';
import { erc20 } from '../erc20';
import { mixedTokenAbi } from './abi';

export type MixedTokenMintProps = WriteContractBaseProps & {
  raisingAddress: Address;
  address: Address;
  raisingAmount: bigint;
  minMixedTokenAmount: bigint;
};

/**
 * Mints mixed tokens by raising a specified amount of native tokens.
 *
 * This function first checks and approves the raising amount with the raising address
 * as the spender. Then, it writes a contract to mint the mixed tokens.
 *
 * @param client - {@link WriteClient } The write client to use.
 * @param props - {@link MixedTokenMintProps} The properties to use for minting.
 * @param props.raisingAddress - The address that will raise the native tokens.
 * @param props.address -  {@link Address} The address of the mixed token contract.
 * @param props.raisingAmount - The amount of native tokens to be raised.
 * @param props.minMixedTokenAmount - The minimum amount of mixed tokens that need to be minted.
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
 * const hash = await mint(writeClient, {
 *  address: '0x...', // mixed token contract address
 *  raisingAddress: '0x...',
 *  raisingAmount: 1n,
 *  minMixedTokenAmount: 1n
 * });
 * console.log(hash);
 */
export const mint = async (client: WriteClient, props: MixedTokenMintProps) => {
  const { raisingAddress, address, raisingAmount, minMixedTokenAmount, ...base } = props;
  if(isZeroAddress(raisingAddress)) {
    throw new Error('The raising address is zero!');
  }
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  await erc20.write.checkAndApprove(client, { address: raisingAddress, spender: address, amount: raisingAmount, account });
  return await writeContract(client, {
    ...base,
    account,
    address,
    abi: mixedTokenAbi,
    functionName: 'mint',
    args: [account, raisingAmount, minMixedTokenAmount]
  });
};
