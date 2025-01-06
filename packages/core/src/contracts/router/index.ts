import { getAmountOut } from './get-amount-out';
import { getFactory } from './get-factory';
import { mint } from './mint';
import { swap } from './swap';

export type { RouterGetAmountOutProps } from './get-amount-out';
export type { RouterGetFactoryProps } from './get-factory';
export type { RouterMintProps } from './mint';
export type { RouterSwapProps } from './swap';

export const router = {
  read: { getFactory, getAmountOut },
  write: { mint, swap },
};
