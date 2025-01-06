import type { MetadataUrl, WriteClient, WriteContractBaseProps } from '@/types';
import type { Address } from 'viem';
import { writeContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenSetMetadataProps = WriteContractBaseProps & {
  address: Address;
  metadataUrl: MetadataUrl;
};

/**
 * Sets the metadata URL of a mixed token contract.
 *
 * @param client - {@link WriteClient } The write client to use.
 * @param props - {@link MixedTokenSetMetadataProps} The properties to use for setting the metadata URL.
 * @param props.address -  {@link Address} The address of the mixed token contract.
 * @param props.metadataUrl - The URL of the metadata.
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
 * const hash = await mixedToken.write.setMetadata(writeClient, {
 *  address: '0x...', // mixed token contract address
 *  metadataUrl: 'ipfs://...'
 * });
 * console.log(hash);
 */
export const setMetadata = async (client: WriteClient, props: MixedTokenSetMetadataProps) => {
  const { address, metadataUrl, ...base } = props;
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  return await writeContract(client, {
    ...base,
    account,
    address,
    abi: mixedTokenAbi,
    functionName: 'setMetadata',
    args: [metadataUrl],
  });
};
