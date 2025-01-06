import type { BondingCurveProps, ReadClient } from '@/types';
import { transformBondingCurveProps } from '@/utils';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { bondingCurveAbi } from './abi';

export type BondingCurveGetMintAmountProps = BondingCurveProps & {
  address: Address;
  raisingAmount: bigint;
  currentSupply?: bigint;
};

/**
 * Reads the mixed token amount that needs to be minted when a certain amount
 * of native token is raised.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link BondingCurveGetMintAmountProps} The properties to use.
 * @param props.address -  {@link Address} The address of the bonding curve.
 * @param props.type - {@link BondingCurveProps['type']} The type of bonding curve.
 * @param props.param - {@link BondingCurveProps['param']} The parameters of the bonding curve.
 * @param props.raisingAmount -  The amount of native token being raised.
 * @param props.currentSupply - The current mixed token supply. Defaults to 0.
 * @returns The mixed token amount.
 * @example
 * // for exponential
 * import { bondingCurve } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const amount = await bondingCurve.read.getMintAmount(readClient, {
 *   address: '0x...', // bonding curve contract address
 *   type: 'exponential',
 *   param: {
 *     a: 10000000000000000n,
 *     b: 100000000000000000000000n,
 *   },
 *   raisingAmount: 1000000000000000000n,
 *   currentSupply: 0n
 * });
 * console.log(amount);
 * @example
 * // for linear
 * import { bondingCurve } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const amount = await bondingCurve.read.getMintAmount(readClient, {
 *   address: '0x...', // bonding curve contract address
 *   type: 'linear',
 *   param: {
 *     initPrice: 0.001,
 *     finalPrice: 1000,
 *     supply: 1e32,
 *   },
 *   raisingAmount: 1000000000000000000n,
 *   currentSupply: 0n
 * });
 * console.log(amount);
 */
export const getMintAmount = async (client: ReadClient, props: BondingCurveGetMintAmountProps) => {
  const { type, param, address, raisingAmount, currentSupply = 0n } = props;
  const paramsData = transformBondingCurveProps({ type, param } as BondingCurveProps);
  const [mixedTokenAmount] = await readContract(client, {
    address,
    abi: bondingCurveAbi,
    functionName: 'calculateMintAmountFromBondingCurve',
    args: [raisingAmount, currentSupply, paramsData],
  });
  return mixedTokenAmount;
};
