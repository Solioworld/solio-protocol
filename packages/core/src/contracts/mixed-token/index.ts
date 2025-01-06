import { burn } from './burn';
// read
import { getAdmin } from './get-admin';
import { getEstimateBurn } from './get-estimate-burn';
import { getEstimateMint } from './get-estimate-mint';
import { getEstimateMintNeed } from './get-estimate-mint-need';
import { getMetadata } from './get-metadata';
import { getRaisingToken } from './get-raising-token';
import { getTaxRate } from './get-tax-rate';
import { getTreasury } from './get-treasury';
// write
import { mint } from './mint';
import { setAdmin } from './set-admin';
import { setMetadata } from './set-metadata';
import { setTaxRate } from './set-tax-rate';
import { setTaxRateAndTreasury } from './set-tax-tate-and-treasury';
import { setTreasury } from './set-treasury';

// read
export type { MixedTokenGetAdminProps } from './get-admin';
export type { MixedTokenGetEstimateBurnProps } from './get-estimate-burn';
export type { MixedTokenGetEstimateMintProps } from './get-estimate-mint';
export type { MixedTokenGetEstimateMintNeedProps } from './get-estimate-mint-need';
export type { MixedTokenGetMetadataProps } from './get-metadata';
export type { MixedTokenGetRaisingTokenProps } from './get-raising-token';
export type { MixedTokenGetTaxRateProps } from './get-tax-rate';
export type { MixedTokenGetTreasuryProps } from './get-treasury';
// write
export type { MixedTokenMintProps } from './mint';
export type { MixedTokenBurnProps } from './burn';
export type { MixedTokenSetAdminProps } from './set-admin';
export type { MixedTokenSetMetadataProps } from './set-metadata';
export type { MixedTokenSetTaxRateProps } from './set-tax-rate';
export type { MixedTokenSetTaxRateAndTreasuryProps } from './set-tax-tate-and-treasury';
export type { MixedTokenSetTreasuryProps } from './set-treasury';

export const mixedToken = {
  read: {
    getRaisingToken,
    getAdmin,
    getMetadata,
    getTreasury,
    getTaxRate,
    getEstimateMintNeed,
    getEstimateMint,
    getEstimateBurn,
  },
  write: {
    mint,
    burn,
    setAdmin,
    setMetadata,
    setTreasury,
    setTaxRate,
    setTaxRateAndTreasury,
  },
};
