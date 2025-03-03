import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenGetEstimateMintNeedProps = {
  address: Address;
  mixedTokenAmount: bigint;
};

/**
 * Estimates the native token amount that needs to be paid when a certain amount of mixed token is minted.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link MixedTokenGetEstimateMintNeedProps} The properties to use.
 * @param props.address -  {@link Address} The address of the mixed token.
 * @param props.mixedTokenAmount - The amount of mixed token being minted.
 * @returns The native token amount, platform fee, and project fee.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const { raisingAmount, platformFee, projectFee } = await mixedToken.read.getEstimateMintNeed(readClient, {
 *  address: '0x...', // mixed token address
 *  mixedTokenAmount: 1n
 * });
 * console.log(raisingAmount, platformFee, projectFee);
 */
export const getEstimateMintNeed = async (client: ReadClient, props: MixedTokenGetEstimateMintNeedProps) => {
  const { address, mixedTokenAmount } = props;
  const [, raisingAmount, platformFee, projectFee] = await readContract(client, {
    address,
    abi: mixedTokenAbi,
    functionName: 'estimateMintNeed',
    args: [mixedTokenAmount],
  });
  return { raisingAmount, platformFee, projectFee };
};
