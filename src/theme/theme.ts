import { useColorScheme } from 'react-native';
export function useTheme() {
  const dark = useColorScheme() === 'dark';
  return {
    dark,
    background: dark ? '#131b19' : '#f4f5ef',
    surface: dark ? '#1e2925' : '#ffffff',
    text: dark ? '#edf3ed' : '#162d24',
    muted: dark ? '#a9b9b0' : '#65746b',
    border: dark ? '#36483f' : '#dce4db',
    accent: dark ? '#a5dfbc' : '#246b4d',
    soft: dark ? '#293f32' : '#e5efdf',
  };
}
