import type { Account, Address, Chain, Client, RpcSchema, Transport, WalletActions } from 'viem';

export type WriteClient = Client<Transport, Chain, Account | undefined, RpcSchema, WalletActions<Chain, Account | undefined>>;

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
