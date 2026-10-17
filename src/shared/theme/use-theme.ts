import { Color } from 'expo-router';
import { DarkTheme, DefaultTheme } from 'expo-router/react-navigation';
import { Platform, useColorScheme } from 'react-native';
import { colorScheme } from './tokens';

export function useTheme() {
  const dark = useColorScheme() === colorScheme.dark;
  const scheme = dark ? colorScheme.dark : colorScheme.light;
  const { colors } = dark ? DarkTheme : DefaultTheme;
  return {
    background: Platform.select({
      ios: Color.ios.systemBackground,
      android: Color.android.dynamic.surface,
      default: colors.background,
    }),
    surface: Platform.select({
      ios: Color.ios.secondarySystemBackground,
      android: Color.android.dynamic.surfaceContainer,
      default: colors.card,
    }),
    text: Platform.select({
      ios: Color.ios.label,
      android: Color.android.dynamic.onSurface,
      default: colors.text,
    }),
    muted: Platform.select({
      ios: Color.ios.secondaryLabel,
      android: Color.android.dynamic.onSurfaceVariant,
      default: colors.text,
    }),
    border: Platform.select({
      ios: Color.ios.separator,
      android: Color.android.dynamic.outlineVariant,
      default: colors.border,
    }),
    accent: Platform.select({
      ios: Color.ios.systemBlue,
      android: Color.android.dynamic.primary,
      default: colors.primary,
    }),
    soft: Platform.select({
      ios: Color.ios.secondarySystemBackground,
      android: Color.android.dynamic.surfaceContainer,
      default: colors.card,
    }),
    dark,
    colorScheme: scheme,
  };
}
export type Theme = ReturnType<typeof useTheme>;
