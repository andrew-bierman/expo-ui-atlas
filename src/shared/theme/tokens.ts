import type { TextStyle } from 'react-native';

/** Shared chrome values. Specimen dimensions remain with their demonstrations. */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 18,
  xxl: 24,
  pill: 999,
} as const;

export const typography = {
  body: { fontSize: 15, lineHeight: 23 },
  input: { fontSize: 16 },
  caption: { fontSize: 13, fontWeight: '600' },
  headline: { fontSize: 16, fontWeight: '700' },
} as const satisfies Record<string, TextStyle>;

export const layout = {
  minTouchTarget: 44,
  readingWidth: 900,
  hairline: 1,
  fullWidth: '100%',
} as const;

export const colorScheme = {
  light: 'light',
  dark: 'dark',
} as const;

export type ThemeColorScheme = (typeof colorScheme)[keyof typeof colorScheme];
