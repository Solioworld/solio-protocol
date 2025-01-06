import { type UseWatchBlocksParameters, useWatchBlocks } from 'wagmi';
import { useVisible } from './use-visible';

export type useWatchBlockProps = Omit<UseWatchBlocksParameters, 'poll'> & {
  step?: number;
  watch?: boolean;
};

export const useWatchBlock = ({ step = 2 * 1e3, watch = true, ...props }: useWatchBlockProps = {}) => {
  const isVisible = useVisible();
  return useWatchBlocks({
    ...props,
    enabled: isVisible && watch,
    pollingInterval: step,
  });
};
