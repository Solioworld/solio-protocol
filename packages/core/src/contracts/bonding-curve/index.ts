import { getBurnAmount } from './get-burn-amount';
import { getMintAmount } from './get-mint-amount';

export type { BondingCurveGetMintAmountProps } from './get-mint-amount';
export type { BondingCurveGetBurnAmountProps } from './get-burn-amount';

export { bondingCurveAbi } from './abi';

export const bondingCurve = {
  read: {
    getMintAmount,
    getBurnAmount,
  },
};
