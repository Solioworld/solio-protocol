import { useEffect, useState } from 'react';
import { useVisible } from './use-visible';

export type useWatchNowDateProps = {
  step?: number;
  watch?: boolean;
  onUpdate?: (nowDate: Date) => void;
};

export const useWatchNowDate = ({ step = 2 * 1e3, watch = true, onUpdate }: useWatchNowDateProps = {}) => {
  const isVisible = useVisible();
  const [nowDate, setNowDate] = useState(new Date());

  useEffect(() => {
    if (watch && isVisible) {
      const interval = setInterval(() => {
        const now = new Date();
        setNowDate(now);
        onUpdate?.(now);
      }, step || 0);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [watch, isVisible, step, onUpdate]);

  return nowDate;
};
