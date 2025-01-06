import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'auto';

export const getSystemTheme = (): Theme | undefined => {
  if (typeof window == 'undefined') return undefined;
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return isDark ? 'dark' : isLight ? 'light' : undefined;
};

export const getClassTheme = (): Theme | undefined => {
  if (typeof window == 'undefined') return undefined;
  const classList = window.document.documentElement.classList;
  const isDark = classList.contains('dark');
  const isLight = classList.contains('light');
  return isDark ? 'dark' : isLight ? 'light' : undefined;
};

export const getStorageTheme = (): Theme | undefined => {
  if (typeof window == 'undefined') return undefined;
  const theme = window.localStorage.getItem('theme')?.toLowerCase();
  return theme && ['dark', 'light'].indexOf(theme) != -1 ? (theme as Theme) : undefined;
};

const defaultTheme: Theme = 'light';

const useTheme = () => {
  const [theme, _setTheme] = useState(getStorageTheme() || getClassTheme() || getSystemTheme() || defaultTheme);
  const setTheme = useCallback(
    (newTheme: Theme) => {
      const tmpTheme = newTheme === 'auto' ? getSystemTheme() || defaultTheme : newTheme;
      _setTheme(tmpTheme);
      if (typeof window !== 'undefined' && tmpTheme != theme) {
        window.document.documentElement.classList.remove('dark', 'light');
        window.document.documentElement.classList.add(tmpTheme);
        window.localStorage.setItem('theme', tmpTheme);
      }
    },
    [theme],
  );
  useEffect(() => {
    setTheme(theme);
  }, [setTheme, theme]);
  return {
    theme,
    setTheme,
  };
};

export default useTheme;
