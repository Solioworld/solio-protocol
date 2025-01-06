import type { WriteClient, WriteContractBaseProps } from '@/types';
import { parseTaxRate } from '@/utils';
import type { Address } from 'viem';
import { writeContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenSetTaxRateAndTreasuryProps = WriteContractBaseProps & {
  address: Address;
  treasuryAddress: Address;
  mintTax: number; // 5% = 0.05
  burnTax: number; // 5% = 0.05
};

/**
 * Sets the mint and burn tax rates and treasury address of a mixed token contract.
 *
 * @param client - {@link WriteClient } The write client to use.
 * @param props - {@link MixedTokenSetTaxRateAndTreasuryProps} The properties to use for setting the tax rates and treasury address.
 * @param props.address -  {@link Address} The address of the mixed token contract.
 * @param props.treasuryAddress - The address of the treasury.
 * @param props.mintTax - The mint tax rate, given as a decimal value between 0 and 1.
 * @param props.burnTax - The burn tax rate, given as a decimal value between 0 and 1.
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
 * const hash = await mixedToken.write.setTaxRateAndTreasury(writeClient, {
 *  address: '0x...', // mixed token contract address
 *  treasuryAddress: '0x...',
 *  mintTax: 0.05,
 *  burnTax: 0.05
 * });
 * console.log(hash);
 */
export const setTaxRateAndTreasury = async (client: WriteClient, props: MixedTokenSetTaxRateAndTreasuryProps) => {
  const { address, treasuryAddress, mintTax, burnTax, ...base } = props;
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  return await writeContract(client, {
    ...base,
    address,
    account,
    abi: mixedTokenAbi,
    functionName: 'setProjectTaxRateAndTreasury',
    args: [treasuryAddress, parseTaxRate(mintTax), parseTaxRate(burnTax)],
  });
};
