import { StatusBar } from 'react-native';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { palettes, type Palette, type ThemeName } from './tokens';

type ThemeContextValue = {
  /** The active palette. Read colours from here, never from `light`. */
  c: Palette;
  name: ThemeName;
  isDark: boolean;
  setTheme: (name: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * The prototype opens in light and leaves dark to an explicit switch on
 * Account - it does not follow the OS setting (see the note at
 * reference/index.html:1044). We match that, so the default here is
 * `light` rather than `useColorScheme()`.
 *
 * Persistence is deliberately absent for now: the prototype keeps the
 * choice for the visit only, and we have no storage dependency yet.
 */
export function ThemeProvider({
  children,
  initial = 'light',
}: {
  children: ReactNode;
  initial?: ThemeName;
}) {
  const [name, setName] = useState<ThemeName>(initial);

  const setTheme = useCallback((next: ThemeName) => setName(next), []);
  const toggleTheme = useCallback(
    () => setName(n => (n === 'light' ? 'dark' : 'light')),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      c: palettes[name],
      name,
      isDark: name === 'dark',
      setTheme,
      toggleTheme,
    }),
    [name, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {/*
        Headers are white in light and near-black in dark, and they sit
        under the status bar, so its icons have to flip with the theme or
        they vanish into the header. RN 0.87 is edge-to-edge on Android
        by default, so barStyle is all there is to set.
      */}
      <StatusBar
        barStyle={name === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return ctx;
}
