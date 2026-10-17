import { useColorScheme } from 'react-native';
import { colorScheme } from './tokens';

const palette = {
  light: {
    background: '#f4f5ef',
    surface: '#ffffff',
    text: '#162d24',
    muted: '#65746b',
    border: '#dce4db',
    accent: '#246b4d',
    soft: '#e5efdf',
  },
  dark: {
    background: '#131b19',
    surface: '#1e2925',
    text: '#edf3ed',
    muted: '#a9b9b0',
    border: '#36483f',
    accent: '#a5dfbc',
    soft: '#293f32',
  },
} as const;

export function useTheme() {
  const dark = useColorScheme() === colorScheme.dark;
  const scheme = dark ? colorScheme.dark : colorScheme.light;
  return { ...palette[scheme], dark, colorScheme: scheme };
}

export type Theme = ReturnType<typeof useTheme>;
