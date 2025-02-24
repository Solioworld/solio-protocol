import { getMixedTokenWithIndex } from './get-mixed-token-with-index';
import { launchMixedToken } from './launch-mixed-token';

export type { FactoryGetMixedTokenAddressWithIndexProps } from './get-mixed-token-with-index';
export type { FactoryLaunchMixedTokenProps } from './launch-mixed-token';

export const factory = {
  read: {
    getMixedTokenWithIndex,
  },
  write: {
    launchMixedToken,
  },
};
