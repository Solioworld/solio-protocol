import type { Account, Address, Chain, Client, RpcSchema, Transport, WalletClient } from 'viem';

export type WriteClient = WalletClient<Transport, Chain, Account | undefined, RpcSchema | undefined>;

export type ReadClient = Client<Transport, Chain>;

export type WriteContractBaseProps = {
  account?: Address;
} & (
  | {
      gas?: bigint;
      maxFeePerGas?: bigint;
      maxPriorityFeePerGas?: bigint;
    }
  | {
      gas?: bigint;
      gasPrice?: bigint;
    }
);
