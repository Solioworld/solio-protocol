import { approve } from './approve';
import { checkAndApprove } from './check-and-approve';
import { getAllowance } from './get-allowance';
import { getBalanceOf } from './get-balance-of';

export type { ERC20ApproveProps } from './approve';
export type { ERC20CheckAndApproveProps } from './check-and-approve';
export type { ERC20GetAllowanceProps } from './get-allowance';
export type { ERC20GetBalanceOfProps } from './get-balance-of';

export const erc20 = {
  read: { getBalanceOf, getAllowance },
  write: {
    approve,
    checkAndApprove,
  },
};
