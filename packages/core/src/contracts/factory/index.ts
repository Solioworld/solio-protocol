import { getMixedTokenWithIndex } from './get-mixed-token-with-index';
import { getRouter } from './get-router';
import { launchMixedToken } from './launch-mixed-token';

export type { FactoryGetMixedTokenAddressWithIndexProps } from './get-mixed-token-with-index';
export type { FactoryGetRouteProps } from './get-router';
export type { FactoryLaunchMixedTokenProps } from './launch-mixed-token';

export const factory = {
  read: {
    getRouter,
    getMixedTokenWithIndex,
  },
  write: {
    launchMixedToken,
  },
};
