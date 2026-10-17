import { Stack } from 'expo-router';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../shared/theme';
export default function Layout() {
  const t = useTheme();
  return (
    <ThemeProvider value={t.dark ? DarkTheme : DefaultTheme}>
      <StatusBar style={t.dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: t.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="component/[id]"
          options={{ title: 'Explore specimen' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
