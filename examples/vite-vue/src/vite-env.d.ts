/// <reference types="vite/client" />
type EthereumProvider = { request(...args: unknown): Promise<unknown> };
declare global {
  interface Window {
    okxwallet: EthereumProvider | undefined;
    ethereum: (EthereumProvider & { isAlphaWallet?: boolean; isTokenPocket?: boolean }) | undefined;
  }
}
