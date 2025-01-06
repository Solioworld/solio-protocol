interface ImportMetaEnv {
  // more env variables...
  VITE_FACTORY_ADDRESS: `0x${string}`;
  VITE_EXPONENTIAL_ADDRESS: `0x${string}`;
  VITE_LINEAR_ADDRESS: `0x${string}`;
  VITE_LAUNCH_TIME_ADDRESS: `0x${string}`;
  VITE_LIMIT_ADDRESS: `0x${string}`;
  VITE_WHITELIST_ADDRESS: `0x${string}`;
  VITE_ROUTER_ADDRESS: `0x${string}`;
  VITE_IPFS_URL: 'ipfs://' | string;
  VITE_HODL_ADDRESS: `0x${string}`;
  VITE_HODL_INDEX: number;
  VITE_LOL_ADDRESS: `0x${string}`;
  VITE_LOL_INDEX: number;
  VITE_RAISING_ADDRESS: `0x${string}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
