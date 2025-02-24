import {
  http,
  type Chain,
  createClient,
  createWalletClient,
  custom,
} from "viem";
import { sepolia } from "viem/chains";

declare global {
  interface Window {
    okxwallet: EthereumProvider;
    ethereum: EthereumProvider & {
      isAlphaWallet?: boolean;
      isTokenPocket?: boolean;
    };
  }
}

const SEPOLIA_RPCS: Chain["rpcUrls"] = {
  default: {
    http: ["https://rpc.sepolia.org", "https://rpc.ankr.com/eth_sepolia"],
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
