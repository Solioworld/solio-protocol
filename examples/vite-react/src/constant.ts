import { http, type Chain, createClient, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type EthereumProvider = { request(...args: any): Promise<any> };
  interface Window {
    okxwallet: EthereumProvider;
    ethereum: EthereumProvider & { isAlphaWallet?: boolean; isTokenPocket?: boolean };
  }
}

const SEPOLIA_RPCS: Chain['rpcUrls'] = {
  default: {
    http: [
      'https://ethereum-sepolia.blockpi.network/v1/rpc/public',
      'https://rpc.sepolia.org',
      'https://rpc.ankr.com/eth_sepolia',
    ],
  },
  public: {
    http: [
      'https://ethereum-sepolia.blockpi.network/v1/rpc/public',
      'https://rpc.sepolia.org',
      'https://rpc.ankr.com/eth_sepolia',
    ],
  },
};

export const readClient = createClient({
  chain: { ...sepolia, rpcUrls: SEPOLIA_RPCS },
  transport: http(),
});

export const writeClient = createWalletClient({
  chain: { ...sepolia, rpcUrls: SEPOLIA_RPCS },
  transport: custom(window.ethereum),
});
