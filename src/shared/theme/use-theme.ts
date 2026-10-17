import { DarkTheme, DefaultTheme } from 'expo-router/react-navigation';
import { useColorScheme } from 'react-native';
import { colorScheme } from './tokens';

export function useTheme() {
  const dark = useColorScheme() === colorScheme.dark;
  const scheme = dark ? colorScheme.dark : colorScheme.light;
  const { colors } = dark ? DarkTheme : DefaultTheme;
  const text = typeof colors.text === 'string' ? colors.text : undefined;
  const accent =
    typeof colors.primary === 'string' ? colors.primary : undefined;
  return {
    background: colors.background,
    surface: colors.card,
    text,
    muted: text,
    border: colors.border,
    accent,
    soft: colors.card,
    dark,
    colorScheme: scheme,
  };
}
export type Theme = ReturnType<typeof useTheme>;
