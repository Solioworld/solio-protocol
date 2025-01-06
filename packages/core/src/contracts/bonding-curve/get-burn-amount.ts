import type { BondingCurveProps, ReadClient } from '@/types';
import { transformBondingCurveProps } from '@/utils';
import type { Address } from 'viem';
import { readContract } from 'viem/actions';
import { bondingCurveAbi } from './abi';

export type BondingCurveGetBurnAmountProps = BondingCurveProps & {
  address: Address;
  mixedTokenAmount: bigint;
  currentSupply?: bigint;
};

/**
 * Reads the native token amount that needs to be burned when a certain amount
 * of mixed token is burned.
 *
 * @param client - {@link ReadClient} The read client to use.
 * @param props - {@link BondingCurveGetBurnAmountProps} The properties to use.
 * @param props.address - {@link Address} The address of the bonding curve.
 * @param props.type - {@link BondingCurveProps['type']} The type of bonding curve.
 * @param props.param - {@link BondingCurveProps['param']} The parameters of the bonding curve.
 * @param props.mixedTokenAmount - The amount of mixed token being burned.
 * @param props.currentSupply - The current mixed token supply. Defaults to 0.
 * @returns The native token amount.
 * @example
 * // for exponential
 * import { bondingCurve } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const amount = await bondingCurve.read.getBurnAmount(readClient, {
 *    address: '0x...', // bonding curve contract address
 *   type: 'exponential',
 *   param: {
 *     a: 10000000000000000n,
 *     b: 100000000000000000000000n,
 *   },
 *   mixedTokenAmount: 10000000000000000n,
 * })
 * @example
 * // for linear
 * import { bondingCurve } from '@solio/core';
 * import { createClient, http } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const readClient = createClient({
 *  chain: sepolia,
 *  transport: http(),
 * });
 * const amount = await bondingCurve.read.getBurnAmount(readClient, {
 *   address: '0x...', // bonding curve contract address
 *   type: 'linear',
 *   param: {
 *     initPrice: 0.001,
 *     finalPrice: 1000,
 *     supply: 1e32,
 *   },
 *   mixedTokenAmount: 10000000000000000n,
 })
 */
export const getBurnAmount = async (client: ReadClient, props: BondingCurveGetBurnAmountProps) => {
  const { type, param, address, mixedTokenAmount, currentSupply = 0n } = props;
  const paramsData = transformBondingCurveProps({ type, param } as BondingCurveProps);
  const [, raisingAmount] = await readContract(client, {
    address,
    abi: bondingCurveAbi,
    functionName: 'calculateBurnAmountFromBondingCurve',
    args: [mixedTokenAmount, currentSupply, paramsData],
  });
  return raisingAmount;
};
