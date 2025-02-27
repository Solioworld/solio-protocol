import { http, type Chain, createClient, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type EthereumProvider = { request(...args: any): Promise<any> };
  interface Window {
    okxwallet: EthereumProvider;
    ethereum: EthereumProvider & {
      isAlphaWallet?: boolean;
      isTokenPocket?: boolean;
    };
  }
}

const {
  VITE_FACTORY_ADDRESS,
  VITE_EXPONENTIAL_ADDRESS,
  VITE_LINEAR_ADDRESS,
  VITE_IPFS_URL,
  VITE_LAUNCH_TIME_ADDRESS,
  VITE_LIMIT_ADDRESS,
  VITE_WHITELIST_ADDRESS,
  VITE_HODL_ADDRESS,
  VITE_HODL_INDEX,
  VITE_LOL_ADDRESS,
  VITE_LOL_INDEX,
  VITE_RAISING_ADDRESS,
} = import.meta.env;

export const factoryAddress = VITE_FACTORY_ADDRESS;
export const exponentialAddress = VITE_EXPONENTIAL_ADDRESS;
export const linearAddress = VITE_LINEAR_ADDRESS;
export const ipfsUrl = VITE_IPFS_URL;
export const launchTimeAddress = VITE_LAUNCH_TIME_ADDRESS;
export const limitAddress = VITE_LIMIT_ADDRESS;
export const whitelistAddress = VITE_WHITELIST_ADDRESS;
export const hodlAddress = VITE_HODL_ADDRESS;
export const hodlIndex = BigInt(VITE_HODL_INDEX);
export const lolAddress = VITE_LOL_ADDRESS;
export const lolIndex = BigInt(VITE_LOL_INDEX);
export const raisingAddress = VITE_RAISING_ADDRESS;

const SEPOLIA_RPCS: Chain['rpcUrls'] = {
  default: {
    http: ['https://ethereum-sepolia-rpc.publicnode.com', 'https://rpc.sepolia.org'],
  },
};

export const readClient = createClient({
  chain: { ...sepolia, rpcUrls: SEPOLIA_RPCS },
  transport: http(),
});

export const writeClient = createWalletClient({
  chain: { ...sepolia, rpcUrls: SEPOLIA_RPCS },
  //@ts-ignore
  transport: custom(window.ethereum),
});
