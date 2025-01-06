import { http, createClient } from 'viem';
import { sepolia } from 'viem/chains';

export const readClient = createClient({
  chain: sepolia,
  transport: http(),
});



