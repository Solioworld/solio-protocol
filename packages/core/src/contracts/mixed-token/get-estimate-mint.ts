import type { ReadClient } from '@/types';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { mixedTokenAbi } from './abi';

export type MixedTokenGetEstimateMintProps = {
  address: Address;
  raisingAmount: bigint;
};

/**
 * Estimates the mixed token amount that needs to be minted when a certain amount of native token is raised.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link MixedTokenGetEstimateMintProps} The properties to use.
 * @param props.address -  {@link Address} The address of the mixed token.
 * @param props.raisingAmount - The amount of native token being raised.
 * @returns The mixed token amount, platform fee, and project fee.
 * @example
 * import { mixedToken } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const { mixedTokenAmount, platformFee, projectFee } = await mixedToken.read.getEstimateMint(readClient, {
 *  address: '0x...',
 *  raisingAmount: 1n
 * });
 * console.log(mixedTokenAmount, platformFee, projectFee);
 */
export const getEstimateMint = async (client: ReadClient, props: MixedTokenGetEstimateMintProps) => {
  const { address, raisingAmount } = props;
  const [mixedTokenAmount, platformFee, projectFee] = await readContract(client, {
    address,
    abi: mixedTokenAbi,
    functionName: 'estimateMint',
    args: [raisingAmount],
  });
  return { mixedTokenAmount, platformFee, projectFee };
};
