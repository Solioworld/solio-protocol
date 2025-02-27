import { defaultLOLParameter } from '@/constants';
import type {
  HookConf,
  HookParam,
  HookType,
  MixedTokenParam,
  MixedTokenType,
  WriteClient,
  WriteContractBaseProps,
} from '@/types';
import { encodeHookData, formatSafeToString, isZeroAddress, parseTaxRate, transformBondingCurveProps } from '@/utils';
import { type Address, encodeAbiParameters, parseEther } from 'viem';
import { writeContract } from 'viem/actions';
import { factoryAbi } from './abi';
export type FactoryLaunchMixedTokenProps = WriteContractBaseProps & {
  address: Address;
  mixedToken: MixedTokenParam;
};

/**
 * Deploys a mixed token with specified properties and optional hooks.
 *
 * This function handles the deployment of a mixed token on the blockchain
 * using provided parameters such as bonding curve, token type, tax rates,
 * and hooks. If the token type is 'LOL', default parameters are used for
 * bonding curve and tax rates.
 *
 * @param client - {@link WriteClient } The write client to use.
 * @param props - {@link FactoryLaunchMixedTokenProps} The properties required to launch the mixed token.
 * @param props.address -  {@link Address} The factory contract address.
 * @param props.mixedToken - {@link MixedTokenParam} The mixed token parameters including type,
 * @param props.account - The Ethereum address to use for signing the transaction. Defaults to the first account in the write client.
 * @param props.gas - The gas limit for the transaction. Defaults to 2000000.
 * @param props.gasPrice - The gas price for the transaction. Defaults to 20000000000.
 * @param props.nonce - The nonce for the transaction. Defaults to the current nonce of the account.
 * bonding curve, tax rates, hooks, and more.
 * @returns A promise that resolves to the transaction result.
 * @example
 * // launch hodl token
 * import { factory } from '@solio/core';
 * import { createWalletClient, custom } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const writeClient = createWalletClient({
 *  chain: sepolia,
 *  transport: custom(window.ethereum),
 * });
 * const mixedTokenParam: MixedTokenParam = { type: 'HODL', ... };
 * const hash = await factory.write.launchMixedToken(writeClient, {
 *  address: '0x...', // factory contract address
 *  mixedToken: mixedTokenParam
 * });
 * console.log(hash);
 * @example
 * // launch lol token
 * import { factory } from '@solio/core';
 * import { createWalletClient, custom } from 'viem';
 * import { sepolia } from 'viem/chains';
 * const writeClient = createWalletClient({
 *  chain: sepolia,
 *  transport: custom(window.ethereum),
 * });
 * const mixedTokenParam: MixedTokenParam = { type: 'LOL', ... };
 * const hash = await factory.write.launchMixedToken(writeClient, {
 *  address: '0x...', // factory contract address
 *  mixedToken: mixedTokenParam
 * });
 * console.log(hash);
 */
export const launchMixedToken = async (client: WriteClient, props: FactoryLaunchMixedTokenProps) => {
  const { address, mixedToken, ...base } = props;
  if (isZeroAddress(mixedToken.raisingAddress)) {
    throw new Error('The raising address is zero!');
  }
  let account = base.account;
  if (!account) {
    [account] = await client.getAddresses();
  }
  const { hook } = mixedToken;
  let { bondingCurve, mintTaxRate, burnTaxRate, maxSupply } = mixedToken;
  let tokenType: MixedTokenType = mixedToken.type === 'HODL' ? 'ERC20' : 'LOL';
  if (tokenType === 'LOL') {
    bondingCurve ??= defaultLOLParameter.bondingCurve;
    mintTaxRate ??= defaultLOLParameter.mintTaxRate;
    burnTaxRate ??= defaultLOLParameter.burnTaxRate;
    maxSupply ??= parseEther(formatSafeToString(defaultLOLParameter.maxSupply));
  }

  // bondingCurve
  let data = transformBondingCurveProps(bondingCurve!);
  // hook
  const hooks: Address[] = [];
  const hookCalldata: `0x${string}`[] = [];
  if (hook !== undefined) {
    for (const key in hook) {
      if (Object.prototype.hasOwnProperty.call(hook, key) && ['launchTime', 'limit', 'launchWhitelist'].includes(key)) {
        const item = hook[key as HookType] as HookConf<HookParam>;
        hooks.push(item.address);
        hookCalldata.push(encodeHookData(key as HookType, item));
      }
    }
  }
  // max supply
  if (maxSupply !== undefined && maxSupply > 0) {
    tokenType = 'ERC20WithSupply';
    data = encodeAbiParameters([{ type: 'uint256' }, { type: 'bytes' }], [maxSupply, data]);
  }
  const calldata = {
    tokenType,
    bondingCurveType: bondingCurve!.type,
    name: mixedToken.name,
    symbol: mixedToken.symbol,
    metadata: mixedToken.metadataUrl,
    projectAdmin: mixedToken.adminAddress ?? account,
    projectTreasury: mixedToken.treasuryAddress ?? account,
    projectMintTax: parseTaxRate(mintTaxRate!),
    projectBurnTax: parseTaxRate(burnTaxRate!),
    raisingTokenAddr: mixedToken.raisingAddress,
    data,
  };
  const fastMintAmount = mixedToken.fastMintAmount ?? BigInt(0);
  return await writeContract(client, {
    ...base,
    account,
    address,
    abi: factoryAbi,
    functionName: 'deployTokenWithHooks',
    args: [calldata, fastMintAmount, hooks, hookCalldata],
  });
};
